(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SimpleRangeSlider"] = factory();
	else
		root["SimpleRangeSlider"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Plugin/Plugin.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Plugin/Controller/Presenter.ts":
/*!********************************************!*\
  !*** ./src/Plugin/Controller/Presenter.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Presenter = (function () {
    function Presenter(view, model) {
        this.view = view;
        this.model = model;
        view.on_thumbler_move(function (thumbler_data) {
            model.set_new_position(thumbler_data);
        });
        model.on_change_model(function (model_state) {
            view.update(model_state);
        });
    }
    return Presenter;
}());
exports.Presenter = Presenter;


/***/ }),

/***/ "./src/Plugin/Model/Model.ts":
/*!***********************************!*\
  !*** ./src/Plugin/Model/Model.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Model = (function () {
    function Model(configuration) {
        this.configuration = configuration;
        this.value = [0];
        this.range = [0, 0];
        this.step = 0;
        this.position = [0];
        this.index_of_active_thumbler = 0;
        this.callback_list = [];
        this.step = this.configuration.value_step;
        for (var i = 0; i < this.configuration.value_range.length; i++) {
            if (this.range[i] === undefined) {
                this.range.push(this.configuration.value_range[i]);
            }
            else {
                this.range[i] = this.configuration.value_range[i];
            }
        }
        ;
        for (var i = 0; i < this.configuration.value_start.length; i++) {
            if (this.value[i] === undefined) {
                this.value.push(this.configuration.value_start[i]);
            }
            else {
                this.value[i] = this.configuration.value_start[i];
            }
            if (this.position[i] === undefined) {
                this.position.push(this.get_position_from_value(this.value[i], this.range));
            }
            else {
                this.position[i] = this.get_position_from_value(this.value[i], this.range);
            }
        }
    }
    Model.prototype.set_new_position = function (thumbler_state) {
        var position = Math.round(thumbler_state.position * 1e4) / 1e4;
        this.index_of_active_thumbler = thumbler_state.index;
        var i = this.index_of_active_thumbler;
        var new_value = this.get_value_from_position(position, this.range);
        var condition = [this.value[i] - this.step, this.value[i] + this.step];
        if (new_value >= condition[1] || new_value <= condition[0]) {
            this.set_value_and_position(new_value, i);
        }
        if (new_value <= this.range[0]) {
            this.set_value_and_position(this.range[0], i);
        }
        if (new_value >= this.range[1]) {
            this.set_value_and_position(this.range[1], i);
        }
        if (this.value.length > 1 && this.value[1]) {
            if (this.value[0] < this.value[1]) {
                this.update();
            }
            else {
                return false;
            }
        }
        else {
            this.update();
        }
    };
    Model.prototype.update = function () {
        var _this = this;
        this.callback_list.forEach(function (callback) {
            callback({
                position: _this.position,
                value: _this.value,
                index: _this.index_of_active_thumbler
            });
        });
    };
    Model.prototype.on_change_model = function (callback) {
        this.callback_list.push(callback);
    };
    Model.prototype.get_position_from_value = function (value, range) {
        var result = (value - range[0]) / (range[1] - range[0]);
        return (Math.round(result * 1e4) / 1e4);
    };
    Model.prototype.get_value_from_position = function (position, range) {
        var result = (position * (range[1] - range[0])) + range[0];
        return (Math.round(result));
    };
    Model.prototype.set_value_and_position = function (new_value, i) {
        this.value[i] = new_value > 0
            ? (Math.ceil(new_value / this.step) * this.step)
            : (Math.floor(new_value / this.step) * this.step);
        if (this.value[i] > this.range[1]) {
            this.value[i] = this.range[1];
        }
        if (this.value[i] < this.range[0]) {
            this.value[i] = this.range[0];
        }
        this.position[i] = this.get_position_from_value(this.value[i], this.range);
    };
    return Model;
}());
exports.Model = Model;


/***/ }),

/***/ "./src/Plugin/Plugin.ts":
/*!******************************!*\
  !*** ./src/Plugin/Plugin.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = __webpack_require__(/*! ./View/View */ "./src/Plugin/View/View.ts");
var Model_1 = __webpack_require__(/*! ./Model/Model */ "./src/Plugin/Model/Model.ts");
var Presenter_1 = __webpack_require__(/*! ./Controller/Presenter */ "./src/Plugin/Controller/Presenter.ts");
var SimpleRangeSlider = (function () {
    function SimpleRangeSlider(container, user_configuration) {
        this.container = container;
        this.user_configuration = user_configuration;
        var slider_container = this.container.get(0);
        var default_Configuration = {
            orientation: 'horizontal',
            start: [10],
            range: [0, 100],
            step: 1,
            connect: true,
            tooltip: false
        };
        var complete_configuration = {
            orientation: this.user_configuration.orientation === undefined ? default_Configuration.orientation : this.user_configuration.orientation,
            start: this.user_configuration.start === undefined ? default_Configuration.start : this.user_configuration.start,
            range: this.user_configuration.range === undefined ? default_Configuration.range : this.user_configuration.range,
            step: this.user_configuration.step === undefined ? default_Configuration.step : this.user_configuration.step,
            connect: this.user_configuration.connect === undefined ? default_Configuration.connect : this.user_configuration.connect,
            tooltip: this.user_configuration.tooltip === undefined ? default_Configuration.tooltip : this.user_configuration.tooltip,
            input: this.user_configuration.input
        };
        var model_configuration = {
            value_start: complete_configuration.start,
            value_range: complete_configuration.range,
            value_step: complete_configuration.step,
        };
        var view_configuration = {
            orientation: complete_configuration.orientation,
            value_start: complete_configuration.start,
            value_range: complete_configuration.range,
            is_tooltip: complete_configuration.tooltip,
            is_connect: complete_configuration.connect,
            input: complete_configuration.input
        };
        this.view = new View_1.View(slider_container, view_configuration);
        this.model = new Model_1.Model(model_configuration);
        this.presenter = new Presenter_1.Presenter(this.view, this.model);
    }
    return SimpleRangeSlider;
}());
exports.SimpleRangeSlider = SimpleRangeSlider;
;
(function ($) {
    $.fn.extend({
        SimpleRangeSlider: function (user_configuration) {
            return new SimpleRangeSlider(this, user_configuration);
        }
    });
}(jQuery));


/***/ }),

/***/ "./src/Plugin/View/View.ts":
/*!*********************************!*\
  !*** ./src/Plugin/View/View.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Helper_1 = __webpack_require__(/*! ./entities/Helper */ "./src/Plugin/View/entities/Helper.ts");
var Thumbler_1 = __webpack_require__(/*! ./entities/Thumbler */ "./src/Plugin/View/entities/Thumbler.ts");
var Connect_1 = __webpack_require__(/*! ./entities/Connect */ "./src/Plugin/View/entities/Connect.ts");
var Tooltip_1 = __webpack_require__(/*! ./entities/Tooltip */ "./src/Plugin/View/entities/Tooltip.ts");
var View = (function (_super) {
    __extends(View, _super);
    function View(container, configuration) {
        var _this = _super.call(this) || this;
        _this.container = container;
        _this.configuration = configuration;
        _this.position = [0];
        _this.value_range = [0, 0];
        _this.value_start = [0];
        _this.thumbler = [];
        _this.connect = [];
        _this.tooltip = [];
        _this.input = _this.configuration.input;
        _this.is_tooltip = _this.configuration.is_tooltip;
        _this.is_connect = _this.configuration.is_connect;
        _this.orientation = _this.configuration.orientation;
        for (var i = 0; i < _this.configuration.value_range.length; i++) {
            if (_this.value_range[i] === undefined) {
                _this.value_range.push(_this.configuration.value_range[i]);
            }
            else {
                _this.value_range[i] = _this.configuration.value_range[i];
            }
        }
        ;
        for (var i = 0; i < _this.configuration.value_start.length; i++) {
            if (_this.value_start[i] === undefined) {
                _this.value_start.push(_this.configuration.value_start[i]);
            }
            else {
                _this.value_start[i] = _this.configuration.value_start[i];
            }
            if (_this.position[i] === undefined) {
                _this.position.push(_this.get_position_from_value(_this.value_start[i], _this.value_range));
            }
            else {
                _this.position[i] = _this.get_position_from_value(_this.value_start[i], _this.value_range);
            }
        }
        ;
        _this.slider = _this.get_div_element_with_class('slider', _this.orientation);
        for (var i = 0; i < _this.position.length; i++) {
            _this.thumbler.push(new Thumbler_1.Thumbler(_this.position[i], _this.orientation, i));
        }
        if (_this.is_connect) {
            if (_this.position.length === 1) {
                _this.connect.push(new Connect_1.Connect(0, _this.position[0], _this.orientation));
            }
            else {
                _this.connect.push(new Connect_1.Connect(_this.position[0], _this.position[1], _this.orientation));
            }
            _this.slider.append(_this.connect[0].element);
        }
        if (_this.is_tooltip) {
            for (var i = 0; i < _this.thumbler.length; i++) {
                _this.tooltip.push(new Tooltip_1.Tooltip(_this.value_start[i], _this.orientation));
                _this.thumbler[i].element.append(_this.tooltip[i].element);
            }
        }
        for (var i = 0; i < _this.thumbler.length; i++) {
            _this.slider.append(_this.thumbler[i].element);
        }
        _this.container.append(_this.slider);
        if (_this.input !== undefined) {
        }
        return _this;
    }
    View.prototype.on_thumbler_move = function (callback) {
        for (var i = 0; i < this.thumbler.length; i++) {
            this.thumbler[i].on_mouse_down_and_move(this.container, callback);
        }
    };
    View.prototype.update = function (model_state) {
        var i = model_state.index;
        var position = model_state.position;
        var value = model_state.value;
        if (position.length > 1) {
            if (i === 0) {
                this.thumbler[0].element.classList.add('SRS__thumbler_active');
                this.thumbler[1].element.classList.remove('SRS__thumbler_active');
                if (this.is_tooltip) {
                    this.tooltip[0].element.classList.add('SRS__tooltip_active');
                    this.tooltip[1].element.classList.remove('SRS__tooltip_active');
                }
            }
            else {
                this.thumbler[1].element.classList.add('SRS__thumbler_active');
                this.thumbler[0].element.classList.remove('SRS__thumbler_active');
                if (this.is_tooltip) {
                    this.tooltip[1].element.classList.add('SRS__tooltip_active');
                    this.tooltip[0].element.classList.remove('SRS__tooltip_active');
                }
            }
        }
        this.thumbler[i].set_new_position(position[i]);
        if (this.is_tooltip) {
            this.tooltip[i].set_inner_text(value[i]);
        }
        if (this.is_connect) {
            if (this.position.length === 1) {
                this.connect[0].set_connect_position(0, position[0]);
            }
            else if (position[1]) {
                this.connect[0].set_connect_position(position[0], position[1]);
            }
        }
    };
    return View;
}(Helper_1.Helper));
exports.View = View;


/***/ }),

/***/ "./src/Plugin/View/entities/Connect.ts":
/*!*********************************************!*\
  !*** ./src/Plugin/View/entities/Connect.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Helper_1 = __webpack_require__(/*! ./Helper */ "./src/Plugin/View/entities/Helper.ts");
var Connect = (function (_super) {
    __extends(Connect, _super);
    function Connect(position_start, position_end, orientation) {
        var _this = _super.call(this) || this;
        _this.position_start = position_start;
        _this.position_end = position_end;
        _this.orientation = orientation;
        _this.element = _this.get_div_element_with_class('connect', _this.orientation);
        _this.set_connect_position(_this.position_start, _this.position_end);
        return _this;
    }
    Connect.prototype.set_connect_position = function (position_start, position_end) {
        var start = Math.round(position_start * this.TO_CONNECT_UPDATE);
        var end = Math.round(position_end * this.TO_CONNECT_UPDATE);
        var style = start === 0
            ? this.orientation === 'horizontal'
                ? "width: " + end + "%;"
                : "height: " + end + "%;"
            : this.orientation === 'horizontal'
                ? "left: " + start + "%; width: " + (end - start) + "%;"
                : "top: " + start + "%; height: " + (end - start) + "%;";
        this.element.setAttribute('style', style);
    };
    return Connect;
}(Helper_1.Helper));
exports.Connect = Connect;


/***/ }),

/***/ "./src/Plugin/View/entities/Helper.ts":
/*!********************************************!*\
  !*** ./src/Plugin/View/entities/Helper.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Helper = (function () {
    function Helper() {
        this.TO_THUMBLER_POSITION = 1e4;
        this.TO_CONNECT_UPDATE = 1e2;
    }
    Helper.prototype.get_position_from_value = function (value, range) {
        var result = ((value - range[0]) / (range[1] - range[0]));
        return (Math.round(result * 1e4) / 1e4);
    };
    Helper.prototype.get_div_element_with_class = function (css_class, orientation) {
        var str_class = 'SRS__' + css_class;
        var css_class_without_orientation = str_class + ' ' + str_class + '_';
        var element = document.createElement('div');
        element.setAttribute('class', (css_class_without_orientation + orientation));
        return element;
    };
    return Helper;
}());
exports.Helper = Helper;


/***/ }),

/***/ "./src/Plugin/View/entities/Thumbler.ts":
/*!**********************************************!*\
  !*** ./src/Plugin/View/entities/Thumbler.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Helper_1 = __webpack_require__(/*! ./Helper */ "./src/Plugin/View/entities/Helper.ts");
var Thumbler = (function (_super) {
    __extends(Thumbler, _super);
    function Thumbler(position, orientation, index) {
        var _this = _super.call(this) || this;
        _this.position = position;
        _this.orientation = orientation;
        _this.index = index;
        _this.element = _this.get_div_element_with_class('thumbler', _this.orientation);
        _this.set_new_position(position);
        return _this;
    }
    Thumbler.prototype.set_new_position = function (position) {
        var liter = this.orientation === "horizontal" ? 'X' : 'Y';
        var style = "transform: translate" + liter + "(" + Math.round(position * this.TO_THUMBLER_POSITION) + "%);";
        this.element.setAttribute('style', style);
    };
    Thumbler.prototype.get_shift = function (element, event) {
        var result = this.orientation === 'horizontal'
            ? event.clientX - element.getBoundingClientRect().left
            : event.clientY - element.getBoundingClientRect().top;
        return result;
    };
    Thumbler.prototype.on_mouse_down_and_move = function (container, callback) {
        var _this = this;
        var that = this;
        that.element.addEventListener('mousedown', function (event) {
            event.preventDefault();
            var shift = _this.get_shift(that.element, event);
            document.addEventListener('mousemove', on_mouse_move);
            document.addEventListener('mouseup', on_mouse_up);
            function on_mouse_move(event) {
                var new_position, new_position_in_percent, position;
                if (that.orientation === 'horizontal') {
                    new_position = event.clientX - shift - container.getBoundingClientRect().left;
                    new_position_in_percent = new_position / container.offsetWidth;
                }
                else {
                    new_position = event.clientY - shift - container.getBoundingClientRect().top;
                    new_position_in_percent = new_position / container.offsetHeight;
                }
                position = new_position_in_percent;
                if (position > 1) {
                    position = 1;
                }
                if (position < 0) {
                    position = 0;
                }
                callback({ position: position,
                    index: that.index });
            }
            function on_mouse_up() {
                document.removeEventListener('mousemove', on_mouse_move);
                document.removeEventListener('mouseup', on_mouse_up);
            }
        });
    };
    return Thumbler;
}(Helper_1.Helper));
exports.Thumbler = Thumbler;


/***/ }),

/***/ "./src/Plugin/View/entities/Tooltip.ts":
/*!*********************************************!*\
  !*** ./src/Plugin/View/entities/Tooltip.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Helper_1 = __webpack_require__(/*! ./Helper */ "./src/Plugin/View/entities/Helper.ts");
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip(value, orientation) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.orientation = orientation;
        _this.element = _this.get_div_element_with_class('tooltip', _this.orientation);
        _this.set_inner_text(_this.value);
        return _this;
    }
    Tooltip.prototype.set_inner_text = function (value) {
        var val = value > 0
            ? Math.floor(value)
            : Math.ceil(value);
        this.element.innerText = String(val);
    };
    return Tooltip;
}(Helper_1.Helper));
exports.Tooltip = Tooltip;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVGh1bWJsZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMx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Y2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1BsdWdpbi9QbHVnaW4udHNcIik7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uL1ZpZXcvVmlld1wiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuLi9Nb2RlbC9Nb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByZXNlbnRlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IFZpZXcsIHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XHJcbiAgICAgICAgdmlldy5vbl90aHVtYmxlcl9tb3ZlKCh0aHVtYmxlcl9kYXRhOiBUX1RodW1ibGVyX0RhdGEpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGh1bWJsZXJfZGF0YSk7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldF9uZXdfcG9zaXRpb24odGh1bWJsZXJfZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbW9kZWwub25fY2hhbmdlX21vZGVsKChtb2RlbF9zdGF0ZTogVF9Nb2RlbF9EYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsX3N0YXRlKTtcclxuICAgICAgICAgICAgdmlldy51cGRhdGUobW9kZWxfc3RhdGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgTW9kZWwge1xyXG5cclxuXHJcbiAgICB2YWx1ZTogVF9WYWx1ZSA9IFswXTtcclxuICAgIHJhbmdlOiBUX1JhbmdlID0gWzAsIDBdO1xyXG4gICAgc3RlcDogbnVtYmVyID0gMDtcclxuICAgIHBvc2l0aW9uOiBUX1Bvc2l0aW9uID0gWzBdO1xyXG5cclxuICAgIGluZGV4X29mX2FjdGl2ZV90aHVtYmxlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjYWxsYmFja19saXN0OiBJX01vZGVsX1N0YXRlW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fTW9kZWwpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsYmFja19saXN0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuc3RlcCA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGVwO1xyXG5cclxuICAgICAgICBmb3IoIGxldCBpPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlLmxlbmd0aDsgaSsrICkge1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmdlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgaT0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydC5sZW5ndGg7IGkrKyApIHtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMudmFsdWVbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCggdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKSApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9ICB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX3N0YXRlOiBUX1RodW1ibGVyX0RhdGEpIHtcclxuXHJcbiAgICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXIgPSBNYXRoLnJvdW5kKHRodW1ibGVyX3N0YXRlLnBvc2l0aW9uICogMWU0KSAvIDFlNDtcclxuICAgICAgICB0aGlzLmluZGV4X29mX2FjdGl2ZV90aHVtYmxlciA9IHRodW1ibGVyX3N0YXRlLmluZGV4O1xyXG4gICAgICAgIGxldCBpOiBudW1iZXIgPSB0aGlzLmluZGV4X29mX2FjdGl2ZV90aHVtYmxlcjtcclxuXHJcbiAgICAgICAgbGV0IG5ld192YWx1ZTogbnVtYmVyID0gdGhpcy5nZXRfdmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbiwgdGhpcy5yYW5nZSk7XHJcbiAgICAgICAgbGV0IGNvbmRpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFt0aGlzLnZhbHVlW2ldIC0gdGhpcy5zdGVwLCB0aGlzLnZhbHVlW2ldICsgdGhpcy5zdGVwXTtcclxuXHJcbiAgICAgICAgaWYobmV3X3ZhbHVlID49IGNvbmRpdGlvblsxXSB8fCBuZXdfdmFsdWUgPD0gY29uZGl0aW9uWzBdKSB7XHJcbiAgICAgICAgICAgdGhpcy5zZXRfdmFsdWVfYW5kX3Bvc2l0aW9uKG5ld192YWx1ZSwgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG5ld192YWx1ZSA8PSB0aGlzLnJhbmdlWzBdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbih0aGlzLnJhbmdlWzBdLCBpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobmV3X3ZhbHVlID49IHRoaXMucmFuZ2VbMV0pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRfdmFsdWVfYW5kX3Bvc2l0aW9uKHRoaXMucmFuZ2VbMV0sIGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy52YWx1ZS5sZW5ndGggPiAxICYmIHRoaXMudmFsdWVbMV0pIHtcclxuICAgICAgICAgICAgaWYodGhpcy52YWx1ZVswXSA8IHRoaXMudmFsdWUgWzFdICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrX2xpc3QuZm9yRWFjaCgoY2FsbGJhY2s6IElfTW9kZWxfU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4X29mX2FjdGl2ZV90aHVtYmxlclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uX2NoYW5nZV9tb2RlbChjYWxsYmFjazogSV9Nb2RlbF9TdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfbGlzdC5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh2YWx1ZTogbnVtYmVyLCByYW5nZTogVF9SYW5nZSk6IG51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9ICggdmFsdWUgLSByYW5nZVswXSApIC8gKCByYW5nZVsxXSAtIHJhbmdlWzBdICk7XHJcblxyXG4gICAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQgKiAxZTQpIC8gMWU0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfdmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyLCByYW5nZTogVF9SYW5nZSk6IG51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciAgPSAocG9zaXRpb24gKiAocmFuZ2VbMV0gLSByYW5nZVswXSkpICsgcmFuZ2VbMF07XHJcblxyXG4gICAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfdmFsdWVfYW5kX3Bvc2l0aW9uKG5ld192YWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnZhbHVlW2ldID0gbmV3X3ZhbHVlID4gMFxyXG4gICAgICAgICAgICA/IChNYXRoLmNlaWwobmV3X3ZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcClcclxuICAgICAgICAgICAgOiAoTWF0aC5mbG9vcihuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKTtcclxuICAgICAgICBpZih0aGlzLnZhbHVlW2ldID4gdGhpcy5yYW5nZVsxXSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5yYW5nZVsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy52YWx1ZVtpXSA8IHRoaXMucmFuZ2VbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMucmFuZ2VbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vVmlldy9WaWV3JztcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuL01vZGVsL01vZGVsJztcclxuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgU2ltcGxlUmFuZ2VTbGlkZXIge1xyXG5cclxuICAgIHZpZXc6IFZpZXc7XHJcbiAgICBtb2RlbDogTW9kZWw7XHJcbiAgICBwcmVzZW50ZXI6IFByZXNlbnRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSlF1ZXJ5LCBwcml2YXRlIHVzZXJfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1VzZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlcl9jb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkZWZhdWx0X0NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyID0ge1xyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxyXG4gICAgICAgICAgICBzdGFydDogICAgICAgWzEwXSxcclxuICAgICAgICAgICAgcmFuZ2U6ICAgICAgIFswLCAxMDBdLFxyXG4gICAgICAgICAgICBzdGVwOiAgICAgICAgMSxcclxuICAgICAgICAgICAgY29ubmVjdDogICAgIHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICAgICBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyID0ge1xyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5vcmllbnRhdGlvbiA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLm9yaWVudGF0aW9uLFxyXG4gICAgICAgICAgICBzdGFydDogICAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RhcnQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5zdGFydCA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0YXJ0LFxyXG4gICAgICAgICAgICByYW5nZTogICAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ucmFuZ2UgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5yYW5nZSA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnJhbmdlLFxyXG4gICAgICAgICAgICBzdGVwOiAgICAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RlcCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnN0ZXAgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGVwLFxyXG4gICAgICAgICAgICBjb25uZWN0OiAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uY29ubmVjdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLmNvbm5lY3QgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5jb25uZWN0LFxyXG4gICAgICAgICAgICB0b29sdGlwOiAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24udG9vbHRpcCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnRvb2x0aXAgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi50b29sdGlwLFxyXG4gICAgICAgICAgICBpbnB1dDogICAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uaW5wdXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtb2RlbF9jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fTW9kZWwgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlX3N0YXJ0OiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnN0YXJ0LFxyXG4gICAgICAgICAgICB2YWx1ZV9yYW5nZTogY29tcGxldGVfY29uZmlndXJhdGlvbi5yYW5nZSxcclxuICAgICAgICAgICAgdmFsdWVfc3RlcDogIGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RlcCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2aWV3X2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9WaWV3ID0ge1xyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogY29tcGxldGVfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbixcclxuICAgICAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXHJcbiAgICAgICAgICAgIHZhbHVlX3JhbmdlOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnJhbmdlLFxyXG4gICAgICAgICAgICBpc190b29sdGlwOiAgY29tcGxldGVfY29uZmlndXJhdGlvbi50b29sdGlwLFxyXG4gICAgICAgICAgICBpc19jb25uZWN0OiAgY29tcGxldGVfY29uZmlndXJhdGlvbi5jb25uZWN0LFxyXG4gICAgICAgICAgICBpbnB1dDogICAgICAgY29tcGxldGVfY29uZmlndXJhdGlvbi5pbnB1dFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoc2xpZGVyX2NvbnRhaW5lciwgdmlld19jb25maWd1cmF0aW9uKTtcclxuICAgICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKG1vZGVsX2NvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGVyID0gbmV3IFByZXNlbnRlcih0aGlzLnZpZXcsIHRoaXMubW9kZWwpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG47KGZ1bmN0aW9uKCQ6IEpRdWVyeVN0YXRpYykge1xyXG4gICAgJC5mbi5leHRlbmQoe1xyXG4gICAgICAgIFNpbXBsZVJhbmdlU2xpZGVyOiBmdW5jdGlvbih1c2VyX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIoPEpRdWVyeT50aGlzLCA8SV9Db25maWd1cmF0aW9uX1VzZXI+dXNlcl9jb25maWd1cmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufShqUXVlcnkpKSIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vZW50aXRpZXMvSGVscGVyJztcclxuaW1wb3J0IHsgVGh1bWJsZXIgfSBmcm9tICcuL2VudGl0aWVzL1RodW1ibGVyJztcclxuaW1wb3J0IHsgQ29ubmVjdCB9IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XHJcbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICcuL2VudGl0aWVzL1Rvb2x0aXAnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xyXG5cclxuICAgIHBvc2l0aW9uOiBUX1Bvc2l0aW9uID0gWzBdO1xyXG5cclxuICAgIHZhbHVlX3JhbmdlOiBUX1JhbmdlID0gWzAsIDBdO1xyXG4gICAgdmFsdWVfc3RhcnQ6IFRfVmFsdWUgPSBbMF07XHJcblxyXG4gICAgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb247XHJcblxyXG4gICAgaXNfdG9vbHRpcDogYm9vbGVhbjtcclxuICAgIGlzX2Nvbm5lY3Q6IGJvb2xlYW47XHJcblxyXG4gICAgc2xpZGVyOiBIVE1MRWxlbWVudDtcclxuICAgIHRodW1ibGVyOiBUaHVtYmxlcltdID0gW107XHJcbiAgICBjb25uZWN0OiBDb25uZWN0W10gPSBbXTtcclxuICAgIHRvb2x0aXA6IFRvb2x0aXBbXSA9IFtdO1xyXG5cclxuICAgIGlucHV0PzogVF9JbnB1dDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50LCBwcml2YXRlIGNvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9WaWV3ICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQ7XHJcblxyXG4gICAgICAgIHRoaXMuaXNfdG9vbHRpcCA9IHRoaXMuY29uZmlndXJhdGlvbi5pc190b29sdGlwO1xyXG4gICAgICAgIHRoaXMuaXNfY29ubmVjdCA9IHRoaXMuY29uZmlndXJhdGlvbi5pc19jb25uZWN0O1xyXG5cclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5jb25maWd1cmF0aW9uLm9yaWVudGF0aW9uO1xyXG5cclxuICAgICAgICBmb3IoIGxldCBpPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnZhbHVlX3JhbmdlW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVfcmFuZ2UucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZV9yYW5nZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciggbGV0IGk9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLnZhbHVlX3N0YXJ0W2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVfc3RhcnQucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZV9zdGFydFtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnB1c2goIHRoaXMuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodGhpcy52YWx1ZV9zdGFydFtpXSwgdGhpcy52YWx1ZV9yYW5nZSkgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25baV0gPSAgdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlX3N0YXJ0W2ldLCB0aGlzLnZhbHVlX3JhbmdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07IFxyXG5cclxuICAgICAgICB0aGlzLnNsaWRlciA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ3NsaWRlcicsIHRoaXMub3JpZW50YXRpb24pO1xyXG5cclxuICAgICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb24ubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJsZXIucHVzaChuZXcgVGh1bWJsZXIodGhpcy5wb3NpdGlvbltpXSwgdGhpcy5vcmllbnRhdGlvbiwgaSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmlzX2Nvbm5lY3QpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5wb3NpdGlvbi5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKCBuZXcgQ29ubmVjdCgwLCB0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLm9yaWVudGF0aW9uKSApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0LnB1c2goIG5ldyBDb25uZWN0KHRoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0sIHRoaXMub3JpZW50YXRpb24pICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMuY29ubmVjdFswXS5lbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICAgICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAucHVzaCggbmV3IFRvb2x0aXAoIHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMub3JpZW50YXRpb24gKSApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRodW1ibGVyW2ldLmVsZW1lbnQuYXBwZW5kKHRoaXMudG9vbHRpcFtpXS5lbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy50aHVtYmxlcltpXS5lbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLnNsaWRlcik7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaW5wdXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25fdGh1bWJsZXJfbW92ZShjYWxsYmFjazogSV9UaHVtYmxlcl9TdGF0ZSkge1xyXG4gICAgICAgIGZvciggbGV0IGk9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICB0aGlzLnRodW1ibGVyW2ldLm9uX21vdXNlX2Rvd25fYW5kX21vdmUodGhpcy5jb250YWluZXIsIGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShtb2RlbF9zdGF0ZTogVF9Nb2RlbF9EYXRhKSB7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IG1vZGVsX3N0YXRlLmluZGV4O1xyXG4gICAgICAgIGxldCBwb3NpdGlvbjogVF9Qb3NpdGlvbiA9IG1vZGVsX3N0YXRlLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB2YWx1ZTogVF9WYWx1ZSA9IG1vZGVsX3N0YXRlLnZhbHVlO1xyXG5cclxuICAgICAgICBpZihwb3NpdGlvbi5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgICAgICBpZihpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRodW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc190b29sdGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b29sdGlwWzBdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdGh1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b29sdGlwWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRodW1ibGVyW2ldLnNldF9uZXdfcG9zaXRpb24ocG9zaXRpb25baV0pO1xyXG5cclxuICAgICAgICBpZih0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgICAgICAgdGhpcy50b29sdGlwW2ldLnNldF9pbm5lcl90ZXh0KHZhbHVlW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaXNfY29ubmVjdCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0WzBdLnNldF9jb25uZWN0X3Bvc2l0aW9uKDAsIHBvc2l0aW9uWzBdKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHBvc2l0aW9uWzFdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RbMF0uc2V0X2Nvbm5lY3RfcG9zaXRpb24ocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gXCIuL0hlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbm5lY3QgZXh0ZW5kcyBIZWxwZXIge1xyXG4gICAgXHJcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvc2l0aW9uX3N0YXJ0OiBudW1iZXIsIHByaXZhdGUgcG9zaXRpb25fZW5kOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCdjb25uZWN0JywgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICAgICAgdGhpcy5zZXRfY29ubmVjdF9wb3NpdGlvbih0aGlzLnBvc2l0aW9uX3N0YXJ0LCB0aGlzLnBvc2l0aW9uX2VuZClcclxuICAgIH1cclxuXHJcbiAgICBzZXRfY29ubmVjdF9wb3NpdGlvbihwb3NpdGlvbl9zdGFydDogbnVtYmVyLCBwb3NpdGlvbl9lbmQ6IG51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgc3RhcnQ6IG51bWJlciA9IE1hdGgucm91bmQocG9zaXRpb25fc3RhcnQgKiB0aGlzLlRPX0NPTk5FQ1RfVVBEQVRFKTtcclxuICAgICAgICBsZXQgZW5kOiBudW1iZXIgPSBNYXRoLnJvdW5kKHBvc2l0aW9uX2VuZCAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xyXG5cclxuICAgICAgICBsZXQgc3R5bGU6IHN0cmluZyA9IHN0YXJ0ID09PSAwXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gYHdpZHRoOiAke2VuZH0lO2BcclxuICAgICAgICAgICAgICAgICAgICA6IGBoZWlnaHQ6ICR7ZW5kfSU7YFxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICAgICAgICAgICAgICA/IGBsZWZ0OiAke3N0YXJ0fSU7IHdpZHRoOiAkeyhlbmQgLSBzdGFydCl9JTtgXHJcbiAgICAgICAgICAgICAgICAgICAgOiBgdG9wOiAke3N0YXJ0fSU7IGhlaWdodDogJHsoZW5kIC0gc3RhcnQpfSU7YDtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgSGVscGVyIHtcclxuXHJcbiAgICByZWFkb25seSBUT19USFVNQkxFUl9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xyXG4gICAgcmVhZG9ubHkgVE9fQ09OTkVDVF9VUERBVEU6IG51bWJlciA9IDFlMjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IFRfUmFuZ2UpOiBudW1iZXIge1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAgKCAoIHZhbHVlIC0gcmFuZ2VbMF0gKSAvICggcmFuZ2VbMV0gLSByYW5nZVswXSApICk7XHJcblxyXG4gICAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQgKiAxZTQpIC8gMWU0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcyggY3NzX2NsYXNzOiBUX0NTU19DbGFzc2VzLCBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbiApOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHN0cl9jbGFzczogc3RyaW5nID0gJ1NSU19fJyArIGNzc19jbGFzcztcclxuICAgICAgICBsZXQgY3NzX2NsYXNzX3dpdGhvdXRfb3JpZW50YXRpb246IHN0cmluZyA9IHN0cl9jbGFzcyArICcgJyArIHN0cl9jbGFzcyArICdfJztcclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGNzc19jbGFzc193aXRob3V0X29yaWVudGF0aW9uICsgb3JpZW50YXRpb24pICk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gXCIuL0hlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRodW1ibGVyIGV4dGVuZHMgSGVscGVyIHtcclxuXHJcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBwb3NpdGlvbjogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiBUX09yaWVudGF0aW9uLCBwcml2YXRlIGluZGV4OiBudW1iZXIgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygndGh1bWJsZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgICB0aGlzLnNldF9uZXdfcG9zaXRpb24ocG9zaXRpb24pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRfbmV3X3Bvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IGxpdGVyOiBzdHJpbmcgPSB0aGlzLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiA/ICdYJyA6ICdZJztcclxuXHJcbiAgICAgICAgbGV0IHN0eWxlOiBzdHJpbmcgPSBgdHJhbnNmb3JtOiB0cmFuc2xhdGUke2xpdGVyfSgkeyBNYXRoLnJvdW5kKHBvc2l0aW9uICogdGhpcy5UT19USFVNQkxFUl9QT1NJVElPTikgfSUpO2A7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3NoaWZ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gZXZlbnQuY2xpZW50WCAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdFxyXG4gICAgICAgICAgICAgICAgICAgIDogZXZlbnQuY2xpZW50WSAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbl9tb3VzZV9kb3duX2FuZF9tb3ZlKHRoaXM6IFRodW1ibGVyLCBjb250YWluZXI6IEhUTUxFbGVtZW50LCBjYWxsYmFjazogSV9UaHVtYmxlcl9TdGF0ZSkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaGlmdDogbnVtYmVyID0gdGhpcy5nZXRfc2hpZnQodGhhdC5lbGVtZW50LCBldmVudCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbl9tb3VzZV9tb3ZlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uX21vdXNlX3VwKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uX21vdXNlX21vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3X3Bvc2l0aW9uOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X3Bvc2l0aW9uX2luX3BlcmNlbnQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGF0Lm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfcG9zaXRpb25faW5fcGVyY2VudCA9IG5ld19wb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X3Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WSAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfcG9zaXRpb25faW5fcGVyY2VudCA9IG5ld19wb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IG5ld19wb3NpdGlvbl9pbl9wZXJjZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHBvc2l0aW9uID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHBvc2l0aW9uIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7IHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXggfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uX21vdXNlX3VwKCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25fbW91c2VfbW92ZSk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUb29sdGlwIGV4dGVuZHMgSGVscGVyIHtcclxuXHJcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbHVlOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCd0b29sdGlwJywgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICAgICAgdGhpcy5zZXRfaW5uZXJfdGV4dCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfaW5uZXJfdGV4dCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyID0gdmFsdWUgPiAwXHJcbiAgICAgICAgICAgICAgICAgICAgPyBNYXRoLmZsb29yKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIDogTWF0aC5jZWlsKHZhbHVlKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gU3RyaW5nKCB2YWwgKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=