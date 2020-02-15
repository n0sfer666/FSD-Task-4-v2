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
        var new_value = this.get_new_value(thumbler_state);
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
    Model.prototype.get_new_value = function (thumbler_state) {
        var index = thumbler_state.index;
        var new_value = this.value[index];
        var position;
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
        return new_value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVGh1bWJsZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtR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QUMsQ0FBQzs7SUFDbEMsQ0FBQztJQUVELGdDQUFjLEdBQWQsVUFBZSxLQUFhO1FBRTFCLElBQUksR0FBRyxHQUFXLEtBQUssR0FBRyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDekMsQ0FBQztJQUNELCtCQUFhLEdBQWIsVUFBNkIsVUFBbUI7UUFDOUMsSUFBSSxJQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3pCLElBQUcsVUFBVSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQ0E3QnFCLGVBQU0sR0E2QjNCO0FBQ08sMEJBQU8iLCJmaWxlIjoiU2ltcGxlUmFuZ2VTbGlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvUGx1Z2luL1BsdWdpbi50c1wiKTtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuLi9WaWV3L1ZpZXcnO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL01vZGVsL01vZGVsJztcclxuXHJcbmNsYXNzIFByZXNlbnRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3OiBWaWV3LCBwcml2YXRlIG1vZGVsOiBNb2RlbCkge1xyXG4gICAgdGhpcy52aWV3Lm9uX2NoYW5nZV92aWV3KCh0aHVtYmxlcl9kYXRhOiBUX1RodW1ibGVyX0RhdGEpID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2codGh1bWJsZXJfZGF0YSk7XHJcbiAgICAgIHRoaXMubW9kZWwuc2V0X25ld19wb3NpdGlvbih0aHVtYmxlcl9kYXRhKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5tb2RlbC5vbl9jaGFuZ2VfbW9kZWwoKG1vZGVsX3N0YXRlOiBUX01vZGVsX0RhdGEpID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2cobW9kZWxfc3RhdGUpO1xyXG4gICAgICB0aGlzLnZpZXcudXBkYXRlKG1vZGVsX3N0YXRlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5leHBvcnQge1ByZXNlbnRlcn07IiwiY2xhc3MgTW9kZWwge1xyXG5cclxuXHJcbiAgICB2YWx1ZTogVF9WYWx1ZSA9IFswXTtcclxuICAgIHJhbmdlOiBUX1JhbmdlID0gWzAsIDBdO1xyXG4gICAgc3RlcDogbnVtYmVyID0gMDtcclxuICAgIHBvc2l0aW9uOiBUX1Bvc2l0aW9uID0gWzBdO1xyXG5cclxuICAgIGluZGV4X29mX2FjdGl2ZV90aHVtYmxlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjYWxsYmFja19saXN0OiBJX01vZGVsX1N0YXRlW107XHJcblxyXG4gICAgcmVhZG9ubHkgVE9fTk9STUFMSVpFX1BPU0lUSU9OOiBudW1iZXIgPSAxZTQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fTW9kZWwpIHtcclxuXHJcbiAgICAgIHRoaXMuY2FsbGJhY2tfbGlzdCA9IFtdO1xyXG5cclxuICAgICAgdGhpcy5zdGVwID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0ZXA7XHJcblxyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX3N0YXRlOiBUX1RodW1ibGVyX0RhdGEpIHtcclxuXHJcbiAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGh1bWJsZXJfc3RhdGUuaW5kZXg7XHJcbiAgICAgIHRoaXMuaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyID0gaW5kZXg7XHJcblxyXG4gICAgICBsZXQgcG9zaXRpb246IG51bWJlciA9IHRoaXMucG9zaXRpb25baW5kZXhdO1xyXG4gICAgICBsZXQgbmV3X3ZhbHVlOiBudW1iZXIgPSB0aGlzLmdldF9uZXdfdmFsdWUodGh1bWJsZXJfc3RhdGUpO1xyXG4vLyBUT0RPIGNoZWNrX2NvbmRpdGlvbihuZXdfdmFsdWU6IG51bWJlcikge1xyXG4gICAgICBsZXQgY29uZGl0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gW3RoaXMudmFsdWVbaW5kZXhdIC0gdGhpcy5zdGVwLCB0aGlzLnZhbHVlW2luZGV4XSArIHRoaXMuc3RlcF07XHJcblxyXG4gICAgICBpZihuZXdfdmFsdWUgPj0gY29uZGl0aW9uWzFdIHx8IG5ld192YWx1ZSA8PSBjb25kaXRpb25bMF0pIHtcclxuICAgICAgICB0aGlzLnNldF92YWx1ZV9hbmRfcG9zaXRpb24obmV3X3ZhbHVlLCBpbmRleCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYobmV3X3ZhbHVlIDw9IHRoaXMucmFuZ2VbMF0pIHtcclxuICAgICAgICB0aGlzLnNldF92YWx1ZV9hbmRfcG9zaXRpb24odGhpcy5yYW5nZVswXSwgaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKG5ld192YWx1ZSA+PSB0aGlzLnJhbmdlWzFdKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfdmFsdWVfYW5kX3Bvc2l0aW9uKHRoaXMucmFuZ2VbMV0sIGluZGV4KTtcclxuICAgICAgfVxyXG4vLyBUT0RPIH1cclxuICAgICAgLy8gY2hlY2sgZm9yIGNvbGxpc2lvblxyXG4gICAgICBpZih0aGlzLnZhbHVlLmxlbmd0aCA+IDEgJiYgdGhpcy52YWx1ZVsxXSkge1xyXG4gICAgICAgIGlmKHRoaXMudmFsdWVbMF0gPCB0aGlzLnZhbHVlWzFdICkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X25ld192YWx1ZSh0aHVtYmxlcl9zdGF0ZTogVF9UaHVtYmxlcl9EYXRhKTogbnVtYmVyIHtcclxuICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aHVtYmxlcl9zdGF0ZS5pbmRleDtcclxuICAgICAgbGV0IG5ld192YWx1ZTogbnVtYmVyID0gdGhpcy52YWx1ZVtpbmRleF07IFxyXG4gICAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcclxuXHJcbiAgICAgIGlmKHRodW1ibGVyX3N0YXRlLnBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHsgIFxyXG4gICAgICAgIHBvc2l0aW9uID0gTWF0aC5yb3VuZCh0aHVtYmxlcl9zdGF0ZS5wb3NpdGlvbiAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKSAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OO1xyXG4gICAgICAgIG5ld192YWx1ZSA9IHRoaXMuZ2V0X3ZhbHVlX2Zyb21fcG9zaXRpb24ocG9zaXRpb24sIHRoaXMucmFuZ2UpO1xyXG4gICAgICB9IGVsc2UgaWYodGh1bWJsZXJfc3RhdGUudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ld192YWx1ZSA9IHRodW1ibGVyX3N0YXRlLnZhbHVlO1xyXG5cclxuICAgICAgICBpZihpbmRleCA9PT0gMCAmJiB0aGlzLnZhbHVlWzFdKSB7XHJcbiAgICAgICAgICBpZihuZXdfdmFsdWUgPiB0aGlzLnZhbHVlWzFdIC0gdGhpcy5zdGVwKSB7XHJcbiAgICAgICAgICAgIG5ld192YWx1ZSA9IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICBpZihuZXdfdmFsdWUgPCB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwKSB7XHJcbiAgICAgICAgICAgIG5ld192YWx1ZSA9IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXdfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrX2xpc3QuZm9yRWFjaCgoY2FsbGJhY2s6IElfTW9kZWxfU3RhdGUpID0+IHtcclxuICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbixcclxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uX2NoYW5nZV9tb2RlbChjYWxsYmFjazogSV9Nb2RlbF9TdGF0ZSkge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrX2xpc3QucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IFRfUmFuZ2UpOiBudW1iZXIge1xyXG5cclxuICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gKCB2YWx1ZSAtIHJhbmdlWzBdICkgLyAoIHJhbmdlWzFdIC0gcmFuZ2VbMF0gKTtcclxuXHJcbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTikgLyB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3ZhbHVlX2Zyb21fcG9zaXRpb24ocG9zaXRpb246IG51bWJlciwgcmFuZ2U6IFRfUmFuZ2UpOiBudW1iZXIge1xyXG5cclxuICAgICAgbGV0IHJlc3VsdDogbnVtYmVyICA9IChwb3NpdGlvbiAqIChyYW5nZVsxXSAtIHJhbmdlWzBdKSkgKyByYW5nZVswXTtcclxuXHJcbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfdmFsdWVfYW5kX3Bvc2l0aW9uKG5ld192YWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcclxuICAgICAgdGhpcy52YWx1ZVtpXSA9IG5ld192YWx1ZSA+IDBcclxuICAgICAgICA/IChNYXRoLmNlaWwobmV3X3ZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcClcclxuICAgICAgICA6IChNYXRoLmZsb29yKG5ld192YWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApO1xyXG4gICAgICBpZih0aGlzLnZhbHVlW2ldID4gdGhpcy5yYW5nZVsxXSkge1xyXG4gICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLnJhbmdlWzFdO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMudmFsdWVbaV0gPCB0aGlzLnJhbmdlWzBdKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMucmFuZ2VbMF07XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgZm9yKCBsZXQgaT0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZS5sZW5ndGg7IGkrKyApIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnJhbmdlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5yYW5nZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IoIGxldCBpPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0Lmxlbmd0aDsgaSsrICkge1xyXG5cclxuICAgICAgICBpZih0aGlzLnZhbHVlW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMudmFsdWUucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uLnB1c2goIHRoaXMuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSkgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9ICB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge01vZGVsfTsiLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi9WaWV3L1ZpZXcnO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vTW9kZWwvTW9kZWwnO1xyXG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tICcuL0NvbnRyb2xsZXIvUHJlc2VudGVyJztcclxuXHJcbmNsYXNzIFNpbXBsZVJhbmdlU2xpZGVyIHtcclxuXHJcbiAgICB2aWV3OiBWaWV3O1xyXG4gICAgbW9kZWw6IE1vZGVsO1xyXG4gICAgcHJlc2VudGVyOiBQcmVzZW50ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IEpRdWVyeSwgcHJpdmF0ZSB1c2VyX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyKSB7XHJcblxyXG4gICAgICBsZXQgc2xpZGVyX2NvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lci5nZXQoMCk7XHJcbiAgICAgICAgXHJcbiAgICAgIGxldCBkZWZhdWx0X0NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyID0ge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXHJcbiAgICAgICAgc3RhcnQ6ICAgICAgIFsxMF0sXHJcbiAgICAgICAgcmFuZ2U6ICAgICAgIFswLCAxMDBdLFxyXG4gICAgICAgIHN0ZXA6ICAgICAgICAxLFxyXG4gICAgICAgIGNvbm5lY3Q6ICAgICB0cnVlLFxyXG4gICAgICAgIHRvb2x0aXA6ICAgICB0cnVlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgY29tcGxldGVfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1VzZXIgPSB7XHJcbiAgICAgICAgb3JpZW50YXRpb246IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLm9yaWVudGF0aW9uID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24gOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbixcclxuICAgICAgICBzdGFydDogICAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RhcnQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5zdGFydCA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0YXJ0LFxyXG4gICAgICAgIHJhbmdlOiAgICAgICB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5yYW5nZSA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnJhbmdlIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ucmFuZ2UsXHJcbiAgICAgICAgc3RlcDogICAgICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0ZXAgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5zdGVwIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RlcCxcclxuICAgICAgICBjb25uZWN0OiAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uY29ubmVjdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLmNvbm5lY3QgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5jb25uZWN0LFxyXG4gICAgICAgIHRvb2x0aXA6ICAgICB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi50b29sdGlwID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24udG9vbHRpcCA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnRvb2x0aXAsXHJcbiAgICAgICAgaW5wdXQ6ICAgICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLmlucHV0XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgbW9kZWxfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX01vZGVsID0ge1xyXG4gICAgICAgIHZhbHVlX3N0YXJ0OiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnN0YXJ0LFxyXG4gICAgICAgIHZhbHVlX3JhbmdlOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnJhbmdlLFxyXG4gICAgICAgIHZhbHVlX3N0ZXA6ICBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnN0ZXAsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgdmlld19jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVmlldyA9IHtcclxuICAgICAgICBvcmllbnRhdGlvbjogY29tcGxldGVfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbixcclxuICAgICAgICB2YWx1ZV9zdGFydDogY29tcGxldGVfY29uZmlndXJhdGlvbi5zdGFydCxcclxuICAgICAgICB2YWx1ZV9yYW5nZTogY29tcGxldGVfY29uZmlndXJhdGlvbi5yYW5nZSxcclxuICAgICAgICBpc190b29sdGlwOiAgY29tcGxldGVfY29uZmlndXJhdGlvbi50b29sdGlwLFxyXG4gICAgICAgIGlzX2Nvbm5lY3Q6ICBjb21wbGV0ZV9jb25maWd1cmF0aW9uLmNvbm5lY3QsXHJcbiAgICAgICAgaW5wdXQ6ICAgICAgIGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uaW5wdXRcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KHNsaWRlcl9jb250YWluZXIsIHZpZXdfY29uZmlndXJhdGlvbik7XHJcbiAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwobW9kZWxfY29uZmlndXJhdGlvbik7XHJcbiAgICAgIHRoaXMucHJlc2VudGVyID0gbmV3IFByZXNlbnRlcih0aGlzLnZpZXcsIHRoaXMubW9kZWwpO1xyXG5cclxuICAgIH1cclxufVxyXG5leHBvcnQge1NpbXBsZVJhbmdlU2xpZGVyfTtcclxuXHJcbihmdW5jdGlvbigkOiBKUXVlcnlTdGF0aWMpIHtcclxuICAkLmZuLmV4dGVuZCh7XHJcbiAgICBTaW1wbGVSYW5nZVNsaWRlcjogZnVuY3Rpb24odXNlcl9jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlcikge1xyXG4gICAgICByZXR1cm4gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKDxKUXVlcnk+IHRoaXMsIDxJX0NvbmZpZ3VyYXRpb25fVXNlcj4gdXNlcl9jb25maWd1cmF0aW9uKTtcclxuICAgIH1cclxuICB9KTtcclxufSAoalF1ZXJ5KSApOyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vZW50aXRpZXMvSGVscGVyJztcclxuaW1wb3J0IHsgVGh1bWJsZXIgfSBmcm9tICcuL2VudGl0aWVzL1RodW1ibGVyJztcclxuaW1wb3J0IHsgQ29ubmVjdCB9IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XHJcbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICcuL2VudGl0aWVzL1Rvb2x0aXAnO1xyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4vZW50aXRpZXMvSW5wdXQnO1xyXG5cclxuY2xhc3MgVmlldyBleHRlbmRzIEhlbHBlciB7XHJcblxyXG4gIHBvc2l0aW9uOiBUX1Bvc2l0aW9uID0gWzBdO1xyXG5cclxuICB2YWx1ZV9yYW5nZTogVF9SYW5nZSA9IFswLCAwXTtcclxuICB2YWx1ZV9zdGFydDogVF9WYWx1ZSA9IFswXTtcclxuXHJcbiAgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb247XHJcblxyXG4gIGlzX3Rvb2x0aXA6IGJvb2xlYW47XHJcbiAgaXNfY29ubmVjdDogYm9vbGVhbjtcclxuXHJcbiAgc2xpZGVyOiBIVE1MRWxlbWVudDtcclxuICB0aHVtYmxlcjogVGh1bWJsZXJbXSA9IFtdO1xyXG4gIGNvbm5lY3Q6IENvbm5lY3RbXSA9IFtdO1xyXG4gIHRvb2x0aXA6IFRvb2x0aXBbXSA9IFtdO1xyXG5cclxuICBpbnB1dF92YWx1ZTogSW5wdXRbXSA9IFtdO1xyXG4gIGlucHV0X3Rvb2x0aXA/OiBJbnB1dDtcclxuXHJcbiAgY29uc3RydWN0b3IoIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBjb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVmlldyApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5pc190b29sdGlwID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX3Rvb2x0aXA7XHJcbiAgICB0aGlzLmlzX2Nvbm5lY3QgPSB0aGlzLmNvbmZpZ3VyYXRpb24uaXNfY29ubmVjdDtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLmNvbmZpZ3VyYXRpb24ub3JpZW50YXRpb247XHJcblxyXG4gICAgdGhpcy5zbGlkZXIgPSB0aGlzLmdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCdzbGlkZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIG9uX2NoYW5nZV92aWV3KGNhbGxiYWNrOiBJX1RodW1ibGVyX1N0YXRlKSB7XHJcbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHRoaXMudGh1bWJsZXJbaV0ub25fbW91c2VfZG93bl9hbmRfbW92ZSh0aGlzLmNvbnRhaW5lciwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgaWYoIHRoaXMuaW5wdXRfdmFsdWVbMF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMuaW5wdXRfdmFsdWUubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dF92YWx1ZVtpXS5vbl9rZXlkb3duX29yX21vdXNlb3V0KGNhbGxiYWNrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoIHRoaXMuaW5wdXRfdG9vbHRpcCAmJiB0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgdGhpcy5pbnB1dF90b29sdGlwLm9uX3N3aXRjaF9jaGVjayh0aGlzLnRvb2x0aXApO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICB1cGRhdGUobW9kZWxfc3RhdGU6IFRfTW9kZWxfRGF0YSkge1xyXG4gICAgbGV0IGk6IG51bWJlciA9IG1vZGVsX3N0YXRlLmluZGV4O1xyXG4gICAgbGV0IHBvc2l0aW9uOiBUX1Bvc2l0aW9uID0gbW9kZWxfc3RhdGUucG9zaXRpb247XHJcbiAgICBsZXQgdmFsdWU6IFRfVmFsdWUgPSBtb2RlbF9zdGF0ZS52YWx1ZTtcclxuXHJcbiAgICBpZihwb3NpdGlvbi5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICBpZihpID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy50aHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdGh1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy50aHVtYmxlclsxXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdGh1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgaWYodGhpcy5pc190b29sdGlwKSB7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudGh1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMudGh1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHRoaXMudGh1bWJsZXJbaV0uc2V0X25ld19wb3NpdGlvbihwb3NpdGlvbltpXSk7XHJcblxyXG4gICAgaWYodGhpcy5pc190b29sdGlwKSB7XHJcbiAgICAgIHRoaXMudG9vbHRpcFtpXS5zZXRfaW5uZXJfdGV4dCh2YWx1ZVtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pbnB1dF92YWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRfdmFsdWVbaV0uZWxlbWVudC52YWx1ZSA9IFN0cmluZyh2YWx1ZVtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc19jb25uZWN0KSB7XHJcbiAgICAgIGlmKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0WzBdLnNldF9jb25uZWN0X3Bvc2l0aW9uKDAsIHBvc2l0aW9uWzBdKTtcclxuICAgICAgfSBlbHNlIGlmKHBvc2l0aW9uWzFdKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0WzBdLnNldF9jb25uZWN0X3Bvc2l0aW9uKHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgaW5pdCgpIHtcclxuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICBpZih0aGlzLnZhbHVlX3JhbmdlW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnZhbHVlX3JhbmdlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnZhbHVlX3JhbmdlW2ldID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgaWYodGhpcy52YWx1ZV9zdGFydFtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZV9zdGFydC5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZV9zdGFydFtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKCB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMudmFsdWVfcmFuZ2UpICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9ICB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMudmFsdWVfcmFuZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvbi5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgdGhpcy50aHVtYmxlci5wdXNoKG5ldyBUaHVtYmxlcih0aGlzLnBvc2l0aW9uW2ldLCB0aGlzLm9yaWVudGF0aW9uLCBpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc19jb25uZWN0KSB7XHJcbiAgICAgIGlmKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0LnB1c2goIG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0LnB1c2goIG5ldyBDb25uZWN0KHRoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0sIHRoaXMub3JpZW50YXRpb24pICk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMuY29ubmVjdFswXS5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRoaXMudG9vbHRpcC5wdXNoKCBuZXcgVG9vbHRpcCggdGhpcy52YWx1ZV9zdGFydFtpXSwgdGhpcy5vcmllbnRhdGlvbiApICk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy50aHVtYmxlcltpXS5lbGVtZW50LmFwcGVuZCh0aGlzLnRvb2x0aXBbaV0uZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLnRodW1ibGVyW2ldLmVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLnNsaWRlcik7XHJcbiAgICBcclxuICAgIGlmKHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnZhbHVlLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRfdmFsdWUucHVzaChuZXcgSW5wdXQoXHJcbiAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnZhbHVlW2ldLFxyXG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldLFxyXG4gICAgICAgICAgaVxyXG4gICAgICAgICkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5jb25maWd1cmF0aW9uLmlucHV0ICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC50b29sdGlwKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRfdG9vbHRpcCA9IG5ldyBJbnB1dChcclxuICAgICAgICAndG9vbHRpcCcsXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnRvb2x0aXBbMF1cclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtWaWV3fTsiLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XHJcblxyXG5jbGFzcyBDb25uZWN0IGV4dGVuZHMgSGVscGVyIHtcclxuICAgIFxyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25uZWN0X3Bvc2l0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9zaXRpb25fc3RhcnQ6IG51bWJlciwgcHJpdmF0ZSBwb3NpdGlvbl9lbmQ6IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbikge1xyXG4gICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygnY29ubmVjdCcsIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgICB0aGlzLnNldF9jb25uZWN0X3Bvc2l0aW9uKHRoaXMucG9zaXRpb25fc3RhcnQsIHRoaXMucG9zaXRpb25fZW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfY29ubmVjdF9wb3NpdGlvbihwb3NpdGlvbl9zdGFydDogbnVtYmVyLCBwb3NpdGlvbl9lbmQ6IG51bWJlcikge1xyXG5cclxuICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgPSBNYXRoLnJvdW5kKHBvc2l0aW9uX3N0YXJ0ICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XHJcbiAgICAgIGxldCBlbmQ6IG51bWJlciA9IE1hdGgucm91bmQocG9zaXRpb25fZW5kICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XHJcblxyXG4gICAgICB0aGlzLmNvbm5lY3RfcG9zaXRpb24gPSBbc3RhcnQsIGVuZF07XHJcbiAgICAgIGxldCBzdHlsZTogc3RyaW5nID0gc3RhcnQgPT09IDBcclxuICAgICAgICA/IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgICAgPyBgd2lkdGg6ICR7ZW5kfSU7YFxyXG4gICAgICAgICAgOiBgaGVpZ2h0OiAke2VuZH0lO2BcclxuICAgICAgICA6IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgICAgPyBgbGVmdDogJHtzdGFydH0lOyB3aWR0aDogJHsoZW5kIC0gc3RhcnQpfSU7YFxyXG4gICAgICAgICAgOiBgdG9wOiAke3N0YXJ0fSU7IGhlaWdodDogJHsoZW5kIC0gc3RhcnQpfSU7YDtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7Q29ubmVjdH07IiwiY2xhc3MgSGVscGVyIHtcclxuXHJcbiAgICByZWFkb25seSBUT19USFVNQkxFUl9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xyXG4gICAgcmVhZG9ubHkgVE9fQ09OTkVDVF9VUERBVEU6IG51bWJlciA9IDFlMjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IFRfUmFuZ2UpOiBudW1iZXIge1xyXG5cclxuICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gICggKCB2YWx1ZSAtIHJhbmdlWzBdICkgLyAoIHJhbmdlWzFdIC0gcmFuZ2VbMF0gKSApO1xyXG4gICAgICByZXN1bHQgPSBNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fVEhVTUJMRVJfUE9TSVRJT04pIC8gdGhpcy5UT19USFVNQkxFUl9QT1NJVElPTjtcclxuXHJcbiAgICAgIGlmKCByZXN1bHQgPCAwICkge1xyXG4gICAgICAgIHJlc3VsdCA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgaWYoIHJlc3VsdCA+IDEgKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCBjc3NfY2xhc3M6IFRfQ1NTX0NsYXNzZXMsIG9yaWVudGF0aW9uOiBUX09yaWVudGF0aW9uICk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgbGV0IHN0cl9jbGFzczogc3RyaW5nID0gJ1NSU19fJyArIGNzc19jbGFzcztcclxuICAgICAgbGV0IGNzc19jbGFzc193aXRob3V0X29yaWVudGF0aW9uOiBzdHJpbmcgPSBzdHJfY2xhc3MgKyAnICcgKyBzdHJfY2xhc3MgKyAnXyc7XHJcblxyXG4gICAgICBsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGNzc19jbGFzc193aXRob3V0X29yaWVudGF0aW9uICsgb3JpZW50YXRpb24pICk7XHJcblxyXG4gICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IHtIZWxwZXJ9OyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gXCIuL0hlbHBlclwiO1xyXG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSBcIi4vVG9vbHRpcFwiO1xyXG5cclxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBIZWxwZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogVF9JbnB1dF9UeXBlLCBwdWJsaWMgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgcHVibGljIHZhbHVlPzogbnVtYmVyLCBwdWJsaWMgaW5kZXg/OiBudW1iZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZih0eXBlID09PSAndmFsdWUnKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IFN0cmluZyh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcbiAgb25fa2V5ZG93bl9vcl9tb3VzZW91dCh0aGlzOiBJbnB1dCwgY2FsbGJhY2s6IElfVGh1bWJsZXJfU3RhdGUpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uX2tleWRvd24pO1xyXG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0Jywgb25fbW91c2VvdXQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uX2tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgaWYoZXZlbnQua2V5Q29kZSA9PT0gOSB8fCBldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgIGJ1YmJsaW5nKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uX21vdXNlb3V0KCkge1xyXG4gICAgICBidWJibGluZygpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYnViYmxpbmcoKSB7XHJcbiAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gTnVtYmVyKHRoYXQuZWxlbWVudC52YWx1ZSk7XHJcbiAgICAgIGlmKHRoYXQuaW5kZXgpIHtcclxuICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICBpbmRleDogdGhhdC5pbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uX3N3aXRjaF9jaGVjayh0aGlzOiBJbnB1dCwgdG9vbHRpcDogVG9vbHRpcFtdKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRvb2x0aXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZih0aGF0LmVsZW1lbnQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hfaGlkZGVuKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b29sdGlwW2ldLnN3aXRjaF9oaWRkZW4oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuZXhwb3J0IHsgSW5wdXQgfTsiLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XHJcblxyXG5jbGFzcyBUaHVtYmxlciBleHRlbmRzIEhlbHBlciB7XHJcblxyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgdGh1bWJsZXJfcG9zaXRpb246IG51bWJlciA9IDA7XHJcbiAgICBsaXN0ZW5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBwb3NpdGlvbjogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiBUX09yaWVudGF0aW9uLCBwcml2YXRlIGluZGV4OiBudW1iZXIgKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCd0aHVtYmxlcicsIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgICB0aGlzLnNldF9uZXdfcG9zaXRpb24odGhpcy5wb3NpdGlvbik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldF9uZXdfcG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xyXG4gICAgICB0aGlzLnRodW1ibGVyX3Bvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgICBsZXQgbGl0ZXI6IHN0cmluZyA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/ICdYJyA6ICdZJztcclxuXHJcbiAgICAgIGxldCBzdHlsZTogc3RyaW5nID0gYHRyYW5zZm9ybTogdHJhbnNsYXRlJHtsaXRlcn0oJHsgTWF0aC5yb3VuZChwb3NpdGlvbiAqIHRoaXMuVE9fVEhVTUJMRVJfUE9TSVRJT04pIH0lKTtgO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfc2hpZnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KTogbnVtYmVyIHtcclxuXHJcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgID8gZXZlbnQuY2xpZW50WCAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdFxyXG4gICAgICAgIDogZXZlbnQuY2xpZW50WSAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25fbW91c2VfZG93bl9hbmRfbW92ZSh0aGlzOiBUaHVtYmxlciwgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IElfVGh1bWJsZXJfU3RhdGUpIHtcclxuXHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgdGhhdC5saXN0ZW5pbmcgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGxldCBzaGlmdDogbnVtYmVyID0gdGhpcy5nZXRfc2hpZnQodGhhdC5lbGVtZW50LCBldmVudCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uX21vdXNlX21vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbl9tb3VzZV91cCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uX21vdXNlX21vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuXHJcbiAgICAgICAgICBsZXQgbmV3X3Bvc2l0aW9uOiBudW1iZXIsXHJcbiAgICAgICAgICAgIG5ld19wb3NpdGlvbl9pbl9wZXJjZW50OiBudW1iZXIsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgIGlmKHRoYXQub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uX2luX3BlcmNlbnQgPSBuZXdfcG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRZIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG4gICAgICAgICAgICBuZXdfcG9zaXRpb25faW5fcGVyY2VudCA9IG5ld19wb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IG5ld19wb3NpdGlvbl9pbl9wZXJjZW50O1xyXG5cclxuICAgICAgICAgIGlmKHBvc2l0aW9uID4gMSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihwb3NpdGlvbiA8IDApIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNhbGxiYWNrKHsgcG9zaXRpb246IHBvc2l0aW9uLFxyXG4gICAgICAgICAgICBpbmRleDogdGhhdC5pbmRleCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uX21vdXNlX3VwKCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25fbW91c2VfbW92ZSk7XHJcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtUaHVtYmxlcn07IiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xyXG5cclxuY2xhc3MgVG9vbHRpcCBleHRlbmRzIEhlbHBlciB7XHJcblxyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICB0b29sdGlwX3ZhbHVlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFsdWU6IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbikge1xyXG4gICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygndG9vbHRpcCcsIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgICB0aGlzLnNldF9pbm5lcl90ZXh0KHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldF9pbm5lcl90ZXh0KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgbGV0IHZhbDogbnVtYmVyID0gdmFsdWUgPiAwXHJcbiAgICAgICAgPyBNYXRoLmZsb29yKHZhbHVlKVxyXG4gICAgICAgIDogTWF0aC5jZWlsKHZhbHVlKTtcclxuXHJcbiAgICAgIHRoaXMudG9vbHRpcF92YWx1ZSA9IHZhbDsgICAgICAgICAgICBcclxuICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IFN0cmluZyggdmFsICk7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2hfaGlkZGVuKHRoaXM6IFRvb2x0aXAsIGlzX3Zpc2libGU6IGJvb2xlYW4pIHtcclxuICAgICAgbGV0IHRoYXQ6IFRvb2x0aXAgPSB0aGlzO1xyXG4gICAgICBpZihpc192aXNpYmxlKSB7XHJcbiAgICAgICAgdGhhdC5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoYXQuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtUb29sdGlwfTsiXSwic291cmNlUm9vdCI6IiJ9