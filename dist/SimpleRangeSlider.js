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
        var new_value = this.get_new_value(thumbler_state);
        this.check_on_step_movement_to_set_val_and_pos(new_value, index);
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
    Model.prototype.get_new_value = function (thumbler_state) {
        var index = thumbler_state.index;
        var new_value = this.value[index];
        var position;
        if (thumbler_state.position !== undefined) {
            position = Math.round(thumbler_state.position * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION;
            new_value = this.getValue_from_position(position, this.range);
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
        return new_value;
    };
    Model.prototype.check_on_step_movement_to_set_val_and_pos = function (new_value, index) {
        var condition = [this.value[index] - this.step, this.value[index] + this.step];
        if (new_value >= condition[1] || new_value <= condition[0]) {
            this.setValue_and_position(new_value, index);
        }
    };
    Model.prototype.update = function () {
        var _this = this;
        this.callback_list.forEach(function (callback) {
            callback({
                position: _this.position,
                value: _this.value,
                index: _this.index_of_active_thumbler,
            });
        });
    };
    Model.prototype.on_change_model = function (callback) {
        this.callback_list.push(callback);
    };
    Model.prototype.getPosition_from_value = function (value, range) {
        var result = (value - range[0]) / (range[1] - range[0]);
        return (Math.round(result * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION);
    };
    Model.prototype.getValue_from_position = function (position, range) {
        var result = (position * (range[1] - range[0])) + range[0];
        return (Math.round(result));
    };
    Model.prototype.setValue_and_position = function (new_value, i) {
        this.value[i] = new_value > 0
            ? (Math.ceil(new_value / this.step) * this.step)
            : (Math.floor(new_value / this.step) * this.step);
        if (i === 0) {
            if (this.value[0] < this.range[0]) {
                this.value[0] = this.range[0];
            }
        }
        if (i === 1 && this.value[1] !== undefined) {
            if (this.value[1] > this.range[1]) {
                this.value[i] = this.range[1];
            }
        }
        this.position[i] = this.getPosition_from_value(this.value[i], this.range);
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
                this.position.push(this.getPosition_from_value(this.value[i], this.range));
            }
            else {
                this.position[i] = this.getPosition_from_value(this.value[i], this.range);
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
            tooltip: true,
        };
        var complete_configuration = {
            orientation: this.user_configuration.orientation === undefined ? default_Configuration.orientation : this.user_configuration.orientation,
            start: this.user_configuration.start === undefined ? default_Configuration.start : this.user_configuration.start,
            range: this.user_configuration.range === undefined ? default_Configuration.range : this.user_configuration.range,
            step: this.user_configuration.step === undefined ? default_Configuration.step : this.user_configuration.step,
            connect: this.user_configuration.connect === undefined ? default_Configuration.connect : this.user_configuration.connect,
            tooltip: this.user_configuration.tooltip === undefined ? default_Configuration.tooltip : this.user_configuration.tooltip,
            input: this.user_configuration.input,
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
            input: complete_configuration.input,
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
        },
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
        _this.inputValue = [];
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
        if (this.inputValue[0] !== undefined) {
            for (var i = 0; i < this.inputValue.length; i++) {
                this.inputValue[i].on_keydown_or_mouseout(callback);
            }
        }
        if (this.input_tooltip && this.is_tooltip) {
            this.input_tooltip.on_switch_check(this.tooltip);
        }
    };
    View.prototype.update = function (model_state) {
        var i = model_state.index;
        var position = model_state.position;
        var value = model_state.value;
        this.set_active_thumbler(position, i);
        this.thumbler[i].set_new_position(position[i]);
        if (this.is_tooltip) {
            this.tooltip[i].set_inner_text(value[i]);
        }
        if (this.inputValue[0] !== undefined) {
            this.inputValue[i].element.value = String(value[i]);
        }
        if (this.is_connect) {
            if (this.position.length === 1) {
                this.connect[0].set_connectPosition(0, position[0]);
            }
            else if (position[1]) {
                this.connect[0].set_connectPosition(position[0], position[1]);
            }
        }
    };
    View.prototype.set_active_thumbler = function (position, index) {
        if (position.length > 1) {
            if (index === 0) {
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
                this.position.push(this.getPosition_from_value(this.value_start[i], this.value_range));
            }
            else {
                this.position[i] = this.getPosition_from_value(this.value_start[i], this.value_range);
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
        if (this.configuration.input !== undefined && this.configuration.input.value !== undefined) {
            for (var i = 0; i < this.configuration.input.value.length; i++) {
                this.inputValue.push(new Input_1.Input('value', this.configuration.input.value[i], this.configuration.value_start[i], i));
            }
        }
        if (this.configuration.input && this.configuration.input.tooltip) {
            this.input_tooltip = new Input_1.Input('tooltip', this.configuration.input.tooltip[0]);
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
        _this.connectPosition = [0, 0];
        _this.element = _this.get_div_element_with_class('connect', _this.orientation);
        _this.set_connectPosition(_this.position_start, _this.position_end);
        return _this;
    }
    Connect.prototype.set_connectPosition = function (position_start, position_end) {
        var start = Math.round(position_start * this.TO_CONNECT_UPDATE);
        var end = Math.round(position_end * this.TO_CONNECT_UPDATE);
        this.connectPosition = [start, end];
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
    Helper.prototype.getPosition_from_value = function (value, range) {
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
        var str_class = "SRS__" + css_class;
        var css_class_withoutOrientation = str_class + " " + str_class + "_";
        var element = document.createElement('div');
        element.setAttribute('class', (css_class_withoutOrientation + orientation));
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
    function Input(type, element, value, index) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.element = element;
        _this.value = value;
        _this.index = index;
        if (type === 'value') {
            if (_this.value !== undefined) {
                _this.element.value = String(_this.value);
            }
        }
        return _this;
    }
    Input.prototype.on_keydown_or_mouseout = function (callback) {
        var that = this;
        if (that.type !== 'value') {
            return false;
        }
        that.element.addEventListener('keydown', on_keydown);
        that.element.addEventListener('mouseout', on_mouseout);
        function on_keydown(event) {
            if (event.key === 'Tab' || event.key === 'Enter') {
                bubbling();
            }
        }
        function on_mouseout() {
            bubbling();
        }
        function bubbling() {
            var value = Number(that.element.value);
            if (that.index) {
                callback({
                    value: value,
                    index: that.index,
                });
            }
            else {
                callback({
                    value: value,
                    index: 0,
                });
            }
        }
    };
    Input.prototype.on_switch_check = function (tooltip) {
        var that = this;
        if (that.type !== 'tooltip') {
            return false;
        }
        that.element.addEventListener('change', function () {
            for (var i = 0; i < tooltip.length; i++) {
                if (that.element.checked) {
                    tooltip[i].switch_hidden(true);
                }
                else {
                    tooltip[i].switch_hidden(false);
                }
            }
        });
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
                var new_position;
                var new_position_in_percent;
                var position;
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
                callback({
                    position: position,
                    index: that.index,
                });
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
    Tooltip.prototype.switch_hidden = function (is_visible) {
        var that = this;
        if (is_visible) {
            that.element.hidden = false;
        }
        else {
            that.element.hidden = true;
        }
    };
    return Tooltip;
}(Helper_1.Helper));
exports.Tooltip = Tooltip;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVGh1bWJsZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtR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LEdBQVcsQ0FBQyxDQUFDO1FBS3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBQ2xDLENBQUM7SUFFRCxnQ0FBYyxHQUFkLFVBQWUsS0FBYTtRQUMxQixJQUFNLEdBQUcsR0FBVyxLQUFLLEdBQUcsQ0FBQztZQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCwrQkFBYSxHQUFiLFVBQTZCLFVBQW1CO1FBQzlDLElBQU0sSUFBSSxHQUFZLElBQUksQ0FBQztRQUMzQixJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLENBN0JxQixlQUFNLEdBNkIzQjtBQUNRLDBCQUFPIiwiZmlsZSI6IlNpbXBsZVJhbmdlU2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1BsdWdpbi9QbHVnaW4udHNcIik7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vVmlldy9WaWV3JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vTW9kZWwvTW9kZWwnO1xuXG5jbGFzcyBQcmVzZW50ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IFZpZXcsIHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XG4gICAgdGhpcy52aWV3Lm9uX2NoYW5nZV92aWV3KCh0aHVtYmxlcl9kYXRhOiB0VHVtYmxlckRhdGEpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRodW1ibGVyX2RhdGEpO1xuICAgICAgdGhpcy5tb2RlbC5zZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX2RhdGEpO1xuICAgIH0pO1xuICAgIHRoaXMubW9kZWwub25fY2hhbmdlX21vZGVsKChtb2RlbF9zdGF0ZTogdE1vZGVsRGF0YSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2cobW9kZWxfc3RhdGUpO1xuICAgICAgdGhpcy52aWV3LnVwZGF0ZShtb2RlbF9zdGF0ZSk7XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCB7IFByZXNlbnRlciB9O1xuIiwiY2xhc3MgTW9kZWwge1xuICAgIHZhbHVlOiB0VmFsdWUgPSBbMF07XG5cbiAgICByYW5nZTogdFJhbmdlID0gWzAsIDBdO1xuXG4gICAgc3RlcDogbnVtYmVyID0gMDtcblxuICAgIHBvc2l0aW9uOiB0UG9zaXRpb24gPSBbMF07XG5cbiAgICBpbmRleF9vZl9hY3RpdmVfdGh1bWJsZXI6IG51bWJlciA9IDA7XG5cbiAgICBjYWxsYmFja19saXN0OiBpTW9kZWxDYWxsYmFja1tdO1xuXG4gICAgcmVhZG9ubHkgVE9fTk9STUFMSVpFX1BPU0lUSU9OOiBudW1iZXIgPSAxZTQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb246IGlDb25maWdNb2RlbCkge1xuICAgICAgdGhpcy5jYWxsYmFja19saXN0ID0gW107XG5cbiAgICAgIHRoaXMuc3RlcCA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGVwO1xuXG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBzZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX3N0YXRlOiB0VHVtYmxlckRhdGEpIHtcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHRodW1ibGVyX3N0YXRlO1xuICAgICAgdGhpcy5pbmRleF9vZl9hY3RpdmVfdGh1bWJsZXIgPSBpbmRleDtcblxuICAgICAgY29uc3QgbmV3X3ZhbHVlOiBudW1iZXIgPSB0aGlzLmdldF9uZXdfdmFsdWUodGh1bWJsZXJfc3RhdGUpO1xuXG4gICAgICB0aGlzLmNoZWNrX29uX3N0ZXBfbW92ZW1lbnRfdG9fc2V0X3ZhbF9hbmRfcG9zKG5ld192YWx1ZSwgaW5kZXgpO1xuICAgICAgLy8gY2hlY2sgZm9yIGNvbGxpc2lvblxuICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoID4gMSAmJiB0aGlzLnZhbHVlWzFdKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlWzBdIDwgdGhpcy52YWx1ZVsxXSkge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldF9uZXdfdmFsdWUodGh1bWJsZXJfc3RhdGU6IHRUdW1ibGVyRGF0YSk6IG51bWJlciB7XG4gICAgICBjb25zdCB7IGluZGV4IH0gPSB0aHVtYmxlcl9zdGF0ZTtcbiAgICAgIGxldCBuZXdfdmFsdWU6IG51bWJlciA9IHRoaXMudmFsdWVbaW5kZXhdO1xuICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgIGlmICh0aHVtYmxlcl9zdGF0ZS5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvc2l0aW9uID0gTWF0aC5yb3VuZCh0aHVtYmxlcl9zdGF0ZS5wb3NpdGlvbiAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKSAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OO1xuICAgICAgICBuZXdfdmFsdWUgPSB0aGlzLmdldFZhbHVlX2Zyb21fcG9zaXRpb24ocG9zaXRpb24sIHRoaXMucmFuZ2UpO1xuICAgICAgfSBlbHNlIGlmICh0aHVtYmxlcl9zdGF0ZS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld192YWx1ZSA9IHRodW1ibGVyX3N0YXRlLnZhbHVlO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiB0aGlzLnZhbHVlWzFdKSB7XG4gICAgICAgICAgaWYgKG5ld192YWx1ZSA+IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXApIHtcbiAgICAgICAgICAgIG5ld192YWx1ZSA9IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gMSkge1xuICAgICAgICAgIGlmIChuZXdfdmFsdWUgPCB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwKSB7XG4gICAgICAgICAgICBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld192YWx1ZTtcbiAgICB9XG5cbiAgICBjaGVja19vbl9zdGVwX21vdmVtZW50X3RvX3NldF92YWxfYW5kX3BvcyhuZXdfdmFsdWU6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xuICAgICAgY29uc3QgY29uZGl0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gW3RoaXMudmFsdWVbaW5kZXhdIC0gdGhpcy5zdGVwLCB0aGlzLnZhbHVlW2luZGV4XSArIHRoaXMuc3RlcF07XG5cbiAgICAgIGlmIChuZXdfdmFsdWUgPj0gY29uZGl0aW9uWzFdIHx8IG5ld192YWx1ZSA8PSBjb25kaXRpb25bMF0pIHtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZV9hbmRfcG9zaXRpb24obmV3X3ZhbHVlLCBpbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5jYWxsYmFja19saXN0LmZvckVhY2goKGNhbGxiYWNrOiBpTW9kZWxDYWxsYmFjaykgPT4ge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uX2NoYW5nZV9tb2RlbChjYWxsYmFjazogaU1vZGVsQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tfbGlzdC5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbl9mcm9tX3ZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSAodmFsdWUgLSByYW5nZVswXSkgLyAocmFuZ2VbMV0gLSByYW5nZVswXSk7XG5cbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTikgLyB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTik7XG4gICAgfVxuXG4gICAgZ2V0VmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gKHBvc2l0aW9uICogKHJhbmdlWzFdIC0gcmFuZ2VbMF0pKSArIHJhbmdlWzBdO1xuXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0KSk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVfYW5kX3Bvc2l0aW9uKG5ld192YWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcbiAgICAgIHRoaXMudmFsdWVbaV0gPSBuZXdfdmFsdWUgPiAwXG4gICAgICAgID8gKE1hdGguY2VpbChuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKVxuICAgICAgICA6IChNYXRoLmZsb29yKG5ld192YWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMucmFuZ2VbMF0pIHtcbiAgICAgICAgICB0aGlzLnZhbHVlWzBdID0gdGhpcy5yYW5nZVswXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaSA9PT0gMSAmJiB0aGlzLnZhbHVlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0gPiB0aGlzLnJhbmdlWzFdKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMucmFuZ2VbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMucmFuZ2UucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmFuZ2VbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudmFsdWUucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKHRoaXMuZ2V0UG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgTW9kZWwgfTtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuL1ZpZXcvVmlldyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vTW9kZWwvTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XG5cbmNsYXNzIFNpbXBsZVJhbmdlU2xpZGVyIHtcbiAgICB2aWV3OiBWaWV3O1xuXG4gICAgbW9kZWw6IE1vZGVsO1xuXG4gICAgcHJlc2VudGVyOiBQcmVzZW50ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSlF1ZXJ5LCBwcml2YXRlIHVzZXJfY29uZmlndXJhdGlvbjogaUNvbmZpZ1VzZXIpIHtcbiAgICAgIGNvbnN0IHNsaWRlcl9jb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xuXG4gICAgICBjb25zdCBkZWZhdWx0X0NvbmZpZ3VyYXRpb246IGlDb25maWdVc2VyID0ge1xuICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICBzdGFydDogWzEwXSxcbiAgICAgICAgcmFuZ2U6IFswLCAxMDBdLFxuICAgICAgICBzdGVwOiAxLFxuICAgICAgICBjb25uZWN0OiB0cnVlLFxuICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgY29tcGxldGVfY29uZmlndXJhdGlvbjogaUNvbmZpZ1VzZXIgPSB7XG4gICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbiA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLm9yaWVudGF0aW9uIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24sXG4gICAgICAgIHN0YXJ0OiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGFydCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnN0YXJ0IDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RhcnQsXG4gICAgICAgIHJhbmdlOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5yYW5nZSA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnJhbmdlIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ucmFuZ2UsXG4gICAgICAgIHN0ZXA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0ZXAgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5zdGVwIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RlcCxcbiAgICAgICAgY29ubmVjdDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uY29ubmVjdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLmNvbm5lY3QgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5jb25uZWN0LFxuICAgICAgICB0b29sdGlwOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi50b29sdGlwID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24udG9vbHRpcCA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnRvb2x0aXAsXG4gICAgICAgIGlucHV0OiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5pbnB1dCxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1vZGVsX2NvbmZpZ3VyYXRpb246IGlDb25maWdNb2RlbCA9IHtcbiAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXG4gICAgICAgIHZhbHVlX3JhbmdlOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnJhbmdlLFxuICAgICAgICB2YWx1ZV9zdGVwOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnN0ZXAsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB2aWV3X2NvbmZpZ3VyYXRpb246IGlDb25maWdWaWV3ID0ge1xuICAgICAgICBvcmllbnRhdGlvbjogY29tcGxldGVfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbixcbiAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXG4gICAgICAgIHZhbHVlX3JhbmdlOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnJhbmdlLFxuICAgICAgICBpc190b29sdGlwOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnRvb2x0aXAsXG4gICAgICAgIGlzX2Nvbm5lY3Q6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uY29ubmVjdCxcbiAgICAgICAgaW5wdXQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uaW5wdXQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzbGlkZXJfY29udGFpbmVyLCB2aWV3X2NvbmZpZ3VyYXRpb24pO1xuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChtb2RlbF9jb25maWd1cmF0aW9uKTtcbiAgICAgIHRoaXMucHJlc2VudGVyID0gbmV3IFByZXNlbnRlcih0aGlzLnZpZXcsIHRoaXMubW9kZWwpO1xuICAgIH1cbn1cbmV4cG9ydCB7IFNpbXBsZVJhbmdlU2xpZGVyIH07XG5cbihmdW5jdGlvbiAoJDogSlF1ZXJ5U3RhdGljKSB7XG4gICQuZm4uZXh0ZW5kKHtcbiAgICBTaW1wbGVSYW5nZVNsaWRlcih1c2VyX2NvbmZpZ3VyYXRpb246IGlDb25maWdVc2VyKSB7XG4gICAgICByZXR1cm4gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKDxKUXVlcnk+IHRoaXMsIDxpQ29uZmlnVXNlcj4gdXNlcl9jb25maWd1cmF0aW9uKTtcbiAgICB9LFxuICB9KTtcbn0oalF1ZXJ5KSk7XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL2VudGl0aWVzL0hlbHBlcic7XG5pbXBvcnQgeyBUaHVtYmxlciB9IGZyb20gJy4vZW50aXRpZXMvVGh1bWJsZXInO1xuaW1wb3J0IHsgQ29ubmVjdCB9IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9lbnRpdGllcy9Ub29sdGlwJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi9lbnRpdGllcy9JbnB1dCc7XG5cbmNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xuICBwb3NpdGlvbjogdFBvc2l0aW9uID0gWzBdO1xuXG4gIHZhbHVlX3JhbmdlOiB0UmFuZ2UgPSBbMCwgMF07XG5cbiAgdmFsdWVfc3RhcnQ6IHRWYWx1ZSA9IFswXTtcblxuICBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uO1xuXG4gIGlzX3Rvb2x0aXA6IGJvb2xlYW47XG5cbiAgaXNfY29ubmVjdDogYm9vbGVhbjtcblxuICBzbGlkZXI6IEhUTUxFbGVtZW50O1xuXG4gIHRodW1ibGVyOiBUaHVtYmxlcltdID0gW107XG5cbiAgY29ubmVjdDogQ29ubmVjdFtdID0gW107XG5cbiAgdG9vbHRpcDogVG9vbHRpcFtdID0gW107XG5cbiAgaW5wdXRWYWx1ZTogSW5wdXRbXSA9IFtdO1xuXG4gIGlucHV0X3Rvb2x0aXA/OiBJbnB1dDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHByaXZhdGUgY29uZmlndXJhdGlvbjogaUNvbmZpZ1ZpZXcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pc190b29sdGlwID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX3Rvb2x0aXA7XG4gICAgdGhpcy5pc19jb25uZWN0ID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX2Nvbm5lY3Q7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbjtcblxuICAgIHRoaXMuc2xpZGVyID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygnc2xpZGVyJywgdGhpcy5vcmllbnRhdGlvbik7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIG9uX2NoYW5nZV92aWV3KGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnRodW1ibGVyW2ldLm9uX21vdXNlX2Rvd25fYW5kX21vdmUodGhpcy5jb250YWluZXIsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW5wdXRWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWVbaV0ub25fa2V5ZG93bl9vcl9tb3VzZW91dChjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0X3Rvb2x0aXAgJiYgdGhpcy5pc190b29sdGlwKSB7XG4gICAgICB0aGlzLmlucHV0X3Rvb2x0aXAub25fc3dpdGNoX2NoZWNrKHRoaXMudG9vbHRpcCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG1vZGVsX3N0YXRlOiB0TW9kZWxEYXRhKSB7XG4gICAgY29uc3QgaTogbnVtYmVyID0gbW9kZWxfc3RhdGUuaW5kZXg7XG4gICAgY29uc3QgeyBwb3NpdGlvbiB9ID0gbW9kZWxfc3RhdGU7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gbW9kZWxfc3RhdGU7XG5cbiAgICB0aGlzLnNldF9hY3RpdmVfdGh1bWJsZXIocG9zaXRpb24sIGkpO1xuXG4gICAgdGhpcy50aHVtYmxlcltpXS5zZXRfbmV3X3Bvc2l0aW9uKHBvc2l0aW9uW2ldKTtcblxuICAgIGlmICh0aGlzLmlzX3Rvb2x0aXApIHtcbiAgICAgIHRoaXMudG9vbHRpcFtpXS5zZXRfaW5uZXJfdGV4dCh2YWx1ZVtpXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmlucHV0VmFsdWVbaV0uZWxlbWVudC52YWx1ZSA9IFN0cmluZyh2YWx1ZVtpXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNfY29ubmVjdCkge1xuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdFBvc2l0aW9uKDAsIHBvc2l0aW9uWzBdKTtcbiAgICAgIH0gZWxzZSBpZiAocG9zaXRpb25bMV0pIHtcbiAgICAgICAgdGhpcy5jb25uZWN0WzBdLnNldF9jb25uZWN0UG9zaXRpb24ocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRfYWN0aXZlX3RodW1ibGVyKHBvc2l0aW9uOiB0UG9zaXRpb24sIGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIHRoaXMudGh1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnRodW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNfdG9vbHRpcCkge1xuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGh1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnRodW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNfdG9vbHRpcCkge1xuICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZV9yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudmFsdWVfcmFuZ2UucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZV9yYW5nZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMudmFsdWVfc3RhcnRbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnZhbHVlX3N0YXJ0LnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWVfc3RhcnRbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV07XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKHRoaXMuZ2V0UG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlX3N0YXJ0W2ldLCB0aGlzLnZhbHVlX3JhbmdlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMudmFsdWVfcmFuZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy50aHVtYmxlci5wdXNoKG5ldyBUaHVtYmxlcih0aGlzLnBvc2l0aW9uW2ldLCB0aGlzLm9yaWVudGF0aW9uLCBpKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNfY29ubmVjdCkge1xuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KHRoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0sIHRoaXMub3JpZW50YXRpb24pKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLmNvbm5lY3RbMF0uZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNfdG9vbHRpcCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMudG9vbHRpcC5wdXNoKG5ldyBUb29sdGlwKHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMub3JpZW50YXRpb24pKTtcblxuICAgICAgICB0aGlzLnRodW1ibGVyW2ldLmVsZW1lbnQuYXBwZW5kKHRoaXMudG9vbHRpcFtpXS5lbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLnRodW1ibGVyW2ldLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLnNsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZS5wdXNoKG5ldyBJbnB1dChcbiAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC52YWx1ZVtpXSxcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV0sXG4gICAgICAgICAgaSxcbiAgICAgICAgKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQudG9vbHRpcCkge1xuICAgICAgdGhpcy5pbnB1dF90b29sdGlwID0gbmV3IElucHV0KFxuICAgICAgICAndG9vbHRpcCcsXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC50b29sdGlwWzBdLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgVmlldyB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBDb25uZWN0IGV4dGVuZHMgSGVscGVyIHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbm5lY3RQb3NpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9zaXRpb25fc3RhcnQ6IG51bWJlciwgcHJpdmF0ZSBwb3NpdGlvbl9lbmQ6IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCdjb25uZWN0JywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICB0aGlzLnNldF9jb25uZWN0UG9zaXRpb24odGhpcy5wb3NpdGlvbl9zdGFydCwgdGhpcy5wb3NpdGlvbl9lbmQpO1xuICAgIH1cblxuICAgIHNldF9jb25uZWN0UG9zaXRpb24ocG9zaXRpb25fc3RhcnQ6IG51bWJlciwgcG9zaXRpb25fZW5kOiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IHN0YXJ0OiBudW1iZXIgPSBNYXRoLnJvdW5kKHBvc2l0aW9uX3N0YXJ0ICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XG4gICAgICBjb25zdCBlbmQ6IG51bWJlciA9IE1hdGgucm91bmQocG9zaXRpb25fZW5kICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XG5cbiAgICAgIHRoaXMuY29ubmVjdFBvc2l0aW9uID0gW3N0YXJ0LCBlbmRdO1xuICAgICAgY29uc3Qgc3R5bGU6IHN0cmluZyA9IHN0YXJ0ID09PSAwXG4gICAgICAgID8gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgPyBgd2lkdGg6ICR7ZW5kfSU7YFxuICAgICAgICAgIDogYGhlaWdodDogJHtlbmR9JTtgXG4gICAgICAgIDogdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgPyBgbGVmdDogJHtzdGFydH0lOyB3aWR0aDogJHsoZW5kIC0gc3RhcnQpfSU7YFxuICAgICAgICAgIDogYHRvcDogJHtzdGFydH0lOyBoZWlnaHQ6ICR7KGVuZCAtIHN0YXJ0KX0lO2A7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgIH1cbn1cbmV4cG9ydCB7IENvbm5lY3QgfTtcbiIsImNsYXNzIEhlbHBlciB7XG4gICAgcmVhZG9ubHkgVE9fVEhVTUJMRVJfUE9TSVRJT046IG51bWJlciA9IDFlNDtcblxuICAgIHJlYWRvbmx5IFRPX0NPTk5FQ1RfVVBEQVRFOiBudW1iZXIgPSAxZTI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIGdldFBvc2l0aW9uX2Zyb21fdmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IHRSYW5nZSk6IG51bWJlciB7XG4gICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAoKHZhbHVlIC0gcmFuZ2VbMF0pIC8gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pKTtcbiAgICAgIHJlc3VsdCA9IE1hdGgucm91bmQocmVzdWx0ICogdGhpcy5UT19USFVNQkxFUl9QT1NJVElPTikgLyB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OO1xuXG4gICAgICBpZiAocmVzdWx0IDwgMCkge1xuICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA+IDEpIHtcbiAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoY3NzX2NsYXNzOiB0Q3NzQ2xhc3Nlcywgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbik6IEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0IHN0cl9jbGFzczogc3RyaW5nID0gYFNSU19fJHtjc3NfY2xhc3N9YDtcbiAgICAgIGNvbnN0IGNzc19jbGFzc193aXRob3V0T3JpZW50YXRpb246IHN0cmluZyA9IGAke3N0cl9jbGFzc30gJHtzdHJfY2xhc3N9X2A7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoY3NzX2NsYXNzX3dpdGhvdXRPcmllbnRhdGlvbiArIG9yaWVudGF0aW9uKSk7XG5cbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydCB7IEhlbHBlciB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJy4vVG9vbHRpcCc7XG5cbmNsYXNzIElucHV0IGV4dGVuZHMgSGVscGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiB0SW5wdXRUeXBlLCBwdWJsaWMgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgcHVibGljIHZhbHVlPzogbnVtYmVyLCBwdWJsaWMgaW5kZXg/OiBudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICh0eXBlID09PSAndmFsdWUnKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IFN0cmluZyh0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbl9rZXlkb3duX29yX21vdXNlb3V0KHRoaXM6IElucHV0LCBjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3ZhbHVlJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25fa2V5ZG93bik7XG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0Jywgb25fbW91c2VvdXQpO1xuXG4gICAgZnVuY3Rpb24gb25fa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ1RhYicgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGJ1YmJsaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uX21vdXNlb3V0KCkge1xuICAgICAgYnViYmxpbmcoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnViYmxpbmcoKSB7XG4gICAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gTnVtYmVyKHRoYXQuZWxlbWVudC52YWx1ZSk7XG4gICAgICBpZiAodGhhdC5pbmRleCkge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbl9zd2l0Y2hfY2hlY2sodGhpczogSW5wdXQsIHRvb2x0aXA6IFRvb2x0aXBbXSkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3Rvb2x0aXAnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvb2x0aXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoYXQuZWxlbWVudC5jaGVja2VkKSB7XG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hfaGlkZGVuKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoX2hpZGRlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IHsgSW5wdXQgfTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcblxuY2xhc3MgVGh1bWJsZXIgZXh0ZW5kcyBIZWxwZXIge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgdGh1bWJsZXJfcG9zaXRpb246IG51bWJlciA9IDA7XG5cbiAgICBsaXN0ZW5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9zaXRpb246IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uLCBwcml2YXRlIGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ3RodW1ibGVyJywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICB0aGlzLnNldF9uZXdfcG9zaXRpb24odGhpcy5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgc2V0X25ld19wb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICB0aGlzLnRodW1ibGVyX3Bvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgIGNvbnN0IGxpdGVyOiBzdHJpbmcgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnWCcgOiAnWSc7XG5cbiAgICAgIGNvbnN0IHN0eWxlOiBzdHJpbmcgPSBgdHJhbnNmb3JtOiB0cmFuc2xhdGUke2xpdGVyfSgke01hdGgucm91bmQocG9zaXRpb24gKiB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OKX0lKTtgO1xuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgZ2V0X3NoaWZ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XG4gICAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xuICAgICAgICA/IGV2ZW50LmNsaWVudFggLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgICAgOiBldmVudC5jbGllbnRZIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgb25fbW91c2VfZG93bl9hbmRfbW92ZSh0aGlzOiBUaHVtYmxlciwgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5saXN0ZW5pbmcgPSB0cnVlO1xuXG4gICAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hpZnQ6IG51bWJlciA9IHRoaXMuZ2V0X3NoaWZ0KHRoYXQuZWxlbWVudCwgZXZlbnQpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uX21vdXNlX21vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uX21vdXNlX21vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICBsZXQgbmV3X3Bvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgICAgbGV0IG5ld19wb3NpdGlvbl9pbl9wZXJjZW50OiBudW1iZXI7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgICAgICBpZiAodGhhdC5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgICAgIG5ld19wb3NpdGlvbl9pbl9wZXJjZW50ID0gbmV3X3Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRZIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uX2luX3BlcmNlbnQgPSBuZXdfcG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgcG9zaXRpb24gPSBuZXdfcG9zaXRpb25faW5fcGVyY2VudDtcblxuICAgICAgICAgIGlmIChwb3NpdGlvbiA+IDEpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbl9tb3VzZV91cCgpIHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbl9tb3VzZV9tb3ZlKTtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgeyBUaHVtYmxlciB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBUb29sdGlwIGV4dGVuZHMgSGVscGVyIHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIHRvb2x0aXBfdmFsdWU6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbHVlOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbikge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygndG9vbHRpcCcsIHRoaXMub3JpZW50YXRpb24pO1xuICAgICAgdGhpcy5zZXRfaW5uZXJfdGV4dCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXRfaW5uZXJfdGV4dCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICBjb25zdCB2YWw6IG51bWJlciA9IHZhbHVlID4gMFxuICAgICAgICA/IE1hdGguZmxvb3IodmFsdWUpXG4gICAgICAgIDogTWF0aC5jZWlsKHZhbHVlKTtcblxuICAgICAgdGhpcy50b29sdGlwX3ZhbHVlID0gdmFsO1xuICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IFN0cmluZyh2YWwpO1xuICAgIH1cblxuICAgIHN3aXRjaF9oaWRkZW4odGhpczogVG9vbHRpcCwgaXNfdmlzaWJsZTogYm9vbGVhbikge1xuICAgICAgY29uc3QgdGhhdDogVG9vbHRpcCA9IHRoaXM7XG4gICAgICBpZiAoaXNfdmlzaWJsZSkge1xuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgeyBUb29sdGlwIH07XG4iXSwic291cmNlUm9vdCI6IiJ9