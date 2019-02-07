(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":5}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":6}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":1}],5:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":11,"../../modules/es6.object.define-property":40}],6:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":11,"../../modules/es6.object.keys":41}],7:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],8:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":24}],9:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":33,"./_to-iobject":35,"./_to-length":36}],10:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],11:[function(require,module,exports){
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],12:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":7}],13:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],14:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":18}],15:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":19,"./_is-object":24}],16:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],17:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":11,"./_ctx":12,"./_global":19,"./_has":20,"./_hide":21}],18:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],19:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],20:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],21:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":14,"./_object-dp":26,"./_property-desc":30}],22:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":14,"./_dom-create":15,"./_fails":18}],23:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":10}],24:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],25:[function(require,module,exports){
module.exports = true;

},{}],26:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":8,"./_descriptors":14,"./_ie8-dom-define":22,"./_to-primitive":38}],27:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":9,"./_has":20,"./_shared-key":31,"./_to-iobject":35}],28:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":16,"./_object-keys-internal":27}],29:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":11,"./_export":17,"./_fails":18}],30:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],31:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":32,"./_uid":39}],32:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":11,"./_global":19,"./_library":25}],33:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":34}],34:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],35:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":13,"./_iobject":23}],36:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":34}],37:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":13}],38:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":24}],39:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],40:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":14,"./_export":17,"./_object-dp":26}],41:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":28,"./_object-sap":29,"./_to-object":37}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.console = exports.GSEB = undefined;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GSEB = exports.GSEB = $.extend(window.GSEB, function () {
  return {
    modules: [],
    use: function use(module, options) {
      if (this.modules.findIndex(function (mod) {
        return mod.name === module.name;
      }) < 0) {
        this.modules.push(new _module2.default(module, options));
      }
    },
    bootstrapping: function bootstrapping(modules) {
      var _this = this;

      console.log('GSEB bootstrapping module', modules);
      modules.imports.forEach(function (module) {
        if (Array.isArray(module)) {
          _this.use(module[0], module[1]);
        } else {
          _this.use(module);
        }
      });
    }
  };
}());

var console = exports.console = _logger2.default;

},{"./logger":43,"./module":44}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = window.console = $.extend({}, window.console, function (_console) {
  window._console = _console;
  return {
    log: function log() {
      if (!GSEB.debug) return;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _console.log.apply(_console, args);
    },
    info: function info() {
      if (!GSEB.debug) return;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _console.info.apply(_console, args);
    },
    warn: function warn() {
      if (!GSEB.debug) return;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      _console.warn.apply(_console, args);
    },
    error: function error() {
      if (!GSEB.debug) return;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      _console.error.apply(_console, args);
    },
    debug: function debug() {
      if (!GSEB.debug) return;

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      _console.debug.apply(_console, args);
    }
  };
}(window.console));

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Module = function () {
  function Module(module, options) {
    (0, _classCallCheck3.default)(this, Module);

    this.name = 'name';

    // The root DOM element that the module instance is managing.
    var $element = $((module.options ? module.options.el : undefined) || module.el || document);
    Object.defineProperty(this, '$element', {
      // Create a new getter for $element property
      get: function get() {
        return $element;
      }
    });

    // load state/method ... from module definition
    $.extend(this, module.methods || {}, function () {
      delete module.methods;
      return module;
    }());

    // create getter/setter ... for module state
    (0, _keys2.default)(module.state || {}).forEach(function (prop) {
      (0, _defineProperty2.default)(this, prop, {
        // Create a new getter for the property
        get: function get() {
          return module.state[prop];
        },

        // Create a new setter for the property
        set: function set(value) {
          module.state[prop] = value;
        }
      });
    }, this);

    // create getter ... for DOM Elements
    (0, _keys2.default)(module.options || {}).forEach(function (prop) {
      var _this = this;

      if (prop.startsWith('$')) {
        var $elem = function (selector) {
          return prop.match(/\$[A-Z]/g) ? $(selector) : _this.$element.find(selector);
        }(module.options[prop]);
        (0, _defineProperty2.default)(this, prop, {
          // Create a new getter for the property
          get: function get() {
            return $elem;
          }
        });
      }
    }, this);

    // init module
    if (this.$element.length) {
      this.install(GSEB, options);
    }

    return this;
  }

  (0, _createClass3.default)(Module, [{
    key: 'install',
    value: function install(GSEB, options) {
      console.log(this.name, 'module loading ...');
    }
  }]);
  return Module;
}();

exports.default = Module;

},{"babel-runtime/core-js/object/define-property":1,"babel-runtime/core-js/object/keys":2,"babel-runtime/helpers/classCallCheck":3,"babel-runtime/helpers/createClass":4}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$observables = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class: Observable
 * Extend: Deferred
 *
 */

var Observable = function () {
  function Observable() {
    (0, _classCallCheck3.default)(this, Observable);

    $.extend(this, $.Deferred());
  }

  (0, _createClass3.default)(Observable, [{
    key: 'next',
    value: function next(value) {
      if (this.skip || this.skipAll) {
        this.skip = value === 'skip';
        this.skipAll = this.skipAll && value !== 'activate';
        return this;
      }
      if (value === 'skip' || value === 'skipAll') {
        this[value === 'skip' || value === 'skipAll' ? value : 'isActive'] = true;
        return this;
      }
      return this.notify(value);
    }
  }, {
    key: 'subscribe',
    value: function subscribe(callback) {
      return this.progress(function (value) {
        callback.call(this, value);
      });
    }
  }]);
  return Observable;
}();

exports.default = Observable;


window.$observables = {} || window.$observables;
window.Observable = Observable;

var $observables = exports.$observables = window.$observables;

},{"babel-runtime/helpers/classCallCheck":3,"babel-runtime/helpers/createClass":4}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *  import optionsFactory from './options'
 */

// exports

var Mobylette = exports.Mobylette = {
  name: 'mobylette',
  el: '#mobylette',
  options: {
    // selectors
    $mainContainer: '#search-list-page--filters-container',
    $filterContainer: '#search-list-page--filters',
    $closeBtn: '#search-list-page--filters-close > .close',
    $mainBtn: '#search-list-page--filters-btn > .btn',
    $updateBreadCrumb: '.filtredby--breadcrumb',
    // selector out of $element $[A-Z]
    $Window: window,
    $Body: 'body',
    // default options
    maxWidth: 720,
    updatableArea: {
      $searchListResults: '.row-fluid.product-cat.product-faq.product-faq-results.search-list',
      $totalResults: '.row-fluid.bloc.bloc-seo .total-results',
      $updateResultsTarget: '#filtredTotalResults',
      $updateBreadCrumb: '.filtredby--breadcrumb'

    },
    scrollOptions: {
      autohidemode: 'hidden',
      iframeautoresize: true,
      cursoropacitymin: 0
    }

  },
  state: {
    lastRequest: null
  },
  methods: {
    open: function open() {
      if (!this.isOpen()) {
        this.$mainBtn.text(this.$mainBtn.data('text-opened'));
        this.$mainContainer.addClass('in');
        this.$Body.addClass('no-overflow');
      } else {
        this.$mainBtn.text(this.$mainBtn.data('text-closed'));
        this.reload();
      }
    },
    close: function close() {
      window.enableGlobalScroll();
      this.$mainContainer.removeClass('in');
      this.$Body.removeClass('no-overflow');
    },
    updateScrroll: function updateScrroll() {
      if (this.$Window.width() <= this.options.maxWidth) {
        $('#search-list-page--filters-container').scrollTop(0);
      }
    },

    debounce: function debounce(func, wait, immediate) {
      var timeout;
      return function () {
        var context = this;
        var args = arguments;
        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    // updateScrroll(){
    //     if (this.$Window.width() <= this.options.maxWidth) {
    //         let windowHeight = $(window).height() - $("#search-list-page--filters-btn").outerHeight();
    //         if($("#search-list-page--filters-container").length){
    //             $("#search-list-page--filters-container").css('height', windowHeight)
    //             $("#search-list-page--filters-container").getNiceScroll().resize()
    //         }
    //     }
    // },
    isOpen: function isOpen() {
      window.disableGlobalScroll();
      return this.$mainContainer.is('.in');
    },
    filter: function filter(event) {
      var _this = this;

      if (this.$Window.width() <= this.options.maxWidth) {
        console.log('filter', event);
        event.preventDefault();
        event.stopPropagation();
        $.get('?' + $(event.target).serialize()).done(function (data) {
          _this.lastRequest = $(event.target).serialize();
          // update filters
          _this.$filterContainer.html($(data).find(_this.options.$filterContainer).html());
          _this.$filterContainer.find('.facetValues form').submit(function (event) {
            return _this.filter(event);
          });
          var checkedFilters = $('#mobylette input:checkbox:checked').map(function () {
            return $(this).data('facet-code');
          }).get();
          var activeBreadcrumbs = $('.crumbs .crumb a[data-facet-code]').map(function () {
            return $(this).data('facet-code');
          }).get();
          var difference = activeBreadcrumbs.filter(function (x) {
            return !checkedFilters.includes(x);
          });
          if (difference.length) {
            difference.forEach(function (elementToDelete) {
              $(".crumbs .crumb a[data-facet-code='" + elementToDelete + "']").parent().remove();
            });
          }

          var updatedButn = $(data).find(_this.options.$mainBtn).data('text-opened');
          _this.$mainBtn.html(updatedButn);
          _this.$mainBtn.data('text-opened', updatedButn);
          _this.updateScrroll();
        });
        return false;
      }
    },
    updatePageContent: function updatePageContent(data) {
      // update page content
      for (var selector in this.options.updatableArea) {
        $(this.options.updatableArea[selector]).html($(data).find(this.options.updatableArea[selector]).html());
      }
    },
    reload: function reload(event) {
      var _this2 = this;

      if (this.lastRequest) {
        var historyEntry = {
          type: 'search-list-page-history-entry',
          data: null,
          title: document.title,
          url: window.location.pathname + '?' + this.lastRequest
        };
        $.get('?' + this.lastRequest).done(function (data) {
          try {
            // update page content
            _this2.updatePageContent(data);

            // Manipulate history
            historyEntry.data = data;
            history.pushState(historyEntry, historyEntry.title, historyEntry.url);
          } catch (e) {
            console.error(e);
            window.location.href = historyEntry.url;
          }
        });
      }
      this.close();
    },
    popState: function popState(event) {
      if (event.state && event.state.type === 'search-list-page-history-entry') {
        this.updatePageContent(event.state.data);
      }
    }
  },
  install: function install(GSEB, options) {
    var _this3 = this;

    // do something ...
    console.log('mobylette module loading ...');
    this.$closeBtn.on('click', function (event) {
      return _this3.close(event);
    });
    this.$mainBtn.on('click', function (event) {
      return _this3.open(event);
    });
    $(document).on('click', '#search-list-page--filters .show-all a', function (e) {
      if (_this3.$Window.width() <= _this3.options.maxWidth) {
        _this3.$mainBtn.click();
      } else {
        window.location.reload();
      }
    });
    var initiateMobyletteScroll = new PerfectScrollbar('#search-list-page--filters-container'); // eslint-disable-line no-unused-vars
    this.$filterContainer.find('.facetValues form').submit(function (event) {
      return _this3.filter(event);
    });
    window.addEventListener('popstate', function (event) {
      return _this3.popState(event);
    }, false);
  }
};

exports.default = Mobylette;

},{}],47:[function(require,module,exports){
'use strict';

var _core = require('@gseb/core');

var _observable = require('@gseb/helpers/observable');

var _observable2 = _interopRequireDefault(_observable);

var _mobylette = require('@gseb/modules/mobylette');

var _exempleModule = require('./modules/exemple-module');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('main.js');

_observable.$observables.mainObservable = new _observable2.default();

var MainModule = {
  imports: [_exempleModule.MyModule, _mobylette.Mobylette]

  // load a single module
  // GSEB.use(MyModule)

  // load main modules
};_core.GSEB.bootstrapping(MainModule);

},{"./modules/exemple-module":48,"@gseb/core":42,"@gseb/helpers/observable":45,"@gseb/modules/mobylette":46}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// use external modules
/*
import module from '../module-name'
import module2 from '../module2-name'
import sharedModule from '@shared-module'
 */

// use private dependencies
/*
import optionsFactory from './options'
 */

// exports

var MyModule = exports.MyModule = {
  name: 'MyModule',
  state: {
    title: 'test 1'
  },
  methods: {
    setTitle: function setTitle(value) {
      window._console.log(this.title);
      this.title = value;
      return this;
    }
  },
  install: function install(GSEB, options) {
    /*
    // do something ...
    console.log('module loading ...')
    GSEB.constants.myconstant = 'exmple'
    $('#something').doWhatYouNeed2Do()
    GSEB.use(sharedModule, optionsFactory.make(options)) */
    console.log('module loading ...');
  }
};

exports.default = MyModule;

},{}]},{},[47])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIi4uL3dlYi93ZWJyb290L191aS9yZXNwb25zaXZlL2NvbW1vbi9qcy9iYWJlbGlmeS9jb3JlL2luZGV4LmpzIiwiLi4vd2ViL3dlYnJvb3QvX3VpL3Jlc3BvbnNpdmUvY29tbW9uL2pzL2JhYmVsaWZ5L2NvcmUvbG9nZ2VyLmpzIiwiLi4vd2ViL3dlYnJvb3QvX3VpL3Jlc3BvbnNpdmUvY29tbW9uL2pzL2JhYmVsaWZ5L2NvcmUvbW9kdWxlLmpzIiwiLi4vd2ViL3dlYnJvb3QvX3VpL3Jlc3BvbnNpdmUvY29tbW9uL2pzL2JhYmVsaWZ5L2hlbHBlcnMvb2JzZXJ2YWJsZS5qcyIsIi4uL3dlYi93ZWJyb290L191aS9yZXNwb25zaXZlL2NvbW1vbi9qcy9iYWJlbGlmeS9tb2R1bGVzL21vYnlsZXR0ZS9pbmRleC5qcyIsIi4uLy4uLy4uL3RlZmFsL3RlZmFsc3RvcmVmcm9udC93ZWIvd2Vicm9vdC9fdWkvZGVza3RvcC9jb21tb24vanMvYmFiZWxpZnkvYXBwLm1haW4uanMiLCIuLi8uLi8uLi90ZWZhbC90ZWZhbHN0b3JlZnJvbnQvd2ViL3dlYnJvb3QvX3VpL2Rlc2t0b3AvY29tbW9uL2pzL2JhYmVsaWZ5L21vZHVsZXMvZXhlbXBsZS1tb2R1bGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FBWSxvQkFBWjtBQUNEO0FBcEJxQixDQUFqQjs7a0JBdUJRLFEiLCJmaWxlIjoiYnVuZGxlLm1pbi0xOC42LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuNycgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGhhcyhleHBvcnRzLCBrZXkpKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuIiwiaW1wb3J0IExvZ2dlciBmcm9tICcuL2xvZ2dlcidcbmltcG9ydCBNb2R1bGUgZnJvbSAnLi9tb2R1bGUnXG5cbmV4cG9ydCBjb25zdCBHU0VCID0gJC5leHRlbmQod2luZG93LkdTRUIsICgoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbW9kdWxlczogW10sXG4gICAgdXNlIChtb2R1bGUsIG9wdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLm1vZHVsZXMuZmluZEluZGV4KChtb2QpID0+IG1vZC5uYW1lID09PSBtb2R1bGUubmFtZSkgPCAwKSB7XG4gICAgICAgIHRoaXMubW9kdWxlcy5wdXNoKG5ldyBNb2R1bGUobW9kdWxlLCBvcHRpb25zKSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGJvb3RzdHJhcHBpbmcgKG1vZHVsZXMpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdHU0VCIGJvb3RzdHJhcHBpbmcgbW9kdWxlJywgbW9kdWxlcylcbiAgICAgIG1vZHVsZXMuaW1wb3J0cy5mb3JFYWNoKChtb2R1bGUpID0+IHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobW9kdWxlKSkge1xuICAgICAgICAgIHRoaXMudXNlKG1vZHVsZVswXSwgbW9kdWxlWzFdKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudXNlKG1vZHVsZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pKCkpXG5cbmV4cG9ydCBjb25zdCBjb25zb2xlID0gTG9nZ2VyXG4iLCJcbmV4cG9ydCBkZWZhdWx0IHdpbmRvdy5jb25zb2xlID0gJC5leHRlbmQoe30sIHdpbmRvdy5jb25zb2xlLCAoKF9jb25zb2xlKSA9PiB7XG4gIHdpbmRvdy5fY29uc29sZSA9IF9jb25zb2xlXG4gIHJldHVybiB7XG4gICAgbG9nICguLi5hcmdzKSB7XG4gICAgICBpZiAoIUdTRUIuZGVidWcpIHJldHVyblxuICAgICAgX2NvbnNvbGUubG9nLmFwcGx5KF9jb25zb2xlLCBhcmdzKVxuICAgIH0sXG4gICAgaW5mbyAoLi4uYXJncykge1xuICAgICAgaWYgKCFHU0VCLmRlYnVnKSByZXR1cm5cbiAgICAgIF9jb25zb2xlLmluZm8uYXBwbHkoX2NvbnNvbGUsIGFyZ3MpXG4gICAgfSxcbiAgICB3YXJuICguLi5hcmdzKSB7XG4gICAgICBpZiAoIUdTRUIuZGVidWcpIHJldHVyblxuICAgICAgX2NvbnNvbGUud2Fybi5hcHBseShfY29uc29sZSwgYXJncylcbiAgICB9LFxuICAgIGVycm9yICguLi5hcmdzKSB7XG4gICAgICBpZiAoIUdTRUIuZGVidWcpIHJldHVyblxuICAgICAgX2NvbnNvbGUuZXJyb3IuYXBwbHkoX2NvbnNvbGUsIGFyZ3MpXG4gICAgfSxcbiAgICBkZWJ1ZyAoLi4uYXJncykge1xuICAgICAgaWYgKCFHU0VCLmRlYnVnKSByZXR1cm5cbiAgICAgIF9jb25zb2xlLmRlYnVnLmFwcGx5KF9jb25zb2xlLCBhcmdzKVxuICAgIH1cbiAgfVxufSkod2luZG93LmNvbnNvbGUpKVxuIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2R1bGUge1xuICBjb25zdHJ1Y3RvciAobW9kdWxlLCBvcHRpb25zKSB7XG4gICAgdGhpcy5uYW1lID0gJ25hbWUnXG5cbiAgICAvLyBUaGUgcm9vdCBET00gZWxlbWVudCB0aGF0IHRoZSBtb2R1bGUgaW5zdGFuY2UgaXMgbWFuYWdpbmcuXG4gICAgY29uc3QgJGVsZW1lbnQgPSAkKChtb2R1bGUub3B0aW9ucyA/IG1vZHVsZS5vcHRpb25zLmVsIDogdW5kZWZpbmVkKSB8fCBtb2R1bGUuZWwgfHwgZG9jdW1lbnQpXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICckZWxlbWVudCcsIHtcbiAgICAgIC8vIENyZWF0ZSBhIG5ldyBnZXR0ZXIgZm9yICRlbGVtZW50IHByb3BlcnR5XG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gbG9hZCBzdGF0ZS9tZXRob2QgLi4uIGZyb20gbW9kdWxlIGRlZmluaXRpb25cbiAgICAkLmV4dGVuZCh0aGlzLCBtb2R1bGUubWV0aG9kcyB8fCB7fSwgKCgpID0+IHtcbiAgICAgIGRlbGV0ZSBtb2R1bGUubWV0aG9kc1xuICAgICAgcmV0dXJuIG1vZHVsZVxuICAgIH0pKCkpXG5cbiAgICAvLyBjcmVhdGUgZ2V0dGVyL3NldHRlciAuLi4gZm9yIG1vZHVsZSBzdGF0ZVxuICAgIE9iamVjdC5rZXlzKG1vZHVsZS5zdGF0ZSB8fCB7fSkuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHByb3AsIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IGdldHRlciBmb3IgdGhlIHByb3BlcnR5XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgcmV0dXJuIG1vZHVsZS5zdGF0ZVtwcm9wXVxuICAgICAgICB9LFxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgc2V0dGVyIGZvciB0aGUgcHJvcGVydHlcbiAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgIG1vZHVsZS5zdGF0ZVtwcm9wXSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSwgdGhpcylcblxuICAgIC8vIGNyZWF0ZSBnZXR0ZXIgLi4uIGZvciBET00gRWxlbWVudHNcbiAgICBPYmplY3Qua2V5cyhtb2R1bGUub3B0aW9ucyB8fCB7fSkuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgaWYgKHByb3Auc3RhcnRzV2l0aCgnJCcpKSB7XG4gICAgICAgIGNvbnN0ICRlbGVtID0gKChzZWxlY3RvcikgPT4gcHJvcC5tYXRjaCgvXFwkW0EtWl0vZykgPyAkKHNlbGVjdG9yKSA6IHRoaXMuJGVsZW1lbnQuZmluZChzZWxlY3RvcikpKG1vZHVsZS5vcHRpb25zW3Byb3BdKVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcCwge1xuICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBnZXR0ZXIgZm9yIHRoZSBwcm9wZXJ0eVxuICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGVsZW1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSwgdGhpcylcblxuICAgIC8vIGluaXQgbW9kdWxlXG4gICAgaWYgKHRoaXMuJGVsZW1lbnQubGVuZ3RoKSB7IHRoaXMuaW5zdGFsbChHU0VCLCBvcHRpb25zKSB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgaW5zdGFsbCAoR1NFQiwgb3B0aW9ucykge1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSwgJ21vZHVsZSBsb2FkaW5nIC4uLicpXG4gIH1cbn1cbiIsIlxuLyoqXG4gKiBDbGFzczogT2JzZXJ2YWJsZVxuICogRXh0ZW5kOiBEZWZlcnJlZFxuICpcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZhYmxlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgICQuZXh0ZW5kKHRoaXMsICQuRGVmZXJyZWQoKSlcbiAgfVxuXG4gIG5leHQgKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuc2tpcCB8fCB0aGlzLnNraXBBbGwpIHtcbiAgICAgIHRoaXMuc2tpcCA9ICh2YWx1ZSA9PT0gJ3NraXAnKVxuICAgICAgdGhpcy5za2lwQWxsID0gdGhpcy5za2lwQWxsICYmICh2YWx1ZSAhPT0gJ2FjdGl2YXRlJylcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gJ3NraXAnIHx8IHZhbHVlID09PSAnc2tpcEFsbCcpIHtcbiAgICAgIHRoaXNbdmFsdWUgPT09ICdza2lwJyB8fCB2YWx1ZSA9PT0gJ3NraXBBbGwnID8gdmFsdWUgOiAnaXNBY3RpdmUnXSA9IHRydWVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vdGlmeSh2YWx1ZSlcbiAgfVxuXG4gIHN1YnNjcmliZSAoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5wcm9ncmVzcyhmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgdmFsdWUpXG4gICAgfSlcbiAgfVxufVxuXG53aW5kb3cuJG9ic2VydmFibGVzID0ge30gfHwgd2luZG93LiRvYnNlcnZhYmxlc1xud2luZG93Lk9ic2VydmFibGUgPSBPYnNlcnZhYmxlXG5cbmV4cG9ydCBjb25zdCAkb2JzZXJ2YWJsZXMgPSB3aW5kb3cuJG9ic2VydmFibGVzXG4iLCIvKipcbiAqICBpbXBvcnQgb3B0aW9uc0ZhY3RvcnkgZnJvbSAnLi9vcHRpb25zJ1xuICovXG5cbi8vIGV4cG9ydHNcblxuZXhwb3J0IGNvbnN0IE1vYnlsZXR0ZSA9IHtcbiAgbmFtZTogJ21vYnlsZXR0ZScsXG4gIGVsOiAnI21vYnlsZXR0ZScsXG4gIG9wdGlvbnM6IHtcbiAgICAvLyBzZWxlY3RvcnNcbiAgICAkbWFpbkNvbnRhaW5lcjogJyNzZWFyY2gtbGlzdC1wYWdlLS1maWx0ZXJzLWNvbnRhaW5lcicsXG4gICAgJGZpbHRlckNvbnRhaW5lcjogJyNzZWFyY2gtbGlzdC1wYWdlLS1maWx0ZXJzJyxcbiAgICAkY2xvc2VCdG46ICcjc2VhcmNoLWxpc3QtcGFnZS0tZmlsdGVycy1jbG9zZSA+IC5jbG9zZScsXG4gICAgJG1haW5CdG46ICcjc2VhcmNoLWxpc3QtcGFnZS0tZmlsdGVycy1idG4gPiAuYnRuJyxcbiAgICAkdXBkYXRlQnJlYWRDcnVtYjogJy5maWx0cmVkYnktLWJyZWFkY3J1bWInLFxuICAgIC8vIHNlbGVjdG9yIG91dCBvZiAkZWxlbWVudCAkW0EtWl1cbiAgICAkV2luZG93OiB3aW5kb3csXG4gICAgJEJvZHk6ICdib2R5JyxcbiAgICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgICBtYXhXaWR0aDogNzIwLFxuICAgIHVwZGF0YWJsZUFyZWE6IHtcbiAgICAgICRzZWFyY2hMaXN0UmVzdWx0czogJy5yb3ctZmx1aWQucHJvZHVjdC1jYXQucHJvZHVjdC1mYXEucHJvZHVjdC1mYXEtcmVzdWx0cy5zZWFyY2gtbGlzdCcsXG4gICAgICAkdG90YWxSZXN1bHRzOiAnLnJvdy1mbHVpZC5ibG9jLmJsb2Mtc2VvIC50b3RhbC1yZXN1bHRzJyxcbiAgICAgICR1cGRhdGVSZXN1bHRzVGFyZ2V0OiAnI2ZpbHRyZWRUb3RhbFJlc3VsdHMnLFxuICAgICAgJHVwZGF0ZUJyZWFkQ3J1bWI6ICcuZmlsdHJlZGJ5LS1icmVhZGNydW1iJ1xuXG4gICAgfSxcbiAgICBzY3JvbGxPcHRpb25zOiB7XG4gICAgICBhdXRvaGlkZW1vZGU6ICdoaWRkZW4nLFxuICAgICAgaWZyYW1lYXV0b3Jlc2l6ZTogdHJ1ZSxcbiAgICAgIGN1cnNvcm9wYWNpdHltaW46IDBcbiAgICB9XG5cbiAgfSxcbiAgc3RhdGU6IHtcbiAgICBsYXN0UmVxdWVzdDogbnVsbFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb3BlbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy4kbWFpbkJ0bi50ZXh0KHRoaXMuJG1haW5CdG4uZGF0YSgndGV4dC1vcGVuZWQnKSlcbiAgICAgICAgdGhpcy4kbWFpbkNvbnRhaW5lci5hZGRDbGFzcygnaW4nKVxuICAgICAgICB0aGlzLiRCb2R5LmFkZENsYXNzKCduby1vdmVyZmxvdycpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRtYWluQnRuLnRleHQodGhpcy4kbWFpbkJ0bi5kYXRhKCd0ZXh0LWNsb3NlZCcpKVxuICAgICAgICB0aGlzLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSxcbiAgICBjbG9zZSAoKSB7XG4gICAgICB3aW5kb3cuZW5hYmxlR2xvYmFsU2Nyb2xsKClcbiAgICAgIHRoaXMuJG1haW5Db250YWluZXIucmVtb3ZlQ2xhc3MoJ2luJylcbiAgICAgIHRoaXMuJEJvZHkucmVtb3ZlQ2xhc3MoJ25vLW92ZXJmbG93JylcbiAgICB9LFxuICAgIHVwZGF0ZVNjcnJvbGwgKCkge1xuICAgICAgaWYgKHRoaXMuJFdpbmRvdy53aWR0aCgpIDw9IHRoaXMub3B0aW9ucy5tYXhXaWR0aCkge1xuICAgICAgICAkKCcjc2VhcmNoLWxpc3QtcGFnZS0tZmlsdGVycy1jb250YWluZXInKS5zY3JvbGxUb3AoMClcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlYm91bmNlOiBmdW5jdGlvbiAoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgICB2YXIgdGltZW91dFxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzXG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzXG4gICAgICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbFxuICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXRcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KVxuICAgICAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXBkYXRlU2Nycm9sbCgpe1xuICAgIC8vICAgICBpZiAodGhpcy4kV2luZG93LndpZHRoKCkgPD0gdGhpcy5vcHRpb25zLm1heFdpZHRoKSB7XG4gICAgLy8gICAgICAgICBsZXQgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJChcIiNzZWFyY2gtbGlzdC1wYWdlLS1maWx0ZXJzLWJ0blwiKS5vdXRlckhlaWdodCgpO1xuICAgIC8vICAgICAgICAgaWYoJChcIiNzZWFyY2gtbGlzdC1wYWdlLS1maWx0ZXJzLWNvbnRhaW5lclwiKS5sZW5ndGgpe1xuICAgIC8vICAgICAgICAgICAgICQoXCIjc2VhcmNoLWxpc3QtcGFnZS0tZmlsdGVycy1jb250YWluZXJcIikuY3NzKCdoZWlnaHQnLCB3aW5kb3dIZWlnaHQpXG4gICAgLy8gICAgICAgICAgICAgJChcIiNzZWFyY2gtbGlzdC1wYWdlLS1maWx0ZXJzLWNvbnRhaW5lclwiKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKClcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH0sXG4gICAgaXNPcGVuICgpIHtcbiAgICAgIHdpbmRvdy5kaXNhYmxlR2xvYmFsU2Nyb2xsKClcbiAgICAgIHJldHVybiB0aGlzLiRtYWluQ29udGFpbmVyLmlzKCcuaW4nKVxuICAgIH0sXG4gICAgZmlsdGVyIChldmVudCkge1xuICAgICAgaWYgKHRoaXMuJFdpbmRvdy53aWR0aCgpIDw9IHRoaXMub3B0aW9ucy5tYXhXaWR0aCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmlsdGVyJywgZXZlbnQpXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgJC5nZXQoJz8nICsgJChldmVudC50YXJnZXQpLnNlcmlhbGl6ZSgpKVxuICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxhc3RSZXF1ZXN0ID0gJChldmVudC50YXJnZXQpLnNlcmlhbGl6ZSgpXG4gICAgICAgICAgICAvLyB1cGRhdGUgZmlsdGVyc1xuICAgICAgICAgICAgdGhpcy4kZmlsdGVyQ29udGFpbmVyLmh0bWwoJChkYXRhKS5maW5kKHRoaXMub3B0aW9ucy4kZmlsdGVyQ29udGFpbmVyKS5odG1sKCkpXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJDb250YWluZXIuZmluZCgnLmZhY2V0VmFsdWVzIGZvcm0nKS5zdWJtaXQoKGV2ZW50KSA9PiB0aGlzLmZpbHRlcihldmVudCkpXG4gICAgICAgICAgICB2YXIgY2hlY2tlZEZpbHRlcnMgPSAkKCcjbW9ieWxldHRlIGlucHV0OmNoZWNrYm94OmNoZWNrZWQnKS5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5kYXRhKCdmYWNldC1jb2RlJylcbiAgICAgICAgICAgIH0pLmdldCgpXG4gICAgICAgICAgICB2YXIgYWN0aXZlQnJlYWRjcnVtYnMgPSAkKCcuY3J1bWJzIC5jcnVtYiBhW2RhdGEtZmFjZXQtY29kZV0nKS5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5kYXRhKCdmYWNldC1jb2RlJylcbiAgICAgICAgICAgIH0pLmdldCgpXG4gICAgICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IGFjdGl2ZUJyZWFkY3J1bWJzLmZpbHRlcih4ID0+ICFjaGVja2VkRmlsdGVycy5pbmNsdWRlcyh4KSlcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICBkaWZmZXJlbmNlLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnRUb0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICQoXCIuY3J1bWJzIC5jcnVtYiBhW2RhdGEtZmFjZXQtY29kZT0nXCIgKyBlbGVtZW50VG9EZWxldGUgKyBcIiddXCIpLnBhcmVudCgpLnJlbW92ZSgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB1cGRhdGVkQnV0biA9ICQoZGF0YSkuZmluZCh0aGlzLm9wdGlvbnMuJG1haW5CdG4pLmRhdGEoJ3RleHQtb3BlbmVkJylcbiAgICAgICAgICAgIHRoaXMuJG1haW5CdG5cbiAgICAgICAgICAgICAgLmh0bWwodXBkYXRlZEJ1dG4pXG4gICAgICAgICAgICB0aGlzLiRtYWluQnRuLmRhdGEoJ3RleHQtb3BlbmVkJywgdXBkYXRlZEJ1dG4pXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcnJvbGwoKVxuICAgICAgICAgIH0pXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlUGFnZUNvbnRlbnQgKGRhdGEpIHtcbiAgICAgIC8vIHVwZGF0ZSBwYWdlIGNvbnRlbnRcbiAgICAgIGZvciAobGV0IHNlbGVjdG9yIGluIHRoaXMub3B0aW9ucy51cGRhdGFibGVBcmVhKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnVwZGF0YWJsZUFyZWFbc2VsZWN0b3JdKVxuICAgICAgICAgIC5odG1sKCQoZGF0YSkuZmluZCh0aGlzLm9wdGlvbnMudXBkYXRhYmxlQXJlYVtzZWxlY3Rvcl0pLmh0bWwoKSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbG9hZCAoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmxhc3RSZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IGhpc3RvcnlFbnRyeSA9IHtcbiAgICAgICAgICB0eXBlOiAnc2VhcmNoLWxpc3QtcGFnZS1oaXN0b3J5LWVudHJ5JyxcbiAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArICc/JyArIHRoaXMubGFzdFJlcXVlc3RcbiAgICAgICAgfVxuICAgICAgICAkLmdldCgnPycgKyB0aGlzLmxhc3RSZXF1ZXN0KVxuICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyB1cGRhdGUgcGFnZSBjb250ZW50XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUNvbnRlbnQoZGF0YSlcblxuICAgICAgICAgICAgICAvLyBNYW5pcHVsYXRlIGhpc3RvcnlcbiAgICAgICAgICAgICAgaGlzdG9yeUVudHJ5LmRhdGEgPSBkYXRhXG4gICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKGhpc3RvcnlFbnRyeSwgaGlzdG9yeUVudHJ5LnRpdGxlLCBoaXN0b3J5RW50cnkudXJsKVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaGlzdG9yeUVudHJ5LnVybFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICB0aGlzLmNsb3NlKClcbiAgICB9LFxuICAgIHBvcFN0YXRlIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnN0YXRlICYmIGV2ZW50LnN0YXRlLnR5cGUgPT09ICdzZWFyY2gtbGlzdC1wYWdlLWhpc3RvcnktZW50cnknKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnZUNvbnRlbnQoZXZlbnQuc3RhdGUuZGF0YSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGluc3RhbGwgKEdTRUIsIG9wdGlvbnMpIHtcbiAgICAvLyBkbyBzb21ldGhpbmcgLi4uXG4gICAgY29uc29sZS5sb2coJ21vYnlsZXR0ZSBtb2R1bGUgbG9hZGluZyAuLi4nKVxuICAgIHRoaXMuJGNsb3NlQnRuLm9uKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5jbG9zZShldmVudCkpXG4gICAgdGhpcy4kbWFpbkJ0bi5vbignY2xpY2snLCAoZXZlbnQpID0+IHRoaXMub3BlbihldmVudCkpXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNzZWFyY2gtbGlzdC1wYWdlLS1maWx0ZXJzIC5zaG93LWFsbCBhJywgKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLiRXaW5kb3cud2lkdGgoKSA8PSB0aGlzLm9wdGlvbnMubWF4V2lkdGgpIHtcbiAgICAgICAgdGhpcy4kbWFpbkJ0bi5jbGljaygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9KVxuICAgIHZhciBpbml0aWF0ZU1vYnlsZXR0ZVNjcm9sbCA9IG5ldyBQZXJmZWN0U2Nyb2xsYmFyKCcjc2VhcmNoLWxpc3QtcGFnZS0tZmlsdGVycy1jb250YWluZXInKS8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB0aGlzLiRmaWx0ZXJDb250YWluZXIuZmluZCgnLmZhY2V0VmFsdWVzIGZvcm0nKS5zdWJtaXQoKGV2ZW50KSA9PiB0aGlzLmZpbHRlcihldmVudCkpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKGV2ZW50KSA9PiB0aGlzLnBvcFN0YXRlKGV2ZW50KSwgZmFsc2UpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9ieWxldHRlXG4iLCJpbXBvcnQgeyBHU0VCIH0gZnJvbSAnQGdzZWIvY29yZSdcbmltcG9ydCBPYnNlcnZhYmxlLCB7ICRvYnNlcnZhYmxlcyB9IGZyb20gJ0Bnc2ViL2hlbHBlcnMvb2JzZXJ2YWJsZSdcbmltcG9ydCB7IE1vYnlsZXR0ZSBhcyB0ZWZhbERlc2t0b3BNb2J5bGV0dGUgfSBmcm9tICdAZ3NlYi9tb2R1bGVzL21vYnlsZXR0ZSdcbmltcG9ydCB7IE15TW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2V4ZW1wbGUtbW9kdWxlJ1xuXG5jb25zb2xlLmxvZygnbWFpbi5qcycpXG5cbiRvYnNlcnZhYmxlcy5tYWluT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKClcblxuY29uc3QgTWFpbk1vZHVsZSA9IHtcbiAgaW1wb3J0czogW1xuICAgIE15TW9kdWxlLFxuICAgIHRlZmFsRGVza3RvcE1vYnlsZXR0ZVxuICBdXG59XG5cbi8vIGxvYWQgYSBzaW5nbGUgbW9kdWxlXG4vLyBHU0VCLnVzZShNeU1vZHVsZSlcblxuLy8gbG9hZCBtYWluIG1vZHVsZXNcbkdTRUIuYm9vdHN0cmFwcGluZyhNYWluTW9kdWxlKVxuIiwiLy8gdXNlIGV4dGVybmFsIG1vZHVsZXNcbi8qXG5pbXBvcnQgbW9kdWxlIGZyb20gJy4uL21vZHVsZS1uYW1lJ1xuaW1wb3J0IG1vZHVsZTIgZnJvbSAnLi4vbW9kdWxlMi1uYW1lJ1xuaW1wb3J0IHNoYXJlZE1vZHVsZSBmcm9tICdAc2hhcmVkLW1vZHVsZSdcbiAqL1xuXG4vLyB1c2UgcHJpdmF0ZSBkZXBlbmRlbmNpZXNcbi8qXG5pbXBvcnQgb3B0aW9uc0ZhY3RvcnkgZnJvbSAnLi9vcHRpb25zJ1xuICovXG5cbi8vIGV4cG9ydHNcblxuZXhwb3J0IGNvbnN0IE15TW9kdWxlID0ge1xuICBuYW1lOiAnTXlNb2R1bGUnLFxuICBzdGF0ZToge1xuICAgIHRpdGxlOiAndGVzdCAxJ1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2V0VGl0bGUgKHZhbHVlKSB7XG4gICAgICB3aW5kb3cuX2NvbnNvbGUubG9nKHRoaXMudGl0bGUpXG4gICAgICB0aGlzLnRpdGxlID0gdmFsdWVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9LFxuICBpbnN0YWxsIChHU0VCLCBvcHRpb25zKSB7IC8qXG4gICAgLy8gZG8gc29tZXRoaW5nIC4uLlxuXG4gICAgY29uc29sZS5sb2coJ21vZHVsZSBsb2FkaW5nIC4uLicpXG4gICAgR1NFQi5jb25zdGFudHMubXljb25zdGFudCA9ICdleG1wbGUnXG4gICAgJCgnI3NvbWV0aGluZycpLmRvV2hhdFlvdU5lZWQyRG8oKVxuICAgIEdTRUIudXNlKHNoYXJlZE1vZHVsZSwgb3B0aW9uc0ZhY3RvcnkubWFrZShvcHRpb25zKSkgKi9cbiAgICBjb25zb2xlLmxvZygnbW9kdWxlIGxvYWRpbmcgLi4uJylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNeU1vZHVsZVxuIl0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpY205M2MyVnlMWEJoWTJzdlgzQnlaV3gxWkdVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlltRmlaV3d0Y25WdWRHbHRaUzlqYjNKbExXcHpMMjlpYW1WamRDOWtaV1pwYm1VdGNISnZjR1Z5ZEhrdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlltRmlaV3d0Y25WdWRHbHRaUzlqYjNKbExXcHpMMjlpYW1WamRDOXJaWGx6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJKaFltVnNMWEoxYm5ScGJXVXZhR1ZzY0dWeWN5OWpiR0Z6YzBOaGJHeERhR1ZqYXk1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5aVlXSmxiQzF5ZFc1MGFXMWxMMmhsYkhCbGNuTXZZM0psWVhSbFEyeGhjM011YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMlp1TDI5aWFtVmpkQzlrWldacGJtVXRjSEp2Y0dWeWRIa3Vhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyWnVMMjlpYW1WamRDOXJaWGx6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTloTFdaMWJtTjBhVzl1TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTloYmkxdlltcGxZM1F1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMkZ5Y21GNUxXbHVZMngxWkdWekxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5amIyWXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyTnZjbVV1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMk4wZUM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWkdWbWFXNWxaQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZaR1Z6WTNKcGNIUnZjbk11YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMlJ2YlMxamNtVmhkR1V1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMlZ1ZFcwdFluVm5MV3RsZVhNdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJWNGNHOXlkQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZabUZwYkhNdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJkc2IySmhiQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZhR0Z6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlvYVdSbExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5cFpUZ3RaRzl0TFdSbFptbHVaUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZhVzlpYW1WamRDNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmFYTXRiMkpxWldOMExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5c2FXSnlZWEo1TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl2WW1wbFkzUXRaSEF1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMjlpYW1WamRDMXJaWGx6TFdsdWRHVnlibUZzTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl2WW1wbFkzUXRhMlY1Y3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYjJKcVpXTjBMWE5oY0M1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmY0hKdmNHVnlkSGt0WkdWell5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmMyaGhjbVZrTFd0bGVTNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmMyaGhjbVZrTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTkwYnkxaFluTnZiSFYwWlMxcGJtUmxlQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZkRzh0YVc1MFpXZGxjaTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZkRzh0YVc5aWFtVmpkQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZkRzh0YkdWdVozUm9MbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOTBieTF2WW1wbFkzUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzUnZMWEJ5YVcxcGRHbDJaUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZkV2xrTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMlZ6Tmk1dlltcGxZM1F1WkdWbWFXNWxMWEJ5YjNCbGNuUjVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwyVnpOaTV2WW1wbFkzUXVhMlY1Y3k1cWN5SXNJaTR1TDNkbFlpOTNaV0p5YjI5MEwxOTFhUzl5WlhOd2IyNXphWFpsTDJOdmJXMXZiaTlxY3k5aVlXSmxiR2xtZVM5amIzSmxMMmx1WkdWNExtcHpJaXdpTGk0dmQyVmlMM2RsWW5KdmIzUXZYM1ZwTDNKbGMzQnZibk5wZG1VdlkyOXRiVzl1TDJwekwySmhZbVZzYVdaNUwyTnZjbVV2Ykc5bloyVnlMbXB6SWl3aUxpNHZkMlZpTDNkbFluSnZiM1F2WDNWcEwzSmxjM0J2Ym5OcGRtVXZZMjl0Ylc5dUwycHpMMkpoWW1Wc2FXWjVMMk52Y21VdmJXOWtkV3hsTG1weklpd2lMaTR2ZDJWaUwzZGxZbkp2YjNRdlgzVnBMM0psYzNCdmJuTnBkbVV2WTI5dGJXOXVMMnB6TDJKaFltVnNhV1o1TDJobGJIQmxjbk12YjJKelpYSjJZV0pzWlM1cWN5SXNJaTR1TDNkbFlpOTNaV0p5YjI5MEwxOTFhUzl5WlhOd2IyNXphWFpsTDJOdmJXMXZiaTlxY3k5aVlXSmxiR2xtZVM5dGIyUjFiR1Z6TDIxdllubHNaWFIwWlM5cGJtUmxlQzVxY3lJc0lpNHVMeTR1THk0dUwzUmxabUZzTDNSbFptRnNjM1J2Y21WbWNtOXVkQzkzWldJdmQyVmljbTl2ZEM5ZmRXa3ZaR1Z6YTNSdmNDOWpiMjF0YjI0dmFuTXZZbUZpWld4cFpua3ZZWEJ3TG0xaGFXNHVhbk1pTENJdUxpOHVMaTh1TGk5MFpXWmhiQzkwWldaaGJITjBiM0psWm5KdmJuUXZkMlZpTDNkbFluSnZiM1F2WDNWcEwyUmxjMnQwYjNBdlkyOXRiVzl1TDJwekwySmhZbVZzYVdaNUwyMXZaSFZzWlhNdlpYaGxiWEJzWlMxdGIyUjFiR1V2YVc1a1pYZ3Vhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN1FVTkJRVHM3UVVOQlFUczdRVU5CUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUXpGQ1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRURUU3UVVGRFFUdEJRVU5CT3p0QlEwWkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFNrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMHhCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOMlFrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMHhCTzBGQlEwRTdRVUZEUVRzN1FVTkdRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRGNFSkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5NUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMHBCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFVFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOS1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRE9VUkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVUVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVGtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5LUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFNFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFRrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRTRUU3UVVGRFFUczdRVU5FUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEyaENRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRha0pCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFVFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTldRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRVa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTB4Qk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExcEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVUVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVGtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVGtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVGtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEweEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMXBCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOTVFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTklRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN096czdPMEZEVkVFN096czdRVUZEUVRzN096czdPMEZCUlU4c1NVRkJUU3h6UWtGQlR5eEZRVUZGTEUxQlFVWXNRMEZCVXl4UFFVRlBMRWxCUVdoQ0xFVkJRWFZDTEZsQlFVMDdRVUZETDBNc1UwRkJUenRCUVVOTUxHRkJRVk1zUlVGRVNqdEJRVVZNTEU5QlJrc3NaVUZGUVN4TlFVWkJMRVZCUlZFc1QwRkdVaXhGUVVWcFFqdEJRVU53UWl4VlFVRkpMRXRCUVVzc1QwRkJUQ3hEUVVGaExGTkJRV0lzUTBGQmRVSXNWVUZCUXl4SFFVRkVPMEZCUVVFc1pVRkJVeXhKUVVGSkxFbEJRVW9zUzBGQllTeFBRVUZQTEVsQlFUZENPMEZCUVVFc1QwRkJka0lzU1VGQk5FUXNRMEZCYUVVc1JVRkJiVVU3UVVGRGFrVXNZVUZCU3l4UFFVRk1MRU5CUVdFc1NVRkJZaXhEUVVGclFpeEpRVUZKTEdkQ1FVRktMRU5CUVZjc1RVRkJXQ3hGUVVGdFFpeFBRVUZ1UWl4RFFVRnNRanRCUVVORU8wRkJRMFlzUzBGT1NUdEJRVTlNTEdsQ1FWQkxMSGxDUVU5VkxFOUJVRllzUlVGUGJVSTdRVUZCUVRzN1FVRkRkRUlzWTBGQlVTeEhRVUZTTEVOQlFWa3NNa0pCUVZvc1JVRkJlVU1zVDBGQmVrTTdRVUZEUVN4alFVRlJMRTlCUVZJc1EwRkJaMElzVDBGQmFFSXNRMEZCZDBJc1ZVRkJReXhOUVVGRUxFVkJRVms3UVVGRGJFTXNXVUZCU1N4TlFVRk5MRTlCUVU0c1EwRkJZeXhOUVVGa0xFTkJRVW9zUlVGQk1rSTdRVUZEZWtJc1owSkJRVXNzUjBGQlRDeERRVUZUTEU5QlFVOHNRMEZCVUN4RFFVRlVMRVZCUVc5Q0xFOUJRVThzUTBGQlVDeERRVUZ3UWp0QlFVTkVMRk5CUmtRc1RVRkZUenRCUVVOTUxHZENRVUZMTEVkQlFVd3NRMEZCVXl4TlFVRlVPMEZCUTBRN1FVRkRSaXhQUVU1RU8wRkJUMFE3UVVGb1Fra3NSMEZCVUR0QlFXdENSQ3hEUVc1Q2VVTXNSVUZCZEVJc1EwRkJZanM3UVVGeFFrRXNTVUZCVFN3MFFrRkJWU3huUWtGQmFFSTdPenM3T3pzN08ydENRM1pDVVN4UFFVRlBMRTlCUVZBc1IwRkJhVUlzUlVGQlJTeE5RVUZHTEVOQlFWTXNSVUZCVkN4RlFVRmhMRTlCUVU4c1QwRkJjRUlzUlVGQk9FSXNWVUZCUXl4UlFVRkVMRVZCUVdNN1FVRkRNVVVzVTBGQlR5eFJRVUZRTEVkQlFXdENMRkZCUVd4Q08wRkJRMEVzVTBGQlR6dEJRVU5NTEU5QlJFc3NhVUpCUTFNN1FVRkRXaXhWUVVGSkxFTkJRVU1zUzBGQlN5eExRVUZXTEVWQlFXbENPenRCUVVSTUxIZERRVUZPTEVsQlFVMDdRVUZCVGl4WlFVRk5PMEZCUVVFN08wRkJSVm9zWlVGQlV5eEhRVUZVTEVOQlFXRXNTMEZCWWl4RFFVRnRRaXhSUVVGdVFpeEZRVUUyUWl4SlFVRTNRanRCUVVORUxFdEJTa2s3UVVGTFRDeFJRVXhMTEd0Q1FVdFZPMEZCUTJJc1ZVRkJTU3hEUVVGRExFdEJRVXNzUzBGQlZpeEZRVUZwUWpzN1FVRkVTaXg1UTBGQlRpeEpRVUZOTzBGQlFVNHNXVUZCVFR0QlFVRkJPenRCUVVWaUxHVkJRVk1zU1VGQlZDeERRVUZqTEV0QlFXUXNRMEZCYjBJc1VVRkJjRUlzUlVGQk9FSXNTVUZCT1VJN1FVRkRSQ3hMUVZKSk8wRkJVMHdzVVVGVVN5eHJRa0ZUVlR0QlFVTmlMRlZCUVVrc1EwRkJReXhMUVVGTExFdEJRVllzUlVGQmFVSTdPMEZCUkVvc2VVTkJRVTRzU1VGQlRUdEJRVUZPTEZsQlFVMDdRVUZCUVRzN1FVRkZZaXhsUVVGVExFbEJRVlFzUTBGQll5eExRVUZrTEVOQlFXOUNMRkZCUVhCQ0xFVkJRVGhDTEVsQlFUbENPMEZCUTBRc1MwRmFTVHRCUVdGTUxGTkJZa3NzYlVKQllWYzdRVUZEWkN4VlFVRkpMRU5CUVVNc1MwRkJTeXhMUVVGV0xFVkJRV2xDT3p0QlFVUklMSGxEUVVGT0xFbEJRVTA3UVVGQlRpeFpRVUZOTzBGQlFVRTdPMEZCUldRc1pVRkJVeXhMUVVGVUxFTkJRV1VzUzBGQlppeERRVUZ4UWl4UlFVRnlRaXhGUVVFclFpeEpRVUV2UWp0QlFVTkVMRXRCYUVKSk8wRkJhVUpNTEZOQmFrSkxMRzFDUVdsQ1Z6dEJRVU5rTEZWQlFVa3NRMEZCUXl4TFFVRkxMRXRCUVZZc1JVRkJhVUk3TzBGQlJFZ3NlVU5CUVU0c1NVRkJUVHRCUVVGT0xGbEJRVTA3UVVGQlFUczdRVUZGWkN4bFFVRlRMRXRCUVZRc1EwRkJaU3hMUVVGbUxFTkJRWEZDTEZGQlFYSkNMRVZCUVN0Q0xFbEJRUzlDTzBGQlEwUTdRVUZ3UWtrc1IwRkJVRHRCUVhOQ1JDeERRWGhDTkVRc1EwRjNRakZFTEU5QlFVOHNUMEY0UW0xRUxFTkJRVGRDTEVNN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0SlEwRllMRTA3UVVGRGJrSXNhMEpCUVdFc1RVRkJZaXhGUVVGeFFpeFBRVUZ5UWl4RlFVRTRRanRCUVVGQk96dEJRVU0xUWl4VFFVRkxMRWxCUVV3c1IwRkJXU3hOUVVGYU96dEJRVVZCTzBGQlEwRXNVVUZCVFN4WFFVRlhMRVZCUVVVc1EwRkJReXhQUVVGUExFOUJRVkFzUjBGQmFVSXNUMEZCVHl4UFFVRlFMRU5CUVdVc1JVRkJhRU1zUjBGQmNVTXNVMEZCZEVNc1MwRkJiMFFzVDBGQlR5eEZRVUV6UkN4SlFVRnBSU3hSUVVGdVJTeERRVUZxUWp0QlFVTkJMRmRCUVU4c1kwRkJVQ3hEUVVGelFpeEpRVUYwUWl4RlFVRTBRaXhWUVVFMVFpeEZRVUYzUXp0QlFVTjBRenRCUVVOQkxGTkJSbk5ETEdsQ1FVVXZRanRCUVVOTUxHVkJRVThzVVVGQlVEdEJRVU5FTzBGQlNuRkRMRXRCUVhoRE96dEJRVTlCTzBGQlEwRXNUVUZCUlN4TlFVRkdMRU5CUVZNc1NVRkJWQ3hGUVVGbExFOUJRVThzVDBGQlVDeEpRVUZyUWl4RlFVRnFReXhGUVVGelF5eFpRVUZOTzBGQlF6RkRMR0ZCUVU4c1QwRkJUeXhQUVVGa08wRkJRMEVzWVVGQlR5eE5RVUZRTzBGQlEwUXNTMEZJYjBNc1JVRkJja003TzBGQlMwRTdRVUZEUVN4M1FrRkJXU3hQUVVGUExFdEJRVkFzU1VGQlowSXNSVUZCTlVJc1JVRkJaME1zVDBGQmFFTXNRMEZCZDBNc1ZVRkJWU3hKUVVGV0xFVkJRV2RDTzBGQlEzUkVMRzlEUVVGelFpeEpRVUYwUWl4RlFVRTBRaXhKUVVFMVFpeEZRVUZyUXp0QlFVTm9RenRCUVVOQkxGZEJSbWRETEdsQ1FVVjZRanRCUVVOTUxHbENRVUZQTEU5QlFVOHNTMEZCVUN4RFFVRmhMRWxCUVdJc1EwRkJVRHRCUVVORUxGTkJTaXRDT3p0QlFVdG9RenRCUVVOQkxGZEJUbWRETEdWQlRUTkNMRXRCVGpKQ0xFVkJUWEJDTzBGQlExWXNhVUpCUVU4c1MwRkJVQ3hEUVVGaExFbEJRV0lzU1VGQmNVSXNTMEZCY2tJN1FVRkRSRHRCUVZJclFpeFBRVUZzUXp0QlFWVkVMRXRCV0VRc1JVRlhSeXhKUVZoSU96dEJRV0ZCTzBGQlEwRXNkMEpCUVZrc1QwRkJUeXhQUVVGUUxFbEJRV3RDTEVWQlFUbENMRVZCUVd0RExFOUJRV3hETEVOQlFUQkRMRlZCUVZVc1NVRkJWaXhGUVVGblFqdEJRVUZCT3p0QlFVTjRSQ3hWUVVGSkxFdEJRVXNzVlVGQlRDeERRVUZuUWl4SFFVRm9RaXhEUVVGS0xFVkJRVEJDTzBGQlEzaENMRmxCUVUwc1VVRkJVeXhWUVVGRExGRkJRVVE3UVVGQlFTeHBRa0ZCWXl4TFFVRkxMRXRCUVV3c1EwRkJWeXhWUVVGWUxFbEJRWGxDTEVWQlFVVXNVVUZCUml4RFFVRjZRaXhIUVVGMVF5eE5RVUZMTEZGQlFVd3NRMEZCWXl4SlFVRmtMRU5CUVcxQ0xGRkJRVzVDTEVOQlFYSkVPMEZCUVVFc1UwRkJSQ3hEUVVGdlJpeFBRVUZQTEU5QlFWQXNRMEZCWlN4SlFVRm1MRU5CUVhCR0xFTkJRV1E3UVVGRFFTeHpRMEZCYzBJc1NVRkJkRUlzUlVGQk5FSXNTVUZCTlVJc1JVRkJhME03UVVGRGFFTTdRVUZEUVN4aFFVWm5ReXhwUWtGRmVrSTdRVUZEVEN4dFFrRkJUeXhMUVVGUU8wRkJRMFE3UVVGS0swSXNVMEZCYkVNN1FVRk5SRHRCUVVOR0xFdEJWa1FzUlVGVlJ5eEpRVlpJT3p0QlFWbEJPMEZCUTBFc1VVRkJTU3hMUVVGTExGRkJRVXdzUTBGQll5eE5RVUZzUWl4RlFVRXdRanRCUVVGRkxGZEJRVXNzVDBGQlRDeERRVUZoTEVsQlFXSXNSVUZCYlVJc1QwRkJia0k3UVVGQk5rSTdPMEZCUlhwRUxGZEJRVThzU1VGQlVEdEJRVU5FT3pzN096UkNRVVZSTEVrc1JVRkJUU3hQTEVWQlFWTTdRVUZEZEVJc1kwRkJVU3hIUVVGU0xFTkJRVmtzUzBGQlN5eEpRVUZxUWl4RlFVRjFRaXh2UWtGQmRrSTdRVUZEUkRzN096czdhMEpCZEVSclFpeE5PenM3T3pzN096czdPenM3T3pzN096czdPenRCUTBGeVFqczdPenM3TzBsQlRYRkNMRlU3UVVGRGJrSXNkMEpCUVdVN1FVRkJRVHM3UVVGRFlpeE5RVUZGTEUxQlFVWXNRMEZCVXl4SlFVRlVMRVZCUVdVc1JVRkJSU3hSUVVGR0xFVkJRV1k3UVVGRFJEczdPenQ1UWtGRlN5eExMRVZCUVU4N1FVRkRXQ3hWUVVGSkxFdEJRVXNzU1VGQlRDeEpRVUZoTEV0QlFVc3NUMEZCZEVJc1JVRkJLMEk3UVVGRE4wSXNZVUZCU3l4SlFVRk1MRWRCUVdFc1ZVRkJWU3hOUVVGMlFqdEJRVU5CTEdGQlFVc3NUMEZCVEN4SFFVRmxMRXRCUVVzc1QwRkJUQ3hKUVVGcFFpeFZRVUZWTEZWQlFURkRPMEZCUTBFc1pVRkJUeXhKUVVGUU8wRkJRMFE3UVVGRFJDeFZRVUZKTEZWQlFWVXNUVUZCVml4SlFVRnZRaXhWUVVGVkxGTkJRV3hETEVWQlFUWkRPMEZCUXpORExHRkJRVXNzVlVGQlZTeE5RVUZXTEVsQlFXOUNMRlZCUVZVc1UwRkJPVUlzUjBGQk1FTXNTMEZCTVVNc1IwRkJhMFFzVlVGQmRrUXNTVUZCY1VVc1NVRkJja1U3UVVGRFFTeGxRVUZQTEVsQlFWQTdRVUZEUkR0QlFVTkVMR0ZCUVU4c1MwRkJTeXhOUVVGTUxFTkJRVmtzUzBGQldpeERRVUZRTzBGQlEwUTdPenM0UWtGRlZTeFJMRVZCUVZVN1FVRkRia0lzWVVGQlR5eExRVUZMTEZGQlFVd3NRMEZCWXl4VlFVRlZMRXRCUVZZc1JVRkJhVUk3UVVGRGNFTXNhVUpCUVZNc1NVRkJWQ3hEUVVGakxFbEJRV1FzUlVGQmIwSXNTMEZCY0VJN1FVRkRSQ3hQUVVaTkxFTkJRVkE3UVVGSFJEczdPenM3YTBKQmRFSnJRaXhWT3pzN1FVRjVRbkpDTEU5QlFVOHNXVUZCVUN4SFFVRnpRaXhOUVVGTkxFOUJRVThzV1VGQmJrTTdRVUZEUVN4UFFVRlBMRlZCUVZBc1IwRkJiMElzVlVGQmNFSTdPMEZCUlU4c1NVRkJUU3h6UTBGQlpTeFBRVUZQTEZsQlFUVkNPenM3T3pzN096dEJRMjVEVURzN096dEJRVWxCT3p0QlFVVlBMRWxCUVUwc1owTkJRVms3UVVGRGRrSXNVVUZCVFN4WFFVUnBRanRCUVVWMlFpeE5RVUZKTEZsQlJtMUNPMEZCUjNaQ0xGZEJRVk03UVVGRFVEdEJRVU5CTEc5Q1FVRm5RaXh6UTBGR1ZEdEJRVWRRTEhOQ1FVRnJRaXcwUWtGSVdEdEJRVWxRTEdWQlFWY3NNa05CU2tvN1FVRkxVQ3hqUVVGVkxIVkRRVXhJTzBGQlRWQXNkVUpCUVcxQ0xIZENRVTVhTzBGQlQxQTdRVUZEUVN4aFFVRlRMRTFCVWtZN1FVRlRVQ3hYUVVGUExFMUJWRUU3UVVGVlVEdEJRVU5CTEdOQlFWVXNSMEZZU0R0QlFWbFFMRzFDUVVGbE8wRkJRMklzTUVKQlFXOUNMRzlGUVVSUU8wRkJSV0lzY1VKQlFXVXNlVU5CUmtZN1FVRkhZaXcwUWtGQmMwSXNjMEpCU0ZRN1FVRkpZaXg1UWtGQmJVSTdPMEZCU2s0c1MwRmFVanRCUVcxQ1VDeHRRa0ZCWlR0QlFVTmlMRzlDUVVGakxGRkJSRVE3UVVGRllpeDNRa0ZCYTBJc1NVRkdURHRCUVVkaUxIZENRVUZyUWp0QlFVaE1PenRCUVc1Q1VpeEhRVWhqTzBGQk5rSjJRaXhUUVVGUE8wRkJRMHdzYVVKQlFXRTdRVUZFVWl4SFFUZENaMEk3UVVGblEzWkNMRmRCUVZNN1FVRkRVQ3hSUVVSUExHdENRVU5ETzBGQlEwNHNWVUZCU1N4RFFVRkRMRXRCUVVzc1RVRkJUQ3hGUVVGTUxFVkJRVzlDTzBGQlEyeENMR0ZCUVVzc1VVRkJUQ3hEUVVGakxFbEJRV1FzUTBGQmJVSXNTMEZCU3l4UlFVRk1MRU5CUVdNc1NVRkJaQ3hEUVVGdFFpeGhRVUZ1UWl4RFFVRnVRanRCUVVOQkxHRkJRVXNzWTBGQlRDeERRVUZ2UWl4UlFVRndRaXhEUVVFMlFpeEpRVUUzUWp0QlFVTkJMR0ZCUVVzc1MwRkJUQ3hEUVVGWExGRkJRVmdzUTBGQmIwSXNZVUZCY0VJN1FVRkRSQ3hQUVVwRUxFMUJTVTg3UVVGRFRDeGhRVUZMTEZGQlFVd3NRMEZCWXl4SlFVRmtMRU5CUVcxQ0xFdEJRVXNzVVVGQlRDeERRVUZqTEVsQlFXUXNRMEZCYlVJc1lVRkJia0lzUTBGQmJrSTdRVUZEUVN4aFFVRkxMRTFCUVV3N1FVRkRSRHRCUVVOR0xFdEJWazA3UVVGWFVDeFRRVmhQTEcxQ1FWZEZPMEZCUTFBc1lVRkJUeXhyUWtGQlVEdEJRVU5CTEZkQlFVc3NZMEZCVEN4RFFVRnZRaXhYUVVGd1FpeERRVUZuUXl4SlFVRm9RenRCUVVOQkxGZEJRVXNzUzBGQlRDeERRVUZYTEZkQlFWZ3NRMEZCZFVJc1lVRkJka0k3UVVGRFJDeExRV1pOTzBGQlowSlFMR2xDUVdoQ1R5d3lRa0ZuUWxVN1FVRkRaaXhWUVVGSkxFdEJRVXNzVDBGQlRDeERRVUZoTEV0QlFXSXNUVUZCZDBJc1MwRkJTeXhQUVVGTUxFTkJRV0VzVVVGQmVrTXNSVUZCYlVRN1FVRkRha1FzVlVGQlJTeHpRMEZCUml4RlFVRXdReXhUUVVFeFF5eERRVUZ2UkN4RFFVRndSRHRCUVVORU8wRkJRMFlzUzBGd1FrMDdPMEZCY1VKUUxHTkJRVlVzYTBKQlFWVXNTVUZCVml4RlFVRm5RaXhKUVVGb1FpeEZRVUZ6UWl4VFFVRjBRaXhGUVVGcFF6dEJRVU42UXl4VlFVRkpMRTlCUVVvN1FVRkRRU3hoUVVGUExGbEJRVms3UVVGRGFrSXNXVUZCU1N4VlFVRlZMRWxCUVdRN1FVRkRRU3haUVVGSkxFOUJRVThzVTBGQldEdEJRVU5CTEZsQlFVa3NVVUZCVVN4VFFVRlNMRXRCUVZFc1IwRkJXVHRCUVVOMFFpeHZRa0ZCVlN4SlFVRldPMEZCUTBFc1kwRkJTU3hEUVVGRExGTkJRVXdzUlVGQlowSXNTMEZCU3l4TFFVRk1MRU5CUVZjc1QwRkJXQ3hGUVVGdlFpeEpRVUZ3UWp0QlFVTnFRaXhUUVVoRU8wRkJTVUVzV1VGQlNTeFZRVUZWTEdGQlFXRXNRMEZCUXl4UFFVRTFRanRCUVVOQkxIRkNRVUZoTEU5QlFXSTdRVUZEUVN4clFrRkJWU3hYUVVGWExFdEJRVmdzUlVGQmEwSXNTVUZCYkVJc1EwRkJWanRCUVVOQkxGbEJRVWtzVDBGQlNpeEZRVUZoTEV0QlFVc3NTMEZCVEN4RFFVRlhMRTlCUVZnc1JVRkJiMElzU1VGQmNFSTdRVUZEWkN4UFFWaEVPMEZCV1VRc1MwRnVRMDA3UVVGdlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUUzUTA4c2IwSkJOa05ITzBGQlExSXNZVUZCVHl4dFFrRkJVRHRCUVVOQkxHRkJRVThzUzBGQlN5eGpRVUZNTEVOQlFXOUNMRVZCUVhCQ0xFTkJRWFZDTEV0QlFYWkNMRU5CUVZBN1FVRkRSQ3hMUVdoRVRUdEJRV2xFVUN4VlFXcEVUeXhyUWtGcFJFTXNTMEZxUkVRc1JVRnBSRkU3UVVGQlFUczdRVUZEWWl4VlFVRkpMRXRCUVVzc1QwRkJUQ3hEUVVGaExFdEJRV0lzVFVGQmQwSXNTMEZCU3l4UFFVRk1MRU5CUVdFc1VVRkJla01zUlVGQmJVUTdRVUZEYWtRc1owSkJRVkVzUjBGQlVpeERRVUZaTEZGQlFWb3NSVUZCYzBJc1MwRkJkRUk3UVVGRFFTeGpRVUZOTEdOQlFVNDdRVUZEUVN4alFVRk5MR1ZCUVU0N1FVRkRRU3hWUVVGRkxFZEJRVVlzUTBGQlRTeE5RVUZOTEVWQlFVVXNUVUZCVFN4TlFVRlNMRVZCUVdkQ0xGTkJRV2hDTEVWQlFWb3NSVUZEUnl4SlFVUklMRU5CUTFFc1ZVRkJReXhKUVVGRUxFVkJRVlU3UVVGRFpDeG5Ra0ZCU3l4WFFVRk1MRWRCUVcxQ0xFVkJRVVVzVFVGQlRTeE5RVUZTTEVWQlFXZENMRk5CUVdoQ0xFVkJRVzVDTzBGQlEwRTdRVUZEUVN4blFrRkJTeXhuUWtGQlRDeERRVUZ6UWl4SlFVRjBRaXhEUVVFeVFpeEZRVUZGTEVsQlFVWXNSVUZCVVN4SlFVRlNMRU5CUVdFc1RVRkJTeXhQUVVGTUxFTkJRV0VzWjBKQlFURkNMRVZCUVRSRExFbEJRVFZETEVWQlFUTkNPMEZCUTBFc1owSkJRVXNzWjBKQlFVd3NRMEZCYzBJc1NVRkJkRUlzUTBGQk1rSXNiVUpCUVROQ0xFVkJRV2RFTEUxQlFXaEVMRU5CUVhWRUxGVkJRVU1zUzBGQlJEdEJRVUZCTEcxQ1FVRlhMRTFCUVVzc1RVRkJUQ3hEUVVGWkxFdEJRVm9zUTBGQldEdEJRVUZCTEZkQlFYWkVPMEZCUTBFc1kwRkJTU3hwUWtGQmFVSXNSVUZCUlN4dFEwRkJSaXhGUVVGMVF5eEhRVUYyUXl4RFFVRXlReXhaUVVGWk8wRkJRekZGTEcxQ1FVRlBMRVZCUVVVc1NVRkJSaXhGUVVGUkxFbEJRVklzUTBGQllTeFpRVUZpTEVOQlFWQTdRVUZEUkN4WFFVWnZRaXhGUVVWc1FpeEhRVVpyUWl4RlFVRnlRanRCUVVkQkxHTkJRVWtzYjBKQlFXOUNMRVZCUVVVc2JVTkJRVVlzUlVGQmRVTXNSMEZCZGtNc1EwRkJNa01zV1VGQldUdEJRVU0zUlN4dFFrRkJUeXhGUVVGRkxFbEJRVVlzUlVGQlVTeEpRVUZTTEVOQlFXRXNXVUZCWWl4RFFVRlFPMEZCUTBRc1YwRkdkVUlzUlVGRmNrSXNSMEZHY1VJc1JVRkJlRUk3UVVGSFFTeGpRVUZKTEdGQlFXRXNhMEpCUVd0Q0xFMUJRV3hDTEVOQlFYbENPMEZCUVVFc2JVSkJRVXNzUTBGQlF5eGxRVUZsTEZGQlFXWXNRMEZCZDBJc1EwRkJlRUlzUTBGQlRqdEJRVUZCTEZkQlFYcENMRU5CUVdwQ08wRkJRMEVzWTBGQlNTeFhRVUZYTEUxQlFXWXNSVUZCZFVJN1FVRkRja0lzZFVKQlFWY3NUMEZCV0N4RFFVRnRRaXhWUVVGVkxHVkJRVllzUlVGQk1rSTdRVUZETlVNc1owSkJRVVVzZFVOQlFYVkRMR1ZCUVhaRExFZEJRWGxFTEVsQlFUTkVMRVZCUVdsRkxFMUJRV3BGTEVkQlFUQkZMRTFCUVRGRk8wRkJRMFFzWVVGR1JEdEJRVWRFT3p0QlFVVkVMR05CUVVrc1kwRkJZeXhGUVVGRkxFbEJRVVlzUlVGQlVTeEpRVUZTTEVOQlFXRXNUVUZCU3l4UFFVRk1MRU5CUVdFc1VVRkJNVUlzUlVGQmIwTXNTVUZCY0VNc1EwRkJlVU1zWVVGQmVrTXNRMEZCYkVJN1FVRkRRU3huUWtGQlN5eFJRVUZNTEVOQlEwY3NTVUZFU0N4RFFVTlJMRmRCUkZJN1FVRkZRU3huUWtGQlN5eFJRVUZNTEVOQlFXTXNTVUZCWkN4RFFVRnRRaXhoUVVGdVFpeEZRVUZyUXl4WFFVRnNRenRCUVVOQkxHZENRVUZMTEdGQlFVdzdRVUZEUkN4VFFYaENTRHRCUVhsQ1FTeGxRVUZQTEV0QlFWQTdRVUZEUkR0QlFVTkdMRXRCYWtaTk8wRkJhMFpRTEhGQ1FXeEdUeXcyUWtGclJsa3NTVUZzUmxvc1JVRnJSbXRDTzBGQlEzWkNPMEZCUTBFc1YwRkJTeXhKUVVGSkxGRkJRVlFzU1VGQmNVSXNTMEZCU3l4UFFVRk1MRU5CUVdFc1lVRkJiRU1zUlVGQmFVUTdRVUZETDBNc1ZVRkJSU3hMUVVGTExFOUJRVXdzUTBGQllTeGhRVUZpTEVOQlFUSkNMRkZCUVROQ0xFTkJRVVlzUlVGRFJ5eEpRVVJJTEVOQlExRXNSVUZCUlN4SlFVRkdMRVZCUVZFc1NVRkJVaXhEUVVGaExFdEJRVXNzVDBGQlRDeERRVUZoTEdGQlFXSXNRMEZCTWtJc1VVRkJNMElzUTBGQllpeEZRVUZ0UkN4SlFVRnVSQ3hGUVVSU08wRkJSVVE3UVVGRFJpeExRWGhHVFR0QlFYbEdVQ3hWUVhwR1R5eHJRa0Y1UmtNc1MwRjZSa1FzUlVGNVJsRTdRVUZCUVRzN1FVRkRZaXhWUVVGSkxFdEJRVXNzVjBGQlZDeEZRVUZ6UWp0QlFVTndRaXhaUVVGTkxHVkJRV1U3UVVGRGJrSXNaMEpCUVUwc1owTkJSR0U3UVVGRmJrSXNaMEpCUVUwc1NVRkdZVHRCUVVkdVFpeHBRa0ZCVHl4VFFVRlRMRXRCU0VjN1FVRkpia0lzWlVGQlN5eFBRVUZQTEZGQlFWQXNRMEZCWjBJc1VVRkJhRUlzUjBGQk1rSXNSMEZCTTBJc1IwRkJhVU1zUzBGQlN6dEJRVXA0UWl4VFFVRnlRanRCUVUxQkxGVkJRVVVzUjBGQlJpeERRVUZOTEUxQlFVMHNTMEZCU3l4WFFVRnFRaXhGUVVOSExFbEJSRWdzUTBGRFVTeFZRVUZETEVsQlFVUXNSVUZCVlR0QlFVTmtMR05CUVVrN1FVRkRSanRCUVVOQkxHMUNRVUZMTEdsQ1FVRk1MRU5CUVhWQ0xFbEJRWFpDT3p0QlFVVkJPMEZCUTBFc2VVSkJRV0VzU1VGQllpeEhRVUZ2UWl4SlFVRndRanRCUVVOQkxHOUNRVUZSTEZOQlFWSXNRMEZCYTBJc1dVRkJiRUlzUlVGQlowTXNZVUZCWVN4TFFVRTNReXhGUVVGdlJDeGhRVUZoTEVkQlFXcEZPMEZCUTBRc1YwRlFSQ3hEUVU5RkxFOUJRVThzUTBGQlVDeEZRVUZWTzBGQlExWXNiMEpCUVZFc1MwRkJVaXhEUVVGakxFTkJRV1E3UVVGRFFTeHRRa0ZCVHl4UlFVRlFMRU5CUVdkQ0xFbEJRV2hDTEVkQlFYVkNMR0ZCUVdFc1IwRkJjRU03UVVGRFJEdEJRVU5HTEZOQllrZzdRVUZqUkR0QlFVTkVMRmRCUVVzc1MwRkJURHRCUVVORUxFdEJha2hOTzBGQmEwaFFMRmxCYkVoUExHOUNRV3RJUnl4TFFXeElTQ3hGUVd0SVZUdEJRVU5tTEZWQlFVa3NUVUZCVFN4TFFVRk9MRWxCUVdVc1RVRkJUU3hMUVVGT0xFTkJRVmtzU1VGQldpeExRVUZ4UWl4blEwRkJlRU1zUlVGQk1FVTdRVUZEZUVVc1lVRkJTeXhwUWtGQlRDeERRVUYxUWl4TlFVRk5MRXRCUVU0c1EwRkJXU3hKUVVGdVF6dEJRVU5FTzBGQlEwWTdRVUYwU0Uwc1IwRm9RMk03UVVGM1NuWkNMRk5CZUVwMVFpeHRRa0YzU21Rc1NVRjRTbU1zUlVGM1NsSXNUMEY0U2xFc1JVRjNTa003UVVGQlFUczdRVUZEZEVJN1FVRkRRU3haUVVGUkxFZEJRVklzUTBGQldTdzRRa0ZCV2p0QlFVTkJMRk5CUVVzc1UwRkJUQ3hEUVVGbExFVkJRV1lzUTBGQmEwSXNUMEZCYkVJc1JVRkJNa0lzVlVGQlF5eExRVUZFTzBGQlFVRXNZVUZCVnl4UFFVRkxMRXRCUVV3c1EwRkJWeXhMUVVGWUxFTkJRVmc3UVVGQlFTeExRVUV6UWp0QlFVTkJMRk5CUVVzc1VVRkJUQ3hEUVVGakxFVkJRV1FzUTBGQmFVSXNUMEZCYWtJc1JVRkJNRUlzVlVGQlF5eExRVUZFTzBGQlFVRXNZVUZCVnl4UFFVRkxMRWxCUVV3c1EwRkJWU3hMUVVGV0xFTkJRVmc3UVVGQlFTeExRVUV4UWp0QlFVTkJMRTFCUVVVc1VVRkJSaXhGUVVGWkxFVkJRVm9zUTBGQlpTeFBRVUZtTEVWQlFYZENMSGREUVVGNFFpeEZRVUZyUlN4VlFVRkRMRU5CUVVRc1JVRkJUenRCUVVOMlJTeFZRVUZKTEU5QlFVc3NUMEZCVEN4RFFVRmhMRXRCUVdJc1RVRkJkMElzVDBGQlN5eFBRVUZNTEVOQlFXRXNVVUZCZWtNc1JVRkJiVVE3UVVGRGFrUXNaVUZCU3l4UlFVRk1MRU5CUVdNc1MwRkJaRHRCUVVORUxFOUJSa1FzVFVGRlR6dEJRVU5NTEdWQlFVOHNVVUZCVUN4RFFVRm5RaXhOUVVGb1FqdEJRVU5FTzBGQlEwWXNTMEZPUkR0QlFVOUJMRkZCUVVrc01FSkJRVEJDTEVsQlFVa3NaMEpCUVVvc1EwRkJjVUlzYzBOQlFYSkNMRU5CUVRsQ0xFTkJXbk5DTEVOQldXOUZPMEZCUXpGR0xGTkJRVXNzWjBKQlFVd3NRMEZCYzBJc1NVRkJkRUlzUTBGQk1rSXNiVUpCUVROQ0xFVkJRV2RFTEUxQlFXaEVMRU5CUVhWRUxGVkJRVU1zUzBGQlJEdEJRVUZCTEdGQlFWY3NUMEZCU3l4TlFVRk1MRU5CUVZrc1MwRkJXaXhEUVVGWU8wRkJRVUVzUzBGQmRrUTdRVUZEUVN4WFFVRlBMR2RDUVVGUUxFTkJRWGRDTEZWQlFYaENMRVZCUVc5RExGVkJRVU1zUzBGQlJEdEJRVUZCTEdGQlFWY3NUMEZCU3l4UlFVRk1MRU5CUVdNc1MwRkJaQ3hEUVVGWU8wRkJRVUVzUzBGQmNFTXNSVUZCY1VVc1MwRkJja1U3UVVGRFJEdEJRWFpMYzBJc1EwRkJiRUk3TzJ0Q1FUQkxVU3hUT3pzN096dEJRMmhNWmpzN1FVRkRRVHM3T3p0QlFVTkJPenRCUVVOQk96czdPMEZCUlVFc1VVRkJVU3hIUVVGU0xFTkJRVmtzVTBGQldqczdRVUZGUVN4NVFrRkJZU3hqUVVGaUxFZEJRVGhDTEVsQlFVa3NiMEpCUVVvc1JVRkJPVUk3TzBGQlJVRXNTVUZCVFN4aFFVRmhPMEZCUTJwQ0xGZEJRVk1zUTBGRFVDeDFRa0ZFVHl4RlFVVlFMRzlDUVVaUE96dEJRVTFZTzBGQlEwRTdPMEZCUlVFN1FVRldiVUlzUTBGQmJrSXNRMEZYUVN4WFFVRkxMR0ZCUVV3c1EwRkJiVUlzVlVGQmJrSTdPenM3T3pzN08wRkRjRUpCTzBGQlEwRTdPenM3T3p0QlFVMUJPMEZCUTBFN096czdRVUZKUVRzN1FVRkZUeXhKUVVGTkxEaENRVUZYTzBGQlEzUkNMRkZCUVUwc1ZVRkVaMEk3UVVGRmRFSXNVMEZCVHp0QlFVTk1MRmRCUVU4N1FVRkVSaXhIUVVabE8wRkJTM1JDTEZkQlFWTTdRVUZEVUN4WlFVUlBMRzlDUVVOSExFdEJSRWdzUlVGRFZUdEJRVU5tTEdGQlFVOHNVVUZCVUN4RFFVRm5RaXhIUVVGb1FpeERRVUZ2UWl4TFFVRkxMRXRCUVhwQ08wRkJRMEVzVjBGQlN5eExRVUZNTEVkQlFXRXNTMEZCWWp0QlFVTkJMR0ZCUVU4c1NVRkJVRHRCUVVORU8wRkJURTBzUjBGTVlUdEJRVmwwUWl4VFFWcHpRaXh0UWtGWllpeEpRVnBoTEVWQldWQXNUMEZhVHl4RlFWbEZPMEZCUVVVN096czdPenRCUVU5NFFpeFpRVUZSTEVkQlFWSXNRMEZCV1N4dlFrRkJXanRCUVVORU8wRkJjRUp4UWl4RFFVRnFRanM3YTBKQmRVSlJMRkVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpaG1kVzVqZEdsdmJpZ3BlMloxYm1OMGFXOXVJSElvWlN4dUxIUXBlMloxYm1OMGFXOXVJRzhvYVN4bUtYdHBaaWdoYmx0cFhTbDdhV1lvSVdWYmFWMHBlM1poY2lCalBWd2lablZ1WTNScGIyNWNJajA5ZEhsd1pXOW1JSEpsY1hWcGNtVW1KbkpsY1hWcGNtVTdhV1lvSVdZbUptTXBjbVYwZFhKdUlHTW9hU3doTUNrN2FXWW9kU2x5WlhSMWNtNGdkU2hwTENFd0tUdDJZWElnWVQxdVpYY2dSWEp5YjNJb1hDSkRZVzV1YjNRZ1ptbHVaQ0J0YjJSMWJHVWdKMXdpSzJrclhDSW5YQ0lwTzNSb2NtOTNJR0V1WTI5a1pUMWNJazFQUkZWTVJWOU9UMVJmUms5VlRrUmNJaXhoZlhaaGNpQndQVzViYVYwOWUyVjRjRzl5ZEhNNmUzMTlPMlZiYVYxYk1GMHVZMkZzYkNod0xtVjRjRzl5ZEhNc1puVnVZM1JwYjI0b2NpbDdkbUZ5SUc0OVpWdHBYVnN4WFZ0eVhUdHlaWFIxY200Z2J5aHVmSHh5S1gwc2NDeHdMbVY0Y0c5eWRITXNjaXhsTEc0c2RDbDljbVYwZFhKdUlHNWJhVjB1Wlhod2IzSjBjMzFtYjNJb2RtRnlJSFU5WENKbWRXNWpkR2x2Ymx3aVBUMTBlWEJsYjJZZ2NtVnhkV2x5WlNZbWNtVnhkV2x5WlN4cFBUQTdhVHgwTG14bGJtZDBhRHRwS3lzcGJ5aDBXMmxkS1R0eVpYUjFjbTRnYjMxeVpYUjFjbTRnY24wcEtDa2lMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHNnWENKa1pXWmhkV3gwWENJNklISmxjWFZwY21Vb1hDSmpiM0psTFdwekwyeHBZbkpoY25rdlptNHZiMkpxWldOMEwyUmxabWx1WlMxd2NtOXdaWEowZVZ3aUtTd2dYMTlsYzAxdlpIVnNaVG9nZEhKMVpTQjlPeUlzSW0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnZXlCY0ltUmxabUYxYkhSY0lqb2djbVZ4ZFdseVpTaGNJbU52Y21VdGFuTXZiR2xpY21GeWVTOW1iaTl2WW1wbFkzUXZhMlY1YzF3aUtTd2dYMTlsYzAxdlpIVnNaVG9nZEhKMVpTQjlPeUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1WEc1bGVIQnZjblJ6TGw5ZlpYTk5iMlIxYkdVZ1BTQjBjblZsTzF4dVhHNWxlSEJ2Y25SekxtUmxabUYxYkhRZ1BTQm1kVzVqZEdsdmJpQW9hVzV6ZEdGdVkyVXNJRU52Ym5OMGNuVmpkRzl5S1NCN1hHNGdJR2xtSUNnaEtHbHVjM1JoYm1ObElHbHVjM1JoYm1ObGIyWWdRMjl1YzNSeWRXTjBiM0lwS1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUZSNWNHVkZjbkp2Y2loY0lrTmhibTV2ZENCallXeHNJR0VnWTJ4aGMzTWdZWE1nWVNCbWRXNWpkR2x2Ymx3aUtUdGNiaUFnZlZ4dWZUc2lMQ0pjSW5WelpTQnpkSEpwWTNSY0lqdGNibHh1Wlhod2IzSjBjeTVmWDJWelRXOWtkV3hsSUQwZ2RISjFaVHRjYmx4dWRtRnlJRjlrWldacGJtVlFjbTl3WlhKMGVTQTlJSEpsY1hWcGNtVW9YQ0l1TGk5amIzSmxMV3B6TDI5aWFtVmpkQzlrWldacGJtVXRjSEp2Y0dWeWRIbGNJaWs3WEc1Y2JuWmhjaUJmWkdWbWFXNWxVSEp2Y0dWeWRIa3lJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZaR1ZtYVc1bFVISnZjR1Z5ZEhrcE8xeHVYRzVtZFc1amRHbHZiaUJmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtHOWlhaWtnZXlCeVpYUjFjbTRnYjJKcUlDWW1JRzlpYWk1ZlgyVnpUVzlrZFd4bElEOGdiMkpxSURvZ2V5QmtaV1poZFd4ME9pQnZZbW9nZlRzZ2ZWeHVYRzVsZUhCdmNuUnpMbVJsWm1GMWJIUWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJR1oxYm1OMGFXOXVJR1JsWm1sdVpWQnliM0JsY25ScFpYTW9kR0Z5WjJWMExDQndjbTl3Y3lrZ2UxeHVJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2NISnZjSE11YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lIWmhjaUJrWlhOamNtbHdkRzl5SUQwZ2NISnZjSE5iYVYwN1hHNGdJQ0FnSUNCa1pYTmpjbWx3ZEc5eUxtVnVkVzFsY21GaWJHVWdQU0JrWlhOamNtbHdkRzl5TG1WdWRXMWxjbUZpYkdVZ2ZId2dabUZzYzJVN1hHNGdJQ0FnSUNCa1pYTmpjbWx3ZEc5eUxtTnZibVpwWjNWeVlXSnNaU0E5SUhSeWRXVTdYRzRnSUNBZ0lDQnBaaUFvWENKMllXeDFaVndpSUdsdUlHUmxjMk55YVhCMGIzSXBJR1JsYzJOeWFYQjBiM0l1ZDNKcGRHRmliR1VnUFNCMGNuVmxPMXh1SUNBZ0lDQWdLREFzSUY5a1pXWnBibVZRY205d1pYSjBlVEl1WkdWbVlYVnNkQ2tvZEdGeVoyVjBMQ0JrWlhOamNtbHdkRzl5TG10bGVTd2daR1Z6WTNKcGNIUnZjaWs3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJQ2hEYjI1emRISjFZM1J2Y2l3Z2NISnZkRzlRY205d2N5d2djM1JoZEdsalVISnZjSE1wSUh0Y2JpQWdJQ0JwWmlBb2NISnZkRzlRY205d2N5a2daR1ZtYVc1bFVISnZjR1Z5ZEdsbGN5aERiMjV6ZEhKMVkzUnZjaTV3Y205MGIzUjVjR1VzSUhCeWIzUnZVSEp2Y0hNcE8xeHVJQ0FnSUdsbUlDaHpkR0YwYVdOUWNtOXdjeWtnWkdWbWFXNWxVSEp2Y0dWeWRHbGxjeWhEYjI1emRISjFZM1J2Y2l3Z2MzUmhkR2xqVUhKdmNITXBPMXh1SUNBZ0lISmxkSFZ5YmlCRGIyNXpkSEoxWTNSdmNqdGNiaUFnZlR0Y2JuMG9LVHNpTENKeVpYRjFhWEpsS0NjdUxpOHVMaTl0YjJSMWJHVnpMMlZ6Tmk1dlltcGxZM1F1WkdWbWFXNWxMWEJ5YjNCbGNuUjVKeWs3WEc1MllYSWdKRTlpYW1WamRDQTlJSEpsY1hWcGNtVW9KeTR1THk0dUwyMXZaSFZzWlhNdlgyTnZjbVVuS1M1UFltcGxZM1E3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUdSbFptbHVaVkJ5YjNCbGNuUjVLR2wwTENCclpYa3NJR1JsYzJNcElIdGNiaUFnY21WMGRYSnVJQ1JQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb2FYUXNJR3RsZVN3Z1pHVnpZeWs3WEc1OU8xeHVJaXdpY21WeGRXbHlaU2duTGk0dkxpNHZiVzlrZFd4bGN5OWxjell1YjJKcVpXTjBMbXRsZVhNbktUdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjbVZ4ZFdseVpTZ25MaTR2TGk0dmJXOWtkV3hsY3k5ZlkyOXlaU2NwTGs5aWFtVmpkQzVyWlhsek8xeHVJaXdpYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvYVhRcElIdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCcGRDQWhQU0FuWm5WdVkzUnBiMjRuS1NCMGFISnZkeUJVZVhCbFJYSnliM0lvYVhRZ0t5QW5JR2x6SUc1dmRDQmhJR1oxYm1OMGFXOXVJU2NwTzF4dUlDQnlaWFIxY200Z2FYUTdYRzU5TzF4dUlpd2lkbUZ5SUdselQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZhWE10YjJKcVpXTjBKeWs3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNocGRDa2dlMXh1SUNCcFppQW9JV2x6VDJKcVpXTjBLR2wwS1NrZ2RHaHliM2NnVkhsd1pVVnljbTl5S0dsMElDc2dKeUJwY3lCdWIzUWdZVzRnYjJKcVpXTjBJU2NwTzF4dUlDQnlaWFIxY200Z2FYUTdYRzU5TzF4dUlpd2lMeThnWm1Gc2MyVWdMVDRnUVhKeVlYa2phVzVrWlhoUFpseHVMeThnZEhKMVpTQWdMVDRnUVhKeVlYa2phVzVqYkhWa1pYTmNiblpoY2lCMGIwbFBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTkwYnkxcGIySnFaV04wSnlrN1hHNTJZWElnZEc5TVpXNW5kR2dnUFNCeVpYRjFhWEpsS0NjdUwxOTBieTFzWlc1bmRHZ25LVHRjYm5aaGNpQjBiMEZpYzI5c2RYUmxTVzVrWlhnZ1BTQnlaWEYxYVhKbEtDY3VMMTkwYnkxaFluTnZiSFYwWlMxcGJtUmxlQ2NwTzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1NWTmZTVTVEVEZWRVJWTXBJSHRjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUNna2RHaHBjeXdnWld3c0lHWnliMjFKYm1SbGVDa2dlMXh1SUNBZ0lIWmhjaUJQSUQwZ2RHOUpUMkpxWldOMEtDUjBhR2x6S1R0Y2JpQWdJQ0IyWVhJZ2JHVnVaM1JvSUQwZ2RHOU1aVzVuZEdnb1R5NXNaVzVuZEdncE8xeHVJQ0FnSUhaaGNpQnBibVJsZUNBOUlIUnZRV0p6YjJ4MWRHVkpibVJsZUNobWNtOXRTVzVrWlhnc0lHeGxibWQwYUNrN1hHNGdJQ0FnZG1GeUlIWmhiSFZsTzF4dUlDQWdJQzh2SUVGeWNtRjVJMmx1WTJ4MVpHVnpJSFZ6WlhNZ1UyRnRaVlpoYkhWbFdtVnlieUJsY1hWaGJHbDBlU0JoYkdkdmNtbDBhRzFjYmlBZ0lDQXZMeUJsYzJ4cGJuUXRaR2x6WVdKc1pTMXVaWGgwTFd4cGJtVWdibTh0YzJWc1ppMWpiMjF3WVhKbFhHNGdJQ0FnYVdZZ0tFbFRYMGxPUTB4VlJFVlRJQ1ltSUdWc0lDRTlJR1ZzS1NCM2FHbHNaU0FvYkdWdVozUm9JRDRnYVc1a1pYZ3BJSHRjYmlBZ0lDQWdJSFpoYkhWbElEMGdUMXRwYm1SbGVDc3JYVHRjYmlBZ0lDQWdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMVzVsZUhRdGJHbHVaU0J1YnkxelpXeG1MV052YlhCaGNtVmNiaUFnSUNBZ0lHbG1JQ2gyWVd4MVpTQWhQU0IyWVd4MVpTa2djbVYwZFhKdUlIUnlkV1U3WEc0Z0lDQWdMeThnUVhKeVlYa2phVzVrWlhoUFppQnBaMjV2Y21WeklHaHZiR1Z6TENCQmNuSmhlU05wYm1Oc2RXUmxjeUF0SUc1dmRGeHVJQ0FnSUgwZ1pXeHpaU0JtYjNJZ0tEdHNaVzVuZEdnZ1BpQnBibVJsZURzZ2FXNWtaWGdyS3lrZ2FXWWdLRWxUWDBsT1EweFZSRVZUSUh4OElHbHVaR1Y0SUdsdUlFOHBJSHRjYmlBZ0lDQWdJR2xtSUNoUFcybHVaR1Y0WFNBOVBUMGdaV3dwSUhKbGRIVnliaUJKVTE5SlRrTk1WVVJGVXlCOGZDQnBibVJsZUNCOGZDQXdPMXh1SUNBZ0lIMGdjbVYwZFhKdUlDRkpVMTlKVGtOTVZVUkZVeUFtSmlBdE1UdGNiaUFnZlR0Y2JuMDdYRzRpTENKMllYSWdkRzlUZEhKcGJtY2dQU0I3ZlM1MGIxTjBjbWx1Wnp0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9hWFFwSUh0Y2JpQWdjbVYwZFhKdUlIUnZVM1J5YVc1bkxtTmhiR3dvYVhRcExuTnNhV05sS0Rnc0lDMHhLVHRjYm4wN1hHNGlMQ0oyWVhJZ1kyOXlaU0E5SUcxdlpIVnNaUzVsZUhCdmNuUnpJRDBnZXlCMlpYSnphVzl1T2lBbk1pNDFMamNuSUgwN1hHNXBaaUFvZEhsd1pXOW1JRjlmWlNBOVBTQW5iblZ0WW1WeUp5a2dYMTlsSUQwZ1kyOXlaVHNnTHk4Z1pYTnNhVzUwTFdScGMyRmliR1V0YkdsdVpTQnVieTExYm1SbFpseHVJaXdpTHk4Z2IzQjBhVzl1WVd3Z0x5QnphVzF3YkdVZ1kyOXVkR1Y0ZENCaWFXNWthVzVuWEc1MllYSWdZVVoxYm1OMGFXOXVJRDBnY21WeGRXbHlaU2duTGk5ZllTMW1kVzVqZEdsdmJpY3BPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvWm00c0lIUm9ZWFFzSUd4bGJtZDBhQ2tnZTF4dUlDQmhSblZ1WTNScGIyNG9abTRwTzF4dUlDQnBaaUFvZEdoaGRDQTlQVDBnZFc1a1pXWnBibVZrS1NCeVpYUjFjbTRnWm00N1hHNGdJSE4zYVhSamFDQW9iR1Z1WjNSb0tTQjdYRzRnSUNBZ1kyRnpaU0F4T2lCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0dFcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCbWJpNWpZV3hzS0hSb1lYUXNJR0VwTzF4dUlDQWdJSDA3WEc0Z0lDQWdZMkZ6WlNBeU9pQnlaWFIxY200Z1puVnVZM1JwYjI0Z0tHRXNJR0lwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtYmk1allXeHNLSFJvWVhRc0lHRXNJR0lwTzF4dUlDQWdJSDA3WEc0Z0lDQWdZMkZ6WlNBek9pQnlaWFIxY200Z1puVnVZM1JwYjI0Z0tHRXNJR0lzSUdNcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCbWJpNWpZV3hzS0hSb1lYUXNJR0VzSUdJc0lHTXBPMXh1SUNBZ0lIMDdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlDZ3ZLaUF1TGk1aGNtZHpJQ292S1NCN1hHNGdJQ0FnY21WMGRYSnVJR1p1TG1Gd2NHeDVLSFJvWVhRc0lHRnlaM1Z0Wlc1MGN5azdYRzRnSUgwN1hHNTlPMXh1SWl3aUx5OGdOeTR5TGpFZ1VtVnhkV2x5WlU5aWFtVmpkRU52WlhKamFXSnNaU2hoY21kMWJXVnVkQ2xjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMEtTQjdYRzRnSUdsbUlDaHBkQ0E5UFNCMWJtUmxabWx1WldRcElIUm9jbTkzSUZSNWNHVkZjbkp2Y2loY0lrTmhiaWQwSUdOaGJHd2diV1YwYUc5a0lHOXVJQ0JjSWlBcklHbDBLVHRjYmlBZ2NtVjBkWEp1SUdsME8xeHVmVHRjYmlJc0lpOHZJRlJvWVc1ckozTWdTVVU0SUdadmNpQm9hWE1nWm5WdWJua2daR1ZtYVc1bFVISnZjR1Z5ZEhsY2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ0lYSmxjWFZwY21Vb0p5NHZYMlpoYVd4ekp5a29ablZ1WTNScGIyNGdLQ2tnZTF4dUlDQnlaWFIxY200Z1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLSHQ5TENBbllTY3NJSHNnWjJWME9pQm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUEzT3lCOUlIMHBMbUVnSVQwZ056dGNibjBwTzF4dUlpd2lkbUZ5SUdselQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZhWE10YjJKcVpXTjBKeWs3WEc1MllYSWdaRzlqZFcxbGJuUWdQU0J5WlhGMWFYSmxLQ2N1TDE5bmJHOWlZV3duS1M1a2IyTjFiV1Z1ZER0Y2JpOHZJSFI1Y0dWdlppQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwSUdseklDZHZZbXBsWTNRbklHbHVJRzlzWkNCSlJWeHVkbUZ5SUdseklEMGdhWE5QWW1wbFkzUW9aRzlqZFcxbGJuUXBJQ1ltSUdselQySnFaV04wS0dSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUXBPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvYVhRcElIdGNiaUFnY21WMGRYSnVJR2x6SUQ4Z1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2hwZENrZ09pQjdmVHRjYm4wN1hHNGlMQ0l2THlCSlJTQTRMU0JrYjI0bmRDQmxiblZ0SUdKMVp5QnJaWGx6WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUNoY2JpQWdKMk52Ym5OMGNuVmpkRzl5TEdoaGMwOTNibEJ5YjNCbGNuUjVMR2x6VUhKdmRHOTBlWEJsVDJZc2NISnZjR1Z5ZEhsSmMwVnVkVzFsY21GaWJHVXNkRzlNYjJOaGJHVlRkSEpwYm1jc2RHOVRkSEpwYm1jc2RtRnNkV1ZQWmlkY2Jpa3VjM0JzYVhRb0p5d25LVHRjYmlJc0luWmhjaUJuYkc5aVlXd2dQU0J5WlhGMWFYSmxLQ2N1TDE5bmJHOWlZV3duS1R0Y2JuWmhjaUJqYjNKbElEMGdjbVZ4ZFdseVpTZ25MaTlmWTI5eVpTY3BPMXh1ZG1GeUlHTjBlQ0E5SUhKbGNYVnBjbVVvSnk0dlgyTjBlQ2NwTzF4dWRtRnlJR2hwWkdVZ1BTQnlaWEYxYVhKbEtDY3VMMTlvYVdSbEp5azdYRzUyWVhJZ2FHRnpJRDBnY21WeGRXbHlaU2duTGk5ZmFHRnpKeWs3WEc1MllYSWdVRkpQVkU5VVdWQkZJRDBnSjNCeWIzUnZkSGx3WlNjN1hHNWNiblpoY2lBa1pYaHdiM0owSUQwZ1puVnVZM1JwYjI0Z0tIUjVjR1VzSUc1aGJXVXNJSE52ZFhKalpTa2dlMXh1SUNCMllYSWdTVk5mUms5U1EwVkVJRDBnZEhsd1pTQW1JQ1JsZUhCdmNuUXVSanRjYmlBZ2RtRnlJRWxUWDBkTVQwSkJUQ0E5SUhSNWNHVWdKaUFrWlhod2IzSjBMa2M3WEc0Z0lIWmhjaUJKVTE5VFZFRlVTVU1nUFNCMGVYQmxJQ1lnSkdWNGNHOXlkQzVUTzF4dUlDQjJZWElnU1ZOZlVGSlBWRThnUFNCMGVYQmxJQ1lnSkdWNGNHOXlkQzVRTzF4dUlDQjJZWElnU1ZOZlFrbE9SQ0E5SUhSNWNHVWdKaUFrWlhod2IzSjBMa0k3WEc0Z0lIWmhjaUJKVTE5WFVrRlFJRDBnZEhsd1pTQW1JQ1JsZUhCdmNuUXVWenRjYmlBZ2RtRnlJR1Y0Y0c5eWRITWdQU0JKVTE5SFRFOUNRVXdnUHlCamIzSmxJRG9nWTI5eVpWdHVZVzFsWFNCOGZDQW9ZMjl5WlZ0dVlXMWxYU0E5SUh0OUtUdGNiaUFnZG1GeUlHVjRjRkJ5YjNSdklEMGdaWGh3YjNKMGMxdFFVazlVVDFSWlVFVmRPMXh1SUNCMllYSWdkR0Z5WjJWMElEMGdTVk5mUjB4UFFrRk1JRDhnWjJ4dlltRnNJRG9nU1ZOZlUxUkJWRWxESUQ4Z1oyeHZZbUZzVzI1aGJXVmRJRG9nS0dkc2IySmhiRnR1WVcxbFhTQjhmQ0I3ZlNsYlVGSlBWRTlVV1ZCRlhUdGNiaUFnZG1GeUlHdGxlU3dnYjNkdUxDQnZkWFE3WEc0Z0lHbG1JQ2hKVTE5SFRFOUNRVXdwSUhOdmRYSmpaU0E5SUc1aGJXVTdYRzRnSUdadmNpQW9hMlY1SUdsdUlITnZkWEpqWlNrZ2UxeHVJQ0FnSUM4dklHTnZiblJoYVc1eklHbHVJRzVoZEdsMlpWeHVJQ0FnSUc5M2JpQTlJQ0ZKVTE5R1QxSkRSVVFnSmlZZ2RHRnlaMlYwSUNZbUlIUmhjbWRsZEZ0clpYbGRJQ0U5UFNCMWJtUmxabWx1WldRN1hHNGdJQ0FnYVdZZ0tHOTNiaUFtSmlCb1lYTW9aWGh3YjNKMGN5d2dhMlY1S1NrZ1kyOXVkR2x1ZFdVN1hHNGdJQ0FnTHk4Z1pYaHdiM0owSUc1aGRHbDJaU0J2Y2lCd1lYTnpaV1JjYmlBZ0lDQnZkWFFnUFNCdmQyNGdQeUIwWVhKblpYUmJhMlY1WFNBNklITnZkWEpqWlZ0clpYbGRPMXh1SUNBZ0lDOHZJSEJ5WlhabGJuUWdaMnh2WW1Gc0lIQnZiR3gxZEdsdmJpQm1iM0lnYm1GdFpYTndZV05sYzF4dUlDQWdJR1Y0Y0c5eWRITmJhMlY1WFNBOUlFbFRYMGRNVDBKQlRDQW1KaUIwZVhCbGIyWWdkR0Z5WjJWMFcydGxlVjBnSVQwZ0oyWjFibU4wYVc5dUp5QS9JSE52ZFhKalpWdHJaWGxkWEc0Z0lDQWdMeThnWW1sdVpDQjBhVzFsY25NZ2RHOGdaMnh2WW1Gc0lHWnZjaUJqWVd4c0lHWnliMjBnWlhod2IzSjBJR052Ym5SbGVIUmNiaUFnSUNBNklFbFRYMEpKVGtRZ0ppWWdiM2R1SUQ4Z1kzUjRLRzkxZEN3Z1oyeHZZbUZzS1Z4dUlDQWdJQzh2SUhkeVlYQWdaMnh2WW1Gc0lHTnZibk4wY25WamRHOXljeUJtYjNJZ2NISmxkbVZ1ZENCamFHRnVaMlVnZEdobGJTQnBiaUJzYVdKeVlYSjVYRzRnSUNBZ09pQkpVMTlYVWtGUUlDWW1JSFJoY21kbGRGdHJaWGxkSUQwOUlHOTFkQ0EvSUNobWRXNWpkR2x2YmlBb1F5a2dlMXh1SUNBZ0lDQWdkbUZ5SUVZZ1BTQm1kVzVqZEdsdmJpQW9ZU3dnWWl3Z1l5a2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeUJwYm5OMFlXNWpaVzltSUVNcElIdGNiaUFnSUNBZ0lDQWdJQ0J6ZDJsMFkyZ2dLR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhjMlVnTURvZ2NtVjBkWEp1SUc1bGR5QkRLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpZWE5sSURFNklISmxkSFZ5YmlCdVpYY2dReWhoS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR05oYzJVZ01qb2djbVYwZFhKdUlHNWxkeUJES0dFc0lHSXBPMXh1SUNBZ0lDQWdJQ0FnSUgwZ2NtVjBkWEp1SUc1bGR5QkRLR0VzSUdJc0lHTXBPMXh1SUNBZ0lDQWdJQ0I5SUhKbGRIVnliaUJETG1Gd2NHeDVLSFJvYVhNc0lHRnlaM1Z0Wlc1MGN5azdYRzRnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdSbHRRVWs5VVQxUlpVRVZkSUQwZ1ExdFFVazlVVDFSWlVFVmRPMXh1SUNBZ0lDQWdjbVYwZFhKdUlFWTdYRzRnSUNBZ0x5OGdiV0ZyWlNCemRHRjBhV01nZG1WeWMybHZibk1nWm05eUlIQnliM1J2ZEhsd1pTQnRaWFJvYjJSelhHNGdJQ0FnZlNrb2IzVjBLU0E2SUVsVFgxQlNUMVJQSUNZbUlIUjVjR1Z2WmlCdmRYUWdQVDBnSjJaMWJtTjBhVzl1SnlBL0lHTjBlQ2hHZFc1amRHbHZiaTVqWVd4c0xDQnZkWFFwSURvZ2IzVjBPMXh1SUNBZ0lDOHZJR1Y0Y0c5eWRDQndjbTkwYnlCdFpYUm9iMlJ6SUhSdklHTnZjbVV1SlVOUFRsTlVVbFZEVkU5U0pTNXRaWFJvYjJSekxpVk9RVTFGSlZ4dUlDQWdJR2xtSUNoSlUxOVFVazlVVHlrZ2UxeHVJQ0FnSUNBZ0tHVjRjRzl5ZEhNdWRtbHlkSFZoYkNCOGZDQW9aWGh3YjNKMGN5NTJhWEowZFdGc0lEMGdlMzBwS1Z0clpYbGRJRDBnYjNWME8xeHVJQ0FnSUNBZ0x5OGdaWGh3YjNKMElIQnliM1J2SUcxbGRHaHZaSE1nZEc4Z1kyOXlaUzRsUTA5T1UxUlNWVU5VVDFJbExuQnliM1J2ZEhsd1pTNGxUa0ZOUlNWY2JpQWdJQ0FnSUdsbUlDaDBlWEJsSUNZZ0pHVjRjRzl5ZEM1U0lDWW1JR1Y0Y0ZCeWIzUnZJQ1ltSUNGbGVIQlFjbTkwYjF0clpYbGRLU0JvYVdSbEtHVjRjRkJ5YjNSdkxDQnJaWGtzSUc5MWRDazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1OU8xeHVMeThnZEhsd1pTQmlhWFJ0WVhCY2JpUmxlSEJ2Y25RdVJpQTlJREU3SUNBZ0x5OGdabTl5WTJWa1hHNGtaWGh3YjNKMExrY2dQU0F5T3lBZ0lDOHZJR2RzYjJKaGJGeHVKR1Y0Y0c5eWRDNVRJRDBnTkRzZ0lDQXZMeUJ6ZEdGMGFXTmNiaVJsZUhCdmNuUXVVQ0E5SURnN0lDQWdMeThnY0hKdmRHOWNiaVJsZUhCdmNuUXVRaUE5SURFMk95QWdMeThnWW1sdVpGeHVKR1Y0Y0c5eWRDNVhJRDBnTXpJN0lDQXZMeUIzY21Gd1hHNGtaWGh3YjNKMExsVWdQU0EyTkRzZ0lDOHZJSE5oWm1WY2JpUmxlSEJ2Y25RdVVpQTlJREV5T0RzZ0x5OGdjbVZoYkNCd2NtOTBieUJ0WlhSb2IyUWdabTl5SUdCc2FXSnlZWEo1WUZ4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNBa1pYaHdiM0owTzF4dUlpd2liVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9aWGhsWXlrZ2UxeHVJQ0IwY25rZ2UxeHVJQ0FnSUhKbGRIVnliaUFoSVdWNFpXTW9LVHRjYmlBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCMGNuVmxPMXh1SUNCOVhHNTlPMXh1SWl3aUx5OGdhSFIwY0hNNkx5OW5hWFJvZFdJdVkyOXRMM3BzYjJseWIyTnJMMk52Y21VdGFuTXZhWE56ZFdWekx6ZzJJMmx6YzNWbFkyOXRiV1Z1ZEMweE1UVTNOVGt3TWpoY2JuWmhjaUJuYkc5aVlXd2dQU0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ2QybHVaRzkzTGsxaGRHZ2dQVDBnVFdGMGFGeHVJQ0EvSUhkcGJtUnZkeUE2SUhSNWNHVnZaaUJ6Wld4bUlDRTlJQ2QxYm1SbFptbHVaV1FuSUNZbUlITmxiR1l1VFdGMGFDQTlQU0JOWVhSb0lEOGdjMlZzWmx4dUlDQXZMeUJsYzJ4cGJuUXRaR2x6WVdKc1pTMXVaWGgwTFd4cGJtVWdibTh0Ym1WM0xXWjFibU5jYmlBZ09pQkdkVzVqZEdsdmJpZ25jbVYwZFhKdUlIUm9hWE1uS1NncE8xeHVhV1lnS0hSNWNHVnZaaUJmWDJjZ1BUMGdKMjUxYldKbGNpY3BJRjlmWnlBOUlHZHNiMkpoYkRzZ0x5OGdaWE5zYVc1MExXUnBjMkZpYkdVdGJHbHVaU0J1YnkxMWJtUmxabHh1SWl3aWRtRnlJR2hoYzA5M2JsQnliM0JsY25SNUlEMGdlMzB1YUdGelQzZHVVSEp2Y0dWeWRIazdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZEN3Z2EyVjVLU0I3WEc0Z0lISmxkSFZ5YmlCb1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHbDBMQ0JyWlhrcE8xeHVmVHRjYmlJc0luWmhjaUJrVUNBOUlISmxjWFZwY21Vb0p5NHZYMjlpYW1WamRDMWtjQ2NwTzF4dWRtRnlJR055WldGMFpVUmxjMk1nUFNCeVpYRjFhWEpsS0NjdUwxOXdjbTl3WlhKMGVTMWtaWE5qSnlrN1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlISmxjWFZwY21Vb0p5NHZYMlJsYzJOeWFYQjBiM0p6SnlrZ1B5Qm1kVzVqZEdsdmJpQW9iMkpxWldOMExDQnJaWGtzSUhaaGJIVmxLU0I3WEc0Z0lISmxkSFZ5YmlCa1VDNW1LRzlpYW1WamRDd2dhMlY1TENCamNtVmhkR1ZFWlhOaktERXNJSFpoYkhWbEtTazdYRzU5SURvZ1puVnVZM1JwYjI0Z0tHOWlhbVZqZEN3Z2EyVjVMQ0IyWVd4MVpTa2dlMXh1SUNCdlltcGxZM1JiYTJWNVhTQTlJSFpoYkhWbE8xeHVJQ0J5WlhSMWNtNGdiMkpxWldOME8xeHVmVHRjYmlJc0ltMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ0lYSmxjWFZwY21Vb0p5NHZYMlJsYzJOeWFYQjBiM0p6SnlrZ0ppWWdJWEpsY1hWcGNtVW9KeTR2WDJaaGFXeHpKeWtvWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0hKbGNYVnBjbVVvSnk0dlgyUnZiUzFqY21WaGRHVW5LU2duWkdsMkp5a3NJQ2RoSnl3Z2V5Qm5aWFE2SUdaMWJtTjBhVzl1SUNncElIc2djbVYwZFhKdUlEYzdJSDBnZlNrdVlTQWhQU0EzTzF4dWZTazdYRzRpTENJdkx5Qm1ZV3hzWW1GamF5Qm1iM0lnYm05dUxXRnljbUY1TFd4cGEyVWdSVk16SUdGdVpDQnViMjR0Wlc1MWJXVnlZV0pzWlNCdmJHUWdWamdnYzNSeWFXNW5jMXh1ZG1GeUlHTnZaaUE5SUhKbGNYVnBjbVVvSnk0dlgyTnZaaWNwTzF4dUx5OGdaWE5zYVc1MExXUnBjMkZpYkdVdGJtVjRkQzFzYVc1bElHNXZMWEJ5YjNSdmRIbHdaUzFpZFdsc2RHbHVjMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JQWW1wbFkzUW9KM29uS1M1d2NtOXdaWEowZVVselJXNTFiV1Z5WVdKc1pTZ3dLU0EvSUU5aWFtVmpkQ0E2SUdaMWJtTjBhVzl1SUNocGRDa2dlMXh1SUNCeVpYUjFjbTRnWTI5bUtHbDBLU0E5UFNBblUzUnlhVzVuSnlBL0lHbDBMbk53YkdsMEtDY25LU0E2SUU5aWFtVmpkQ2hwZENrN1hHNTlPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXBJSHRjYmlBZ2NtVjBkWEp1SUhSNWNHVnZaaUJwZENBOVBUMGdKMjlpYW1WamRDY2dQeUJwZENBaFBUMGdiblZzYkNBNklIUjVjR1Z2WmlCcGRDQTlQVDBnSjJaMWJtTjBhVzl1Snp0Y2JuMDdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhSeWRXVTdYRzRpTENKMllYSWdZVzVQWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5aGJpMXZZbXBsWTNRbktUdGNiblpoY2lCSlJUaGZSRTlOWDBSRlJrbE9SU0E5SUhKbGNYVnBjbVVvSnk0dlgybGxPQzFrYjIwdFpHVm1hVzVsSnlrN1hHNTJZWElnZEc5UWNtbHRhWFJwZG1VZ1BTQnlaWEYxYVhKbEtDY3VMMTkwYnkxd2NtbHRhWFJwZG1VbktUdGNiblpoY2lCa1VDQTlJRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVR0Y2JseHVaWGh3YjNKMGN5NW1JRDBnY21WeGRXbHlaU2duTGk5ZlpHVnpZM0pwY0hSdmNuTW5LU0EvSUU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTQTZJR1oxYm1OMGFXOXVJR1JsWm1sdVpWQnliM0JsY25SNUtFOHNJRkFzSUVGMGRISnBZblYwWlhNcElIdGNiaUFnWVc1UFltcGxZM1FvVHlrN1hHNGdJRkFnUFNCMGIxQnlhVzFwZEdsMlpTaFFMQ0IwY25WbEtUdGNiaUFnWVc1UFltcGxZM1FvUVhSMGNtbGlkWFJsY3lrN1hHNGdJR2xtSUNoSlJUaGZSRTlOWDBSRlJrbE9SU2tnZEhKNUlIdGNiaUFnSUNCeVpYUjFjbTRnWkZBb1R5d2dVQ3dnUVhSMGNtbGlkWFJsY3lrN1hHNGdJSDBnWTJGMFkyZ2dLR1VwSUhzZ0x5b2daVzF3ZEhrZ0tpOGdmVnh1SUNCcFppQW9KMmRsZENjZ2FXNGdRWFIwY21saWRYUmxjeUI4ZkNBbmMyVjBKeUJwYmlCQmRIUnlhV0oxZEdWektTQjBhSEp2ZHlCVWVYQmxSWEp5YjNJb0owRmpZMlZ6YzI5eWN5QnViM1FnYzNWd2NHOXlkR1ZrSVNjcE8xeHVJQ0JwWmlBb0ozWmhiSFZsSnlCcGJpQkJkSFJ5YVdKMWRHVnpLU0JQVzFCZElEMGdRWFIwY21saWRYUmxjeTUyWVd4MVpUdGNiaUFnY21WMGRYSnVJRTg3WEc1OU8xeHVJaXdpZG1GeUlHaGhjeUE5SUhKbGNYVnBjbVVvSnk0dlgyaGhjeWNwTzF4dWRtRnlJSFJ2U1U5aWFtVmpkQ0E5SUhKbGNYVnBjbVVvSnk0dlgzUnZMV2x2WW1wbFkzUW5LVHRjYm5aaGNpQmhjbkpoZVVsdVpHVjRUMllnUFNCeVpYRjFhWEpsS0NjdUwxOWhjbkpoZVMxcGJtTnNkV1JsY3ljcEtHWmhiSE5sS1R0Y2JuWmhjaUJKUlY5UVVrOVVUeUE5SUhKbGNYVnBjbVVvSnk0dlgzTm9ZWEpsWkMxclpYa25LU2duU1VWZlVGSlBWRThuS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9iMkpxWldOMExDQnVZVzFsY3lrZ2UxeHVJQ0IyWVhJZ1R5QTlJSFJ2U1U5aWFtVmpkQ2h2WW1wbFkzUXBPMXh1SUNCMllYSWdhU0E5SURBN1hHNGdJSFpoY2lCeVpYTjFiSFFnUFNCYlhUdGNiaUFnZG1GeUlHdGxlVHRjYmlBZ1ptOXlJQ2hyWlhrZ2FXNGdUeWtnYVdZZ0tHdGxlU0FoUFNCSlJWOVFVazlVVHlrZ2FHRnpLRThzSUd0bGVTa2dKaVlnY21WemRXeDBMbkIxYzJnb2EyVjVLVHRjYmlBZ0x5OGdSRzl1SjNRZ1pXNTFiU0JpZFdjZ0ppQm9hV1JrWlc0Z2EyVjVjMXh1SUNCM2FHbHNaU0FvYm1GdFpYTXViR1Z1WjNSb0lENGdhU2tnYVdZZ0tHaGhjeWhQTENCclpYa2dQU0J1WVcxbGMxdHBLeXRkS1NrZ2UxeHVJQ0FnSUg1aGNuSmhlVWx1WkdWNFQyWW9jbVZ6ZFd4MExDQnJaWGtwSUh4OElISmxjM1ZzZEM1d2RYTm9LR3RsZVNrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYm4wN1hHNGlMQ0l2THlBeE9TNHhMakl1TVRRZ0x5QXhOUzR5TGpNdU1UUWdUMkpxWldOMExtdGxlWE1vVHlsY2JuWmhjaUFrYTJWNWN5QTlJSEpsY1hWcGNtVW9KeTR2WDI5aWFtVmpkQzFyWlhsekxXbHVkR1Z5Ym1Gc0p5azdYRzUyWVhJZ1pXNTFiVUoxWjB0bGVYTWdQU0J5WlhGMWFYSmxLQ2N1TDE5bGJuVnRMV0oxWnkxclpYbHpKeWs3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1QySnFaV04wTG10bGVYTWdmSHdnWm5WdVkzUnBiMjRnYTJWNWN5aFBLU0I3WEc0Z0lISmxkSFZ5YmlBa2EyVjVjeWhQTENCbGJuVnRRblZuUzJWNWN5azdYRzU5TzF4dUlpd2lMeThnYlc5emRDQlBZbXBsWTNRZ2JXVjBhRzlrY3lCaWVTQkZVellnYzJodmRXeGtJR0ZqWTJWd2RDQndjbWx0YVhScGRtVnpYRzUyWVhJZ0pHVjRjRzl5ZENBOUlISmxjWFZwY21Vb0p5NHZYMlY0Y0c5eWRDY3BPMXh1ZG1GeUlHTnZjbVVnUFNCeVpYRjFhWEpsS0NjdUwxOWpiM0psSnlrN1hHNTJZWElnWm1GcGJITWdQU0J5WlhGMWFYSmxLQ2N1TDE5bVlXbHNjeWNwTzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1MwVlpMQ0JsZUdWaktTQjdYRzRnSUhaaGNpQm1iaUE5SUNoamIzSmxMazlpYW1WamRDQjhmQ0I3ZlNsYlMwVlpYU0I4ZkNCUFltcGxZM1JiUzBWWlhUdGNiaUFnZG1GeUlHVjRjQ0E5SUh0OU8xeHVJQ0JsZUhCYlMwVlpYU0E5SUdWNFpXTW9abTRwTzF4dUlDQWtaWGh3YjNKMEtDUmxlSEJ2Y25RdVV5QXJJQ1JsZUhCdmNuUXVSaUFxSUdaaGFXeHpLR1oxYm1OMGFXOXVJQ2dwSUhzZ1ptNG9NU2s3SUgwcExDQW5UMkpxWldOMEp5d2daWGh3S1R0Y2JuMDdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNoaWFYUnRZWEFzSUhaaGJIVmxLU0I3WEc0Z0lISmxkSFZ5YmlCN1hHNGdJQ0FnWlc1MWJXVnlZV0pzWlRvZ0lTaGlhWFJ0WVhBZ0ppQXhLU3hjYmlBZ0lDQmpiMjVtYVdkMWNtRmliR1U2SUNFb1ltbDBiV0Z3SUNZZ01pa3NYRzRnSUNBZ2QzSnBkR0ZpYkdVNklDRW9ZbWwwYldGd0lDWWdOQ2tzWEc0Z0lDQWdkbUZzZFdVNklIWmhiSFZsWEc0Z0lIMDdYRzU5TzF4dUlpd2lkbUZ5SUhOb1lYSmxaQ0E5SUhKbGNYVnBjbVVvSnk0dlgzTm9ZWEpsWkNjcEtDZHJaWGx6SnlrN1hHNTJZWElnZFdsa0lEMGdjbVZ4ZFdseVpTZ25MaTlmZFdsa0p5azdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hyWlhrcElIdGNiaUFnY21WMGRYSnVJSE5vWVhKbFpGdHJaWGxkSUh4OElDaHphR0Z5WldSYmEyVjVYU0E5SUhWcFpDaHJaWGtwS1R0Y2JuMDdYRzRpTENKMllYSWdZMjl5WlNBOUlISmxjWFZwY21Vb0p5NHZYMk52Y21VbktUdGNiblpoY2lCbmJHOWlZV3dnUFNCeVpYRjFhWEpsS0NjdUwxOW5iRzlpWVd3bktUdGNiblpoY2lCVFNFRlNSVVFnUFNBblgxOWpiM0psTFdwelgzTm9ZWEpsWkY5Zkp6dGNiblpoY2lCemRHOXlaU0E5SUdkc2IySmhiRnRUU0VGU1JVUmRJSHg4SUNobmJHOWlZV3hiVTBoQlVrVkVYU0E5SUh0OUtUdGNibHh1S0cxdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0d0bGVTd2dkbUZzZFdVcElIdGNiaUFnY21WMGRYSnVJSE4wYjNKbFcydGxlVjBnZkh3Z0tITjBiM0psVzJ0bGVWMGdQU0IyWVd4MVpTQWhQVDBnZFc1a1pXWnBibVZrSUQ4Z2RtRnNkV1VnT2lCN2ZTazdYRzU5S1NnbmRtVnljMmx2Ym5NbkxDQmJYU2t1Y0hWemFDaDdYRzRnSUhabGNuTnBiMjQ2SUdOdmNtVXVkbVZ5YzJsdmJpeGNiaUFnYlc5a1pUb2djbVZ4ZFdseVpTZ25MaTlmYkdsaWNtRnllU2NwSUQ4Z0ozQjFjbVVuSURvZ0oyZHNiMkpoYkNjc1hHNGdJR052Y0hseWFXZG9kRG9nSjhLcElESXdNVGdnUkdWdWFYTWdVSFZ6YUd0aGNtVjJJQ2g2Ykc5cGNtOWpheTV5ZFNrblhHNTlLVHRjYmlJc0luWmhjaUIwYjBsdWRHVm5aWElnUFNCeVpYRjFhWEpsS0NjdUwxOTBieTFwYm5SbFoyVnlKeWs3WEc1MllYSWdiV0Y0SUQwZ1RXRjBhQzV0WVhnN1hHNTJZWElnYldsdUlEMGdUV0YwYUM1dGFXNDdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwYm1SbGVDd2diR1Z1WjNSb0tTQjdYRzRnSUdsdVpHVjRJRDBnZEc5SmJuUmxaMlZ5S0dsdVpHVjRLVHRjYmlBZ2NtVjBkWEp1SUdsdVpHVjRJRHdnTUNBL0lHMWhlQ2hwYm1SbGVDQXJJR3hsYm1kMGFDd2dNQ2tnT2lCdGFXNG9hVzVrWlhnc0lHeGxibWQwYUNrN1hHNTlPMXh1SWl3aUx5OGdOeTR4TGpRZ1ZHOUpiblJsWjJWeVhHNTJZWElnWTJWcGJDQTlJRTFoZEdndVkyVnBiRHRjYm5aaGNpQm1iRzl2Y2lBOUlFMWhkR2d1Wm14dmIzSTdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZENrZ2UxeHVJQ0J5WlhSMWNtNGdhWE5PWVU0b2FYUWdQU0FyYVhRcElEOGdNQ0E2SUNocGRDQStJREFnUHlCbWJHOXZjaUE2SUdObGFXd3BLR2wwS1R0Y2JuMDdYRzRpTENJdkx5QjBieUJwYm1SbGVHVmtJRzlpYW1WamRDd2dkRzlQWW1wbFkzUWdkMmwwYUNCbVlXeHNZbUZqYXlCbWIzSWdibTl1TFdGeWNtRjVMV3hwYTJVZ1JWTXpJSE4wY21sdVozTmNiblpoY2lCSlQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZhVzlpYW1WamRDY3BPMXh1ZG1GeUlHUmxabWx1WldRZ1BTQnlaWEYxYVhKbEtDY3VMMTlrWldacGJtVmtKeWs3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNocGRDa2dlMXh1SUNCeVpYUjFjbTRnU1U5aWFtVmpkQ2hrWldacGJtVmtLR2wwS1NrN1hHNTlPMXh1SWl3aUx5OGdOeTR4TGpFMUlGUnZUR1Z1WjNSb1hHNTJZWElnZEc5SmJuUmxaMlZ5SUQwZ2NtVnhkV2x5WlNnbkxpOWZkRzh0YVc1MFpXZGxjaWNwTzF4dWRtRnlJRzFwYmlBOUlFMWhkR2d1YldsdU8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9hWFFwSUh0Y2JpQWdjbVYwZFhKdUlHbDBJRDRnTUNBL0lHMXBiaWgwYjBsdWRHVm5aWElvYVhRcExDQXdlREZtWm1abVptWm1abVptWm1abUtTQTZJREE3SUM4dklIQnZkeWd5TENBMU15a2dMU0F4SUQwOUlEa3dNRGN4T1RreU5UUTNOREE1T1RGY2JuMDdYRzRpTENJdkx5QTNMakV1TVRNZ1ZHOVBZbXBsWTNRb1lYSm5kVzFsYm5RcFhHNTJZWElnWkdWbWFXNWxaQ0E5SUhKbGNYVnBjbVVvSnk0dlgyUmxabWx1WldRbktUdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR2wwS1NCN1hHNGdJSEpsZEhWeWJpQlBZbXBsWTNRb1pHVm1hVzVsWkNocGRDa3BPMXh1ZlR0Y2JpSXNJaTh2SURjdU1TNHhJRlJ2VUhKcGJXbDBhWFpsS0dsdWNIVjBJRnNzSUZCeVpXWmxjbkpsWkZSNWNHVmRLVnh1ZG1GeUlHbHpUMkpxWldOMElEMGdjbVZ4ZFdseVpTZ25MaTlmYVhNdGIySnFaV04wSnlrN1hHNHZMeUJwYm5OMFpXRmtJRzltSUhSb1pTQkZVellnYzNCbFl5QjJaWEp6YVc5dUxDQjNaU0JrYVdSdUozUWdhVzF3YkdWdFpXNTBJRUJBZEc5UWNtbHRhWFJwZG1VZ1kyRnpaVnh1THk4Z1lXNWtJSFJvWlNCelpXTnZibVFnWVhKbmRXMWxiblFnTFNCbWJHRm5JQzBnY0hKbFptVnljbVZrSUhSNWNHVWdhWE1nWVNCemRISnBibWRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMExDQlRLU0I3WEc0Z0lHbG1JQ2doYVhOUFltcGxZM1FvYVhRcEtTQnlaWFIxY200Z2FYUTdYRzRnSUhaaGNpQm1iaXdnZG1Gc08xeHVJQ0JwWmlBb1V5QW1KaUIwZVhCbGIyWWdLR1p1SUQwZ2FYUXVkRzlUZEhKcGJtY3BJRDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdJV2x6VDJKcVpXTjBLSFpoYkNBOUlHWnVMbU5oYkd3b2FYUXBLU2tnY21WMGRYSnVJSFpoYkR0Y2JpQWdhV1lnS0hSNWNHVnZaaUFvWm00Z1BTQnBkQzUyWVd4MVpVOW1LU0E5UFNBblpuVnVZM1JwYjI0bklDWW1JQ0ZwYzA5aWFtVmpkQ2gyWVd3Z1BTQm1iaTVqWVd4c0tHbDBLU2twSUhKbGRIVnliaUIyWVd3N1hHNGdJR2xtSUNnaFV5QW1KaUIwZVhCbGIyWWdLR1p1SUQwZ2FYUXVkRzlUZEhKcGJtY3BJRDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdJV2x6VDJKcVpXTjBLSFpoYkNBOUlHWnVMbU5oYkd3b2FYUXBLU2tnY21WMGRYSnVJSFpoYkR0Y2JpQWdkR2h5YjNjZ1ZIbHdaVVZ5Y205eUtGd2lRMkZ1SjNRZ1kyOXVkbVZ5ZENCdlltcGxZM1FnZEc4Z2NISnBiV2wwYVhabElIWmhiSFZsWENJcE8xeHVmVHRjYmlJc0luWmhjaUJwWkNBOUlEQTdYRzUyWVhJZ2NIZ2dQU0JOWVhSb0xuSmhibVJ2YlNncE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9hMlY1S1NCN1hHNGdJSEpsZEhWeWJpQW5VM2x0WW05c0tDY3VZMjl1WTJGMEtHdGxlU0E5UFQwZ2RXNWtaV1pwYm1Wa0lEOGdKeWNnT2lCclpYa3NJQ2NwWHljc0lDZ3JLMmxrSUNzZ2NIZ3BMblJ2VTNSeWFXNW5LRE0yS1NrN1hHNTlPMXh1SWl3aWRtRnlJQ1JsZUhCdmNuUWdQU0J5WlhGMWFYSmxLQ2N1TDE5bGVIQnZjblFuS1R0Y2JpOHZJREU1TGpFdU1pNDBJQzhnTVRVdU1pNHpMallnVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtFOHNJRkFzSUVGMGRISnBZblYwWlhNcFhHNGtaWGh3YjNKMEtDUmxlSEJ2Y25RdVV5QXJJQ1JsZUhCdmNuUXVSaUFxSUNGeVpYRjFhWEpsS0NjdUwxOWtaWE5qY21sd2RHOXljeWNwTENBblQySnFaV04wSnl3Z2V5QmtaV1pwYm1WUWNtOXdaWEowZVRvZ2NtVnhkV2x5WlNnbkxpOWZiMkpxWldOMExXUndKeWt1WmlCOUtUdGNiaUlzSWk4dklERTVMakV1TWk0eE5DQlBZbXBsWTNRdWEyVjVjeWhQS1Z4dWRtRnlJSFJ2VDJKcVpXTjBJRDBnY21WeGRXbHlaU2duTGk5ZmRHOHRiMkpxWldOMEp5azdYRzUyWVhJZ0pHdGxlWE1nUFNCeVpYRjFhWEpsS0NjdUwxOXZZbXBsWTNRdGEyVjVjeWNwTzF4dVhHNXlaWEYxYVhKbEtDY3VMMTl2WW1wbFkzUXRjMkZ3Snlrb0oydGxlWE1uTENCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaUJyWlhsektHbDBLU0I3WEc0Z0lDQWdjbVYwZFhKdUlDUnJaWGx6S0hSdlQySnFaV04wS0dsMEtTazdYRzRnSUgwN1hHNTlLVHRjYmlJc0ltbHRjRzl5ZENCTWIyZG5aWElnWm5KdmJTQW5MaTlzYjJkblpYSW5YRzVwYlhCdmNuUWdUVzlrZFd4bElHWnliMjBnSnk0dmJXOWtkV3hsSjF4dVhHNWxlSEJ2Y25RZ1kyOXVjM1FnUjFORlFpQTlJQ1F1WlhoMFpXNWtLSGRwYm1SdmR5NUhVMFZDTENBb0tDa2dQVDRnZTF4dUlDQnlaWFIxY200Z2UxeHVJQ0FnSUcxdlpIVnNaWE02SUZ0ZExGeHVJQ0FnSUhWelpTQW9iVzlrZFd4bExDQnZjSFJwYjI1ektTQjdYRzRnSUNBZ0lDQnBaaUFvZEdocGN5NXRiMlIxYkdWekxtWnBibVJKYm1SbGVDZ29iVzlrS1NBOVBpQnRiMlF1Ym1GdFpTQTlQVDBnYlc5a2RXeGxMbTVoYldVcElEd2dNQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbTF2WkhWc1pYTXVjSFZ6YUNodVpYY2dUVzlrZFd4bEtHMXZaSFZzWlN3Z2IzQjBhVzl1Y3lrcFhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlN4Y2JpQWdJQ0JpYjI5MGMzUnlZWEJ3YVc1bklDaHRiMlIxYkdWektTQjdYRzRnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWduUjFORlFpQmliMjkwYzNSeVlYQndhVzVuSUcxdlpIVnNaU2NzSUcxdlpIVnNaWE1wWEc0Z0lDQWdJQ0J0YjJSMWJHVnpMbWx0Y0c5eWRITXVabTl5UldGamFDZ29iVzlrZFd4bEtTQTlQaUI3WEc0Z0lDQWdJQ0FnSUdsbUlDaEJjbkpoZVM1cGMwRnljbUY1S0cxdlpIVnNaU2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TG5WelpTaHRiMlIxYkdWYk1GMHNJRzF2WkhWc1pWc3hYU2xjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMblZ6WlNodGIyUjFiR1VwWEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgwcFhHNGdJQ0FnZlZ4dUlDQjlYRzU5S1NncEtWeHVYRzVsZUhCdmNuUWdZMjl1YzNRZ1kyOXVjMjlzWlNBOUlFeHZaMmRsY2x4dUlpd2lYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQjNhVzVrYjNjdVkyOXVjMjlzWlNBOUlDUXVaWGgwWlc1a0tIdDlMQ0IzYVc1a2IzY3VZMjl1YzI5c1pTd2dLQ2hmWTI5dWMyOXNaU2tnUFQ0Z2UxeHVJQ0IzYVc1a2IzY3VYMk52Ym5OdmJHVWdQU0JmWTI5dWMyOXNaVnh1SUNCeVpYUjFjbTRnZTF4dUlDQWdJR3h2WnlBb0xpNHVZWEpuY3lrZ2UxeHVJQ0FnSUNBZ2FXWWdLQ0ZIVTBWQ0xtUmxZblZuS1NCeVpYUjFjbTVjYmlBZ0lDQWdJRjlqYjI1emIyeGxMbXh2Wnk1aGNIQnNlU2hmWTI5dWMyOXNaU3dnWVhKbmN5bGNiaUFnSUNCOUxGeHVJQ0FnSUdsdVptOGdLQzR1TG1GeVozTXBJSHRjYmlBZ0lDQWdJR2xtSUNnaFIxTkZRaTVrWldKMVp5a2djbVYwZFhKdVhHNGdJQ0FnSUNCZlkyOXVjMjlzWlM1cGJtWnZMbUZ3Y0d4NUtGOWpiMjV6YjJ4bExDQmhjbWR6S1Z4dUlDQWdJSDBzWEc0Z0lDQWdkMkZ5YmlBb0xpNHVZWEpuY3lrZ2UxeHVJQ0FnSUNBZ2FXWWdLQ0ZIVTBWQ0xtUmxZblZuS1NCeVpYUjFjbTVjYmlBZ0lDQWdJRjlqYjI1emIyeGxMbmRoY200dVlYQndiSGtvWDJOdmJuTnZiR1VzSUdGeVozTXBYRzRnSUNBZ2ZTeGNiaUFnSUNCbGNuSnZjaUFvTGk0dVlYSm5jeWtnZTF4dUlDQWdJQ0FnYVdZZ0tDRkhVMFZDTG1SbFluVm5LU0J5WlhSMWNtNWNiaUFnSUNBZ0lGOWpiMjV6YjJ4bExtVnljbTl5TG1Gd2NHeDVLRjlqYjI1emIyeGxMQ0JoY21kektWeHVJQ0FnSUgwc1hHNGdJQ0FnWkdWaWRXY2dLQzR1TG1GeVozTXBJSHRjYmlBZ0lDQWdJR2xtSUNnaFIxTkZRaTVrWldKMVp5a2djbVYwZFhKdVhHNGdJQ0FnSUNCZlkyOXVjMjlzWlM1a1pXSjFaeTVoY0hCc2VTaGZZMjl1YzI5c1pTd2dZWEpuY3lsY2JpQWdJQ0I5WEc0Z0lIMWNibjBwS0hkcGJtUnZkeTVqYjI1emIyeGxLU2xjYmlJc0lseHVaWGh3YjNKMElHUmxabUYxYkhRZ1kyeGhjM01nVFc5a2RXeGxJSHRjYmlBZ1kyOXVjM1J5ZFdOMGIzSWdLRzF2WkhWc1pTd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lIUm9hWE11Ym1GdFpTQTlJQ2R1WVcxbEoxeHVYRzRnSUNBZ0x5OGdWR2hsSUhKdmIzUWdSRTlOSUdWc1pXMWxiblFnZEdoaGRDQjBhR1VnYlc5a2RXeGxJR2x1YzNSaGJtTmxJR2x6SUcxaGJtRm5hVzVuTGx4dUlDQWdJR052Ym5OMElDUmxiR1Z0Wlc1MElEMGdKQ2dvYlc5a2RXeGxMbTl3ZEdsdmJuTWdQeUJ0YjJSMWJHVXViM0IwYVc5dWN5NWxiQ0E2SUhWdVpHVm1hVzVsWkNrZ2ZId2diVzlrZFd4bExtVnNJSHg4SUdSdlkzVnRaVzUwS1Z4dUlDQWdJRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNoMGFHbHpMQ0FuSkdWc1pXMWxiblFuTENCN1hHNGdJQ0FnSUNBdkx5QkRjbVZoZEdVZ1lTQnVaWGNnWjJWMGRHVnlJR1p2Y2lBa1pXeGxiV1Z1ZENCd2NtOXdaWEowZVZ4dUlDQWdJQ0FnWjJWMElDZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJQ1JsYkdWdFpXNTBYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTbGNibHh1SUNBZ0lDOHZJR3h2WVdRZ2MzUmhkR1V2YldWMGFHOWtJQzR1TGlCbWNtOXRJRzF2WkhWc1pTQmtaV1pwYm1sMGFXOXVYRzRnSUNBZ0pDNWxlSFJsYm1Rb2RHaHBjeXdnYlc5a2RXeGxMbTFsZEdodlpITWdmSHdnZTMwc0lDZ29LU0E5UGlCN1hHNGdJQ0FnSUNCa1pXeGxkR1VnYlc5a2RXeGxMbTFsZEdodlpITmNiaUFnSUNBZ0lISmxkSFZ5YmlCdGIyUjFiR1ZjYmlBZ0lDQjlLU2dwS1Z4dVhHNGdJQ0FnTHk4Z1kzSmxZWFJsSUdkbGRIUmxjaTl6WlhSMFpYSWdMaTR1SUdadmNpQnRiMlIxYkdVZ2MzUmhkR1ZjYmlBZ0lDQlBZbXBsWTNRdWEyVjVjeWh0YjJSMWJHVXVjM1JoZEdVZ2ZId2dlMzBwTG1admNrVmhZMmdvWm5WdVkzUnBiMjRnS0hCeWIzQXBJSHRjYmlBZ0lDQWdJRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNoMGFHbHpMQ0J3Y205d0xDQjdYRzRnSUNBZ0lDQWdJQzh2SUVOeVpXRjBaU0JoSUc1bGR5Qm5aWFIwWlhJZ1ptOXlJSFJvWlNCd2NtOXdaWEowZVZ4dUlDQWdJQ0FnSUNCblpYUWdLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdGIyUjFiR1V1YzNSaGRHVmJjSEp2Y0YxY2JpQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdMeThnUTNKbFlYUmxJR0VnYm1WM0lITmxkSFJsY2lCbWIzSWdkR2hsSUhCeWIzQmxjblI1WEc0Z0lDQWdJQ0FnSUhObGRDQW9kbUZzZFdVcElIdGNiaUFnSUNBZ0lDQWdJQ0J0YjJSMWJHVXVjM1JoZEdWYmNISnZjRjBnUFNCMllXeDFaVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5S1Z4dUlDQWdJSDBzSUhSb2FYTXBYRzVjYmlBZ0lDQXZMeUJqY21WaGRHVWdaMlYwZEdWeUlDNHVMaUJtYjNJZ1JFOU5JRVZzWlcxbGJuUnpYRzRnSUNBZ1QySnFaV04wTG10bGVYTW9iVzlrZFd4bExtOXdkR2x2Ym5NZ2ZId2dlMzBwTG1admNrVmhZMmdvWm5WdVkzUnBiMjRnS0hCeWIzQXBJSHRjYmlBZ0lDQWdJR2xtSUNod2NtOXdMbk4wWVhKMGMxZHBkR2dvSnlRbktTa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQWtaV3hsYlNBOUlDZ29jMlZzWldOMGIzSXBJRDArSUhCeWIzQXViV0YwWTJnb0wxeGNKRnRCTFZwZEwyY3BJRDhnSkNoelpXeGxZM1J2Y2lrZ09pQjBhR2x6TGlSbGJHVnRaVzUwTG1acGJtUW9jMlZzWldOMGIzSXBLU2h0YjJSMWJHVXViM0IwYVc5dWMxdHdjbTl3WFNsY2JpQWdJQ0FnSUNBZ1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLSFJvYVhNc0lIQnliM0FzSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJEY21WaGRHVWdZU0J1WlhjZ1oyVjBkR1Z5SUdadmNpQjBhR1VnY0hKdmNHVnlkSGxjYmlBZ0lDQWdJQ0FnSUNCblpYUWdLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlDUmxiR1Z0WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlLVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHNJSFJvYVhNcFhHNWNiaUFnSUNBdkx5QnBibWwwSUcxdlpIVnNaVnh1SUNBZ0lHbG1JQ2gwYUdsekxpUmxiR1Z0Wlc1MExteGxibWQwYUNrZ2V5QjBhR2x6TG1sdWMzUmhiR3dvUjFORlFpd2diM0IwYVc5dWN5a2dmVnh1WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE5jYmlBZ2ZWeHVYRzRnSUdsdWMzUmhiR3dnS0VkVFJVSXNJRzl3ZEdsdmJuTXBJSHRjYmlBZ0lDQmpiMjV6YjJ4bExteHZaeWgwYUdsekxtNWhiV1VzSUNkdGIyUjFiR1VnYkc5aFpHbHVaeUF1TGk0bktWeHVJQ0I5WEc1OVhHNGlMQ0pjYmk4cUtseHVJQ29nUTJ4aGMzTTZJRTlpYzJWeWRtRmliR1ZjYmlBcUlFVjRkR1Z1WkRvZ1JHVm1aWEp5WldSY2JpQXFYRzRnS2k5Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1kyeGhjM01nVDJKelpYSjJZV0pzWlNCN1hHNGdJR052Ym5OMGNuVmpkRzl5SUNncElIdGNiaUFnSUNBa0xtVjRkR1Z1WkNoMGFHbHpMQ0FrTGtSbFptVnljbVZrS0NrcFhHNGdJSDFjYmx4dUlDQnVaWGgwSUNoMllXeDFaU2tnZTF4dUlDQWdJR2xtSUNoMGFHbHpMbk5yYVhBZ2ZId2dkR2hwY3k1emEybHdRV3hzS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbk5yYVhBZ1BTQW9kbUZzZFdVZ1BUMDlJQ2R6YTJsd0p5bGNiaUFnSUNBZ0lIUm9hWE11YzJ0cGNFRnNiQ0E5SUhSb2FYTXVjMnRwY0VGc2JDQW1KaUFvZG1Gc2RXVWdJVDA5SUNkaFkzUnBkbUYwWlNjcFhHNGdJQ0FnSUNCeVpYUjFjbTRnZEdocGMxeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RtRnNkV1VnUFQwOUlDZHphMmx3SnlCOGZDQjJZV3gxWlNBOVBUMGdKM05yYVhCQmJHd25LU0I3WEc0Z0lDQWdJQ0IwYUdselczWmhiSFZsSUQwOVBTQW5jMnRwY0NjZ2ZId2dkbUZzZFdVZ1BUMDlJQ2R6YTJsd1FXeHNKeUEvSUhaaGJIVmxJRG9nSjJselFXTjBhWFpsSjEwZ1BTQjBjblZsWEc0Z0lDQWdJQ0J5WlhSMWNtNGdkR2hwYzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2RHaHBjeTV1YjNScFpua29kbUZzZFdVcFhHNGdJSDFjYmx4dUlDQnpkV0p6WTNKcFltVWdLR05oYkd4aVlXTnJLU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11Y0hKdlozSmxjM01vWm5WdVkzUnBiMjRnS0haaGJIVmxLU0I3WEc0Z0lDQWdJQ0JqWVd4c1ltRmpheTVqWVd4c0tIUm9hWE1zSUhaaGJIVmxLVnh1SUNBZ0lIMHBYRzRnSUgxY2JuMWNibHh1ZDJsdVpHOTNMaVJ2WW5ObGNuWmhZbXhsY3lBOUlIdDlJSHg4SUhkcGJtUnZkeTRrYjJKelpYSjJZV0pzWlhOY2JuZHBibVJ2ZHk1UFluTmxjblpoWW14bElEMGdUMkp6WlhKMllXSnNaVnh1WEc1bGVIQnZjblFnWTI5dWMzUWdKRzlpYzJWeWRtRmliR1Z6SUQwZ2QybHVaRzkzTGlSdlluTmxjblpoWW14bGMxeHVJaXdpTHlvcVhHNGdLaUFnYVcxd2IzSjBJRzl3ZEdsdmJuTkdZV04wYjNKNUlHWnliMjBnSnk0dmIzQjBhVzl1Y3lkY2JpQXFMMXh1WEc0dkx5QmxlSEJ2Y25SelhHNWNibVY0Y0c5eWRDQmpiMjV6ZENCTmIySjViR1YwZEdVZ1BTQjdYRzRnSUc1aGJXVTZJQ2R0YjJKNWJHVjBkR1VuTEZ4dUlDQmxiRG9nSnlOdGIySjViR1YwZEdVbkxGeHVJQ0J2Y0hScGIyNXpPaUI3WEc0Z0lDQWdMeThnYzJWc1pXTjBiM0p6WEc0Z0lDQWdKRzFoYVc1RGIyNTBZV2x1WlhJNklDY2pjMlZoY21Ob0xXeHBjM1F0Y0dGblpTMHRabWxzZEdWeWN5MWpiMjUwWVdsdVpYSW5MRnh1SUNBZ0lDUm1hV3gwWlhKRGIyNTBZV2x1WlhJNklDY2pjMlZoY21Ob0xXeHBjM1F0Y0dGblpTMHRabWxzZEdWeWN5Y3NYRzRnSUNBZ0pHTnNiM05sUW5SdU9pQW5JM05sWVhKamFDMXNhWE4wTFhCaFoyVXRMV1pwYkhSbGNuTXRZMnh2YzJVZ1BpQXVZMnh2YzJVbkxGeHVJQ0FnSUNSdFlXbHVRblJ1T2lBbkkzTmxZWEpqYUMxc2FYTjBMWEJoWjJVdExXWnBiSFJsY25NdFluUnVJRDRnTG1KMGJpY3NYRzRnSUNBZ0pIVndaR0YwWlVKeVpXRmtRM0oxYldJNklDY3VabWxzZEhKbFpHSjVMUzFpY21WaFpHTnlkVzFpSnl4Y2JpQWdJQ0F2THlCelpXeGxZM1J2Y2lCdmRYUWdiMllnSkdWc1pXMWxiblFnSkZ0QkxWcGRYRzRnSUNBZ0pGZHBibVJ2ZHpvZ2QybHVaRzkzTEZ4dUlDQWdJQ1JDYjJSNU9pQW5ZbTlrZVNjc1hHNGdJQ0FnTHk4Z1pHVm1ZWFZzZENCdmNIUnBiMjV6WEc0Z0lDQWdiV0Y0VjJsa2RHZzZJRGN5TUN4Y2JpQWdJQ0IxY0dSaGRHRmliR1ZCY21WaE9pQjdYRzRnSUNBZ0lDQWtjMlZoY21Ob1RHbHpkRkpsYzNWc2RITTZJQ2N1Y205M0xXWnNkV2xrTG5CeWIyUjFZM1F0WTJGMExuQnliMlIxWTNRdFptRnhMbkJ5YjJSMVkzUXRabUZ4TFhKbGMzVnNkSE11YzJWaGNtTm9MV3hwYzNRbkxGeHVJQ0FnSUNBZ0pIUnZkR0ZzVW1WemRXeDBjem9nSnk1eWIzY3RabXgxYVdRdVlteHZZeTVpYkc5akxYTmxieUF1ZEc5MFlXd3RjbVZ6ZFd4MGN5Y3NYRzRnSUNBZ0lDQWtkWEJrWVhSbFVtVnpkV3gwYzFSaGNtZGxkRG9nSnlObWFXeDBjbVZrVkc5MFlXeFNaWE4xYkhSekp5eGNiaUFnSUNBZ0lDUjFjR1JoZEdWQ2NtVmhaRU55ZFcxaU9pQW5MbVpwYkhSeVpXUmllUzB0WW5KbFlXUmpjblZ0WWlkY2JseHVJQ0FnSUgwc1hHNGdJQ0FnYzJOeWIyeHNUM0IwYVc5dWN6b2dlMXh1SUNBZ0lDQWdZWFYwYjJocFpHVnRiMlJsT2lBbmFHbGtaR1Z1Snl4Y2JpQWdJQ0FnSUdsbWNtRnRaV0YxZEc5eVpYTnBlbVU2SUhSeWRXVXNYRzRnSUNBZ0lDQmpkWEp6YjNKdmNHRmphWFI1YldsdU9pQXdYRzRnSUNBZ2ZWeHVYRzRnSUgwc1hHNGdJSE4wWVhSbE9pQjdYRzRnSUNBZ2JHRnpkRkpsY1hWbGMzUTZJRzUxYkd4Y2JpQWdmU3hjYmlBZ2JXVjBhRzlrY3pvZ2UxeHVJQ0FnSUc5d1pXNGdLQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tDRjBhR2x6TG1selQzQmxiaWdwS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11SkcxaGFXNUNkRzR1ZEdWNGRDaDBhR2x6TGlSdFlXbHVRblJ1TG1SaGRHRW9KM1JsZUhRdGIzQmxibVZrSnlrcFhHNGdJQ0FnSUNBZ0lIUm9hWE11SkcxaGFXNURiMjUwWVdsdVpYSXVZV1JrUTJ4aGMzTW9KMmx1SnlsY2JpQWdJQ0FnSUNBZ2RHaHBjeTRrUW05a2VTNWhaR1JEYkdGemN5Z25ibTh0YjNabGNtWnNiM2NuS1Z4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NGtiV0ZwYmtKMGJpNTBaWGgwS0hSb2FYTXVKRzFoYVc1Q2RHNHVaR0YwWVNnbmRHVjRkQzFqYkc5elpXUW5LU2xjYmlBZ0lDQWdJQ0FnZEdocGN5NXlaV3h2WVdRb0tWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNGdJQ0FnWTJ4dmMyVWdLQ2tnZTF4dUlDQWdJQ0FnZDJsdVpHOTNMbVZ1WVdKc1pVZHNiMkpoYkZOamNtOXNiQ2dwWEc0Z0lDQWdJQ0IwYUdsekxpUnRZV2x1UTI5dWRHRnBibVZ5TG5KbGJXOTJaVU5zWVhOektDZHBiaWNwWEc0Z0lDQWdJQ0IwYUdsekxpUkNiMlI1TG5KbGJXOTJaVU5zWVhOektDZHVieTF2ZG1WeVpteHZkeWNwWEc0Z0lDQWdmU3hjYmlBZ0lDQjFjR1JoZEdWVFkzSnliMnhzSUNncElIdGNiaUFnSUNBZ0lHbG1JQ2gwYUdsekxpUlhhVzVrYjNjdWQybGtkR2dvS1NBOFBTQjBhR2x6TG05d2RHbHZibk11YldGNFYybGtkR2dwSUh0Y2JpQWdJQ0FnSUNBZ0pDZ25JM05sWVhKamFDMXNhWE4wTFhCaFoyVXRMV1pwYkhSbGNuTXRZMjl1ZEdGcGJtVnlKeWt1YzJOeWIyeHNWRzl3S0RBcFhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlN4Y2JpQWdJQ0JrWldKdmRXNWpaVG9nWm5WdVkzUnBiMjRnS0daMWJtTXNJSGRoYVhRc0lHbHRiV1ZrYVdGMFpTa2dlMXh1SUNBZ0lDQWdkbUZ5SUhScGJXVnZkWFJjYmlBZ0lDQWdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQmpiMjUwWlhoMElEMGdkR2hwYzF4dUlDQWdJQ0FnSUNCMllYSWdZWEpuY3lBOUlHRnlaM1Z0Wlc1MGMxeHVJQ0FnSUNBZ0lDQjJZWElnYkdGMFpYSWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2x0Wlc5MWRDQTlJRzUxYkd4Y2JpQWdJQ0FnSUNBZ0lDQnBaaUFvSVdsdGJXVmthV0YwWlNrZ1puVnVZeTVoY0hCc2VTaGpiMjUwWlhoMExDQmhjbWR6S1Z4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIWmhjaUJqWVd4c1RtOTNJRDBnYVcxdFpXUnBZWFJsSUNZbUlDRjBhVzFsYjNWMFhHNGdJQ0FnSUNBZ0lHTnNaV0Z5VkdsdFpXOTFkQ2gwYVcxbGIzVjBLVnh1SUNBZ0lDQWdJQ0IwYVcxbGIzVjBJRDBnYzJWMFZHbHRaVzkxZENoc1lYUmxjaXdnZDJGcGRDbGNiaUFnSUNBZ0lDQWdhV1lnS0dOaGJHeE9iM2NwSUdaMWJtTXVZWEJ3Ykhrb1kyOXVkR1Y0ZEN3Z1lYSm5jeWxjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1SUNBZ0lDOHZJSFZ3WkdGMFpWTmpjbkp2Ykd3b0tYdGNiaUFnSUNBdkx5QWdJQ0FnYVdZZ0tIUm9hWE11SkZkcGJtUnZkeTUzYVdSMGFDZ3BJRHc5SUhSb2FYTXViM0IwYVc5dWN5NXRZWGhYYVdSMGFDa2dlMXh1SUNBZ0lDOHZJQ0FnSUNBZ0lDQWdiR1YwSUhkcGJtUnZkMGhsYVdkb2RDQTlJQ1FvZDJsdVpHOTNLUzVvWldsbmFIUW9LU0F0SUNRb1hDSWpjMlZoY21Ob0xXeHBjM1F0Y0dGblpTMHRabWxzZEdWeWN5MWlkRzVjSWlrdWIzVjBaWEpJWldsbmFIUW9LVHRjYmlBZ0lDQXZMeUFnSUNBZ0lDQWdJR2xtS0NRb1hDSWpjMlZoY21Ob0xXeHBjM1F0Y0dGblpTMHRabWxzZEdWeWN5MWpiMjUwWVdsdVpYSmNJaWt1YkdWdVozUm9LWHRjYmlBZ0lDQXZMeUFnSUNBZ0lDQWdJQ0FnSUNBa0tGd2lJM05sWVhKamFDMXNhWE4wTFhCaFoyVXRMV1pwYkhSbGNuTXRZMjl1ZEdGcGJtVnlYQ0lwTG1OemN5Z25hR1ZwWjJoMEp5d2dkMmx1Wkc5M1NHVnBaMmgwS1Z4dUlDQWdJQzh2SUNBZ0lDQWdJQ0FnSUNBZ0lDUW9YQ0lqYzJWaGNtTm9MV3hwYzNRdGNHRm5aUzB0Wm1sc2RHVnljeTFqYjI1MFlXbHVaWEpjSWlrdVoyVjBUbWxqWlZOamNtOXNiQ2dwTG5KbGMybDZaU2dwWEc0Z0lDQWdMeThnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdMeThnSUNBZ0lIMWNiaUFnSUNBdkx5QjlMRnh1SUNBZ0lHbHpUM0JsYmlBb0tTQjdYRzRnSUNBZ0lDQjNhVzVrYjNjdVpHbHpZV0pzWlVkc2IySmhiRk5qY205c2JDZ3BYRzRnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTRrYldGcGJrTnZiblJoYVc1bGNpNXBjeWduTG1sdUp5bGNiaUFnSUNCOUxGeHVJQ0FnSUdacGJIUmxjaUFvWlhabGJuUXBJSHRjYmlBZ0lDQWdJR2xtSUNoMGFHbHpMaVJYYVc1a2IzY3VkMmxrZEdnb0tTQThQU0IwYUdsekxtOXdkR2x2Ym5NdWJXRjRWMmxrZEdncElIdGNiaUFnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvSjJacGJIUmxjaWNzSUdWMlpXNTBLVnh1SUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZENncFhHNGdJQ0FnSUNBZ0lHVjJaVzUwTG5OMGIzQlFjbTl3WVdkaGRHbHZiaWdwWEc0Z0lDQWdJQ0FnSUNRdVoyVjBLQ2MvSnlBcklDUW9aWFpsYm5RdWRHRnlaMlYwS1M1elpYSnBZV3hwZW1Vb0tTbGNiaUFnSUNBZ0lDQWdJQ0F1Wkc5dVpTZ29aR0YwWVNrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVzWVhOMFVtVnhkV1Z6ZENBOUlDUW9aWFpsYm5RdWRHRnlaMlYwS1M1elpYSnBZV3hwZW1Vb0tWeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z2RYQmtZWFJsSUdacGJIUmxjbk5jYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11SkdacGJIUmxja052Ym5SaGFXNWxjaTVvZEcxc0tDUW9aR0YwWVNrdVptbHVaQ2gwYUdsekxtOXdkR2x2Ym5NdUpHWnBiSFJsY2tOdmJuUmhhVzVsY2lrdWFIUnRiQ2dwS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k0a1ptbHNkR1Z5UTI5dWRHRnBibVZ5TG1acGJtUW9KeTVtWVdObGRGWmhiSFZsY3lCbWIzSnRKeWt1YzNWaWJXbDBLQ2hsZG1WdWRDa2dQVDRnZEdocGN5NW1hV3gwWlhJb1pYWmxiblFwS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdOb1pXTnJaV1JHYVd4MFpYSnpJRDBnSkNnbkkyMXZZbmxzWlhSMFpTQnBibkIxZERwamFHVmphMkp2ZURwamFHVmphMlZrSnlrdWJXRndLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJQ1FvZEdocGN5a3VaR0YwWVNnblptRmpaWFF0WTI5a1pTY3BYRzRnSUNBZ0lDQWdJQ0FnSUNCOUtTNW5aWFFvS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdGamRHbDJaVUp5WldGa1kzSjFiV0p6SUQwZ0pDZ25MbU55ZFcxaWN5QXVZM0oxYldJZ1lWdGtZWFJoTFdaaFkyVjBMV052WkdWZEp5a3ViV0Z3S0daMWJtTjBhVzl1SUNncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUNRb2RHaHBjeWt1WkdGMFlTZ25abUZqWlhRdFkyOWtaU2NwWEc0Z0lDQWdJQ0FnSUNBZ0lDQjlLUzVuWlhRb0tWeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHUnBabVpsY21WdVkyVWdQU0JoWTNScGRtVkNjbVZoWkdOeWRXMWljeTVtYVd4MFpYSW9lQ0E5UGlBaFkyaGxZMnRsWkVacGJIUmxjbk11YVc1amJIVmtaWE1vZUNrcFhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1pHbG1abVZ5Wlc1alpTNXNaVzVuZEdncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1pHbG1abVZ5Wlc1alpTNW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaGxiR1Z0Wlc1MFZHOUVaV3hsZEdVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtLRndpTG1OeWRXMWljeUF1WTNKMWJXSWdZVnRrWVhSaExXWmhZMlYwTFdOdlpHVTlKMXdpSUNzZ1pXeGxiV1Z1ZEZSdlJHVnNaWFJsSUNzZ1hDSW5YVndpS1M1d1lYSmxiblFvS1M1eVpXMXZkbVVvS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1Z4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnNaWFFnZFhCa1lYUmxaRUoxZEc0Z1BTQWtLR1JoZEdFcExtWnBibVFvZEdocGN5NXZjSFJwYjI1ekxpUnRZV2x1UW5SdUtTNWtZWFJoS0NkMFpYaDBMVzl3Wlc1bFpDY3BYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMaVJ0WVdsdVFuUnVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDNW9kRzFzS0hWd1pHRjBaV1JDZFhSdUtWeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NGtiV0ZwYmtKMGJpNWtZWFJoS0NkMFpYaDBMVzl3Wlc1bFpDY3NJSFZ3WkdGMFpXUkNkWFJ1S1Z4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1MWNHUmhkR1ZUWTNKeWIyeHNLQ2xjYmlBZ0lDQWdJQ0FnSUNCOUtWeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1ptRnNjMlZjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1SUNBZ0lIVndaR0YwWlZCaFoyVkRiMjUwWlc1MElDaGtZWFJoS1NCN1hHNGdJQ0FnSUNBdkx5QjFjR1JoZEdVZ2NHRm5aU0JqYjI1MFpXNTBYRzRnSUNBZ0lDQm1iM0lnS0d4bGRDQnpaV3hsWTNSdmNpQnBiaUIwYUdsekxtOXdkR2x2Ym5NdWRYQmtZWFJoWW14bFFYSmxZU2tnZTF4dUlDQWdJQ0FnSUNBa0tIUm9hWE11YjNCMGFXOXVjeTUxY0dSaGRHRmliR1ZCY21WaFczTmxiR1ZqZEc5eVhTbGNiaUFnSUNBZ0lDQWdJQ0F1YUhSdGJDZ2tLR1JoZEdFcExtWnBibVFvZEdocGN5NXZjSFJwYjI1ekxuVndaR0YwWVdKc1pVRnlaV0ZiYzJWc1pXTjBiM0pkS1M1b2RHMXNLQ2twWEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU3hjYmlBZ0lDQnlaV3h2WVdRZ0tHVjJaVzUwS1NCN1hHNGdJQ0FnSUNCcFppQW9kR2hwY3k1c1lYTjBVbVZ4ZFdWemRDa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQm9hWE4wYjNKNVJXNTBjbmtnUFNCN1hHNGdJQ0FnSUNBZ0lDQWdkSGx3WlRvZ0ozTmxZWEpqYUMxc2FYTjBMWEJoWjJVdGFHbHpkRzl5ZVMxbGJuUnllU2NzWEc0Z0lDQWdJQ0FnSUNBZ1pHRjBZVG9nYm5Wc2JDeGNiaUFnSUNBZ0lDQWdJQ0IwYVhSc1pUb2daRzlqZFcxbGJuUXVkR2wwYkdVc1hHNGdJQ0FnSUNBZ0lDQWdkWEpzT2lCM2FXNWtiM2N1Ykc5allYUnBiMjR1Y0dGMGFHNWhiV1VnS3lBblB5Y2dLeUIwYUdsekxteGhjM1JTWlhGMVpYTjBYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSkM1blpYUW9KejhuSUNzZ2RHaHBjeTVzWVhOMFVtVnhkV1Z6ZENsY2JpQWdJQ0FnSUNBZ0lDQXVaRzl1WlNnb1pHRjBZU2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdkWEJrWVhSbElIQmhaMlVnWTI5dWRHVnVkRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG5Wd1pHRjBaVkJoWjJWRGIyNTBaVzUwS0dSaGRHRXBYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdMeThnVFdGdWFYQjFiR0YwWlNCb2FYTjBiM0o1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJR2hwYzNSdmNubEZiblJ5ZVM1a1lYUmhJRDBnWkdGMFlWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCb2FYTjBiM0o1TG5CMWMyaFRkR0YwWlNob2FYTjBiM0o1Ulc1MGNua3NJR2hwYzNSdmNubEZiblJ5ZVM1MGFYUnNaU3dnYUdsemRHOXllVVZ1ZEhKNUxuVnliQ2xjYmlBZ0lDQWdJQ0FnSUNBZ0lIMGdZMkYwWTJnZ0tHVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNWxjbkp2Y2lobEtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCM2FXNWtiM2N1Ykc5allYUnBiMjR1YUhKbFppQTlJR2hwYzNSdmNubEZiblJ5ZVM1MWNteGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQjlLVnh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdkR2hwY3k1amJHOXpaU2dwWEc0Z0lDQWdmU3hjYmlBZ0lDQndiM0JUZEdGMFpTQW9aWFpsYm5RcElIdGNiaUFnSUNBZ0lHbG1JQ2hsZG1WdWRDNXpkR0YwWlNBbUppQmxkbVZ1ZEM1emRHRjBaUzUwZVhCbElEMDlQU0FuYzJWaGNtTm9MV3hwYzNRdGNHRm5aUzFvYVhOMGIzSjVMV1Z1ZEhKNUp5a2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuVndaR0YwWlZCaFoyVkRiMjUwWlc1MEtHVjJaVzUwTG5OMFlYUmxMbVJoZEdFcFhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlMRnh1SUNCcGJuTjBZV3hzSUNoSFUwVkNMQ0J2Y0hScGIyNXpLU0I3WEc0Z0lDQWdMeThnWkc4Z2MyOXRaWFJvYVc1bklDNHVMbHh1SUNBZ0lHTnZibk52YkdVdWJHOW5LQ2R0YjJKNWJHVjBkR1VnYlc5a2RXeGxJR3h2WVdScGJtY2dMaTR1SnlsY2JpQWdJQ0IwYUdsekxpUmpiRzl6WlVKMGJpNXZiaWduWTJ4cFkyc25MQ0FvWlhabGJuUXBJRDArSUhSb2FYTXVZMnh2YzJVb1pYWmxiblFwS1Z4dUlDQWdJSFJvYVhNdUpHMWhhVzVDZEc0dWIyNG9KMk5zYVdOckp5d2dLR1YyWlc1MEtTQTlQaUIwYUdsekxtOXdaVzRvWlhabGJuUXBLVnh1SUNBZ0lDUW9aRzlqZFcxbGJuUXBMbTl1S0NkamJHbGpheWNzSUNjamMyVmhjbU5vTFd4cGMzUXRjR0ZuWlMwdFptbHNkR1Z5Y3lBdWMyaHZkeTFoYkd3Z1lTY3NJQ2hsS1NBOVBpQjdYRzRnSUNBZ0lDQnBaaUFvZEdocGN5NGtWMmx1Wkc5M0xuZHBaSFJvS0NrZ1BEMGdkR2hwY3k1dmNIUnBiMjV6TG0xaGVGZHBaSFJvS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11SkcxaGFXNUNkRzR1WTJ4cFkyc29LVnh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdkMmx1Wkc5M0xteHZZMkYwYVc5dUxuSmxiRzloWkNncFhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNsY2JpQWdJQ0IyWVhJZ2FXNXBkR2xoZEdWTmIySjViR1YwZEdWVFkzSnZiR3dnUFNCdVpYY2dVR1Z5Wm1WamRGTmpjbTlzYkdKaGNpZ25JM05sWVhKamFDMXNhWE4wTFhCaFoyVXRMV1pwYkhSbGNuTXRZMjl1ZEdGcGJtVnlKeWt2THlCbGMyeHBiblF0WkdsellXSnNaUzFzYVc1bElHNXZMWFZ1ZFhObFpDMTJZWEp6WEc0Z0lDQWdkR2hwY3k0a1ptbHNkR1Z5UTI5dWRHRnBibVZ5TG1acGJtUW9KeTVtWVdObGRGWmhiSFZsY3lCbWIzSnRKeWt1YzNWaWJXbDBLQ2hsZG1WdWRDa2dQVDRnZEdocGN5NW1hV3gwWlhJb1pYWmxiblFwS1Z4dUlDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZHdiM0J6ZEdGMFpTY3NJQ2hsZG1WdWRDa2dQVDRnZEdocGN5NXdiM0JUZEdGMFpTaGxkbVZ1ZENrc0lHWmhiSE5sS1Z4dUlDQjlYRzU5WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUUxdllubHNaWFIwWlZ4dUlpd2lhVzF3YjNKMElIc2dSMU5GUWlCOUlHWnliMjBnSjBCbmMyVmlMMk52Y21VblhHNXBiWEJ2Y25RZ1QySnpaWEoyWVdKc1pTd2dleUFrYjJKelpYSjJZV0pzWlhNZ2ZTQm1jbTl0SUNkQVozTmxZaTlvWld4d1pYSnpMMjlpYzJWeWRtRmliR1VuWEc1cGJYQnZjblFnZXlCTmIySjViR1YwZEdVZ1lYTWdkR1ZtWVd4RVpYTnJkRzl3VFc5aWVXeGxkSFJsSUgwZ1puSnZiU0FuUUdkelpXSXZiVzlrZFd4bGN5OXRiMko1YkdWMGRHVW5YRzVwYlhCdmNuUWdleUJOZVUxdlpIVnNaU0I5SUdaeWIyMGdKeTR2Ylc5a2RXeGxjeTlsZUdWdGNHeGxMVzF2WkhWc1pTZGNibHh1WTI5dWMyOXNaUzVzYjJjb0oyMWhhVzR1YW5NbktWeHVYRzRrYjJKelpYSjJZV0pzWlhNdWJXRnBiazlpYzJWeWRtRmliR1VnUFNCdVpYY2dUMkp6WlhKMllXSnNaU2dwWEc1Y2JtTnZibk4wSUUxaGFXNU5iMlIxYkdVZ1BTQjdYRzRnSUdsdGNHOXlkSE02SUZ0Y2JpQWdJQ0JOZVUxdlpIVnNaU3hjYmlBZ0lDQjBaV1poYkVSbGMydDBiM0JOYjJKNWJHVjBkR1ZjYmlBZ1hWeHVmVnh1WEc0dkx5QnNiMkZrSUdFZ2MybHVaMnhsSUcxdlpIVnNaVnh1THk4Z1IxTkZRaTUxYzJVb1RYbE5iMlIxYkdVcFhHNWNiaTh2SUd4dllXUWdiV0ZwYmlCdGIyUjFiR1Z6WEc1SFUwVkNMbUp2YjNSemRISmhjSEJwYm1jb1RXRnBiazF2WkhWc1pTbGNiaUlzSWk4dklIVnpaU0JsZUhSbGNtNWhiQ0J0YjJSMWJHVnpYRzR2S2x4dWFXMXdiM0owSUcxdlpIVnNaU0JtY205dElDY3VMaTl0YjJSMWJHVXRibUZ0WlNkY2JtbHRjRzl5ZENCdGIyUjFiR1V5SUdaeWIyMGdKeTR1TDIxdlpIVnNaVEl0Ym1GdFpTZGNibWx0Y0c5eWRDQnphR0Z5WldSTmIyUjFiR1VnWm5KdmJTQW5RSE5vWVhKbFpDMXRiMlIxYkdVblhHNGdLaTljYmx4dUx5OGdkWE5sSUhCeWFYWmhkR1VnWkdWd1pXNWtaVzVqYVdWelhHNHZLbHh1YVcxd2IzSjBJRzl3ZEdsdmJuTkdZV04wYjNKNUlHWnliMjBnSnk0dmIzQjBhVzl1Y3lkY2JpQXFMMXh1WEc0dkx5QmxlSEJ2Y25SelhHNWNibVY0Y0c5eWRDQmpiMjV6ZENCTmVVMXZaSFZzWlNBOUlIdGNiaUFnYm1GdFpUb2dKMDE1VFc5a2RXeGxKeXhjYmlBZ2MzUmhkR1U2SUh0Y2JpQWdJQ0IwYVhSc1pUb2dKM1JsYzNRZ01TZGNiaUFnZlN4Y2JpQWdiV1YwYUc5a2N6b2dlMXh1SUNBZ0lITmxkRlJwZEd4bElDaDJZV3gxWlNrZ2UxeHVJQ0FnSUNBZ2QybHVaRzkzTGw5amIyNXpiMnhsTG14dlp5aDBhR2x6TG5ScGRHeGxLVnh1SUNBZ0lDQWdkR2hwY3k1MGFYUnNaU0E5SUhaaGJIVmxYRzRnSUNBZ0lDQnlaWFIxY200Z2RHaHBjMXh1SUNBZ0lIMWNiaUFnZlN4Y2JpQWdhVzV6ZEdGc2JDQW9SMU5GUWl3Z2IzQjBhVzl1Y3lrZ2V5QXZLbHh1SUNBZ0lDOHZJR1J2SUhOdmJXVjBhR2x1WnlBdUxpNWNibHh1SUNBZ0lHTnZibk52YkdVdWJHOW5LQ2R0YjJSMWJHVWdiRzloWkdsdVp5QXVMaTRuS1Z4dUlDQWdJRWRUUlVJdVkyOXVjM1JoYm5SekxtMTVZMjl1YzNSaGJuUWdQU0FuWlhodGNHeGxKMXh1SUNBZ0lDUW9KeU56YjIxbGRHaHBibWNuS1M1a2IxZG9ZWFJaYjNWT1pXVmtNa1J2S0NsY2JpQWdJQ0JIVTBWQ0xuVnpaU2h6YUdGeVpXUk5iMlIxYkdVc0lHOXdkR2x2Ym5OR1lXTjBiM0o1TG0xaGEyVW9iM0IwYVc5dWN5a3BJQ292WEc0Z0lDQWdZMjl1YzI5c1pTNXNiMmNvSjIxdlpIVnNaU0JzYjJGa2FXNW5JQzR1TGljcFhHNGdJSDFjYm4xY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1RYbE5iMlIxYkdWY2JpSmRmUT09In0=
