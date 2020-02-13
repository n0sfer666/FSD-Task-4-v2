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
            tooltip: true
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
        _this.input_value = [];
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
        if (this.input_value[0] !== undefined) {
            for (var i = 0; i < this.input_value.length; i++) {
                this.input_value[i].on_keydown_or_mouseout(callback);
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
        if (this.input_value[0] !== undefined) {
            this.input_value[i].element.value = String(value[i]);
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
        if (this.configuration.input !== undefined && this.configuration.input.value !== undefined) {
            for (var i = 0; i < this.configuration.input.value.length; i++) {
                this.input_value.push(new Input_1.Input('value', this.configuration.input.value[i], this.configuration.value_start[i], i));
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
    function Input(type, element, value, index) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.element = element;
        _this.value = value;
        _this.index = index;
        if (type === 'value') {
            _this.element.value = String(_this.value);
        }
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
            if (that.index) {
                callback({
                    value: value,
                    index: that.index
                });
            }
        }
    };
    Input.prototype.on_switch_check = function (tooltip) {
        var that = this;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVGh1bWJsZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0VBO0lBQ0UsbUJBQW9CLElBQVUsRUFBVSxLQUFZO1FBQXBELGlCQVNDO1FBVG1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQUMsYUFBOEI7WUFFdEQsS0FBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQUMsV0FBeUI7WUFFbkQsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDO0FBQ08sOEJBQVM7Ozs7Ozs7Ozs7Ozs7OztBQ2ZqQjtJQWNJLGVBQW9CLGFBQW9DO1FBQXBDLGtCQUFhLEdBQWIsYUFBYSxDQUF1QjtRQVh4RCxVQUFLLEdBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixVQUFLLEdBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixhQUFRLEdBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQiw2QkFBd0IsR0FBVyxDQUFDLENBQUM7UUFJNUIsMEJBQXFCLEdBQVcsR0FBRyxDQUFDO1FBSTNDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFFMUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELGdDQUFnQixHQUFoQixVQUFpQixjQUErQjtRQUU5QyxJQUFJLEtBQUssR0FBVyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFFdEMsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFDLElBQUcsY0FBYyxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDeEMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7WUFDekcsU0FBUyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hFO2FBQU0sSUFBRyxjQUFjLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUM1QyxTQUFTLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztZQUVqQyxJQUFHLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0IsSUFBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUN4QyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUN2QzthQUNGO1lBQ0QsSUFBRyxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNkLElBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDeEMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDdkM7YUFDRjtTQUNGO1FBRUQsSUFBSSxTQUFTLEdBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpHLElBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0M7UUFDRCxJQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBRyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNuRDtRQUVELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekMsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUc7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsc0JBQU0sR0FBTjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUF1QjtZQUNqRCxRQUFRLENBQUM7Z0JBQ1AsUUFBUSxFQUFFLEtBQUksQ0FBQyxRQUFRO2dCQUN2QixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxLQUFJLENBQUMsd0JBQXdCO2FBQ3JDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELCtCQUFlLEdBQWYsVUFBZ0IsUUFBdUI7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHVDQUF1QixHQUF2QixVQUF3QixLQUFhLEVBQUUsS0FBYztRQUVuRCxJQUFJLE1BQU0sR0FBVyxDQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztRQUVwRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVELHVDQUF1QixHQUF2QixVQUF3QixRQUFnQixFQUFFLEtBQWM7UUFFdEQsSUFBSSxNQUFNLEdBQVksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsc0NBQXNCLEdBQXRCLFVBQXVCLFNBQWlCLEVBQUUsQ0FBUztRQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJ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O1FBRXJCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsK0JBQWEsR0FBYixVQUE2QixVQUFtQjtRQUM5QyxJQUFJLElBQUksR0FBWSxJQUFJLENBQUM7UUFDekIsSUFBRyxVQUFVLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDN0I7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM1QjtJQUNILENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxDQTdCcUIsZUFBTSxHQTZCM0I7QUFDTywwQkFBTyIsImZpbGUiOiJTaW1wbGVSYW5nZVNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNpbXBsZVJhbmdlU2xpZGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNpbXBsZVJhbmdlU2xpZGVyXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9QbHVnaW4vUGx1Z2luLnRzXCIpO1xuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4uL1ZpZXcvVmlldyc7XHJcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vTW9kZWwvTW9kZWwnO1xyXG5cclxuY2xhc3MgUHJlc2VudGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IFZpZXcsIHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XHJcbiAgICB0aGlzLnZpZXcub25fY2hhbmdlX3ZpZXcoKHRodW1ibGVyX2RhdGE6IFRfVGh1bWJsZXJfRGF0YSkgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aHVtYmxlcl9kYXRhKTtcclxuICAgICAgdGhpcy5tb2RlbC5zZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX2RhdGEpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1vZGVsLm9uX2NoYW5nZV9tb2RlbCgobW9kZWxfc3RhdGU6IFRfTW9kZWxfRGF0YSkgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbF9zdGF0ZSk7XHJcbiAgICAgIHRoaXMudmlldy51cGRhdGUobW9kZWxfc3RhdGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCB7UHJlc2VudGVyfTsiLCJjbGFzcyBNb2RlbCB7XHJcblxyXG5cclxuICAgIHZhbHVlOiBUX1ZhbHVlID0gWzBdO1xyXG4gICAgcmFuZ2U6IFRfUmFuZ2UgPSBbMCwgMF07XHJcbiAgICBzdGVwOiBudW1iZXIgPSAwO1xyXG4gICAgcG9zaXRpb246IFRfUG9zaXRpb24gPSBbMF07XHJcblxyXG4gICAgaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNhbGxiYWNrX2xpc3Q6IElfTW9kZWxfU3RhdGVbXTtcclxuXHJcbiAgICByZWFkb25seSBUT19OT1JNQUxJWkVfUE9TSVRJT046IG51bWJlciA9IDFlNDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Nb2RlbCkge1xyXG5cclxuICAgICAgdGhpcy5jYWxsYmFja19saXN0ID0gW107XHJcblxyXG4gICAgICB0aGlzLnN0ZXAgPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RlcDtcclxuXHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldF9uZXdfcG9zaXRpb24odGh1bWJsZXJfc3RhdGU6IFRfVGh1bWJsZXJfRGF0YSkge1xyXG5cclxuICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aHVtYmxlcl9zdGF0ZS5pbmRleDtcclxuICAgICAgdGhpcy5pbmRleF9vZl9hY3RpdmVfdGh1bWJsZXIgPSBpbmRleDtcclxuXHJcbiAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy5wb3NpdGlvbltpbmRleF07XHJcbiAgICAgIGxldCBuZXdfdmFsdWU6IG51bWJlciA9IHRoaXMudmFsdWVbaW5kZXhdO1xyXG5cclxuICAgICAgaWYodGh1bWJsZXJfc3RhdGUucG9zaXRpb24gIT09IHVuZGVmaW5lZCkgeyAgXHJcbiAgICAgICAgcG9zaXRpb24gPSBNYXRoLnJvdW5kKHRodW1ibGVyX3N0YXRlLnBvc2l0aW9uICogdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pIC8gdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT047XHJcbiAgICAgICAgbmV3X3ZhbHVlID0gdGhpcy5nZXRfdmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbiwgdGhpcy5yYW5nZSk7XHJcbiAgICAgIH0gZWxzZSBpZih0aHVtYmxlcl9zdGF0ZS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbmV3X3ZhbHVlID0gdGh1bWJsZXJfc3RhdGUudmFsdWU7XHJcblxyXG4gICAgICAgIGlmKGluZGV4ID09PSAwICYmIHRoaXMudmFsdWVbMV0pIHtcclxuICAgICAgICAgIGlmKG5ld192YWx1ZSA+IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXApIHtcclxuICAgICAgICAgICAgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgIGlmKG5ld192YWx1ZSA8IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXApIHtcclxuICAgICAgICAgICAgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZVswXSArIHRoaXMuc3RlcDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBjb25kaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbdGhpcy52YWx1ZVtpbmRleF0gLSB0aGlzLnN0ZXAsIHRoaXMudmFsdWVbaW5kZXhdICsgdGhpcy5zdGVwXTtcclxuXHJcbiAgICAgIGlmKG5ld192YWx1ZSA+PSBjb25kaXRpb25bMV0gfHwgbmV3X3ZhbHVlIDw9IGNvbmRpdGlvblswXSkge1xyXG4gICAgICAgIHRoaXMuc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbihuZXdfdmFsdWUsIGluZGV4KTtcclxuICAgICAgfVxyXG4gICAgICBpZihuZXdfdmFsdWUgPD0gdGhpcy5yYW5nZVswXSkge1xyXG4gICAgICAgIHRoaXMuc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbih0aGlzLnJhbmdlWzBdLCBpbmRleCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYobmV3X3ZhbHVlID49IHRoaXMucmFuZ2VbMV0pIHtcclxuICAgICAgICB0aGlzLnNldF92YWx1ZV9hbmRfcG9zaXRpb24odGhpcy5yYW5nZVsxXSwgaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGNoZWNrIGZvciBjb2xsaXNpb25cclxuICAgICAgaWYodGhpcy52YWx1ZS5sZW5ndGggPiAxICYmIHRoaXMudmFsdWVbMV0pIHtcclxuICAgICAgICBpZih0aGlzLnZhbHVlWzBdIDwgdGhpcy52YWx1ZVsxXSApIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja19saXN0LmZvckVhY2goKGNhbGxiYWNrOiBJX01vZGVsX1N0YXRlKSA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4X29mX2FjdGl2ZV90aHVtYmxlclxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbl9jaGFuZ2VfbW9kZWwoY2FsbGJhY2s6IElfTW9kZWxfU3RhdGUpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja19saXN0LnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiBUX1JhbmdlKTogbnVtYmVyIHtcclxuXHJcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9ICggdmFsdWUgLSByYW5nZVswXSApIC8gKCByYW5nZVsxXSAtIHJhbmdlWzBdICk7XHJcblxyXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0ICogdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pIC8gdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF92YWx1ZV9mcm9tX3Bvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIsIHJhbmdlOiBUX1JhbmdlKTogbnVtYmVyIHtcclxuXHJcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciAgPSAocG9zaXRpb24gKiAocmFuZ2VbMV0gLSByYW5nZVswXSkpICsgcmFuZ2VbMF07XHJcblxyXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbihuZXdfdmFsdWU6IG51bWJlciwgaTogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmFsdWVbaV0gPSBuZXdfdmFsdWUgPiAwXHJcbiAgICAgICAgPyAoTWF0aC5jZWlsKG5ld192YWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApXHJcbiAgICAgICAgOiAoTWF0aC5mbG9vcihuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKTtcclxuICAgICAgaWYodGhpcy52YWx1ZVtpXSA+IHRoaXMucmFuZ2VbMV0pIHtcclxuICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5yYW5nZVsxXTtcclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnZhbHVlW2ldIDwgdGhpcy5yYW5nZVswXSkge1xyXG4gICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLnJhbmdlWzBdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgIGZvciggbGV0IGk9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2UubGVuZ3RoOyBpKysgKSB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5yYW5nZS5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmFuZ2VbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yKCBsZXQgaT0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydC5sZW5ndGg7IGkrKyApIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy52YWx1ZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKCB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucG9zaXRpb25baV0gPSAgdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtNb2RlbH07IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vVmlldy9WaWV3JztcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuL01vZGVsL01vZGVsJztcclxuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XHJcblxyXG5jbGFzcyBTaW1wbGVSYW5nZVNsaWRlciB7XHJcblxyXG4gICAgdmlldzogVmlldztcclxuICAgIG1vZGVsOiBNb2RlbDtcclxuICAgIHByZXNlbnRlcjogUHJlc2VudGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBKUXVlcnksIHByaXZhdGUgdXNlcl9jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlcikge1xyXG5cclxuICAgICAgbGV0IHNsaWRlcl9jb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xyXG4gICAgICAgIFxyXG4gICAgICBsZXQgZGVmYXVsdF9Db25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlciA9IHtcclxuICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxyXG4gICAgICAgIHN0YXJ0OiAgICAgICBbMTBdLFxyXG4gICAgICAgIHJhbmdlOiAgICAgICBbMCwgMTAwXSxcclxuICAgICAgICBzdGVwOiAgICAgICAgMSxcclxuICAgICAgICBjb25uZWN0OiAgICAgdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOiAgICAgdHJ1ZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyID0ge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbiA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLm9yaWVudGF0aW9uIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24sXHJcbiAgICAgICAgc3RhcnQ6ICAgICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0YXJ0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24uc3RhcnQgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGFydCxcclxuICAgICAgICByYW5nZTogICAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ucmFuZ2UgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5yYW5nZSA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnJhbmdlLFxyXG4gICAgICAgIHN0ZXA6ICAgICAgICB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGVwID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24uc3RlcCA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0ZXAsXHJcbiAgICAgICAgY29ubmVjdDogICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLmNvbm5lY3QgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5jb25uZWN0IDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uY29ubmVjdCxcclxuICAgICAgICB0b29sdGlwOiAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24udG9vbHRpcCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnRvb2x0aXAgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi50b29sdGlwLFxyXG4gICAgICAgIGlucHV0OiAgICAgICB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5pbnB1dFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IG1vZGVsX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Nb2RlbCA9IHtcclxuICAgICAgICB2YWx1ZV9zdGFydDogY29tcGxldGVfY29uZmlndXJhdGlvbi5zdGFydCxcclxuICAgICAgICB2YWx1ZV9yYW5nZTogY29tcGxldGVfY29uZmlndXJhdGlvbi5yYW5nZSxcclxuICAgICAgICB2YWx1ZV9zdGVwOiAgY29tcGxldGVfY29uZmlndXJhdGlvbi5zdGVwLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IHZpZXdfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1ZpZXcgPSB7XHJcbiAgICAgICAgb3JpZW50YXRpb246IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24sXHJcbiAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXHJcbiAgICAgICAgdmFsdWVfcmFuZ2U6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24ucmFuZ2UsXHJcbiAgICAgICAgaXNfdG9vbHRpcDogIGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24udG9vbHRpcCxcclxuICAgICAgICBpc19jb25uZWN0OiAgY29tcGxldGVfY29uZmlndXJhdGlvbi5jb25uZWN0LFxyXG4gICAgICAgIGlucHV0OiAgICAgICBjb21wbGV0ZV9jb25maWd1cmF0aW9uLmlucHV0XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzbGlkZXJfY29udGFpbmVyLCB2aWV3X2NvbmZpZ3VyYXRpb24pO1xyXG4gICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKG1vZGVsX2NvbmZpZ3VyYXRpb24pO1xyXG4gICAgICB0aGlzLnByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIodGhpcy52aWV3LCB0aGlzLm1vZGVsKTtcclxuXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtTaW1wbGVSYW5nZVNsaWRlcn07XHJcblxyXG4oZnVuY3Rpb24oJDogSlF1ZXJ5U3RhdGljKSB7XHJcbiAgJC5mbi5leHRlbmQoe1xyXG4gICAgU2ltcGxlUmFuZ2VTbGlkZXI6IGZ1bmN0aW9uKHVzZXJfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1VzZXIpIHtcclxuICAgICAgcmV0dXJuIG5ldyBTaW1wbGVSYW5nZVNsaWRlcig8SlF1ZXJ5PiB0aGlzLCA8SV9Db25maWd1cmF0aW9uX1VzZXI+IHVzZXJfY29uZmlndXJhdGlvbik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0gKGpRdWVyeSkgKTsiLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL2VudGl0aWVzL0hlbHBlcic7XHJcbmltcG9ydCB7IFRodW1ibGVyIH0gZnJvbSAnLi9lbnRpdGllcy9UaHVtYmxlcic7XHJcbmltcG9ydCB7IENvbm5lY3QgfSBmcm9tICcuL2VudGl0aWVzL0Nvbm5lY3QnO1xyXG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9lbnRpdGllcy9Ub29sdGlwJztcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuL2VudGl0aWVzL0lucHV0JztcclxuXHJcbmNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xyXG5cclxuICBwb3NpdGlvbjogVF9Qb3NpdGlvbiA9IFswXTtcclxuXHJcbiAgdmFsdWVfcmFuZ2U6IFRfUmFuZ2UgPSBbMCwgMF07XHJcbiAgdmFsdWVfc3RhcnQ6IFRfVmFsdWUgPSBbMF07XHJcblxyXG4gIG9yaWVudGF0aW9uOiBUX09yaWVudGF0aW9uO1xyXG5cclxuICBpc190b29sdGlwOiBib29sZWFuO1xyXG4gIGlzX2Nvbm5lY3Q6IGJvb2xlYW47XHJcblxyXG4gIHNsaWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGh1bWJsZXI6IFRodW1ibGVyW10gPSBbXTtcclxuICBjb25uZWN0OiBDb25uZWN0W10gPSBbXTtcclxuICB0b29sdGlwOiBUb29sdGlwW10gPSBbXTtcclxuXHJcbiAgaW5wdXRfdmFsdWU6IElucHV0W10gPSBbXTtcclxuICBpbnB1dF90b29sdGlwPzogSW5wdXQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHByaXZhdGUgY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1ZpZXcgKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuaXNfdG9vbHRpcCA9IHRoaXMuY29uZmlndXJhdGlvbi5pc190b29sdGlwO1xyXG4gICAgdGhpcy5pc19jb25uZWN0ID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX2Nvbm5lY3Q7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5jb25maWd1cmF0aW9uLm9yaWVudGF0aW9uO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygnc2xpZGVyJywgdGhpcy5vcmllbnRhdGlvbik7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBvbl9jaGFuZ2VfdmlldyhjYWxsYmFjazogSV9UaHVtYmxlcl9TdGF0ZSkge1xyXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICB0aGlzLnRodW1ibGVyW2ldLm9uX21vdXNlX2Rvd25fYW5kX21vdmUodGhpcy5jb250YWluZXIsIGNhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIGlmKCB0aGlzLmlucHV0X3ZhbHVlWzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmlucHV0X3ZhbHVlLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRfdmFsdWVbaV0ub25fa2V5ZG93bl9vcl9tb3VzZW91dChjYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKCB0aGlzLmlucHV0X3Rvb2x0aXAgJiYgdGhpcy5pc190b29sdGlwKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRfdG9vbHRpcC5vbl9zd2l0Y2hfY2hlY2sodGhpcy50b29sdGlwKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgdXBkYXRlKG1vZGVsX3N0YXRlOiBUX01vZGVsX0RhdGEpIHtcclxuICAgIGxldCBpOiBudW1iZXIgPSBtb2RlbF9zdGF0ZS5pbmRleDtcclxuICAgIGxldCBwb3NpdGlvbjogVF9Qb3NpdGlvbiA9IG1vZGVsX3N0YXRlLnBvc2l0aW9uO1xyXG4gICAgbGV0IHZhbHVlOiBUX1ZhbHVlID0gbW9kZWxfc3RhdGUudmFsdWU7XHJcblxyXG4gICAgaWYocG9zaXRpb24ubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgaWYoaSA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMudGh1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMudGh1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzBdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnRodW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLnRodW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICBpZih0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICB0aGlzLnRodW1ibGVyW2ldLnNldF9uZXdfcG9zaXRpb24ocG9zaXRpb25baV0pO1xyXG5cclxuICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICB0aGlzLnRvb2x0aXBbaV0uc2V0X2lubmVyX3RleHQodmFsdWVbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMuaW5wdXRfdmFsdWVbMF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmlucHV0X3ZhbHVlW2ldLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodmFsdWVbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMuaXNfY29ubmVjdCkge1xyXG4gICAgICBpZih0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdF9wb3NpdGlvbigwLCBwb3NpdGlvblswXSk7XHJcbiAgICAgIH0gZWxzZSBpZihwb3NpdGlvblsxXSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdF9wb3NpdGlvbihwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGluaXQoKSB7XHJcbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgaWYodGhpcy52YWx1ZV9yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZV9yYW5nZS5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZV9yYW5nZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0Lmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgXHJcbiAgICAgIGlmKHRoaXMudmFsdWVfc3RhcnRbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMudmFsdWVfc3RhcnQucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudmFsdWVfc3RhcnRbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCggdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlX3N0YXJ0W2ldLCB0aGlzLnZhbHVlX3JhbmdlKSApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25baV0gPSAgdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlX3N0YXJ0W2ldLCB0aGlzLnZhbHVlX3JhbmdlKTtcclxuICAgICAgfVxyXG4gICAgfSBcclxuXHJcbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb24ubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHRoaXMudGh1bWJsZXIucHVzaChuZXcgVGh1bWJsZXIodGhpcy5wb3NpdGlvbltpXSwgdGhpcy5vcmllbnRhdGlvbiwgaSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMuaXNfY29ubmVjdCkge1xyXG4gICAgICBpZih0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKCBuZXcgQ29ubmVjdCgwLCB0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLm9yaWVudGF0aW9uKSApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKCBuZXcgQ29ubmVjdCh0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdLCB0aGlzLm9yaWVudGF0aW9uKSApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLmNvbm5lY3RbMF0uZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc190b29sdGlwKSB7XHJcbiAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy50aHVtYmxlci5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICB0aGlzLnRvb2x0aXAucHVzaCggbmV3IFRvb2x0aXAoIHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMub3JpZW50YXRpb24gKSApO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMudGh1bWJsZXJbaV0uZWxlbWVudC5hcHBlbmQodGhpcy50b29sdGlwW2ldLmVsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy50aHVtYmxlcltpXS5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQodGhpcy5zbGlkZXIpO1xyXG4gICAgXHJcbiAgICBpZih0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC52YWx1ZS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICB0aGlzLmlucHV0X3ZhbHVlLnB1c2gobmV3IElucHV0KFxyXG4gICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC52YWx1ZVtpXSxcclxuICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXSxcclxuICAgICAgICAgIGlcclxuICAgICAgICApKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQudG9vbHRpcCkge1xyXG4gICAgICB0aGlzLmlucHV0X3Rvb2x0aXAgPSBuZXcgSW5wdXQoXHJcbiAgICAgICAgJ3Rvb2x0aXAnLFxyXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC50b29sdGlwWzBdXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Vmlld307IiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xyXG5cclxuY2xhc3MgQ29ubmVjdCBleHRlbmRzIEhlbHBlciB7XHJcbiAgICBcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgY29ubmVjdF9wb3NpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvc2l0aW9uX3N0YXJ0OiBudW1iZXIsIHByaXZhdGUgcG9zaXRpb25fZW5kOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24pIHtcclxuICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ2Nvbm5lY3QnLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgdGhpcy5zZXRfY29ubmVjdF9wb3NpdGlvbih0aGlzLnBvc2l0aW9uX3N0YXJ0LCB0aGlzLnBvc2l0aW9uX2VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X2Nvbm5lY3RfcG9zaXRpb24ocG9zaXRpb25fc3RhcnQ6IG51bWJlciwgcG9zaXRpb25fZW5kOiBudW1iZXIpIHtcclxuXHJcbiAgICAgIGxldCBzdGFydDogbnVtYmVyID0gTWF0aC5yb3VuZChwb3NpdGlvbl9zdGFydCAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xyXG4gICAgICBsZXQgZW5kOiBudW1iZXIgPSBNYXRoLnJvdW5kKHBvc2l0aW9uX2VuZCAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xyXG5cclxuICAgICAgdGhpcy5jb25uZWN0X3Bvc2l0aW9uID0gW3N0YXJ0LCBlbmRdO1xyXG4gICAgICBsZXQgc3R5bGU6IHN0cmluZyA9IHN0YXJ0ID09PSAwXHJcbiAgICAgICAgPyB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICAgID8gYHdpZHRoOiAke2VuZH0lO2BcclxuICAgICAgICAgIDogYGhlaWdodDogJHtlbmR9JTtgXHJcbiAgICAgICAgOiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICAgID8gYGxlZnQ6ICR7c3RhcnR9JTsgd2lkdGg6ICR7KGVuZCAtIHN0YXJ0KX0lO2BcclxuICAgICAgICAgIDogYHRvcDogJHtzdGFydH0lOyBoZWlnaHQ6ICR7KGVuZCAtIHN0YXJ0KX0lO2A7XHJcblxyXG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQge0Nvbm5lY3R9OyIsImNsYXNzIEhlbHBlciB7XHJcblxyXG4gICAgcmVhZG9ubHkgVE9fVEhVTUJMRVJfUE9TSVRJT046IG51bWJlciA9IDFlNDtcclxuICAgIHJlYWRvbmx5IFRPX0NPTk5FQ1RfVVBEQVRFOiBudW1iZXIgPSAxZTI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiBUX1JhbmdlKTogbnVtYmVyIHtcclxuXHJcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9ICAoICggdmFsdWUgLSByYW5nZVswXSApIC8gKCByYW5nZVsxXSAtIHJhbmdlWzBdICkgKTtcclxuICAgICAgcmVzdWx0ID0gTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OKSAvIHRoaXMuVE9fVEhVTUJMRVJfUE9TSVRJT047XHJcblxyXG4gICAgICBpZiggcmVzdWx0IDwgMCApIHtcclxuICAgICAgICByZXN1bHQgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKCByZXN1bHQgPiAxICkge1xyXG4gICAgICAgIHJlc3VsdCA9IDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcyggY3NzX2NsYXNzOiBUX0NTU19DbGFzc2VzLCBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbiApOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgIGxldCBzdHJfY2xhc3M6IHN0cmluZyA9ICdTUlNfXycgKyBjc3NfY2xhc3M7XHJcbiAgICAgIGxldCBjc3NfY2xhc3Nfd2l0aG91dF9vcmllbnRhdGlvbjogc3RyaW5nID0gc3RyX2NsYXNzICsgJyAnICsgc3RyX2NsYXNzICsgJ18nO1xyXG5cclxuICAgICAgbGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIChjc3NfY2xhc3Nfd2l0aG91dF9vcmllbnRhdGlvbiArIG9yaWVudGF0aW9uKSApO1xyXG5cclxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCB7SGVscGVyfTsiLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tIFwiLi9IZWxwZXJcIjtcclxuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gXCIuL1Rvb2x0aXBcIjtcclxuXHJcbmNsYXNzIElucHV0IGV4dGVuZHMgSGVscGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFRfSW5wdXRfVHlwZSwgcHVibGljIGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIHB1YmxpYyB2YWx1ZT86IG51bWJlciwgcHVibGljIGluZGV4PzogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgaWYodHlwZSA9PT0gJ3ZhbHVlJykge1xyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uX2tleWRvd25fb3JfbW91c2VvdXQodGhpczogSW5wdXQsIGNhbGxiYWNrOiBJX1RodW1ibGVyX1N0YXRlKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbl9rZXlkb3duKTtcclxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIG9uX21vdXNlb3V0KTtcclxuXHJcbiAgICBmdW5jdGlvbiBvbl9rZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgIGlmKGV2ZW50LmtleUNvZGUgPT09IDkgfHwgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICBidWJibGluZygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBvbl9tb3VzZW91dCgpIHtcclxuICAgICAgYnViYmxpbmcoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGJ1YmJsaW5nKCkge1xyXG4gICAgICBsZXQgdmFsdWU6IG51bWJlciA9IE51bWJlcih0aGF0LmVsZW1lbnQudmFsdWUpO1xyXG4gICAgICBpZih0aGF0LmluZGV4KSB7XHJcbiAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXhcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBvbl9zd2l0Y2hfY2hlY2sodGhpczogSW5wdXQsIHRvb2x0aXA6IFRvb2x0aXBbXSkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0b29sdGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYodGhhdC5lbGVtZW50LmNoZWNrZWQpIHtcclxuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoX2hpZGRlbih0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hfaGlkZGVuKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbmV4cG9ydCB7IElucHV0IH07IiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xyXG5cclxuY2xhc3MgVGh1bWJsZXIgZXh0ZW5kcyBIZWxwZXIge1xyXG5cclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIHRodW1ibGVyX3Bvc2l0aW9uOiBudW1iZXIgPSAwO1xyXG4gICAgbGlzdGVuaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgcG9zaXRpb246IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbiwgcHJpdmF0ZSBpbmRleDogbnVtYmVyICkge1xyXG4gICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygndGh1bWJsZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgdGhpcy5zZXRfbmV3X3Bvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRfbmV3X3Bvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgdGhpcy50aHVtYmxlcl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgICAgbGV0IGxpdGVyOiBzdHJpbmcgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnWCcgOiAnWSc7XHJcblxyXG4gICAgICBsZXQgc3R5bGU6IHN0cmluZyA9IGB0cmFuc2Zvcm06IHRyYW5zbGF0ZSR7bGl0ZXJ9KCR7IE1hdGgucm91bmQocG9zaXRpb24gKiB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OKSB9JSk7YDtcclxuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3NoaWZ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XHJcblxyXG4gICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICA/IGV2ZW50LmNsaWVudFggLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcclxuICAgICAgICA6IGV2ZW50LmNsaWVudFkgLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uX21vdXNlX2Rvd25fYW5kX21vdmUodGhpczogVGh1bWJsZXIsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiBJX1RodW1ibGVyX1N0YXRlKSB7XHJcblxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoYXQubGlzdGVuaW5nID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBsZXQgc2hpZnQ6IG51bWJlciA9IHRoaXMuZ2V0X3NoaWZ0KHRoYXQuZWxlbWVudCwgZXZlbnQpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbl9tb3VzZV9tb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbl9tb3VzZV9tb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgbGV0IG5ld19wb3NpdGlvbjogbnVtYmVyLFxyXG4gICAgICAgICAgICBuZXdfcG9zaXRpb25faW5fcGVyY2VudDogbnVtYmVyLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICBpZih0aGF0Lm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WCAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgIG5ld19wb3NpdGlvbl9pbl9wZXJjZW50ID0gbmV3X3Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WSAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uX2luX3BlcmNlbnQgPSBuZXdfcG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgcG9zaXRpb24gPSBuZXdfcG9zaXRpb25faW5fcGVyY2VudDtcclxuXHJcbiAgICAgICAgICBpZihwb3NpdGlvbiA+IDEpIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYocG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjYWxsYmFjayh7IHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXggfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbl9tb3VzZV91cCgpIHtcclxuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uX21vdXNlX21vdmUpO1xyXG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uX21vdXNlX3VwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7VGh1bWJsZXJ9OyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcclxuXHJcbmNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBIZWxwZXIge1xyXG5cclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgdG9vbHRpcF92YWx1ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbHVlOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24pIHtcclxuICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ3Rvb2x0aXAnLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgdGhpcy5zZXRfaW5uZXJfdGV4dCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfaW5uZXJfdGV4dCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgIGxldCB2YWw6IG51bWJlciA9IHZhbHVlID4gMFxyXG4gICAgICAgID8gTWF0aC5mbG9vcih2YWx1ZSlcclxuICAgICAgICA6IE1hdGguY2VpbCh2YWx1ZSk7XHJcblxyXG4gICAgICB0aGlzLnRvb2x0aXBfdmFsdWUgPSB2YWw7ICAgICAgICAgICAgXHJcbiAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSBTdHJpbmcoIHZhbCApO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoX2hpZGRlbih0aGlzOiBUb29sdGlwLCBpc192aXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgIGxldCB0aGF0OiBUb29sdGlwID0gdGhpcztcclxuICAgICAgaWYoaXNfdmlzaWJsZSkge1xyXG4gICAgICAgIHRoYXQuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7VG9vbHRpcH07Il0sInNvdXJjZVJvb3QiOiIifQ==