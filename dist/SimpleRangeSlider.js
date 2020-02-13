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
        this.TO_NORMALIZE_POSITION = 1e4;
        this.callback_list = [];
        this.step = this.configuration.value_step;
        this.init();
    }
    Model.prototype.set_new_position = function (thumbler_state) {
        var index = thumbler_state.index;
        this.index_of_active_thumbler = index;
        var position = this.position[index];
        var new_value = this.value[index];
        if (thumbler_state.position !== undefined) {
            position = Math.round(thumbler_state.position * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION;
            new_value = this.get_value_from_position(position, this.range);
        }
        else if (thumbler_state.value !== undefined) {
            new_value = thumbler_state.value;
            if (index === 0 && this.value[1]) {
                if (new_value > this.value[1] - this.step) {
                    new_value = this.value[1] - this.step;
                }
            }
            if (index === 1) {
                if (new_value < this.value[0] + this.step) {
                    new_value = this.value[0] + this.step;
                }
            }
        }
        var condition = [this.value[index] - this.step, this.value[index] + this.step];
        if (new_value >= condition[1] || new_value <= condition[0]) {
            this.set_value_and_position(new_value, index);
        }
        if (new_value <= this.range[0]) {
            this.set_value_and_position(this.range[0], index);
        }
        if (new_value >= this.range[1]) {
            this.set_value_and_position(this.range[1], index);
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
        return (Math.round(result * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION);
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
    Model.prototype.init = function () {
        for (var i = 0; i < this.configuration.value_range.length; i++) {
            if (this.range[i] === undefined) {
                this.range.push(this.configuration.value_range[i]);
            }
            else {
                this.range[i] = this.configuration.value_range[i];
            }
        }
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
var Input_1 = __webpack_require__(/*! ./entities/Input */ "./src/Plugin/View/entities/Input.ts");
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
        _this.input = [];
        _this.is_tooltip = _this.configuration.is_tooltip;
        _this.is_connect = _this.configuration.is_connect;
        _this.orientation = _this.configuration.orientation;
        _this.slider = _this.get_div_element_with_class('slider', _this.orientation);
        _this.init();
        return _this;
    }
    View.prototype.on_change_view = function (callback) {
        for (var i = 0; i < this.thumbler.length; i++) {
            this.thumbler[i].on_mouse_down_and_move(this.container, callback);
        }
        if (this.input[0] !== undefined) {
            for (var i = 0; i < this.input.length; i++) {
                this.input[i].on_keydown_or_mouseout(callback);
            }
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
        if (this.input[0] !== undefined) {
            this.input[i].element.value = String(value[i]);
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
    View.prototype.init = function () {
        for (var i = 0; i < this.configuration.value_range.length; i++) {
            if (this.value_range[i] === undefined) {
                this.value_range.push(this.configuration.value_range[i]);
            }
            else {
                this.value_range[i] = this.configuration.value_range[i];
            }
        }
        for (var i = 0; i < this.configuration.value_start.length; i++) {
            if (this.value_start[i] === undefined) {
                this.value_start.push(this.configuration.value_start[i]);
            }
            else {
                this.value_start[i] = this.configuration.value_start[i];
            }
            if (this.position[i] === undefined) {
                this.position.push(this.get_position_from_value(this.value_start[i], this.value_range));
            }
            else {
                this.position[i] = this.get_position_from_value(this.value_start[i], this.value_range);
            }
        }
        for (var i = 0; i < this.position.length; i++) {
            this.thumbler.push(new Thumbler_1.Thumbler(this.position[i], this.orientation, i));
        }
        if (this.is_connect) {
            if (this.position.length === 1) {
                this.connect.push(new Connect_1.Connect(0, this.position[0], this.orientation));
            }
            else {
                this.connect.push(new Connect_1.Connect(this.position[0], this.position[1], this.orientation));
            }
            this.slider.append(this.connect[0].element);
        }
        if (this.is_tooltip) {
            for (var i = 0; i < this.thumbler.length; i++) {
                this.tooltip.push(new Tooltip_1.Tooltip(this.value_start[i], this.orientation));
                this.thumbler[i].element.append(this.tooltip[i].element);
            }
        }
        for (var i = 0; i < this.thumbler.length; i++) {
            this.slider.append(this.thumbler[i].element);
        }
        this.container.append(this.slider);
        if (this.configuration.input) {
            for (var i = 0; i < this.configuration.input.length; i++) {
                this.input.push(new Input_1.Input(this.configuration.input[i], this.configuration.value_start[i], i));
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
        _this.connect_position = [0, 0];
        _this.element = _this.get_div_element_with_class('connect', _this.orientation);
        _this.set_connect_position(_this.position_start, _this.position_end);
        return _this;
    }
    Connect.prototype.set_connect_position = function (position_start, position_end) {
        var start = Math.round(position_start * this.TO_CONNECT_UPDATE);
        var end = Math.round(position_end * this.TO_CONNECT_UPDATE);
        this.connect_position = [start, end];
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
        result = Math.round(result * this.TO_THUMBLER_POSITION) / this.TO_THUMBLER_POSITION;
        if (result < 0) {
            result = 0;
        }
        if (result > 1) {
            result = 1;
        }
        return result;
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

/***/ "./src/Plugin/View/entities/Input.ts":
/*!*******************************************!*\
  !*** ./src/Plugin/View/entities/Input.ts ***!
  \*******************************************/
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
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(element, value, index) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.value = value;
        _this.index = index;
        _this.element.value = String(_this.value);
        return _this;
    }
    Input.prototype.on_keydown_or_mouseout = function (callback) {
        var that = this;
        that.element.addEventListener('keydown', on_keydown);
        that.element.addEventListener('mouseout', on_mouseout);
        function on_keydown(event) {
            if (event.keyCode === 9 || event.keyCode === 13) {
                bubbling();
            }
        }
        function on_mouseout() {
            bubbling();
        }
        function bubbling() {
            var value = Number(that.element.value);
            callback({
                value: value,
                index: that.index
            });
        }
    };
    return Input;
}(Helper_1.Helper));
exports.Input = Input;


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
        _this.thumbler_position = 0;
        _this.listening = false;
        _this.element = _this.get_div_element_with_class('thumbler', _this.orientation);
        _this.set_new_position(_this.position);
        return _this;
    }
    Thumbler.prototype.set_new_position = function (position) {
        this.thumbler_position = position;
        var liter = this.orientation === 'horizontal' ? 'X' : 'Y';
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
        that.listening = true;
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
        _this.tooltip_value = 0;
        _this.element = _this.get_div_element_with_class('tooltip', _this.orientation);
        _this.set_inner_text(_this.value);
        return _this;
    }
    Tooltip.prototype.set_inner_text = function (value) {
        var val = value > 0
            ? Math.floor(value)
            : Math.ceil(value);
        this.tooltip_value = val;
        this.element.innerText = String(val);
    };
    return Tooltip;
}(Helper_1.Helper));
exports.Tooltip = Tooltip;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVGh1bWJsZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtR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QztRQUVyQixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDekMsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLENBckJxQixlQUFNLEdBcUIzQjtBQUNPLDBCQUFPIiwiZmlsZSI6IlNpbXBsZVJhbmdlU2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1BsdWdpbi9QbHVnaW4udHNcIik7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vVmlldy9WaWV3JztcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi9Nb2RlbC9Nb2RlbCc7XHJcblxyXG5jbGFzcyBQcmVzZW50ZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlldzogVmlldywgcHJpdmF0ZSBtb2RlbDogTW9kZWwpIHtcclxuICAgIHRoaXMudmlldy5vbl9jaGFuZ2VfdmlldygodGh1bWJsZXJfZGF0YTogVF9UaHVtYmxlcl9EYXRhKSA9PiB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRodW1ibGVyX2RhdGEpO1xyXG4gICAgICB0aGlzLm1vZGVsLnNldF9uZXdfcG9zaXRpb24odGh1bWJsZXJfZGF0YSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubW9kZWwub25fY2hhbmdlX21vZGVsKChtb2RlbF9zdGF0ZTogVF9Nb2RlbF9EYXRhKSA9PiB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsX3N0YXRlKTtcclxuICAgICAgdGhpcy52aWV3LnVwZGF0ZShtb2RlbF9zdGF0ZSk7XHJcbiAgICB9KTtcclxuICAgIC8vIGlmKHRoaXMudmlldy5pbnB1dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy52aWV3LmlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgLy8gICAgIHRoaXMudmlldy5pbnB1dFtpXS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAvLyAgICAgICBpZihldmVudC5rZXlDb2RlID09PSA5IHx8IGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMudmlldy5pbnB1dCkge1xyXG4gICAgLy8gICAgICAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy5tb2RlbC5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZShcclxuICAgIC8vICAgICAgICAgICAgIE51bWJlcih0aGlzLnZpZXcuaW5wdXRbaV0udmFsdWUpLFxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5tb2RlbC5yYW5nZVxyXG4gICAgLy8gICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICBsZXQgaW5wdXRfZGF0YTogVF9UaHVtYmxlcl9EYXRhID0ge1xyXG4gICAgLy8gICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxyXG4gICAgLy8gICAgICAgICAgICAgaW5kZXg6IGlcclxuICAgIC8vICAgICAgICAgICB9O1xyXG4gICAgLy8gICAgICAgICAgIHRoaXMubW9kZWwuc2V0X25ld19wb3NpdGlvbihpbnB1dF9kYXRhKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgfVxyXG59XHJcbmV4cG9ydCB7UHJlc2VudGVyfTsiLCJjbGFzcyBNb2RlbCB7XHJcblxyXG5cclxuICAgIHZhbHVlOiBUX1ZhbHVlID0gWzBdO1xyXG4gICAgcmFuZ2U6IFRfUmFuZ2UgPSBbMCwgMF07XHJcbiAgICBzdGVwOiBudW1iZXIgPSAwO1xyXG4gICAgcG9zaXRpb246IFRfUG9zaXRpb24gPSBbMF07XHJcblxyXG4gICAgaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNhbGxiYWNrX2xpc3Q6IElfTW9kZWxfU3RhdGVbXTtcclxuXHJcbiAgICByZWFkb25seSBUT19OT1JNQUxJWkVfUE9TSVRJT046IG51bWJlciA9IDFlNDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Nb2RlbCkge1xyXG5cclxuICAgICAgdGhpcy5jYWxsYmFja19saXN0ID0gW107XHJcblxyXG4gICAgICB0aGlzLnN0ZXAgPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RlcDtcclxuXHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldF9uZXdfcG9zaXRpb24odGh1bWJsZXJfc3RhdGU6IFRfVGh1bWJsZXJfRGF0YSkge1xyXG5cclxuICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aHVtYmxlcl9zdGF0ZS5pbmRleDtcclxuICAgICAgdGhpcy5pbmRleF9vZl9hY3RpdmVfdGh1bWJsZXIgPSBpbmRleDtcclxuXHJcbiAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy5wb3NpdGlvbltpbmRleF07XHJcbiAgICAgIGxldCBuZXdfdmFsdWU6IG51bWJlciA9IHRoaXMudmFsdWVbaW5kZXhdO1xyXG5cclxuICAgICAgaWYodGh1bWJsZXJfc3RhdGUucG9zaXRpb24gIT09IHVuZGVmaW5lZCkgeyAgXHJcbiAgICAgICAgcG9zaXRpb24gPSBNYXRoLnJvdW5kKHRodW1ibGVyX3N0YXRlLnBvc2l0aW9uICogdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pIC8gdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT047XHJcbiAgICAgICAgbmV3X3ZhbHVlID0gdGhpcy5nZXRfdmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbiwgdGhpcy5yYW5nZSk7XHJcbiAgICAgIH0gZWxzZSBpZih0aHVtYmxlcl9zdGF0ZS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbmV3X3ZhbHVlID0gdGh1bWJsZXJfc3RhdGUudmFsdWU7XHJcblxyXG4gICAgICAgIGlmKGluZGV4ID09PSAwICYmIHRoaXMudmFsdWVbMV0pIHtcclxuICAgICAgICAgIGlmKG5ld192YWx1ZSA+IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXApIHtcclxuICAgICAgICAgICAgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgIGlmKG5ld192YWx1ZSA8IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXApIHtcclxuICAgICAgICAgICAgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZVswXSArIHRoaXMuc3RlcDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBjb25kaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbdGhpcy52YWx1ZVtpbmRleF0gLSB0aGlzLnN0ZXAsIHRoaXMudmFsdWVbaW5kZXhdICsgdGhpcy5zdGVwXTtcclxuXHJcbiAgICAgIGlmKG5ld192YWx1ZSA+PSBjb25kaXRpb25bMV0gfHwgbmV3X3ZhbHVlIDw9IGNvbmRpdGlvblswXSkge1xyXG4gICAgICAgIHRoaXMuc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbihuZXdfdmFsdWUsIGluZGV4KTtcclxuICAgICAgfVxyXG4gICAgICBpZihuZXdfdmFsdWUgPD0gdGhpcy5yYW5nZVswXSkge1xyXG4gICAgICAgIHRoaXMuc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbih0aGlzLnJhbmdlWzBdLCBpbmRleCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYobmV3X3ZhbHVlID49IHRoaXMucmFuZ2VbMV0pIHtcclxuICAgICAgICB0aGlzLnNldF92YWx1ZV9hbmRfcG9zaXRpb24odGhpcy5yYW5nZVsxXSwgaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGNoZWNrIGZvciBjb2xsaXNpb25cclxuICAgICAgaWYodGhpcy52YWx1ZS5sZW5ndGggPiAxICYmIHRoaXMudmFsdWVbMV0pIHtcclxuICAgICAgICBpZih0aGlzLnZhbHVlWzBdIDwgdGhpcy52YWx1ZVsxXSApIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja19saXN0LmZvckVhY2goKGNhbGxiYWNrOiBJX01vZGVsX1N0YXRlKSA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4X29mX2FjdGl2ZV90aHVtYmxlclxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbl9jaGFuZ2VfbW9kZWwoY2FsbGJhY2s6IElfTW9kZWxfU3RhdGUpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja19saXN0LnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiBUX1JhbmdlKTogbnVtYmVyIHtcclxuXHJcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9ICggdmFsdWUgLSByYW5nZVswXSApIC8gKCByYW5nZVsxXSAtIHJhbmdlWzBdICk7XHJcblxyXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0ICogdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pIC8gdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF92YWx1ZV9mcm9tX3Bvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIsIHJhbmdlOiBUX1JhbmdlKTogbnVtYmVyIHtcclxuXHJcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciAgPSAocG9zaXRpb24gKiAocmFuZ2VbMV0gLSByYW5nZVswXSkpICsgcmFuZ2VbMF07XHJcblxyXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbihuZXdfdmFsdWU6IG51bWJlciwgaTogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmFsdWVbaV0gPSBuZXdfdmFsdWUgPiAwXHJcbiAgICAgICAgPyAoTWF0aC5jZWlsKG5ld192YWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApXHJcbiAgICAgICAgOiAoTWF0aC5mbG9vcihuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKTtcclxuICAgICAgaWYodGhpcy52YWx1ZVtpXSA+IHRoaXMucmFuZ2VbMV0pIHtcclxuICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5yYW5nZVsxXTtcclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnZhbHVlW2ldIDwgdGhpcy5yYW5nZVswXSkge1xyXG4gICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLnJhbmdlWzBdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgIGZvciggbGV0IGk9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2UubGVuZ3RoOyBpKysgKSB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5yYW5nZS5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmFuZ2VbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yKCBsZXQgaT0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydC5sZW5ndGg7IGkrKyApIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy52YWx1ZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKCB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucG9zaXRpb25baV0gPSAgdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtNb2RlbH07IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vVmlldy9WaWV3JztcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuL01vZGVsL01vZGVsJztcclxuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XHJcblxyXG5jbGFzcyBTaW1wbGVSYW5nZVNsaWRlciB7XHJcblxyXG4gICAgdmlldzogVmlldztcclxuICAgIG1vZGVsOiBNb2RlbDtcclxuICAgIHByZXNlbnRlcjogUHJlc2VudGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBKUXVlcnksIHByaXZhdGUgdXNlcl9jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlcikge1xyXG5cclxuICAgICAgbGV0IHNsaWRlcl9jb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xyXG4gICAgICAgIFxyXG4gICAgICBsZXQgZGVmYXVsdF9Db25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlciA9IHtcclxuICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxyXG4gICAgICAgIHN0YXJ0OiAgICAgICBbMTBdLFxyXG4gICAgICAgIHJhbmdlOiAgICAgICBbMCwgMTAwXSxcclxuICAgICAgICBzdGVwOiAgICAgICAgMSxcclxuICAgICAgICBjb25uZWN0OiAgICAgdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOiAgICAgZmFsc2VcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCBjb21wbGV0ZV9jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlciA9IHtcclxuICAgICAgICBvcmllbnRhdGlvbjogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5vcmllbnRhdGlvbiA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLm9yaWVudGF0aW9uLFxyXG4gICAgICAgIHN0YXJ0OiAgICAgICB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGFydCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnN0YXJ0IDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RhcnQsXHJcbiAgICAgICAgcmFuZ2U6ICAgICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnJhbmdlID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24ucmFuZ2UgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5yYW5nZSxcclxuICAgICAgICBzdGVwOiAgICAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RlcCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnN0ZXAgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGVwLFxyXG4gICAgICAgIGNvbm5lY3Q6ICAgICB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5jb25uZWN0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24uY29ubmVjdCA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLmNvbm5lY3QsXHJcbiAgICAgICAgdG9vbHRpcDogICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnRvb2x0aXAgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi50b29sdGlwIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24udG9vbHRpcCxcclxuICAgICAgICBpbnB1dDogICAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uaW5wdXRcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCBtb2RlbF9jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fTW9kZWwgPSB7XHJcbiAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXHJcbiAgICAgICAgdmFsdWVfcmFuZ2U6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24ucmFuZ2UsXHJcbiAgICAgICAgdmFsdWVfc3RlcDogIGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RlcCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCB2aWV3X2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9WaWV3ID0ge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLm9yaWVudGF0aW9uLFxyXG4gICAgICAgIHZhbHVlX3N0YXJ0OiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnN0YXJ0LFxyXG4gICAgICAgIHZhbHVlX3JhbmdlOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnJhbmdlLFxyXG4gICAgICAgIGlzX3Rvb2x0aXA6ICBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnRvb2x0aXAsXHJcbiAgICAgICAgaXNfY29ubmVjdDogIGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uY29ubmVjdCxcclxuICAgICAgICBpbnB1dDogICAgICAgY29tcGxldGVfY29uZmlndXJhdGlvbi5pbnB1dFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoc2xpZGVyX2NvbnRhaW5lciwgdmlld19jb25maWd1cmF0aW9uKTtcclxuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChtb2RlbF9jb25maWd1cmF0aW9uKTtcclxuICAgICAgdGhpcy5wcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKHRoaXMudmlldywgdGhpcy5tb2RlbCk7XHJcblxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7U2ltcGxlUmFuZ2VTbGlkZXJ9O1xyXG5cclxuKGZ1bmN0aW9uKCQ6IEpRdWVyeVN0YXRpYykge1xyXG4gICQuZm4uZXh0ZW5kKHtcclxuICAgIFNpbXBsZVJhbmdlU2xpZGVyOiBmdW5jdGlvbih1c2VyX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyKSB7XHJcbiAgICAgIHJldHVybiBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIoPEpRdWVyeT4gdGhpcywgPElfQ29uZmlndXJhdGlvbl9Vc2VyPiB1c2VyX2NvbmZpZ3VyYXRpb24pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59IChqUXVlcnkpICk7IiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9lbnRpdGllcy9IZWxwZXInO1xyXG5pbXBvcnQgeyBUaHVtYmxlciB9IGZyb20gJy4vZW50aXRpZXMvVGh1bWJsZXInO1xyXG5pbXBvcnQgeyBDb25uZWN0IH0gZnJvbSAnLi9lbnRpdGllcy9Db25uZWN0JztcclxuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJy4vZW50aXRpZXMvVG9vbHRpcCc7XHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi9lbnRpdGllcy9JbnB1dCc7XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgSGVscGVyIHtcclxuXHJcbiAgICBwb3NpdGlvbjogVF9Qb3NpdGlvbiA9IFswXTtcclxuXHJcbiAgICB2YWx1ZV9yYW5nZTogVF9SYW5nZSA9IFswLCAwXTtcclxuICAgIHZhbHVlX3N0YXJ0OiBUX1ZhbHVlID0gWzBdO1xyXG5cclxuICAgIG9yaWVudGF0aW9uOiBUX09yaWVudGF0aW9uO1xyXG5cclxuICAgIGlzX3Rvb2x0aXA6IGJvb2xlYW47XHJcbiAgICBpc19jb25uZWN0OiBib29sZWFuO1xyXG5cclxuICAgIHNsaWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgICB0aHVtYmxlcjogVGh1bWJsZXJbXSA9IFtdO1xyXG4gICAgY29ubmVjdDogQ29ubmVjdFtdID0gW107XHJcbiAgICB0b29sdGlwOiBUb29sdGlwW10gPSBbXTtcclxuXHJcbiAgICBpbnB1dDogSW5wdXRbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHByaXZhdGUgY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1ZpZXcgKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICB0aGlzLmlzX3Rvb2x0aXAgPSB0aGlzLmNvbmZpZ3VyYXRpb24uaXNfdG9vbHRpcDtcclxuICAgICAgdGhpcy5pc19jb25uZWN0ID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX2Nvbm5lY3Q7XHJcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLmNvbmZpZ3VyYXRpb24ub3JpZW50YXRpb247XHJcblxyXG4gICAgICB0aGlzLnNsaWRlciA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ3NsaWRlcicsIHRoaXMub3JpZW50YXRpb24pO1xyXG5cclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25fY2hhbmdlX3ZpZXcoY2FsbGJhY2s6IElfVGh1bWJsZXJfU3RhdGUpIHtcclxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRoaXMudGh1bWJsZXJbaV0ub25fbW91c2VfZG93bl9hbmRfbW92ZSh0aGlzLmNvbnRhaW5lciwgY2FsbGJhY2spO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKCB0aGlzLmlucHV0WzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMuaW5wdXQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICB0aGlzLmlucHV0W2ldLm9uX2tleWRvd25fb3JfbW91c2VvdXQoY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUobW9kZWxfc3RhdGU6IFRfTW9kZWxfRGF0YSkge1xyXG4gICAgICBsZXQgaTogbnVtYmVyID0gbW9kZWxfc3RhdGUuaW5kZXg7XHJcbiAgICAgIGxldCBwb3NpdGlvbjogVF9Qb3NpdGlvbiA9IG1vZGVsX3N0YXRlLnBvc2l0aW9uO1xyXG4gICAgICBsZXQgdmFsdWU6IFRfVmFsdWUgPSBtb2RlbF9zdGF0ZS52YWx1ZTtcclxuXHJcbiAgICAgIGlmKHBvc2l0aW9uLmxlbmd0aCA+IDEpIHtcclxuXHJcbiAgICAgICAgaWYoaSA9PT0gMCkge1xyXG4gICAgICAgICAgdGhpcy50aHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdGh1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgICB0aGlzLnRodW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy50aHVtYmxlclsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdGh1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgICB0aGlzLnRodW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMudGh1bWJsZXJbaV0uc2V0X25ld19wb3NpdGlvbihwb3NpdGlvbltpXSk7XHJcblxyXG4gICAgICBpZih0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgICB0aGlzLnRvb2x0aXBbaV0uc2V0X2lubmVyX3RleHQodmFsdWVbaV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0aGlzLmlucHV0WzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmlucHV0W2ldLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodmFsdWVbaV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0aGlzLmlzX2Nvbm5lY3QpIHtcclxuICAgICAgICBpZih0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgdGhpcy5jb25uZWN0WzBdLnNldF9jb25uZWN0X3Bvc2l0aW9uKDAsIHBvc2l0aW9uWzBdKTtcclxuICAgICAgICB9IGVsc2UgaWYocG9zaXRpb25bMV0pIHtcclxuICAgICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdF9wb3NpdGlvbihwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbml0KCkge1xyXG4gICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICBpZih0aGlzLnZhbHVlX3JhbmdlW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVfcmFuZ2UucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlX3JhbmdlW2ldID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMudmFsdWVfc3RhcnRbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZV9zdGFydC5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVfc3RhcnRbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnBvc2l0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCggdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlX3N0YXJ0W2ldLCB0aGlzLnZhbHVlX3JhbmdlKSApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gIHRoaXMuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodGhpcy52YWx1ZV9zdGFydFtpXSwgdGhpcy52YWx1ZV9yYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG5cclxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9uLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRoaXMudGh1bWJsZXIucHVzaChuZXcgVGh1bWJsZXIodGhpcy5wb3NpdGlvbltpXSwgdGhpcy5vcmllbnRhdGlvbiwgaSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0aGlzLmlzX2Nvbm5lY3QpIHtcclxuICAgICAgICBpZih0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgdGhpcy5jb25uZWN0LnB1c2goIG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKCBuZXcgQ29ubmVjdCh0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdLCB0aGlzLm9yaWVudGF0aW9uKSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy5jb25uZWN0WzBdLmVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXAucHVzaCggbmV3IFRvb2x0aXAoIHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMub3JpZW50YXRpb24gKSApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLnRodW1ibGVyW2ldLmVsZW1lbnQuYXBwZW5kKHRoaXMudG9vbHRpcFtpXS5lbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy50aHVtYmxlci5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy50aHVtYmxlcltpXS5lbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMuc2xpZGVyKTtcclxuXHJcbiAgICAgIGlmKHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dCkge1xyXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgdGhpcy5pbnB1dC5wdXNoKG5ldyBJbnB1dChcclxuICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXRbaV0sXHJcbiAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldLFxyXG4gICAgICAgICAgICAgIGlcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Vmlld307IiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xyXG5cclxuY2xhc3MgQ29ubmVjdCBleHRlbmRzIEhlbHBlciB7XHJcbiAgICBcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgY29ubmVjdF9wb3NpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvc2l0aW9uX3N0YXJ0OiBudW1iZXIsIHByaXZhdGUgcG9zaXRpb25fZW5kOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24pIHtcclxuICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ2Nvbm5lY3QnLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgdGhpcy5zZXRfY29ubmVjdF9wb3NpdGlvbih0aGlzLnBvc2l0aW9uX3N0YXJ0LCB0aGlzLnBvc2l0aW9uX2VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X2Nvbm5lY3RfcG9zaXRpb24ocG9zaXRpb25fc3RhcnQ6IG51bWJlciwgcG9zaXRpb25fZW5kOiBudW1iZXIpIHtcclxuXHJcbiAgICAgIGxldCBzdGFydDogbnVtYmVyID0gTWF0aC5yb3VuZChwb3NpdGlvbl9zdGFydCAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xyXG4gICAgICBsZXQgZW5kOiBudW1iZXIgPSBNYXRoLnJvdW5kKHBvc2l0aW9uX2VuZCAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xyXG5cclxuICAgICAgdGhpcy5jb25uZWN0X3Bvc2l0aW9uID0gW3N0YXJ0LCBlbmRdO1xyXG4gICAgICBsZXQgc3R5bGU6IHN0cmluZyA9IHN0YXJ0ID09PSAwXHJcbiAgICAgICAgPyB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICAgID8gYHdpZHRoOiAke2VuZH0lO2BcclxuICAgICAgICAgIDogYGhlaWdodDogJHtlbmR9JTtgXHJcbiAgICAgICAgOiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICAgID8gYGxlZnQ6ICR7c3RhcnR9JTsgd2lkdGg6ICR7KGVuZCAtIHN0YXJ0KX0lO2BcclxuICAgICAgICAgIDogYHRvcDogJHtzdGFydH0lOyBoZWlnaHQ6ICR7KGVuZCAtIHN0YXJ0KX0lO2A7XHJcblxyXG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQge0Nvbm5lY3R9OyIsImNsYXNzIEhlbHBlciB7XHJcblxyXG4gICAgcmVhZG9ubHkgVE9fVEhVTUJMRVJfUE9TSVRJT046IG51bWJlciA9IDFlNDtcclxuICAgIHJlYWRvbmx5IFRPX0NPTk5FQ1RfVVBEQVRFOiBudW1iZXIgPSAxZTI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiBUX1JhbmdlKTogbnVtYmVyIHtcclxuXHJcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9ICAoICggdmFsdWUgLSByYW5nZVswXSApIC8gKCByYW5nZVsxXSAtIHJhbmdlWzBdICkgKTtcclxuICAgICAgcmVzdWx0ID0gTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OKSAvIHRoaXMuVE9fVEhVTUJMRVJfUE9TSVRJT047XHJcblxyXG4gICAgICBpZiggcmVzdWx0IDwgMCApIHtcclxuICAgICAgICByZXN1bHQgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKCByZXN1bHQgPiAxICkge1xyXG4gICAgICAgIHJlc3VsdCA9IDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcyggY3NzX2NsYXNzOiBUX0NTU19DbGFzc2VzLCBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbiApOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgIGxldCBzdHJfY2xhc3M6IHN0cmluZyA9ICdTUlNfXycgKyBjc3NfY2xhc3M7XHJcbiAgICAgIGxldCBjc3NfY2xhc3Nfd2l0aG91dF9vcmllbnRhdGlvbjogc3RyaW5nID0gc3RyX2NsYXNzICsgJyAnICsgc3RyX2NsYXNzICsgJ18nO1xyXG5cclxuICAgICAgbGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIChjc3NfY2xhc3Nfd2l0aG91dF9vcmllbnRhdGlvbiArIG9yaWVudGF0aW9uKSApO1xyXG5cclxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCB7SGVscGVyfTsiLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tIFwiLi9IZWxwZXJcIjtcclxuXHJcbmNsYXNzIElucHV0IGV4dGVuZHMgSGVscGVyIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgcHVibGljIHZhbHVlOiBudW1iZXIsIHB1YmxpYyBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gU3RyaW5nKHRoaXMudmFsdWUpO1xyXG4gIH1cclxuICBvbl9rZXlkb3duX29yX21vdXNlb3V0KHRoaXM6IElucHV0LCBjYWxsYmFjazogSV9UaHVtYmxlcl9TdGF0ZSkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25fa2V5ZG93bik7XHJcbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBvbl9tb3VzZW91dCk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25fa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICBpZihldmVudC5rZXlDb2RlID09PSA5IHx8IGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgYnViYmxpbmcoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25fbW91c2VvdXQoKSB7XHJcbiAgICAgIGJ1YmJsaW5nKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBidWJibGluZygpIHtcclxuICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSBOdW1iZXIodGhhdC5lbGVtZW50LnZhbHVlKTtcclxuICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICBpbmRleDogdGhhdC5pbmRleFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0IHsgSW5wdXQgfTsiLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XHJcblxyXG5jbGFzcyBUaHVtYmxlciBleHRlbmRzIEhlbHBlciB7XHJcblxyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgdGh1bWJsZXJfcG9zaXRpb246IG51bWJlciA9IDA7XHJcbiAgICBsaXN0ZW5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBwb3NpdGlvbjogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiBUX09yaWVudGF0aW9uLCBwcml2YXRlIGluZGV4OiBudW1iZXIgKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCd0aHVtYmxlcicsIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgICB0aGlzLnNldF9uZXdfcG9zaXRpb24odGhpcy5wb3NpdGlvbik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldF9uZXdfcG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xyXG4gICAgICB0aGlzLnRodW1ibGVyX3Bvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgICBsZXQgbGl0ZXI6IHN0cmluZyA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/ICdYJyA6ICdZJztcclxuXHJcbiAgICAgIGxldCBzdHlsZTogc3RyaW5nID0gYHRyYW5zZm9ybTogdHJhbnNsYXRlJHtsaXRlcn0oJHsgTWF0aC5yb3VuZChwb3NpdGlvbiAqIHRoaXMuVE9fVEhVTUJMRVJfUE9TSVRJT04pIH0lKTtgO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfc2hpZnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KTogbnVtYmVyIHtcclxuXHJcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgID8gZXZlbnQuY2xpZW50WCAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdFxyXG4gICAgICAgIDogZXZlbnQuY2xpZW50WSAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25fbW91c2VfZG93bl9hbmRfbW92ZSh0aGlzOiBUaHVtYmxlciwgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IElfVGh1bWJsZXJfU3RhdGUpIHtcclxuXHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgdGhhdC5saXN0ZW5pbmcgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGxldCBzaGlmdDogbnVtYmVyID0gdGhpcy5nZXRfc2hpZnQodGhhdC5lbGVtZW50LCBldmVudCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uX21vdXNlX21vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbl9tb3VzZV91cCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uX21vdXNlX21vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuXHJcbiAgICAgICAgICBsZXQgbmV3X3Bvc2l0aW9uOiBudW1iZXIsXHJcbiAgICAgICAgICAgIG5ld19wb3NpdGlvbl9pbl9wZXJjZW50OiBudW1iZXIsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgIGlmKHRoYXQub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uX2luX3BlcmNlbnQgPSBuZXdfcG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRZIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG4gICAgICAgICAgICBuZXdfcG9zaXRpb25faW5fcGVyY2VudCA9IG5ld19wb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IG5ld19wb3NpdGlvbl9pbl9wZXJjZW50O1xyXG5cclxuICAgICAgICAgIGlmKHBvc2l0aW9uID4gMSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihwb3NpdGlvbiA8IDApIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNhbGxiYWNrKHsgcG9zaXRpb246IHBvc2l0aW9uLFxyXG4gICAgICAgICAgICBpbmRleDogdGhhdC5pbmRleCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uX21vdXNlX3VwKCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25fbW91c2VfbW92ZSk7XHJcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtUaHVtYmxlcn07IiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xyXG5cclxuY2xhc3MgVG9vbHRpcCBleHRlbmRzIEhlbHBlciB7XHJcblxyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICB0b29sdGlwX3ZhbHVlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFsdWU6IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbikge1xyXG4gICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygndG9vbHRpcCcsIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgICB0aGlzLnNldF9pbm5lcl90ZXh0KHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldF9pbm5lcl90ZXh0KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgbGV0IHZhbDogbnVtYmVyID0gdmFsdWUgPiAwXHJcbiAgICAgICAgPyBNYXRoLmZsb29yKHZhbHVlKVxyXG4gICAgICAgIDogTWF0aC5jZWlsKHZhbHVlKTtcclxuXHJcbiAgICAgIHRoaXMudG9vbHRpcF92YWx1ZSA9IHZhbDsgICAgICAgICAgICBcclxuICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IFN0cmluZyggdmFsICk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtUb29sdGlwfTsiXSwic291cmNlUm9vdCI6IiJ9