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
        var _this = this;
        this.view = view;
        this.model = model;
        this.view.on_change_view(function (thumbler_data) {
            _this.model.set_new_position(thumbler_data);
        });
        this.model.on_change_model(function (model_state) {
            _this.view.update(model_state);
        });
        if (this.view.input !== undefined) {
            var _loop_1 = function (i) {
                this_1.view.input[i].addEventListener('keydown', function (event) {
                    if (event.keyCode === 9 || event.keyCode === 13) {
                        if (_this.view.input) {
                            var position = _this.model.get_position_from_value(Number(_this.view.input[i].value), _this.model.range);
                            var input_data = {
                                position: position,
                                index: i
                            };
                            _this.model.set_new_position(input_data);
                        }
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.view.input.length; i++) {
                _loop_1(i);
            }
        }
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
        if (this.position.length > 1 && this.position[1]) {
            if (i === 0) {
                if (position >= this.position[1]) {
                    position = this.position[1] - this.get_position_from_value(this.range[0] + this.step, this.range);
                }
            }
            else {
                if (position <= this.position[0]) {
                    position = this.position[0] + this.get_position_from_value(this.range[0] + this.step, this.range);
                }
            }
        }
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
            for (var i = 0; i < _this.input.length; i++) {
                _this.input[i].value = String(_this.value_start[i]);
            }
        }
        return _this;
    }
    View.prototype.on_change_view = function (callback) {
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
        if (this.input !== undefined) {
            this.input[i].value = String(value[i]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVGh1bWJsZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMx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QztZQUN6RCxDQUFDO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLENBNUVzQixlQUFNLEdBNEU1QjtBQUNPLDRCQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0VoQiwyRkFBa0M7QUFFbEM7SUFBc0IsMkJBQU07SUFJeEIsaUJBQW9CLEtBQWEsRUFBVSxXQUEwQjtRQUFyRSxZQUNJLGlCQUFPLFNBSVY7UUFMbUIsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUFVLGlCQUFXLEdBQVgsV0FBVyxDQUFlO1FBR2pFLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBQ3BDLENBQUM7SUFFRCxnQ0FBYyxHQUFkLFVBQWUsS0FBYTtRQUN4QixJQUFJLEdBQUcsR0FBVyxLQUFLLEdBQUcsQ0FBQztZQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDM0MsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLENBakJxQixlQUFNLEdBaUIzQjtBQUNPLDBCQUFPIiwiZmlsZSI6IlNpbXBsZVJhbmdlU2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1BsdWdpbi9QbHVnaW4udHNcIik7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uL1ZpZXcvVmlld1wiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuLi9Nb2RlbC9Nb2RlbFwiO1xyXG5cclxuY2xhc3MgUHJlc2VudGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlldzogVmlldywgcHJpdmF0ZSBtb2RlbDogTW9kZWwpIHtcclxuICAgICAgICB0aGlzLnZpZXcub25fY2hhbmdlX3ZpZXcoKHRodW1ibGVyX2RhdGE6IFRfVGh1bWJsZXJfRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aHVtYmxlcl9kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX2RhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubW9kZWwub25fY2hhbmdlX21vZGVsKChtb2RlbF9zdGF0ZTogVF9Nb2RlbF9EYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsX3N0YXRlKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3LnVwZGF0ZShtb2RlbF9zdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodGhpcy52aWV3LmlucHV0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnZpZXcuaW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcuaW5wdXRbaV0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50LmtleUNvZGUgPT09IDkgfHwgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52aWV3LmlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb246IG51bWJlciA9IHRoaXMubW9kZWwuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcih0aGlzLnZpZXcuaW5wdXRbaV0udmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnJhbmdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dF9kYXRhOiBUX1RodW1ibGVyX0RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnNldF9uZXdfcG9zaXRpb24oaW5wdXRfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7UHJlc2VudGVyfTsiLCJjbGFzcyBNb2RlbCB7XHJcblxyXG5cclxuICAgIHZhbHVlOiBUX1ZhbHVlID0gWzBdO1xyXG4gICAgcmFuZ2U6IFRfUmFuZ2UgPSBbMCwgMF07XHJcbiAgICBzdGVwOiBudW1iZXIgPSAwO1xyXG4gICAgcG9zaXRpb246IFRfUG9zaXRpb24gPSBbMF07XHJcblxyXG4gICAgaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNhbGxiYWNrX2xpc3Q6IElfTW9kZWxfU3RhdGVbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Nb2RlbCkge1xyXG5cclxuICAgICAgICB0aGlzLmNhbGxiYWNrX2xpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGVwID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0ZXA7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGk9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2UubGVuZ3RoOyBpKysgKSB7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnJhbmdlW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2UucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IoIGxldCBpPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0Lmxlbmd0aDsgaSsrICkge1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy52YWx1ZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKCB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gIHRoaXMuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldF9uZXdfcG9zaXRpb24odGh1bWJsZXJfc3RhdGU6IFRfVGh1bWJsZXJfRGF0YSkge1xyXG5cclxuICAgICAgICBsZXQgcG9zaXRpb246IG51bWJlciA9IE1hdGgucm91bmQodGh1bWJsZXJfc3RhdGUucG9zaXRpb24gKiAxZTQpIC8gMWU0O1xyXG4gICAgICAgIHRoaXMuaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyID0gdGh1bWJsZXJfc3RhdGUuaW5kZXg7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IHRoaXMuaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyO1xyXG4gICAgICAgIC8vIGNoZWNrIGZvciBpbnB1dCBjb2xsaXNpb24gYW5kIG91dCBvZiByYW5nZVxyXG4gICAgICAgIGlmKHRoaXMucG9zaXRpb24ubGVuZ3RoID4gMSAmJiB0aGlzLnBvc2l0aW9uWzFdKSB7XHJcbiAgICAgICAgICAgIGlmKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmKHBvc2l0aW9uID49IHRoaXMucG9zaXRpb25bMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25bMV0gLSB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMucmFuZ2VbMF0gKyB0aGlzLnN0ZXAsIHRoaXMucmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYocG9zaXRpb24gPD0gdGhpcy5wb3NpdGlvblswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvblswXSArIHRoaXMuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodGhpcy5yYW5nZVswXSArIHRoaXMuc3RlcCwgdGhpcy5yYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdfdmFsdWU6IG51bWJlciA9IHRoaXMuZ2V0X3ZhbHVlX2Zyb21fcG9zaXRpb24ocG9zaXRpb24sIHRoaXMucmFuZ2UpO1xyXG4gICAgICAgIGxldCBjb25kaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbdGhpcy52YWx1ZVtpXSAtIHRoaXMuc3RlcCwgdGhpcy52YWx1ZVtpXSArIHRoaXMuc3RlcF07XHJcblxyXG4gICAgICAgIGlmKG5ld192YWx1ZSA+PSBjb25kaXRpb25bMV0gfHwgbmV3X3ZhbHVlIDw9IGNvbmRpdGlvblswXSkge1xyXG4gICAgICAgICAgIHRoaXMuc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbihuZXdfdmFsdWUsIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihuZXdfdmFsdWUgPD0gdGhpcy5yYW5nZVswXSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldF92YWx1ZV9hbmRfcG9zaXRpb24odGhpcy5yYW5nZVswXSwgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG5ld192YWx1ZSA+PSB0aGlzLnJhbmdlWzFdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbih0aGlzLnJhbmdlWzFdLCBpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIGNvbGxpc2lvblxyXG4gICAgICAgIGlmKHRoaXMudmFsdWUubGVuZ3RoID4gMSAmJiB0aGlzLnZhbHVlWzFdKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudmFsdWVbMF0gPCB0aGlzLnZhbHVlWzFdICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrX2xpc3QuZm9yRWFjaCgoY2FsbGJhY2s6IElfTW9kZWxfU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4X29mX2FjdGl2ZV90aHVtYmxlclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uX2NoYW5nZV9tb2RlbChjYWxsYmFjazogSV9Nb2RlbF9TdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfbGlzdC5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh2YWx1ZTogbnVtYmVyLCByYW5nZTogVF9SYW5nZSk6IG51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9ICggdmFsdWUgLSByYW5nZVswXSApIC8gKCByYW5nZVsxXSAtIHJhbmdlWzBdICk7XHJcblxyXG4gICAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQgKiAxZTQpIC8gMWU0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfdmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyLCByYW5nZTogVF9SYW5nZSk6IG51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciAgPSAocG9zaXRpb24gKiAocmFuZ2VbMV0gLSByYW5nZVswXSkpICsgcmFuZ2VbMF07XHJcblxyXG4gICAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfdmFsdWVfYW5kX3Bvc2l0aW9uKG5ld192YWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnZhbHVlW2ldID0gbmV3X3ZhbHVlID4gMFxyXG4gICAgICAgICAgICA/IChNYXRoLmNlaWwobmV3X3ZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcClcclxuICAgICAgICAgICAgOiAoTWF0aC5mbG9vcihuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKTtcclxuICAgICAgICBpZih0aGlzLnZhbHVlW2ldID4gdGhpcy5yYW5nZVsxXSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5yYW5nZVsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy52YWx1ZVtpXSA8IHRoaXMucmFuZ2VbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMucmFuZ2VbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge01vZGVsfTsiLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi9WaWV3L1ZpZXcnO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vTW9kZWwvTW9kZWwnO1xyXG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tICcuL0NvbnRyb2xsZXIvUHJlc2VudGVyJztcclxuXHJcbmNsYXNzIFNpbXBsZVJhbmdlU2xpZGVyIHtcclxuXHJcbiAgICB2aWV3OiBWaWV3O1xyXG4gICAgbW9kZWw6IE1vZGVsO1xyXG4gICAgcHJlc2VudGVyOiBQcmVzZW50ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IEpRdWVyeSwgcHJpdmF0ZSB1c2VyX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyKSB7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJfY29udGFpbmVyOiBIVE1MRWxlbWVudCA9IHRoaXMuY29udGFpbmVyLmdldCgwKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGVmYXVsdF9Db25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlciA9IHtcclxuICAgICAgICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcclxuICAgICAgICAgICAgc3RhcnQ6ICAgICAgIFsxMF0sXHJcbiAgICAgICAgICAgIHJhbmdlOiAgICAgICBbMCwgMTAwXSxcclxuICAgICAgICAgICAgc3RlcDogICAgICAgIDEsXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6ICAgICB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAgICAgZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb21wbGV0ZV9jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlciA9IHtcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLm9yaWVudGF0aW9uID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24gOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbixcclxuICAgICAgICAgICAgc3RhcnQ6ICAgICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0YXJ0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24uc3RhcnQgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGFydCxcclxuICAgICAgICAgICAgcmFuZ2U6ICAgICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnJhbmdlID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24ucmFuZ2UgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5yYW5nZSxcclxuICAgICAgICAgICAgc3RlcDogICAgICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0ZXAgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5zdGVwIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RlcCxcclxuICAgICAgICAgICAgY29ubmVjdDogICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLmNvbm5lY3QgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5jb25uZWN0IDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uY29ubmVjdCxcclxuICAgICAgICAgICAgdG9vbHRpcDogICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnRvb2x0aXAgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi50b29sdGlwIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24udG9vbHRpcCxcclxuICAgICAgICAgICAgaW5wdXQ6ICAgICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLmlucHV0XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbW9kZWxfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX01vZGVsID0ge1xyXG4gICAgICAgICAgICB2YWx1ZV9zdGFydDogY29tcGxldGVfY29uZmlndXJhdGlvbi5zdGFydCxcclxuICAgICAgICAgICAgdmFsdWVfcmFuZ2U6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24ucmFuZ2UsXHJcbiAgICAgICAgICAgIHZhbHVlX3N0ZXA6ICBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnN0ZXAsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdmlld19jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVmlldyA9IHtcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24sXHJcbiAgICAgICAgICAgIHZhbHVlX3N0YXJ0OiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnN0YXJ0LFxyXG4gICAgICAgICAgICB2YWx1ZV9yYW5nZTogY29tcGxldGVfY29uZmlndXJhdGlvbi5yYW5nZSxcclxuICAgICAgICAgICAgaXNfdG9vbHRpcDogIGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24udG9vbHRpcCxcclxuICAgICAgICAgICAgaXNfY29ubmVjdDogIGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uY29ubmVjdCxcclxuICAgICAgICAgICAgaW5wdXQ6ICAgICAgIGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uaW5wdXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KHNsaWRlcl9jb250YWluZXIsIHZpZXdfY29uZmlndXJhdGlvbik7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChtb2RlbF9jb25maWd1cmF0aW9uKTtcclxuICAgICAgICB0aGlzLnByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIodGhpcy52aWV3LCB0aGlzLm1vZGVsKTtcclxuXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtTaW1wbGVSYW5nZVNsaWRlcn07XHJcblxyXG47KGZ1bmN0aW9uKCQ6IEpRdWVyeVN0YXRpYykge1xyXG4gICAgJC5mbi5leHRlbmQoe1xyXG4gICAgICAgIFNpbXBsZVJhbmdlU2xpZGVyOiBmdW5jdGlvbih1c2VyX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIoPEpRdWVyeT50aGlzLCA8SV9Db25maWd1cmF0aW9uX1VzZXI+dXNlcl9jb25maWd1cmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufShqUXVlcnkpKSIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vZW50aXRpZXMvSGVscGVyJztcclxuaW1wb3J0IHsgVGh1bWJsZXIgfSBmcm9tICcuL2VudGl0aWVzL1RodW1ibGVyJztcclxuaW1wb3J0IHsgQ29ubmVjdCB9IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XHJcbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICcuL2VudGl0aWVzL1Rvb2x0aXAnO1xyXG5cclxuY2xhc3MgVmlldyBleHRlbmRzIEhlbHBlciB7XHJcblxyXG4gICAgcG9zaXRpb246IFRfUG9zaXRpb24gPSBbMF07XHJcblxyXG4gICAgdmFsdWVfcmFuZ2U6IFRfUmFuZ2UgPSBbMCwgMF07XHJcbiAgICB2YWx1ZV9zdGFydDogVF9WYWx1ZSA9IFswXTtcclxuXHJcbiAgICBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbjtcclxuXHJcbiAgICBpc190b29sdGlwOiBib29sZWFuO1xyXG4gICAgaXNfY29ubmVjdDogYm9vbGVhbjtcclxuXHJcbiAgICBzbGlkZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgdGh1bWJsZXI6IFRodW1ibGVyW10gPSBbXTtcclxuICAgIGNvbm5lY3Q6IENvbm5lY3RbXSA9IFtdO1xyXG4gICAgdG9vbHRpcDogVG9vbHRpcFtdID0gW107XHJcblxyXG4gICAgaW5wdXQ/OiBUX0lucHV0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHByaXZhdGUgY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1ZpZXcgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dDtcclxuXHJcbiAgICAgICAgdGhpcy5pc190b29sdGlwID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX3Rvb2x0aXA7XHJcbiAgICAgICAgdGhpcy5pc19jb25uZWN0ID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX2Nvbm5lY3Q7XHJcblxyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLmNvbmZpZ3VyYXRpb24ub3JpZW50YXRpb247XHJcblxyXG4gICAgICAgIGZvciggbGV0IGk9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2UubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudmFsdWVfcmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZV9yYW5nZS5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlX3JhbmdlW2ldID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgaT0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMudmFsdWVfc3RhcnRbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZV9zdGFydC5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlX3N0YXJ0W2ldID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCggdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlX3N0YXJ0W2ldLCB0aGlzLnZhbHVlX3JhbmdlKSApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9ICB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMudmFsdWVfcmFuZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTsgXHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygnc2xpZGVyJywgdGhpcy5vcmllbnRhdGlvbik7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvbi5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgdGhpcy50aHVtYmxlci5wdXNoKG5ldyBUaHVtYmxlcih0aGlzLnBvc2l0aW9uW2ldLCB0aGlzLm9yaWVudGF0aW9uLCBpKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaXNfY29ubmVjdCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0LnB1c2goIG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3QucHVzaCggbmV3IENvbm5lY3QodGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSwgdGhpcy5vcmllbnRhdGlvbikgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy5jb25uZWN0WzBdLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5pc190b29sdGlwKSB7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy50aHVtYmxlci5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcC5wdXNoKCBuZXcgVG9vbHRpcCggdGhpcy52YWx1ZV9zdGFydFtpXSwgdGhpcy5vcmllbnRhdGlvbiApICk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJsZXJbaV0uZWxlbWVudC5hcHBlbmQodGhpcy50b29sdGlwW2ldLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLnRodW1ibGVyW2ldLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMuc2xpZGVyKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5pbnB1dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5pbnB1dC5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRbaV0udmFsdWUgPSBTdHJpbmcodGhpcy52YWx1ZV9zdGFydFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25fY2hhbmdlX3ZpZXcoY2FsbGJhY2s6IElfVGh1bWJsZXJfU3RhdGUpIHtcclxuICAgICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJsZXJbaV0ub25fbW91c2VfZG93bl9hbmRfbW92ZSh0aGlzLmNvbnRhaW5lciwgY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKG1vZGVsX3N0YXRlOiBUX01vZGVsX0RhdGEpIHtcclxuICAgICAgICBsZXQgaTogbnVtYmVyID0gbW9kZWxfc3RhdGUuaW5kZXg7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uOiBUX1Bvc2l0aW9uID0gbW9kZWxfc3RhdGUucG9zaXRpb247XHJcbiAgICAgICAgbGV0IHZhbHVlOiBUX1ZhbHVlID0gbW9kZWxfc3RhdGUudmFsdWU7XHJcblxyXG4gICAgICAgIGlmKHBvc2l0aW9uLmxlbmd0aCA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aHVtYmxlclsxXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdGh1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aHVtYmxlclsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdGh1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRodW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGh1bWJsZXJbaV0uc2V0X25ld19wb3NpdGlvbihwb3NpdGlvbltpXSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBbaV0uc2V0X2lubmVyX3RleHQodmFsdWVbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5pbnB1dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRbaV0udmFsdWUgPSBTdHJpbmcodmFsdWVbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5pc19jb25uZWN0KSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RbMF0uc2V0X2Nvbm5lY3RfcG9zaXRpb24oMCwgcG9zaXRpb25bMF0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYocG9zaXRpb25bMV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdF9wb3NpdGlvbihwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1ZpZXd9OyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gXCIuL0hlbHBlclwiO1xyXG5cclxuY2xhc3MgQ29ubmVjdCBleHRlbmRzIEhlbHBlciB7XHJcbiAgICBcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9zaXRpb25fc3RhcnQ6IG51bWJlciwgcHJpdmF0ZSBwb3NpdGlvbl9lbmQ6IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ2Nvbm5lY3QnLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgICB0aGlzLnNldF9jb25uZWN0X3Bvc2l0aW9uKHRoaXMucG9zaXRpb25fc3RhcnQsIHRoaXMucG9zaXRpb25fZW5kKVxyXG4gICAgfVxyXG5cclxuICAgIHNldF9jb25uZWN0X3Bvc2l0aW9uKHBvc2l0aW9uX3N0YXJ0OiBudW1iZXIsIHBvc2l0aW9uX2VuZDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBzdGFydDogbnVtYmVyID0gTWF0aC5yb3VuZChwb3NpdGlvbl9zdGFydCAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xyXG4gICAgICAgIGxldCBlbmQ6IG51bWJlciA9IE1hdGgucm91bmQocG9zaXRpb25fZW5kICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XHJcblxyXG4gICAgICAgIGxldCBzdHlsZTogc3RyaW5nID0gc3RhcnQgPT09IDBcclxuICAgICAgICAgICAgICAgID8gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXHJcbiAgICAgICAgICAgICAgICAgICAgPyBgd2lkdGg6ICR7ZW5kfSU7YFxyXG4gICAgICAgICAgICAgICAgICAgIDogYGhlaWdodDogJHtlbmR9JTtgXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gYGxlZnQ6ICR7c3RhcnR9JTsgd2lkdGg6ICR7KGVuZCAtIHN0YXJ0KX0lO2BcclxuICAgICAgICAgICAgICAgICAgICA6IGB0b3A6ICR7c3RhcnR9JTsgaGVpZ2h0OiAkeyhlbmQgLSBzdGFydCl9JTtgO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQge0Nvbm5lY3R9OyIsImNsYXNzIEhlbHBlciB7XHJcblxyXG4gICAgcmVhZG9ubHkgVE9fVEhVTUJMRVJfUE9TSVRJT046IG51bWJlciA9IDFlNDtcclxuICAgIHJlYWRvbmx5IFRPX0NPTk5FQ1RfVVBEQVRFOiBudW1iZXIgPSAxZTI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiBUX1JhbmdlKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gICggKCB2YWx1ZSAtIHJhbmdlWzBdICkgLyAoIHJhbmdlWzFdIC0gcmFuZ2VbMF0gKSApO1xyXG5cclxuICAgICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0ICogMWU0KSAvIDFlNCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoIGNzc19jbGFzczogVF9DU1NfQ2xhc3Nlcywgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24gKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIGxldCBzdHJfY2xhc3M6IHN0cmluZyA9ICdTUlNfXycgKyBjc3NfY2xhc3M7XHJcbiAgICAgICAgbGV0IGNzc19jbGFzc193aXRob3V0X29yaWVudGF0aW9uOiBzdHJpbmcgPSBzdHJfY2xhc3MgKyAnICcgKyBzdHJfY2xhc3MgKyAnXyc7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIChjc3NfY2xhc3Nfd2l0aG91dF9vcmllbnRhdGlvbiArIG9yaWVudGF0aW9uKSApO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IHtIZWxwZXJ9OyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gXCIuL0hlbHBlclwiO1xyXG5cclxuY2xhc3MgVGh1bWJsZXIgZXh0ZW5kcyBIZWxwZXIge1xyXG5cclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIHBvc2l0aW9uOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24sIHByaXZhdGUgaW5kZXg6IG51bWJlciApIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCd0aHVtYmxlcicsIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgICAgIHRoaXMuc2V0X25ld19wb3NpdGlvbihwb3NpdGlvbik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldF9uZXdfcG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgbGl0ZXI6IHN0cmluZyA9IHRoaXMub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiID8gJ1gnIDogJ1knO1xyXG5cclxuICAgICAgICBsZXQgc3R5bGU6IHN0cmluZyA9IGB0cmFuc2Zvcm06IHRyYW5zbGF0ZSR7bGl0ZXJ9KCR7IE1hdGgucm91bmQocG9zaXRpb24gKiB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OKSB9JSk7YDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfc2hpZnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXHJcbiAgICAgICAgICAgICAgICAgICAgPyBldmVudC5jbGllbnRYIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgOiBldmVudC5jbGllbnRZIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uX21vdXNlX2Rvd25fYW5kX21vdmUodGhpczogVGh1bWJsZXIsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiBJX1RodW1ibGVyX1N0YXRlKSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNoaWZ0OiBudW1iZXIgPSB0aGlzLmdldF9zaGlmdCh0aGF0LmVsZW1lbnQsIGV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uX21vdXNlX21vdmUpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fbW91c2VfbW92ZShldmVudDogTW91c2VFdmVudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdfcG9zaXRpb246IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBuZXdfcG9zaXRpb25faW5fcGVyY2VudDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoYXQub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19wb3NpdGlvbiA9IGV2ZW50LmNsaWVudFggLSBzaGlmdCAtIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19wb3NpdGlvbl9pbl9wZXJjZW50ID0gbmV3X3Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRZIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld19wb3NpdGlvbl9pbl9wZXJjZW50ID0gbmV3X3Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gbmV3X3Bvc2l0aW9uX2luX3BlcmNlbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYocG9zaXRpb24gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYocG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHsgcG9zaXRpb246IHBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhhdC5pbmRleCB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fbW91c2VfdXAoKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbl9tb3VzZV9tb3ZlKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbl9tb3VzZV91cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7VGh1bWJsZXJ9OyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcclxuXHJcbmNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBIZWxwZXIge1xyXG5cclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFsdWU6IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ3Rvb2x0aXAnLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgICB0aGlzLnNldF9pbm5lcl90ZXh0KHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldF9pbm5lcl90ZXh0KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgPSB2YWx1ZSA+IDBcclxuICAgICAgICAgICAgICAgICAgICA/IE1hdGguZmxvb3IodmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBNYXRoLmNlaWwodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSBTdHJpbmcoIHZhbCApO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7VG9vbHRpcH07Il0sInNvdXJjZVJvb3QiOiIifQ==