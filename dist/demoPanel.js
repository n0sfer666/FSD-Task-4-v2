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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Demo_Panel/Panel.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Demo_Panel/Panel.ts":
/*!*********************************!*\
  !*** ./src/Demo_Panel/Panel.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Plugin_1 = __webpack_require__(/*! ../Plugin/Plugin */ "./src/Plugin/Plugin.ts");
var template_1 = __webpack_require__(/*! ./template */ "./src/Demo_Panel/template.ts");
var Demo_Panel = (function () {
    function Demo_Panel(demo_panel, slider, inputs) {
        this.demo_panel = demo_panel;
        this.slider = slider;
        this.inputs = inputs;
        this.template = new template_1.Template();
        this.demo_panel.append(this.template.demo_panel);
        this.empty_slider = '#' + slider.get(0).id;
        this.defaultConfig = {
            range: [0, 100],
            start: [10],
            step: 1
        };
        this.range_slider = new Plugin_1.SimpleRangeSlider(this.slider, {
            range: [-100, 100],
            start: [-50, 50],
            step: 10,
            orientation: "horizontal",
            connect: true,
            tooltip: true,
            input: this.inputs
        });
        var template_inputs = [
            this.template.range_input_min,
            this.template.range_input_max,
            this.template.start_input_min,
            this.template.start_input_max,
            this.template.step_input,
            this.template.orientation_input,
            this.template.connect_input
        ];
        for (var i = 0; i < template_inputs.length; i++) {
            this.on_change_input(template_inputs[i]);
        }
    }
    Demo_Panel.prototype.on_change_input = function (input) {
        var that = this;
        input.addEventListener('keydown', on_keydown);
        input.addEventListener('mouseout', on_mouseout);
        input.addEventListener('change', on_change);
        function on_keydown(event) {
            if (event.key === "Tab" || event.key === "Enter") {
                action();
            }
        }
        function on_mouseout() {
            action();
        }
        function on_change() {
            action();
        }
        function action() {
            var range = [
                that.template.range_input_min.value !== ''
                    ? Number(that.template.range_input_min.value)
                    : that.defaultConfig.range[0],
                that.template.range_input_max.value !== ''
                    ? Number(that.template.range_input_max.value)
                    : that.defaultConfig.range[1],
            ];
            var start = that.template.start_input_max.value !== ''
                ? [
                    that.template.start_input_min.value !== ''
                        ? Number(that.template.start_input_min.value)
                        : that.defaultConfig.start[0],
                    Number(that.template.start_input_max.value)
                ]
                : [
                    that.template.start_input_min.value !== ''
                        ? Number(that.template.start_input_min.value)
                        : that.defaultConfig.start[0]
                ];
            var step = that.template.step_input.value !== ''
                ? Number(that.template.step_input.value)
                : that.defaultConfig.step;
            var orientation = that.template.orientation_input.checked
                ? 'horizontal'
                : 'vertical';
            var connect = that.template.connect_input.checked
                ? true
                : false;
            that.slider = $(that.empty_slider).empty();
            that.range_slider = new Plugin_1.SimpleRangeSlider(that.slider, {
                range: range,
                start: start,
                step: step,
                orientation: orientation,
                connect: connect,
                tooltip: true,
                input: that.inputs
            });
        }
    };
    return Demo_Panel;
}());
exports.Demo_Panel = Demo_Panel;
(function ($) {
    $.fn.extend({
        Demo_Panel: function (slider, inputs) {
            return new Demo_Panel(this, slider, inputs);
        }
    });
}(jQuery));


/***/ }),

/***/ "./src/Demo_Panel/template.ts":
/*!************************************!*\
  !*** ./src/Demo_Panel/template.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Template = (function () {
    function Template() {
        var range_text = document.createElement('span');
        range_text.innerText = 'Range: ';
        this.range_input_min = document.createElement('input');
        this.range_input_min.setAttribute('type', 'text');
        this.range_input_min.value = '-100';
        this.range_input_max = document.createElement('input');
        this.range_input_max.setAttribute('type', 'text');
        this.range_input_max.value = '100';
        var range_line = document.createElement('div');
        range_line.append(range_text, this.range_input_min, this.range_input_max);
        var start_text = document.createElement('span');
        start_text.innerText = 'Start: ';
        this.start_input_min = document.createElement('input');
        this.start_input_min.setAttribute('type', 'text');
        this.start_input_min.value = '-50';
        this.start_input_max = document.createElement('input');
        this.start_input_max.setAttribute('type', 'text');
        this.start_input_max.value = '50';
        var start_line = document.createElement('div');
        start_line.append(start_text, this.start_input_min, this.start_input_max);
        var step_text = document.createElement('span');
        step_text.innerText = 'Step: ';
        this.step_input = document.createElement('input');
        this.step_input.setAttribute('type', 'text');
        this.step_input.value = '10';
        var step_line = document.createElement('div');
        step_line.append(step_text, this.step_input);
        var orientation_text = document.createElement('span');
        orientation_text.innerText = 'Orientation horizontal/vertical: ';
        this.orientation_input = document.createElement('input');
        this.orientation_input.setAttribute('type', 'checkbox');
        this.orientation_input.checked = true;
        var orientation_line = document.createElement('div');
        orientation_line.append(orientation_text, this.orientation_input);
        var connect_text = document.createElement('span');
        connect_text.innerText = 'Connect on/off: ';
        this.connect_input = document.createElement('input');
        this.connect_input.setAttribute('type', 'checkbox');
        this.connect_input.checked = true;
        var connect_line = document.createElement('div');
        connect_line.append(connect_text, this.connect_input);
        this.demo_panel = document.createElement('div');
        this.demo_panel.append(range_line, start_line, step_line, orientation_line, connect_line);
    }
    return Template;
}());
exports.Template = Template;


/***/ }),

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
    Model.prototype.check_on_step_movement_to_set_val_and_pos = function (new_value, index) {
        var condition = [this.value[index] - this.step, this.value[index] + this.step];
        if (new_value >= condition[1] || new_value <= condition[0]) {
            this.set_value_and_position(new_value, index);
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
        this.set_active_thumbler(position, i);
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
        var str_class = "SRS__" + css_class;
        var css_class_without_orientation = str_class + " " + str_class + "_";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9EZW1vX1BhbmVsL3RlbXBsYXRlLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Db250cm9sbGVyL1ByZXNlbnRlci50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1BsdWdpbi50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9WaWV3LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSGVscGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0lucHV0LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1RodW1ibGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FB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ZSxLQUFhO1FBQzFCLElBQU0sR0FBRyxHQUFXLEtBQUssR0FBRyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELCtCQUFhLEdBQWIsVUFBNkIsVUFBbUI7UUFDOUMsSUFBTSxJQUFJLEdBQVksSUFBSSxDQUFDO1FBQzNCLElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQ0E3QnFCLGVBQU0sR0E2QjNCO0FBQ1EsMEJBQU8iLCJmaWxlIjoiZGVtb1BhbmVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL0RlbW9fUGFuZWwvUGFuZWwudHNcIik7XG4iLCJpbXBvcnQgeyBTaW1wbGVSYW5nZVNsaWRlciB9IGZyb20gJy4uL1BsdWdpbi9QbHVnaW4nO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJy4vdGVtcGxhdGUnO1xyXG5cclxuY2xhc3MgRGVtb19QYW5lbCB7XHJcblxyXG4gIHRlbXBsYXRlOiBUZW1wbGF0ZTtcclxuICByYW5nZV9zbGlkZXI6ICBTaW1wbGVSYW5nZVNsaWRlcjtcclxuICBlbXB0eV9zbGlkZXI6IHN0cmluZztcclxuXHJcbiAgZGVmYXVsdENvbmZpZzogSV9ERU1PX0RlZmF1bHRfQ29uZmlnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlbW9fcGFuZWw6IEpRdWVyeSwgcHJpdmF0ZSBzbGlkZXI6IEpRdWVyeSwgcHJpdmF0ZSBpbnB1dHM6IElfREVNT19JbnB1dCkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xyXG4gICAgdGhpcy5kZW1vX3BhbmVsLmFwcGVuZCh0aGlzLnRlbXBsYXRlLmRlbW9fcGFuZWwpO1xyXG5cclxuICAgIHRoaXMuZW1wdHlfc2xpZGVyID0gJyMnICsgc2xpZGVyLmdldCgwKS5pZDtcclxuXHJcbiAgICB0aGlzLmRlZmF1bHRDb25maWcgPSB7XHJcbiAgICAgIHJhbmdlOiBbMCwgMTAwXSxcclxuICAgICAgc3RhcnQ6IFsxMF0sXHJcbiAgICAgIHN0ZXA6IDFcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJhbmdlX3NsaWRlciA9IG5ldyBTaW1wbGVSYW5nZVNsaWRlcih0aGlzLnNsaWRlciwge1xyXG4gICAgICByYW5nZTogWy0xMDAsIDEwMF0sXHJcbiAgICAgIHN0YXJ0OiBbLTUwLCA1MF0sXHJcbiAgICAgIHN0ZXA6IDEwLFxyXG4gICAgICBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsXHJcbiAgICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IHRydWUsXHJcbiAgICAgIGlucHV0OiB0aGlzLmlucHV0c1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHRlbXBsYXRlX2lucHV0czogSFRNTElucHV0RWxlbWVudFtdID0gW1xyXG4gICAgICB0aGlzLnRlbXBsYXRlLnJhbmdlX2lucHV0X21pbixcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9tYXgsXHJcbiAgICAgIHRoaXMudGVtcGxhdGUuc3RhcnRfaW5wdXRfbWluLFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnN0YXJ0X2lucHV0X21heCxcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGVwX2lucHV0LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLm9yaWVudGF0aW9uX2lucHV0LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLmNvbm5lY3RfaW5wdXRcclxuICAgIF1cclxuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGVtcGxhdGVfaW5wdXRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICB0aGlzLm9uX2NoYW5nZV9pbnB1dCh0ZW1wbGF0ZV9pbnB1dHNbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25fY2hhbmdlX2lucHV0KHRoaXM6IERlbW9fUGFuZWwsIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uX2tleWRvd24pO1xyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBvbl9tb3VzZW91dCk7XHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbl9jaGFuZ2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uX2tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgaWYoZXZlbnQua2V5ID09PSBcIlRhYlwiIHx8IGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XHJcbiAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbl9tb3VzZW91dCgpIHtcclxuICAgICAgYWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25fY2hhbmdlKCkge1xyXG4gICAgICBhY3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhY3Rpb24oKSB7XHJcblxyXG4gICAgICBsZXQgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gPSBbXHJcbiAgICAgICAgdGhhdC50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9taW4udmFsdWUgIT09ICcnXHJcbiAgICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnJhbmdlX2lucHV0X21pbi52YWx1ZSlcclxuICAgICAgICAgIDogdGhhdC5kZWZhdWx0Q29uZmlnLnJhbmdlWzBdLFxyXG4gICAgICAgIHRoYXQudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWF4LnZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9tYXgudmFsdWUpXHJcbiAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5yYW5nZVsxXSxcclxuICAgICAgXVxyXG4gICAgICBsZXQgc3RhcnQ6IFRfREVNT19TdGFydCA9IHRoYXQudGVtcGxhdGUuc3RhcnRfaW5wdXRfbWF4LnZhbHVlICE9PSAnJ1xyXG4gICAgICAgID8gW1xyXG4gICAgICAgICAgdGhhdC50ZW1wbGF0ZS5zdGFydF9pbnB1dF9taW4udmFsdWUgIT09ICcnXHJcbiAgICAgICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUuc3RhcnRfaW5wdXRfbWluLnZhbHVlKVxyXG4gICAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5zdGFydFswXSxcclxuICAgICAgICAgIE51bWJlcih0aGF0LnRlbXBsYXRlLnN0YXJ0X2lucHV0X21heC52YWx1ZSlcclxuICAgICAgICBdXHJcbiAgICAgICAgOiBbXHJcbiAgICAgICAgICB0aGF0LnRlbXBsYXRlLnN0YXJ0X2lucHV0X21pbi52YWx1ZSAhPT0gJydcclxuICAgICAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5zdGFydF9pbnB1dF9taW4udmFsdWUpXHJcbiAgICAgICAgICAgIDogdGhhdC5kZWZhdWx0Q29uZmlnLnN0YXJ0WzBdXHJcbiAgICAgICAgXVxyXG4gICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhhdC50ZW1wbGF0ZS5zdGVwX2lucHV0LnZhbHVlICE9PSAnJ1xyXG4gICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUuc3RlcF9pbnB1dC52YWx1ZSlcclxuICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5zdGVwO1xyXG4gICAgICBsZXQgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24gPSB0aGF0LnRlbXBsYXRlLm9yaWVudGF0aW9uX2lucHV0LmNoZWNrZWRcclxuICAgICAgICA/ICdob3Jpem9udGFsJ1xyXG4gICAgICAgIDogJ3ZlcnRpY2FsJztcclxuICAgICAgbGV0IGNvbm5lY3Q6IGJvb2xlYW4gPSB0aGF0LnRlbXBsYXRlLmNvbm5lY3RfaW5wdXQuY2hlY2tlZFxyXG4gICAgICAgID8gdHJ1ZVxyXG4gICAgICAgIDogZmFsc2U7XHJcblxyXG4gICAgICB0aGF0LnNsaWRlciA9ICQodGhhdC5lbXB0eV9zbGlkZXIpLmVtcHR5KCk7XHJcbiAgICAgIHRoYXQucmFuZ2Vfc2xpZGVyID0gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKHRoYXQuc2xpZGVyLCB7XHJcbiAgICAgICAgcmFuZ2U6IHJhbmdlLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICBzdGVwOiBzdGVwLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbixcclxuICAgICAgICBjb25uZWN0OiBjb25uZWN0LFxyXG4gICAgICAgIHRvb2x0aXA6IHRydWUsXHJcbiAgICAgICAgaW5wdXQ6IHRoYXQuaW5wdXRzXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge0RlbW9fUGFuZWx9O1xyXG5cclxuKGZ1bmN0aW9uKCQ6IEpRdWVyeVN0YXRpYykge1xyXG4gICQuZm4uZXh0ZW5kKHtcclxuICAgIERlbW9fUGFuZWw6IGZ1bmN0aW9uKHNsaWRlcjogSlF1ZXJ5LCBpbnB1dHM6IElfREVNT19JbnB1dCkge1xyXG4gICAgICByZXR1cm4gbmV3IERlbW9fUGFuZWwoPEpRdWVyeT4gdGhpcywgPEpRdWVyeT4gc2xpZGVyLCA8SV9ERU1PX0lucHV0PiBpbnB1dHMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59IChqUXVlcnkpICk7IiwiY2xhc3MgVGVtcGxhdGUge1xyXG4gIHJhbmdlX2lucHV0X21pbjogSFRNTElucHV0RWxlbWVudDtcclxuICByYW5nZV9pbnB1dF9tYXg6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIHN0YXJ0X2lucHV0X21pbjogSFRNTElucHV0RWxlbWVudDtcclxuICBzdGFydF9pbnB1dF9tYXg6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIHN0ZXBfaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIG9yaWVudGF0aW9uX2lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBjb25uZWN0X2lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBkZW1vX3BhbmVsOiBIVE1MRWxlbWVudDtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIHJhbmdlIGxpbmVcclxuICAgIGxldCByYW5nZV90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgcmFuZ2VfdGV4dC5pbm5lclRleHQgPSAnUmFuZ2U6ICc7XHJcbiAgICB0aGlzLnJhbmdlX2lucHV0X21pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWluLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWluLnZhbHVlID0gJy0xMDAnO1xyXG4gICAgdGhpcy5yYW5nZV9pbnB1dF9tYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnJhbmdlX2lucHV0X21heC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICB0aGlzLnJhbmdlX2lucHV0X21heC52YWx1ZSA9ICcxMDAnO1xyXG4gICAgbGV0IHJhbmdlX2xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgcmFuZ2VfbGluZS5hcHBlbmQocmFuZ2VfdGV4dCwgdGhpcy5yYW5nZV9pbnB1dF9taW4sIHRoaXMucmFuZ2VfaW5wdXRfbWF4KTtcclxuICAgIC8vIHN0YXJ0IGxpbmVcclxuICAgIGxldCBzdGFydF90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgc3RhcnRfdGV4dC5pbm5lclRleHQgPSAnU3RhcnQ6ICc7XHJcbiAgICB0aGlzLnN0YXJ0X2lucHV0X21pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRfaW5wdXRfbWluLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRfaW5wdXRfbWluLnZhbHVlID0gJy01MCc7XHJcbiAgICB0aGlzLnN0YXJ0X2lucHV0X21heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRfaW5wdXRfbWF4LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRfaW5wdXRfbWF4LnZhbHVlID0gJzUwJztcclxuICAgIGxldCBzdGFydF9saW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHN0YXJ0X2xpbmUuYXBwZW5kKHN0YXJ0X3RleHQsIHRoaXMuc3RhcnRfaW5wdXRfbWluLCB0aGlzLnN0YXJ0X2lucHV0X21heCk7XHJcbiAgICAvLyBzdGVwIGxpbmVcclxuICAgIGxldCBzdGVwX3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBzdGVwX3RleHQuaW5uZXJUZXh0ID0gJ1N0ZXA6ICc7XHJcbiAgICB0aGlzLnN0ZXBfaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnN0ZXBfaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5zdGVwX2lucHV0LnZhbHVlID0gJzEwJztcclxuICAgIGxldCBzdGVwX2xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc3RlcF9saW5lLmFwcGVuZChzdGVwX3RleHQsIHRoaXMuc3RlcF9pbnB1dCk7XHJcbiAgICAvLyBvcmllbnRhdGlvbiBsaW5lXHJcbiAgICBsZXQgb3JpZW50YXRpb25fdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIG9yaWVudGF0aW9uX3RleHQuaW5uZXJUZXh0ID0gJ09yaWVudGF0aW9uIGhvcml6b250YWwvdmVydGljYWw6ICc7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbl9pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbl9pbnB1dC5jaGVja2VkID0gdHJ1ZTtcclxuICAgIGxldCBvcmllbnRhdGlvbl9saW5lOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBvcmllbnRhdGlvbl9saW5lLmFwcGVuZChvcmllbnRhdGlvbl90ZXh0LCB0aGlzLm9yaWVudGF0aW9uX2lucHV0KTtcclxuICAgIC8vIGNvbm5lY3QgbGluZVxyXG4gICAgbGV0IGNvbm5lY3RfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIGNvbm5lY3RfdGV4dC5pbm5lclRleHQgPSAnQ29ubmVjdCBvbi9vZmY6ICc7XHJcbiAgICB0aGlzLmNvbm5lY3RfaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLmNvbm5lY3RfaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcbiAgICAgIHRoaXMuY29ubmVjdF9pbnB1dC5jaGVja2VkID0gdHJ1ZTtcclxuICAgIGxldCBjb25uZWN0X2xpbmU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNvbm5lY3RfbGluZS5hcHBlbmQoY29ubmVjdF90ZXh0LCB0aGlzLmNvbm5lY3RfaW5wdXQpO1xyXG5cclxuICAgIHRoaXMuZGVtb19wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLmRlbW9fcGFuZWwuYXBwZW5kKHJhbmdlX2xpbmUsIHN0YXJ0X2xpbmUsIHN0ZXBfbGluZSwgb3JpZW50YXRpb25fbGluZSwgY29ubmVjdF9saW5lKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IHtUZW1wbGF0ZX0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vVmlldy9WaWV3JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vTW9kZWwvTW9kZWwnO1xuXG5jbGFzcyBQcmVzZW50ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IFZpZXcsIHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XG4gICAgdGhpcy52aWV3Lm9uX2NoYW5nZV92aWV3KCh0aHVtYmxlcl9kYXRhOiBUX1RodW1ibGVyX0RhdGEpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRodW1ibGVyX2RhdGEpO1xuICAgICAgdGhpcy5tb2RlbC5zZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX2RhdGEpO1xuICAgIH0pO1xuICAgIHRoaXMubW9kZWwub25fY2hhbmdlX21vZGVsKChtb2RlbF9zdGF0ZTogVF9Nb2RlbF9EYXRhKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbF9zdGF0ZSk7XG4gICAgICB0aGlzLnZpZXcudXBkYXRlKG1vZGVsX3N0YXRlKTtcbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IHsgUHJlc2VudGVyIH07XG4iLCJjbGFzcyBNb2RlbCB7XG4gICAgdmFsdWU6IFRfVmFsdWUgPSBbMF07XG5cbiAgICByYW5nZTogVF9SYW5nZSA9IFswLCAwXTtcblxuICAgIHN0ZXA6IG51bWJlciA9IDA7XG5cbiAgICBwb3NpdGlvbjogVF9Qb3NpdGlvbiA9IFswXTtcblxuICAgIGluZGV4X29mX2FjdGl2ZV90aHVtYmxlcjogbnVtYmVyID0gMDtcblxuICAgIGNhbGxiYWNrX2xpc3Q6IElfTW9kZWxfU3RhdGVbXTtcblxuICAgIHJlYWRvbmx5IFRPX05PUk1BTElaRV9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fTW9kZWwpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tfbGlzdCA9IFtdO1xuXG4gICAgICB0aGlzLnN0ZXAgPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RlcDtcblxuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc2V0X25ld19wb3NpdGlvbih0aHVtYmxlcl9zdGF0ZTogVF9UaHVtYmxlcl9EYXRhKSB7XG4gICAgICBjb25zdCB7IGluZGV4IH0gPSB0aHVtYmxlcl9zdGF0ZTtcbiAgICAgIHRoaXMuaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyID0gaW5kZXg7XG5cbiAgICAgIGNvbnN0IG5ld192YWx1ZTogbnVtYmVyID0gdGhpcy5nZXRfbmV3X3ZhbHVlKHRodW1ibGVyX3N0YXRlKTtcblxuICAgICAgdGhpcy5jaGVja19vbl9zdGVwX21vdmVtZW50X3RvX3NldF92YWxfYW5kX3BvcyhuZXdfdmFsdWUsIGluZGV4KTtcbiAgICAgIC8vIGNoZWNrIGZvciBjb2xsaXNpb25cbiAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA+IDEgJiYgdGhpcy52YWx1ZVsxXSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMudmFsdWVbMV0pIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRfbmV3X3ZhbHVlKHRodW1ibGVyX3N0YXRlOiBUX1RodW1ibGVyX0RhdGEpOiBudW1iZXIge1xuICAgICAgY29uc3QgeyBpbmRleCB9ID0gdGh1bWJsZXJfc3RhdGU7XG4gICAgICBsZXQgbmV3X3ZhbHVlOiBudW1iZXIgPSB0aGlzLnZhbHVlW2luZGV4XTtcbiAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgICBpZiAodGh1bWJsZXJfc3RhdGUucG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwb3NpdGlvbiA9IE1hdGgucm91bmQodGh1bWJsZXJfc3RhdGUucG9zaXRpb24gKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTikgLyB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTjtcbiAgICAgICAgbmV3X3ZhbHVlID0gdGhpcy5nZXRfdmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbiwgdGhpcy5yYW5nZSk7XG4gICAgICB9IGVsc2UgaWYgKHRodW1ibGVyX3N0YXRlLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3X3ZhbHVlID0gdGh1bWJsZXJfc3RhdGUudmFsdWU7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIHRoaXMudmFsdWVbMV0pIHtcbiAgICAgICAgICBpZiAobmV3X3ZhbHVlID4gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAxKSB7XG4gICAgICAgICAgaWYgKG5ld192YWx1ZSA8IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXApIHtcbiAgICAgICAgICAgIG5ld192YWx1ZSA9IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3X3ZhbHVlO1xuICAgIH1cblxuICAgIGNoZWNrX29uX3N0ZXBfbW92ZW1lbnRfdG9fc2V0X3ZhbF9hbmRfcG9zKG5ld192YWx1ZTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICBjb25zdCBjb25kaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbdGhpcy52YWx1ZVtpbmRleF0gLSB0aGlzLnN0ZXAsIHRoaXMudmFsdWVbaW5kZXhdICsgdGhpcy5zdGVwXTtcblxuICAgICAgaWYgKG5ld192YWx1ZSA+PSBjb25kaXRpb25bMV0gfHwgbmV3X3ZhbHVlIDw9IGNvbmRpdGlvblswXSkge1xuICAgICAgICB0aGlzLnNldF92YWx1ZV9hbmRfcG9zaXRpb24obmV3X3ZhbHVlLCBpbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5jYWxsYmFja19saXN0LmZvckVhY2goKGNhbGxiYWNrOiBJX01vZGVsX1N0YXRlKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbixcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICBpbmRleDogdGhpcy5pbmRleF9vZl9hY3RpdmVfdGh1bWJsZXIsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25fY2hhbmdlX21vZGVsKGNhbGxiYWNrOiBJX01vZGVsX1N0YXRlKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrX2xpc3QucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IFRfUmFuZ2UpOiBudW1iZXIge1xuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSAodmFsdWUgLSByYW5nZVswXSkgLyAocmFuZ2VbMV0gLSByYW5nZVswXSk7XG5cbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTikgLyB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTik7XG4gICAgfVxuXG4gICAgZ2V0X3ZhbHVlX2Zyb21fcG9zaXRpb24ocG9zaXRpb246IG51bWJlciwgcmFuZ2U6IFRfUmFuZ2UpOiBudW1iZXIge1xuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSAocG9zaXRpb24gKiAocmFuZ2VbMV0gLSByYW5nZVswXSkpICsgcmFuZ2VbMF07XG5cbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQpKTtcbiAgICB9XG5cbiAgICBzZXRfdmFsdWVfYW5kX3Bvc2l0aW9uKG5ld192YWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcbiAgICAgIHRoaXMudmFsdWVbaV0gPSBuZXdfdmFsdWUgPiAwXG4gICAgICAgID8gKE1hdGguY2VpbChuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKVxuICAgICAgICA6IChNYXRoLmZsb29yKG5ld192YWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMucmFuZ2VbMF0pIHtcbiAgICAgICAgICB0aGlzLnZhbHVlWzBdID0gdGhpcy5yYW5nZVswXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaSA9PT0gMSAmJiB0aGlzLnZhbHVlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0gPiB0aGlzLnJhbmdlWzFdKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMucmFuZ2VbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnJhbmdlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJhbmdlW2ldID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCh0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgTW9kZWwgfTtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuL1ZpZXcvVmlldyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vTW9kZWwvTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XG5cbmNsYXNzIFNpbXBsZVJhbmdlU2xpZGVyIHtcbiAgICB2aWV3OiBWaWV3O1xuXG4gICAgbW9kZWw6IE1vZGVsO1xuXG4gICAgcHJlc2VudGVyOiBQcmVzZW50ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSlF1ZXJ5LCBwcml2YXRlIHVzZXJfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1VzZXIpIHtcbiAgICAgIGNvbnN0IHNsaWRlcl9jb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xuXG4gICAgICBjb25zdCBkZWZhdWx0X0NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyID0ge1xuICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICBzdGFydDogWzEwXSxcbiAgICAgICAgcmFuZ2U6IFswLCAxMDBdLFxuICAgICAgICBzdGVwOiAxLFxuICAgICAgICBjb25uZWN0OiB0cnVlLFxuICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgY29tcGxldGVfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1VzZXIgPSB7XG4gICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbiA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLm9yaWVudGF0aW9uIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24sXG4gICAgICAgIHN0YXJ0OiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGFydCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnN0YXJ0IDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RhcnQsXG4gICAgICAgIHJhbmdlOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5yYW5nZSA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnJhbmdlIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ucmFuZ2UsXG4gICAgICAgIHN0ZXA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0ZXAgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5zdGVwIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RlcCxcbiAgICAgICAgY29ubmVjdDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uY29ubmVjdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLmNvbm5lY3QgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5jb25uZWN0LFxuICAgICAgICB0b29sdGlwOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi50b29sdGlwID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24udG9vbHRpcCA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnRvb2x0aXAsXG4gICAgICAgIGlucHV0OiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5pbnB1dCxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1vZGVsX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Nb2RlbCA9IHtcbiAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXG4gICAgICAgIHZhbHVlX3JhbmdlOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnJhbmdlLFxuICAgICAgICB2YWx1ZV9zdGVwOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnN0ZXAsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB2aWV3X2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9WaWV3ID0ge1xuICAgICAgICBvcmllbnRhdGlvbjogY29tcGxldGVfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbixcbiAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXG4gICAgICAgIHZhbHVlX3JhbmdlOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnJhbmdlLFxuICAgICAgICBpc190b29sdGlwOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnRvb2x0aXAsXG4gICAgICAgIGlzX2Nvbm5lY3Q6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uY29ubmVjdCxcbiAgICAgICAgaW5wdXQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uaW5wdXQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzbGlkZXJfY29udGFpbmVyLCB2aWV3X2NvbmZpZ3VyYXRpb24pO1xuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChtb2RlbF9jb25maWd1cmF0aW9uKTtcbiAgICAgIHRoaXMucHJlc2VudGVyID0gbmV3IFByZXNlbnRlcih0aGlzLnZpZXcsIHRoaXMubW9kZWwpO1xuICAgIH1cbn1cbmV4cG9ydCB7IFNpbXBsZVJhbmdlU2xpZGVyIH07XG5cbihmdW5jdGlvbiAoJDogSlF1ZXJ5U3RhdGljKSB7XG4gICQuZm4uZXh0ZW5kKHtcbiAgICBTaW1wbGVSYW5nZVNsaWRlcih1c2VyX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyKSB7XG4gICAgICByZXR1cm4gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKDxKUXVlcnk+IHRoaXMsIDxJX0NvbmZpZ3VyYXRpb25fVXNlcj4gdXNlcl9jb25maWd1cmF0aW9uKTtcbiAgICB9LFxuICB9KTtcbn0oalF1ZXJ5KSk7XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL2VudGl0aWVzL0hlbHBlcic7XG5pbXBvcnQgeyBUaHVtYmxlciB9IGZyb20gJy4vZW50aXRpZXMvVGh1bWJsZXInO1xuaW1wb3J0IHsgQ29ubmVjdCB9IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9lbnRpdGllcy9Ub29sdGlwJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi9lbnRpdGllcy9JbnB1dCc7XG5cbmNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xuICBwb3NpdGlvbjogVF9Qb3NpdGlvbiA9IFswXTtcblxuICB2YWx1ZV9yYW5nZTogVF9SYW5nZSA9IFswLCAwXTtcblxuICB2YWx1ZV9zdGFydDogVF9WYWx1ZSA9IFswXTtcblxuICBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbjtcblxuICBpc190b29sdGlwOiBib29sZWFuO1xuXG4gIGlzX2Nvbm5lY3Q6IGJvb2xlYW47XG5cbiAgc2xpZGVyOiBIVE1MRWxlbWVudDtcblxuICB0aHVtYmxlcjogVGh1bWJsZXJbXSA9IFtdO1xuXG4gIGNvbm5lY3Q6IENvbm5lY3RbXSA9IFtdO1xuXG4gIHRvb2x0aXA6IFRvb2x0aXBbXSA9IFtdO1xuXG4gIGlucHV0X3ZhbHVlOiBJbnB1dFtdID0gW107XG5cbiAgaW5wdXRfdG9vbHRpcD86IElucHV0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBjb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVmlldykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmlzX3Rvb2x0aXAgPSB0aGlzLmNvbmZpZ3VyYXRpb24uaXNfdG9vbHRpcDtcbiAgICB0aGlzLmlzX2Nvbm5lY3QgPSB0aGlzLmNvbmZpZ3VyYXRpb24uaXNfY29ubmVjdDtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5jb25maWd1cmF0aW9uLm9yaWVudGF0aW9uO1xuXG4gICAgdGhpcy5zbGlkZXIgPSB0aGlzLmdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCdzbGlkZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgb25fY2hhbmdlX3ZpZXcoY2FsbGJhY2s6IElfVGh1bWJsZXJfU3RhdGUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudGh1bWJsZXJbaV0ub25fbW91c2VfZG93bl9hbmRfbW92ZSh0aGlzLmNvbnRhaW5lciwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dF92YWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW5wdXRfdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5pbnB1dF92YWx1ZVtpXS5vbl9rZXlkb3duX29yX21vdXNlb3V0KGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRfdG9vbHRpcCAmJiB0aGlzLmlzX3Rvb2x0aXApIHtcbiAgICAgIHRoaXMuaW5wdXRfdG9vbHRpcC5vbl9zd2l0Y2hfY2hlY2sodGhpcy50b29sdGlwKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUobW9kZWxfc3RhdGU6IFRfTW9kZWxfRGF0YSkge1xuICAgIGNvbnN0IGk6IG51bWJlciA9IG1vZGVsX3N0YXRlLmluZGV4O1xuICAgIGNvbnN0IHsgcG9zaXRpb24gfSA9IG1vZGVsX3N0YXRlO1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IG1vZGVsX3N0YXRlO1xuXG4gICAgdGhpcy5zZXRfYWN0aXZlX3RodW1ibGVyKHBvc2l0aW9uLCBpKTtcblxuICAgIHRoaXMudGh1bWJsZXJbaV0uc2V0X25ld19wb3NpdGlvbihwb3NpdGlvbltpXSk7XG5cbiAgICBpZiAodGhpcy5pc190b29sdGlwKSB7XG4gICAgICB0aGlzLnRvb2x0aXBbaV0uc2V0X2lubmVyX3RleHQodmFsdWVbaV0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlucHV0X3ZhbHVlWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaW5wdXRfdmFsdWVbaV0uZWxlbWVudC52YWx1ZSA9IFN0cmluZyh2YWx1ZVtpXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNfY29ubmVjdCkge1xuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdF9wb3NpdGlvbigwLCBwb3NpdGlvblswXSk7XG4gICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uWzFdKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdF9wb3NpdGlvbihwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldF9hY3RpdmVfdGh1bWJsZXIocG9zaXRpb246IFRfUG9zaXRpb24sIGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIHRoaXMudGh1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnRodW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNfdG9vbHRpcCkge1xuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGh1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnRodW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNfdG9vbHRpcCkge1xuICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZV9yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudmFsdWVfcmFuZ2UucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZV9yYW5nZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMudmFsdWVfc3RhcnRbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnZhbHVlX3N0YXJ0LnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWVfc3RhcnRbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV07XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKHRoaXMuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodGhpcy52YWx1ZV9zdGFydFtpXSwgdGhpcy52YWx1ZV9yYW5nZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodGhpcy52YWx1ZV9zdGFydFtpXSwgdGhpcy52YWx1ZV9yYW5nZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnRodW1ibGVyLnB1c2gobmV3IFRodW1ibGVyKHRoaXMucG9zaXRpb25baV0sIHRoaXMub3JpZW50YXRpb24sIGkpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc19jb25uZWN0KSB7XG4gICAgICBpZiAodGhpcy5wb3NpdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0LnB1c2gobmV3IENvbm5lY3QoMCwgdGhpcy5wb3NpdGlvblswXSwgdGhpcy5vcmllbnRhdGlvbikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb25uZWN0LnB1c2gobmV3IENvbm5lY3QodGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSwgdGhpcy5vcmllbnRhdGlvbikpO1xuICAgICAgfVxuICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMuY29ubmVjdFswXS5lbGVtZW50KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc190b29sdGlwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy50b29sdGlwLnB1c2gobmV3IFRvb2x0aXAodGhpcy52YWx1ZV9zdGFydFtpXSwgdGhpcy5vcmllbnRhdGlvbikpO1xuXG4gICAgICAgIHRoaXMudGh1bWJsZXJbaV0uZWxlbWVudC5hcHBlbmQodGhpcy50b29sdGlwW2ldLmVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50aHVtYmxlci5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMudGh1bWJsZXJbaV0uZWxlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMuc2xpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5pbnB1dF92YWx1ZS5wdXNoKG5ldyBJbnB1dChcbiAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC52YWx1ZVtpXSxcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV0sXG4gICAgICAgICAgaSxcbiAgICAgICAgKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQudG9vbHRpcCkge1xuICAgICAgdGhpcy5pbnB1dF90b29sdGlwID0gbmV3IElucHV0KFxuICAgICAgICAndG9vbHRpcCcsXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC50b29sdGlwWzBdLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgVmlldyB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBDb25uZWN0IGV4dGVuZHMgSGVscGVyIHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbm5lY3RfcG9zaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvc2l0aW9uX3N0YXJ0OiBudW1iZXIsIHByaXZhdGUgcG9zaXRpb25fZW5kOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24pIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ2Nvbm5lY3QnLCB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICAgIHRoaXMuc2V0X2Nvbm5lY3RfcG9zaXRpb24odGhpcy5wb3NpdGlvbl9zdGFydCwgdGhpcy5wb3NpdGlvbl9lbmQpO1xuICAgIH1cblxuICAgIHNldF9jb25uZWN0X3Bvc2l0aW9uKHBvc2l0aW9uX3N0YXJ0OiBudW1iZXIsIHBvc2l0aW9uX2VuZDogbnVtYmVyKSB7XG4gICAgICBjb25zdCBzdGFydDogbnVtYmVyID0gTWF0aC5yb3VuZChwb3NpdGlvbl9zdGFydCAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xuICAgICAgY29uc3QgZW5kOiBudW1iZXIgPSBNYXRoLnJvdW5kKHBvc2l0aW9uX2VuZCAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xuXG4gICAgICB0aGlzLmNvbm5lY3RfcG9zaXRpb24gPSBbc3RhcnQsIGVuZF07XG4gICAgICBjb25zdCBzdHlsZTogc3RyaW5nID0gc3RhcnQgPT09IDBcbiAgICAgICAgPyB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcbiAgICAgICAgICA/IGB3aWR0aDogJHtlbmR9JTtgXG4gICAgICAgICAgOiBgaGVpZ2h0OiAke2VuZH0lO2BcbiAgICAgICAgOiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcbiAgICAgICAgICA/IGBsZWZ0OiAke3N0YXJ0fSU7IHdpZHRoOiAkeyhlbmQgLSBzdGFydCl9JTtgXG4gICAgICAgICAgOiBgdG9wOiAke3N0YXJ0fSU7IGhlaWdodDogJHsoZW5kIC0gc3RhcnQpfSU7YDtcblxuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgfVxufVxuZXhwb3J0IHsgQ29ubmVjdCB9O1xuIiwiY2xhc3MgSGVscGVyIHtcbiAgICByZWFkb25seSBUT19USFVNQkxFUl9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xuXG4gICAgcmVhZG9ubHkgVE9fQ09OTkVDVF9VUERBVEU6IG51bWJlciA9IDFlMjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IFRfUmFuZ2UpOiBudW1iZXIge1xuICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gKCh2YWx1ZSAtIHJhbmdlWzBdKSAvIChyYW5nZVsxXSAtIHJhbmdlWzBdKSk7XG4gICAgICByZXN1bHQgPSBNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fVEhVTUJMRVJfUE9TSVRJT04pIC8gdGhpcy5UT19USFVNQkxFUl9QT1NJVElPTjtcblxuICAgICAgaWYgKHJlc3VsdCA8IDApIHtcbiAgICAgICAgcmVzdWx0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgPiAxKSB7XG4gICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKGNzc19jbGFzczogVF9DU1NfQ2xhc3Nlcywgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24pOiBIVE1MRWxlbWVudCB7XG4gICAgICBjb25zdCBzdHJfY2xhc3M6IHN0cmluZyA9IGBTUlNfXyR7Y3NzX2NsYXNzfWA7XG4gICAgICBjb25zdCBjc3NfY2xhc3Nfd2l0aG91dF9vcmllbnRhdGlvbjogc3RyaW5nID0gYCR7c3RyX2NsYXNzfSAke3N0cl9jbGFzc31fYDtcblxuICAgICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIChjc3NfY2xhc3Nfd2l0aG91dF9vcmllbnRhdGlvbiArIG9yaWVudGF0aW9uKSk7XG5cbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydCB7IEhlbHBlciB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJy4vVG9vbHRpcCc7XG5cbmNsYXNzIElucHV0IGV4dGVuZHMgSGVscGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBUX0lucHV0X1R5cGUsIHB1YmxpYyBlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LCBwdWJsaWMgdmFsdWU/OiBudW1iZXIsIHB1YmxpYyBpbmRleD86IG51bWJlcikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKHR5cGUgPT09ICd2YWx1ZScpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gU3RyaW5nKHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uX2tleWRvd25fb3JfbW91c2VvdXQodGhpczogSW5wdXQsIGNhbGxiYWNrOiBJX1RodW1ibGVyX1N0YXRlKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICBpZiAodGhhdC50eXBlICE9PSAndmFsdWUnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbl9rZXlkb3duKTtcbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBvbl9tb3VzZW91dCk7XG5cbiAgICBmdW5jdGlvbiBvbl9rZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnVGFiJyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgYnViYmxpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25fbW91c2VvdXQoKSB7XG4gICAgICBidWJibGluZygpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBidWJibGluZygpIHtcbiAgICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSBOdW1iZXIodGhhdC5lbGVtZW50LnZhbHVlKTtcbiAgICAgIGlmICh0aGF0LmluZGV4KSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBpbmRleDogdGhhdC5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uX3N3aXRjaF9jaGVjayh0aGlzOiBJbnB1dCwgdG9vbHRpcDogVG9vbHRpcFtdKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICBpZiAodGhhdC50eXBlICE9PSAndG9vbHRpcCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9vbHRpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhhdC5lbGVtZW50LmNoZWNrZWQpIHtcbiAgICAgICAgICB0b29sdGlwW2ldLnN3aXRjaF9oaWRkZW4odHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hfaGlkZGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgeyBJbnB1dCB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBUaHVtYmxlciBleHRlbmRzIEhlbHBlciB7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICB0aHVtYmxlcl9wb3NpdGlvbjogbnVtYmVyID0gMDtcblxuICAgIGxpc3RlbmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwb3NpdGlvbjogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiBUX09yaWVudGF0aW9uLCBwcml2YXRlIGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ3RodW1ibGVyJywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICB0aGlzLnNldF9uZXdfcG9zaXRpb24odGhpcy5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgc2V0X25ld19wb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICB0aGlzLnRodW1ibGVyX3Bvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgIGNvbnN0IGxpdGVyOiBzdHJpbmcgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnWCcgOiAnWSc7XG5cbiAgICAgIGNvbnN0IHN0eWxlOiBzdHJpbmcgPSBgdHJhbnNmb3JtOiB0cmFuc2xhdGUke2xpdGVyfSgke01hdGgucm91bmQocG9zaXRpb24gKiB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OKX0lKTtgO1xuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgZ2V0X3NoaWZ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XG4gICAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xuICAgICAgICA/IGV2ZW50LmNsaWVudFggLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgICAgOiBldmVudC5jbGllbnRZIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgb25fbW91c2VfZG93bl9hbmRfbW92ZSh0aGlzOiBUaHVtYmxlciwgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IElfVGh1bWJsZXJfU3RhdGUpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5saXN0ZW5pbmcgPSB0cnVlO1xuXG4gICAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hpZnQ6IG51bWJlciA9IHRoaXMuZ2V0X3NoaWZ0KHRoYXQuZWxlbWVudCwgZXZlbnQpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uX21vdXNlX21vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uX21vdXNlX21vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICBsZXQgbmV3X3Bvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgICAgbGV0IG5ld19wb3NpdGlvbl9pbl9wZXJjZW50OiBudW1iZXI7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgICAgICBpZiAodGhhdC5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgICAgIG5ld19wb3NpdGlvbl9pbl9wZXJjZW50ID0gbmV3X3Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRZIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uX2luX3BlcmNlbnQgPSBuZXdfcG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgcG9zaXRpb24gPSBuZXdfcG9zaXRpb25faW5fcGVyY2VudDtcblxuICAgICAgICAgIGlmIChwb3NpdGlvbiA+IDEpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbl9tb3VzZV91cCgpIHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbl9tb3VzZV9tb3ZlKTtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgeyBUaHVtYmxlciB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBUb29sdGlwIGV4dGVuZHMgSGVscGVyIHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIHRvb2x0aXBfdmFsdWU6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbHVlOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24pIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ3Rvb2x0aXAnLCB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICAgIHRoaXMuc2V0X2lubmVyX3RleHQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0X2lubmVyX3RleHQodmFsdWU6IG51bWJlcikge1xuICAgICAgY29uc3QgdmFsOiBudW1iZXIgPSB2YWx1ZSA+IDBcbiAgICAgICAgPyBNYXRoLmZsb29yKHZhbHVlKVxuICAgICAgICA6IE1hdGguY2VpbCh2YWx1ZSk7XG5cbiAgICAgIHRoaXMudG9vbHRpcF92YWx1ZSA9IHZhbDtcbiAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSBTdHJpbmcodmFsKTtcbiAgICB9XG5cbiAgICBzd2l0Y2hfaGlkZGVuKHRoaXM6IFRvb2x0aXAsIGlzX3Zpc2libGU6IGJvb2xlYW4pIHtcbiAgICAgIGNvbnN0IHRoYXQ6IFRvb2x0aXAgPSB0aGlzO1xuICAgICAgaWYgKGlzX3Zpc2libGUpIHtcbiAgICAgICAgdGhhdC5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHsgVG9vbHRpcCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==