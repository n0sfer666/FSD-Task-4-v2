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
            this.template.startConfigInput_min,
            this.template.startConfigInput_max,
            this.template.step_input,
            this.template.orientation_input,
            this.template.connectConfigInput
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
            var start = that.template.startConfigInput_max.value !== ''
                ? [
                    that.template.startConfigInput_min.value !== ''
                        ? Number(that.template.startConfigInput_min.value)
                        : that.defaultConfig.start[0],
                    Number(that.template.startConfigInput_max.value)
                ]
                : [
                    that.template.startConfigInput_min.value !== ''
                        ? Number(that.template.startConfigInput_min.value)
                        : that.defaultConfig.start[0]
                ];
            var step = that.template.step_input.value !== ''
                ? Number(that.template.step_input.value)
                : that.defaultConfig.step;
            var orientation = that.template.orientation_input.checked
                ? 'horizontal'
                : 'vertical';
            var connect = that.template.connectConfigInput.checked
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
        this.startConfigInput_min = document.createElement('input');
        this.startConfigInput_min.setAttribute('type', 'text');
        this.startConfigInput_min.value = '-50';
        this.startConfigInput_max = document.createElement('input');
        this.startConfigInput_max.setAttribute('type', 'text');
        this.startConfigInput_max.value = '50';
        var start_line = document.createElement('div');
        start_line.append(start_text, this.startConfigInput_min, this.startConfigInput_max);
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
        this.connectConfigInput = document.createElement('input');
        this.connectConfigInput.setAttribute('type', 'checkbox');
        this.connectConfigInput.checked = true;
        var connect_line = document.createElement('div');
        connect_line.append(connect_text, this.connectConfigInput);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9EZW1vX1BhbmVsL3RlbXBsYXRlLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Db250cm9sbGVyL1ByZXNlbnRlci50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1BsdWdpbi50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9WaWV3LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSGVscGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0lucHV0LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1RodW1ibGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FB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QyxDQUFDOztJQUNsQyxDQUFDO0lBRUQsZ0NBQWMsR0FBZCxVQUFlLEtBQWE7UUFDMUIsSUFBTSxHQUFHLEdBQVcsS0FBSyxHQUFHLENBQUM7WUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsK0JBQWEsR0FBYixVQUE2QixVQUFtQjtRQUM5QyxJQUFNLElBQUksR0FBWSxJQUFJLENBQUM7UUFDM0IsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDN0I7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM1QjtJQUNILENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxDQTdCcUIsZUFBTSxHQTZCM0I7QUFDUSwwQkFBTyIsImZpbGUiOiJkZW1vUGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50c1wiKTtcbiIsImltcG9ydCB7IFNpbXBsZVJhbmdlU2xpZGVyIH0gZnJvbSAnLi4vUGx1Z2luL1BsdWdpbic7XHJcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZSc7XHJcblxyXG5jbGFzcyBEZW1vX1BhbmVsIHtcclxuXHJcbiAgdGVtcGxhdGU6IFRlbXBsYXRlO1xyXG4gIHJhbmdlX3NsaWRlcjogIFNpbXBsZVJhbmdlU2xpZGVyO1xyXG4gIGVtcHR5X3NsaWRlcjogc3RyaW5nO1xyXG5cclxuICBkZWZhdWx0Q29uZmlnOiBJX0RFTU9fRGVmYXVsdF9Db25maWc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVtb19wYW5lbDogSlF1ZXJ5LCBwcml2YXRlIHNsaWRlcjogSlF1ZXJ5LCBwcml2YXRlIGlucHV0czogSV9ERU1PX0lucHV0KSB7XHJcbiAgICB0aGlzLnRlbXBsYXRlID0gbmV3IFRlbXBsYXRlKCk7XHJcbiAgICB0aGlzLmRlbW9fcGFuZWwuYXBwZW5kKHRoaXMudGVtcGxhdGUuZGVtb19wYW5lbCk7XHJcblxyXG4gICAgdGhpcy5lbXB0eV9zbGlkZXIgPSAnIycgKyBzbGlkZXIuZ2V0KDApLmlkO1xyXG5cclxuICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IHtcclxuICAgICAgcmFuZ2U6IFswLCAxMDBdLFxyXG4gICAgICBzdGFydDogWzEwXSxcclxuICAgICAgc3RlcDogMVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmFuZ2Vfc2xpZGVyID0gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKHRoaXMuc2xpZGVyLCB7XHJcbiAgICAgIHJhbmdlOiBbLTEwMCwgMTAwXSxcclxuICAgICAgc3RhcnQ6IFstNTAsIDUwXSxcclxuICAgICAgc3RlcDogMTAsXHJcbiAgICAgIG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIixcclxuICAgICAgY29ubmVjdDogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogdHJ1ZSxcclxuICAgICAgaW5wdXQ6IHRoaXMuaW5wdXRzXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgdGVtcGxhdGVfaW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W10gPSBbXHJcbiAgICAgIHRoaXMudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWluLFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnJhbmdlX2lucHV0X21heCxcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21pbixcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21heCxcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGVwX2lucHV0LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLm9yaWVudGF0aW9uX2lucHV0LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLmNvbm5lY3RDb25maWdJbnB1dFxyXG4gICAgXVxyXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0ZW1wbGF0ZV9pbnB1dHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHRoaXMub25fY2hhbmdlX2lucHV0KHRlbXBsYXRlX2lucHV0c1tpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbl9jaGFuZ2VfaW5wdXQodGhpczogRGVtb19QYW5lbCwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25fa2V5ZG93bik7XHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIG9uX21vdXNlb3V0KTtcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uX2NoYW5nZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25fa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICBpZihldmVudC5rZXkgPT09IFwiVGFiXCIgfHwgZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcclxuICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uX21vdXNlb3V0KCkge1xyXG4gICAgICBhY3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbl9jaGFuZ2UoKSB7XHJcbiAgICAgIGFjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGlvbigpIHtcclxuXHJcbiAgICAgIGxldCByYW5nZTogW251bWJlciwgbnVtYmVyXSA9IFtcclxuICAgICAgICB0aGF0LnRlbXBsYXRlLnJhbmdlX2lucHV0X21pbi52YWx1ZSAhPT0gJydcclxuICAgICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWluLnZhbHVlKVxyXG4gICAgICAgICAgOiB0aGF0LmRlZmF1bHRDb25maWcucmFuZ2VbMF0sXHJcbiAgICAgICAgdGhhdC50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9tYXgudmFsdWUgIT09ICcnXHJcbiAgICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnJhbmdlX2lucHV0X21heC52YWx1ZSlcclxuICAgICAgICAgIDogdGhhdC5kZWZhdWx0Q29uZmlnLnJhbmdlWzFdLFxyXG4gICAgICBdXHJcbiAgICAgIGxldCBzdGFydDogVF9ERU1PX1N0YXJ0ID0gdGhhdC50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21heC52YWx1ZSAhPT0gJydcclxuICAgICAgICA/IFtcclxuICAgICAgICAgIHRoYXQudGVtcGxhdGUuc3RhcnRDb25maWdJbnB1dF9taW4udmFsdWUgIT09ICcnXHJcbiAgICAgICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUuc3RhcnRDb25maWdJbnB1dF9taW4udmFsdWUpXHJcbiAgICAgICAgICAgIDogdGhhdC5kZWZhdWx0Q29uZmlnLnN0YXJ0WzBdLFxyXG4gICAgICAgICAgTnVtYmVyKHRoYXQudGVtcGxhdGUuc3RhcnRDb25maWdJbnB1dF9tYXgudmFsdWUpXHJcbiAgICAgICAgXVxyXG4gICAgICAgIDogW1xyXG4gICAgICAgICAgdGhhdC50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21pbi52YWx1ZSAhPT0gJydcclxuICAgICAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21pbi52YWx1ZSlcclxuICAgICAgICAgICAgOiB0aGF0LmRlZmF1bHRDb25maWcuc3RhcnRbMF1cclxuICAgICAgICBdXHJcbiAgICAgIGxldCBzdGVwOiBudW1iZXIgPSB0aGF0LnRlbXBsYXRlLnN0ZXBfaW5wdXQudmFsdWUgIT09ICcnXHJcbiAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5zdGVwX2lucHV0LnZhbHVlKVxyXG4gICAgICAgIDogdGhhdC5kZWZhdWx0Q29uZmlnLnN0ZXA7XHJcbiAgICAgIGxldCBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uID0gdGhhdC50ZW1wbGF0ZS5vcmllbnRhdGlvbl9pbnB1dC5jaGVja2VkXHJcbiAgICAgICAgPyAnaG9yaXpvbnRhbCdcclxuICAgICAgICA6ICd2ZXJ0aWNhbCc7XHJcbiAgICAgIGxldCBjb25uZWN0OiBib29sZWFuID0gdGhhdC50ZW1wbGF0ZS5jb25uZWN0Q29uZmlnSW5wdXQuY2hlY2tlZFxyXG4gICAgICAgID8gdHJ1ZVxyXG4gICAgICAgIDogZmFsc2U7XHJcblxyXG4gICAgICB0aGF0LnNsaWRlciA9ICQodGhhdC5lbXB0eV9zbGlkZXIpLmVtcHR5KCk7XHJcbiAgICAgIHRoYXQucmFuZ2Vfc2xpZGVyID0gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKHRoYXQuc2xpZGVyLCB7XHJcbiAgICAgICAgcmFuZ2U6IHJhbmdlLFxyXG4gICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICBzdGVwOiBzdGVwLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbixcclxuICAgICAgICBjb25uZWN0OiBjb25uZWN0LFxyXG4gICAgICAgIHRvb2x0aXA6IHRydWUsXHJcbiAgICAgICAgaW5wdXQ6IHRoYXQuaW5wdXRzXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge0RlbW9fUGFuZWx9O1xyXG5cclxuKGZ1bmN0aW9uKCQ6IEpRdWVyeVN0YXRpYykge1xyXG4gICQuZm4uZXh0ZW5kKHtcclxuICAgIERlbW9fUGFuZWw6IGZ1bmN0aW9uKHNsaWRlcjogSlF1ZXJ5LCBpbnB1dHM6IElfREVNT19JbnB1dCkge1xyXG4gICAgICByZXR1cm4gbmV3IERlbW9fUGFuZWwoPEpRdWVyeT4gdGhpcywgPEpRdWVyeT4gc2xpZGVyLCA8SV9ERU1PX0lucHV0PiBpbnB1dHMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59IChqUXVlcnkpICk7IiwiY2xhc3MgVGVtcGxhdGUge1xyXG4gIHJhbmdlX2lucHV0X21pbjogSFRNTElucHV0RWxlbWVudDtcclxuICByYW5nZV9pbnB1dF9tYXg6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIHN0YXJ0Q29uZmlnSW5wdXRfbWluOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHN0YXJ0Q29uZmlnSW5wdXRfbWF4OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBzdGVwX2lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBvcmllbnRhdGlvbl9pbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgY29ubmVjdENvbmZpZ0lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBkZW1vX3BhbmVsOiBIVE1MRWxlbWVudDtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIHJhbmdlIGxpbmVcclxuICAgIGxldCByYW5nZV90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgcmFuZ2VfdGV4dC5pbm5lclRleHQgPSAnUmFuZ2U6ICc7XHJcbiAgICB0aGlzLnJhbmdlX2lucHV0X21pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWluLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWluLnZhbHVlID0gJy0xMDAnO1xyXG4gICAgdGhpcy5yYW5nZV9pbnB1dF9tYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnJhbmdlX2lucHV0X21heC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICB0aGlzLnJhbmdlX2lucHV0X21heC52YWx1ZSA9ICcxMDAnO1xyXG4gICAgbGV0IHJhbmdlX2xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgcmFuZ2VfbGluZS5hcHBlbmQocmFuZ2VfdGV4dCwgdGhpcy5yYW5nZV9pbnB1dF9taW4sIHRoaXMucmFuZ2VfaW5wdXRfbWF4KTtcclxuICAgIC8vIHN0YXJ0IGxpbmVcclxuICAgIGxldCBzdGFydF90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgc3RhcnRfdGV4dC5pbm5lclRleHQgPSAnU3RhcnQ6ICc7XHJcbiAgICB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21pbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnZhbHVlID0gJy01MCc7XHJcbiAgICB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21heC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWF4LnZhbHVlID0gJzUwJztcclxuICAgIGxldCBzdGFydF9saW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHN0YXJ0X2xpbmUuYXBwZW5kKHN0YXJ0X3RleHQsIHRoaXMuc3RhcnRDb25maWdJbnB1dF9taW4sIHRoaXMuc3RhcnRDb25maWdJbnB1dF9tYXgpO1xyXG4gICAgLy8gc3RlcCBsaW5lXHJcbiAgICBsZXQgc3RlcF90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgc3RlcF90ZXh0LmlubmVyVGV4dCA9ICdTdGVwOiAnO1xyXG4gICAgdGhpcy5zdGVwX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5zdGVwX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMuc3RlcF9pbnB1dC52YWx1ZSA9ICcxMCc7XHJcbiAgICBsZXQgc3RlcF9saW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHN0ZXBfbGluZS5hcHBlbmQoc3RlcF90ZXh0LCB0aGlzLnN0ZXBfaW5wdXQpO1xyXG4gICAgLy8gb3JpZW50YXRpb24gbGluZVxyXG4gICAgbGV0IG9yaWVudGF0aW9uX3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBvcmllbnRhdGlvbl90ZXh0LmlubmVyVGV4dCA9ICdPcmllbnRhdGlvbiBob3Jpem9udGFsL3ZlcnRpY2FsOiAnO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbl9pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMub3JpZW50YXRpb25faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcbiAgICAgIHRoaXMub3JpZW50YXRpb25faW5wdXQuY2hlY2tlZCA9IHRydWU7XHJcbiAgICBsZXQgb3JpZW50YXRpb25fbGluZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgb3JpZW50YXRpb25fbGluZS5hcHBlbmQob3JpZW50YXRpb25fdGV4dCwgdGhpcy5vcmllbnRhdGlvbl9pbnB1dCk7XHJcbiAgICAvLyBjb25uZWN0IGxpbmVcclxuICAgIGxldCBjb25uZWN0X3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBjb25uZWN0X3RleHQuaW5uZXJUZXh0ID0gJ0Nvbm5lY3Qgb24vb2ZmOiAnO1xyXG4gICAgdGhpcy5jb25uZWN0Q29uZmlnSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLmNvbm5lY3RDb25maWdJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcclxuICAgICAgdGhpcy5jb25uZWN0Q29uZmlnSW5wdXQuY2hlY2tlZCA9IHRydWU7XHJcbiAgICBsZXQgY29ubmVjdF9saW5lOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjb25uZWN0X2xpbmUuYXBwZW5kKGNvbm5lY3RfdGV4dCwgdGhpcy5jb25uZWN0Q29uZmlnSW5wdXQpO1xyXG5cclxuICAgIHRoaXMuZGVtb19wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLmRlbW9fcGFuZWwuYXBwZW5kKHJhbmdlX2xpbmUsIHN0YXJ0X2xpbmUsIHN0ZXBfbGluZSwgb3JpZW50YXRpb25fbGluZSwgY29ubmVjdF9saW5lKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IHtUZW1wbGF0ZX0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vVmlldy9WaWV3JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vTW9kZWwvTW9kZWwnO1xuXG5jbGFzcyBQcmVzZW50ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IFZpZXcsIHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XG4gICAgdGhpcy52aWV3Lm9uX2NoYW5nZV92aWV3KCh0aHVtYmxlcl9kYXRhOiB0VHVtYmxlckRhdGEpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRodW1ibGVyX2RhdGEpO1xuICAgICAgdGhpcy5tb2RlbC5zZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX2RhdGEpO1xuICAgIH0pO1xuICAgIHRoaXMubW9kZWwub25fY2hhbmdlX21vZGVsKChtb2RlbF9zdGF0ZTogdE1vZGVsRGF0YSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2cobW9kZWxfc3RhdGUpO1xuICAgICAgdGhpcy52aWV3LnVwZGF0ZShtb2RlbF9zdGF0ZSk7XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCB7IFByZXNlbnRlciB9O1xuIiwiY2xhc3MgTW9kZWwge1xuICAgIHZhbHVlOiB0VmFsdWUgPSBbMF07XG5cbiAgICByYW5nZTogdFJhbmdlID0gWzAsIDBdO1xuXG4gICAgc3RlcDogbnVtYmVyID0gMDtcblxuICAgIHBvc2l0aW9uOiB0UG9zaXRpb24gPSBbMF07XG5cbiAgICBpbmRleF9vZl9hY3RpdmVfdGh1bWJsZXI6IG51bWJlciA9IDA7XG5cbiAgICBjYWxsYmFja19saXN0OiBpTW9kZWxDYWxsYmFja1tdO1xuXG4gICAgcmVhZG9ubHkgVE9fTk9STUFMSVpFX1BPU0lUSU9OOiBudW1iZXIgPSAxZTQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb246IGlDb25maWdNb2RlbCkge1xuICAgICAgdGhpcy5jYWxsYmFja19saXN0ID0gW107XG5cbiAgICAgIHRoaXMuc3RlcCA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGVwO1xuXG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBzZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX3N0YXRlOiB0VHVtYmxlckRhdGEpIHtcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHRodW1ibGVyX3N0YXRlO1xuICAgICAgdGhpcy5pbmRleF9vZl9hY3RpdmVfdGh1bWJsZXIgPSBpbmRleDtcblxuICAgICAgY29uc3QgbmV3X3ZhbHVlOiBudW1iZXIgPSB0aGlzLmdldF9uZXdfdmFsdWUodGh1bWJsZXJfc3RhdGUpO1xuXG4gICAgICB0aGlzLmNoZWNrX29uX3N0ZXBfbW92ZW1lbnRfdG9fc2V0X3ZhbF9hbmRfcG9zKG5ld192YWx1ZSwgaW5kZXgpO1xuICAgICAgLy8gY2hlY2sgZm9yIGNvbGxpc2lvblxuICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoID4gMSAmJiB0aGlzLnZhbHVlWzFdKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlWzBdIDwgdGhpcy52YWx1ZVsxXSkge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldF9uZXdfdmFsdWUodGh1bWJsZXJfc3RhdGU6IHRUdW1ibGVyRGF0YSk6IG51bWJlciB7XG4gICAgICBjb25zdCB7IGluZGV4IH0gPSB0aHVtYmxlcl9zdGF0ZTtcbiAgICAgIGxldCBuZXdfdmFsdWU6IG51bWJlciA9IHRoaXMudmFsdWVbaW5kZXhdO1xuICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgIGlmICh0aHVtYmxlcl9zdGF0ZS5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvc2l0aW9uID0gTWF0aC5yb3VuZCh0aHVtYmxlcl9zdGF0ZS5wb3NpdGlvbiAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKSAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OO1xuICAgICAgICBuZXdfdmFsdWUgPSB0aGlzLmdldFZhbHVlX2Zyb21fcG9zaXRpb24ocG9zaXRpb24sIHRoaXMucmFuZ2UpO1xuICAgICAgfSBlbHNlIGlmICh0aHVtYmxlcl9zdGF0ZS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld192YWx1ZSA9IHRodW1ibGVyX3N0YXRlLnZhbHVlO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiB0aGlzLnZhbHVlWzFdKSB7XG4gICAgICAgICAgaWYgKG5ld192YWx1ZSA+IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXApIHtcbiAgICAgICAgICAgIG5ld192YWx1ZSA9IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gMSkge1xuICAgICAgICAgIGlmIChuZXdfdmFsdWUgPCB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwKSB7XG4gICAgICAgICAgICBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld192YWx1ZTtcbiAgICB9XG5cbiAgICBjaGVja19vbl9zdGVwX21vdmVtZW50X3RvX3NldF92YWxfYW5kX3BvcyhuZXdfdmFsdWU6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xuICAgICAgY29uc3QgY29uZGl0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gW3RoaXMudmFsdWVbaW5kZXhdIC0gdGhpcy5zdGVwLCB0aGlzLnZhbHVlW2luZGV4XSArIHRoaXMuc3RlcF07XG5cbiAgICAgIGlmIChuZXdfdmFsdWUgPj0gY29uZGl0aW9uWzFdIHx8IG5ld192YWx1ZSA8PSBjb25kaXRpb25bMF0pIHtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZV9hbmRfcG9zaXRpb24obmV3X3ZhbHVlLCBpbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5jYWxsYmFja19saXN0LmZvckVhY2goKGNhbGxiYWNrOiBpTW9kZWxDYWxsYmFjaykgPT4ge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uX2NoYW5nZV9tb2RlbChjYWxsYmFjazogaU1vZGVsQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tfbGlzdC5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbl9mcm9tX3ZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSAodmFsdWUgLSByYW5nZVswXSkgLyAocmFuZ2VbMV0gLSByYW5nZVswXSk7XG5cbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTikgLyB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTik7XG4gICAgfVxuXG4gICAgZ2V0VmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gKHBvc2l0aW9uICogKHJhbmdlWzFdIC0gcmFuZ2VbMF0pKSArIHJhbmdlWzBdO1xuXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0KSk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVfYW5kX3Bvc2l0aW9uKG5ld192YWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcbiAgICAgIHRoaXMudmFsdWVbaV0gPSBuZXdfdmFsdWUgPiAwXG4gICAgICAgID8gKE1hdGguY2VpbChuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKVxuICAgICAgICA6IChNYXRoLmZsb29yKG5ld192YWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMucmFuZ2VbMF0pIHtcbiAgICAgICAgICB0aGlzLnZhbHVlWzBdID0gdGhpcy5yYW5nZVswXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaSA9PT0gMSAmJiB0aGlzLnZhbHVlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0gPiB0aGlzLnJhbmdlWzFdKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMucmFuZ2VbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMucmFuZ2UucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmFuZ2VbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudmFsdWUucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKHRoaXMuZ2V0UG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgTW9kZWwgfTtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuL1ZpZXcvVmlldyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vTW9kZWwvTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XG5cbmNsYXNzIFNpbXBsZVJhbmdlU2xpZGVyIHtcbiAgICB2aWV3OiBWaWV3O1xuXG4gICAgbW9kZWw6IE1vZGVsO1xuXG4gICAgcHJlc2VudGVyOiBQcmVzZW50ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSlF1ZXJ5LCBwcml2YXRlIHVzZXJfY29uZmlndXJhdGlvbjogaUNvbmZpZ1VzZXIpIHtcbiAgICAgIGNvbnN0IHNsaWRlcl9jb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xuXG4gICAgICBjb25zdCBkZWZhdWx0X0NvbmZpZ3VyYXRpb246IGlDb25maWdVc2VyID0ge1xuICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICBzdGFydDogWzEwXSxcbiAgICAgICAgcmFuZ2U6IFswLCAxMDBdLFxuICAgICAgICBzdGVwOiAxLFxuICAgICAgICBjb25uZWN0OiB0cnVlLFxuICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgY29tcGxldGVfY29uZmlndXJhdGlvbjogaUNvbmZpZ1VzZXIgPSB7XG4gICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbiA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLm9yaWVudGF0aW9uIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24sXG4gICAgICAgIHN0YXJ0OiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGFydCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnN0YXJ0IDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RhcnQsXG4gICAgICAgIHJhbmdlOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5yYW5nZSA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnJhbmdlIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ucmFuZ2UsXG4gICAgICAgIHN0ZXA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0ZXAgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5zdGVwIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uc3RlcCxcbiAgICAgICAgY29ubmVjdDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uY29ubmVjdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLmNvbm5lY3QgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5jb25uZWN0LFxuICAgICAgICB0b29sdGlwOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi50b29sdGlwID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24udG9vbHRpcCA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnRvb2x0aXAsXG4gICAgICAgIGlucHV0OiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5pbnB1dCxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1vZGVsX2NvbmZpZ3VyYXRpb246IGlDb25maWdNb2RlbCA9IHtcbiAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXG4gICAgICAgIHZhbHVlX3JhbmdlOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnJhbmdlLFxuICAgICAgICB2YWx1ZV9zdGVwOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnN0ZXAsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB2aWV3X2NvbmZpZ3VyYXRpb246IGlDb25maWdWaWV3ID0ge1xuICAgICAgICBvcmllbnRhdGlvbjogY29tcGxldGVfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbixcbiAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXG4gICAgICAgIHZhbHVlX3JhbmdlOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnJhbmdlLFxuICAgICAgICBpc190b29sdGlwOiBjb21wbGV0ZV9jb25maWd1cmF0aW9uLnRvb2x0aXAsXG4gICAgICAgIGlzX2Nvbm5lY3Q6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uY29ubmVjdCxcbiAgICAgICAgaW5wdXQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uaW5wdXQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzbGlkZXJfY29udGFpbmVyLCB2aWV3X2NvbmZpZ3VyYXRpb24pO1xuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChtb2RlbF9jb25maWd1cmF0aW9uKTtcbiAgICAgIHRoaXMucHJlc2VudGVyID0gbmV3IFByZXNlbnRlcih0aGlzLnZpZXcsIHRoaXMubW9kZWwpO1xuICAgIH1cbn1cbmV4cG9ydCB7IFNpbXBsZVJhbmdlU2xpZGVyIH07XG5cbihmdW5jdGlvbiAoJDogSlF1ZXJ5U3RhdGljKSB7XG4gICQuZm4uZXh0ZW5kKHtcbiAgICBTaW1wbGVSYW5nZVNsaWRlcih1c2VyX2NvbmZpZ3VyYXRpb246IGlDb25maWdVc2VyKSB7XG4gICAgICByZXR1cm4gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKDxKUXVlcnk+IHRoaXMsIDxpQ29uZmlnVXNlcj4gdXNlcl9jb25maWd1cmF0aW9uKTtcbiAgICB9LFxuICB9KTtcbn0oalF1ZXJ5KSk7XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL2VudGl0aWVzL0hlbHBlcic7XG5pbXBvcnQgeyBUaHVtYmxlciB9IGZyb20gJy4vZW50aXRpZXMvVGh1bWJsZXInO1xuaW1wb3J0IHsgQ29ubmVjdCB9IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9lbnRpdGllcy9Ub29sdGlwJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi9lbnRpdGllcy9JbnB1dCc7XG5cbmNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xuICBwb3NpdGlvbjogdFBvc2l0aW9uID0gWzBdO1xuXG4gIHZhbHVlX3JhbmdlOiB0UmFuZ2UgPSBbMCwgMF07XG5cbiAgdmFsdWVfc3RhcnQ6IHRWYWx1ZSA9IFswXTtcblxuICBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uO1xuXG4gIGlzX3Rvb2x0aXA6IGJvb2xlYW47XG5cbiAgaXNfY29ubmVjdDogYm9vbGVhbjtcblxuICBzbGlkZXI6IEhUTUxFbGVtZW50O1xuXG4gIHRodW1ibGVyOiBUaHVtYmxlcltdID0gW107XG5cbiAgY29ubmVjdDogQ29ubmVjdFtdID0gW107XG5cbiAgdG9vbHRpcDogVG9vbHRpcFtdID0gW107XG5cbiAgaW5wdXRWYWx1ZTogSW5wdXRbXSA9IFtdO1xuXG4gIGlucHV0X3Rvb2x0aXA/OiBJbnB1dDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHByaXZhdGUgY29uZmlndXJhdGlvbjogaUNvbmZpZ1ZpZXcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pc190b29sdGlwID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX3Rvb2x0aXA7XG4gICAgdGhpcy5pc19jb25uZWN0ID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX2Nvbm5lY3Q7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbjtcblxuICAgIHRoaXMuc2xpZGVyID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygnc2xpZGVyJywgdGhpcy5vcmllbnRhdGlvbik7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIG9uX2NoYW5nZV92aWV3KGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnRodW1ibGVyW2ldLm9uX21vdXNlX2Rvd25fYW5kX21vdmUodGhpcy5jb250YWluZXIsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW5wdXRWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWVbaV0ub25fa2V5ZG93bl9vcl9tb3VzZW91dChjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0X3Rvb2x0aXAgJiYgdGhpcy5pc190b29sdGlwKSB7XG4gICAgICB0aGlzLmlucHV0X3Rvb2x0aXAub25fc3dpdGNoX2NoZWNrKHRoaXMudG9vbHRpcCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG1vZGVsX3N0YXRlOiB0TW9kZWxEYXRhKSB7XG4gICAgY29uc3QgaTogbnVtYmVyID0gbW9kZWxfc3RhdGUuaW5kZXg7XG4gICAgY29uc3QgeyBwb3NpdGlvbiB9ID0gbW9kZWxfc3RhdGU7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gbW9kZWxfc3RhdGU7XG5cbiAgICB0aGlzLnNldF9hY3RpdmVfdGh1bWJsZXIocG9zaXRpb24sIGkpO1xuXG4gICAgdGhpcy50aHVtYmxlcltpXS5zZXRfbmV3X3Bvc2l0aW9uKHBvc2l0aW9uW2ldKTtcblxuICAgIGlmICh0aGlzLmlzX3Rvb2x0aXApIHtcbiAgICAgIHRoaXMudG9vbHRpcFtpXS5zZXRfaW5uZXJfdGV4dCh2YWx1ZVtpXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmlucHV0VmFsdWVbaV0uZWxlbWVudC52YWx1ZSA9IFN0cmluZyh2YWx1ZVtpXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNfY29ubmVjdCkge1xuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdFBvc2l0aW9uKDAsIHBvc2l0aW9uWzBdKTtcbiAgICAgIH0gZWxzZSBpZiAocG9zaXRpb25bMV0pIHtcbiAgICAgICAgdGhpcy5jb25uZWN0WzBdLnNldF9jb25uZWN0UG9zaXRpb24ocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRfYWN0aXZlX3RodW1ibGVyKHBvc2l0aW9uOiB0UG9zaXRpb24sIGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIHRoaXMudGh1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnRodW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNfdG9vbHRpcCkge1xuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGh1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnRodW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNfdG9vbHRpcCkge1xuICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZV9yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudmFsdWVfcmFuZ2UucHVzaCh0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZV9yYW5nZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMudmFsdWVfc3RhcnRbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnZhbHVlX3N0YXJ0LnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWVfc3RhcnRbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV07XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKHRoaXMuZ2V0UG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlX3N0YXJ0W2ldLCB0aGlzLnZhbHVlX3JhbmdlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMudmFsdWVfcmFuZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy50aHVtYmxlci5wdXNoKG5ldyBUaHVtYmxlcih0aGlzLnBvc2l0aW9uW2ldLCB0aGlzLm9yaWVudGF0aW9uLCBpKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNfY29ubmVjdCkge1xuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KHRoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0sIHRoaXMub3JpZW50YXRpb24pKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLmNvbm5lY3RbMF0uZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNfdG9vbHRpcCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMudG9vbHRpcC5wdXNoKG5ldyBUb29sdGlwKHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMub3JpZW50YXRpb24pKTtcblxuICAgICAgICB0aGlzLnRodW1ibGVyW2ldLmVsZW1lbnQuYXBwZW5kKHRoaXMudG9vbHRpcFtpXS5lbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLnRodW1ibGVyW2ldLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLnNsaWRlcik7XG5cbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZS5wdXNoKG5ldyBJbnB1dChcbiAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC52YWx1ZVtpXSxcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnRbaV0sXG4gICAgICAgICAgaSxcbiAgICAgICAgKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW5wdXQudG9vbHRpcCkge1xuICAgICAgdGhpcy5pbnB1dF90b29sdGlwID0gbmV3IElucHV0KFxuICAgICAgICAndG9vbHRpcCcsXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC50b29sdGlwWzBdLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgVmlldyB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBDb25uZWN0IGV4dGVuZHMgSGVscGVyIHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbm5lY3RQb3NpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9zaXRpb25fc3RhcnQ6IG51bWJlciwgcHJpdmF0ZSBwb3NpdGlvbl9lbmQ6IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCdjb25uZWN0JywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICB0aGlzLnNldF9jb25uZWN0UG9zaXRpb24odGhpcy5wb3NpdGlvbl9zdGFydCwgdGhpcy5wb3NpdGlvbl9lbmQpO1xuICAgIH1cblxuICAgIHNldF9jb25uZWN0UG9zaXRpb24ocG9zaXRpb25fc3RhcnQ6IG51bWJlciwgcG9zaXRpb25fZW5kOiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IHN0YXJ0OiBudW1iZXIgPSBNYXRoLnJvdW5kKHBvc2l0aW9uX3N0YXJ0ICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XG4gICAgICBjb25zdCBlbmQ6IG51bWJlciA9IE1hdGgucm91bmQocG9zaXRpb25fZW5kICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XG5cbiAgICAgIHRoaXMuY29ubmVjdFBvc2l0aW9uID0gW3N0YXJ0LCBlbmRdO1xuICAgICAgY29uc3Qgc3R5bGU6IHN0cmluZyA9IHN0YXJ0ID09PSAwXG4gICAgICAgID8gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgPyBgd2lkdGg6ICR7ZW5kfSU7YFxuICAgICAgICAgIDogYGhlaWdodDogJHtlbmR9JTtgXG4gICAgICAgIDogdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgPyBgbGVmdDogJHtzdGFydH0lOyB3aWR0aDogJHsoZW5kIC0gc3RhcnQpfSU7YFxuICAgICAgICAgIDogYHRvcDogJHtzdGFydH0lOyBoZWlnaHQ6ICR7KGVuZCAtIHN0YXJ0KX0lO2A7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgIH1cbn1cbmV4cG9ydCB7IENvbm5lY3QgfTtcbiIsImNsYXNzIEhlbHBlciB7XG4gICAgcmVhZG9ubHkgVE9fVEhVTUJMRVJfUE9TSVRJT046IG51bWJlciA9IDFlNDtcblxuICAgIHJlYWRvbmx5IFRPX0NPTk5FQ1RfVVBEQVRFOiBudW1iZXIgPSAxZTI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIGdldFBvc2l0aW9uX2Zyb21fdmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IHRSYW5nZSk6IG51bWJlciB7XG4gICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAoKHZhbHVlIC0gcmFuZ2VbMF0pIC8gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pKTtcbiAgICAgIHJlc3VsdCA9IE1hdGgucm91bmQocmVzdWx0ICogdGhpcy5UT19USFVNQkxFUl9QT1NJVElPTikgLyB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OO1xuXG4gICAgICBpZiAocmVzdWx0IDwgMCkge1xuICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA+IDEpIHtcbiAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoY3NzX2NsYXNzOiB0Q3NzQ2xhc3Nlcywgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbik6IEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0IHN0cl9jbGFzczogc3RyaW5nID0gYFNSU19fJHtjc3NfY2xhc3N9YDtcbiAgICAgIGNvbnN0IGNzc19jbGFzc193aXRob3V0T3JpZW50YXRpb246IHN0cmluZyA9IGAke3N0cl9jbGFzc30gJHtzdHJfY2xhc3N9X2A7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoY3NzX2NsYXNzX3dpdGhvdXRPcmllbnRhdGlvbiArIG9yaWVudGF0aW9uKSk7XG5cbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydCB7IEhlbHBlciB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJy4vVG9vbHRpcCc7XG5cbmNsYXNzIElucHV0IGV4dGVuZHMgSGVscGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiB0SW5wdXRUeXBlLCBwdWJsaWMgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgcHVibGljIHZhbHVlPzogbnVtYmVyLCBwdWJsaWMgaW5kZXg/OiBudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICh0eXBlID09PSAndmFsdWUnKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IFN0cmluZyh0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbl9rZXlkb3duX29yX21vdXNlb3V0KHRoaXM6IElucHV0LCBjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3ZhbHVlJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25fa2V5ZG93bik7XG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0Jywgb25fbW91c2VvdXQpO1xuXG4gICAgZnVuY3Rpb24gb25fa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ1RhYicgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGJ1YmJsaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uX21vdXNlb3V0KCkge1xuICAgICAgYnViYmxpbmcoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnViYmxpbmcoKSB7XG4gICAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gTnVtYmVyKHRoYXQuZWxlbWVudC52YWx1ZSk7XG4gICAgICBpZiAodGhhdC5pbmRleCkge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbl9zd2l0Y2hfY2hlY2sodGhpczogSW5wdXQsIHRvb2x0aXA6IFRvb2x0aXBbXSkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3Rvb2x0aXAnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvb2x0aXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoYXQuZWxlbWVudC5jaGVja2VkKSB7XG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hfaGlkZGVuKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoX2hpZGRlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IHsgSW5wdXQgfTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcblxuY2xhc3MgVGh1bWJsZXIgZXh0ZW5kcyBIZWxwZXIge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgdGh1bWJsZXJfcG9zaXRpb246IG51bWJlciA9IDA7XG5cbiAgICBsaXN0ZW5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9zaXRpb246IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uLCBwcml2YXRlIGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ3RodW1ibGVyJywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICB0aGlzLnNldF9uZXdfcG9zaXRpb24odGhpcy5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgc2V0X25ld19wb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICB0aGlzLnRodW1ibGVyX3Bvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgIGNvbnN0IGxpdGVyOiBzdHJpbmcgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnWCcgOiAnWSc7XG5cbiAgICAgIGNvbnN0IHN0eWxlOiBzdHJpbmcgPSBgdHJhbnNmb3JtOiB0cmFuc2xhdGUke2xpdGVyfSgke01hdGgucm91bmQocG9zaXRpb24gKiB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OKX0lKTtgO1xuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgZ2V0X3NoaWZ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XG4gICAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xuICAgICAgICA/IGV2ZW50LmNsaWVudFggLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgICAgOiBldmVudC5jbGllbnRZIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgb25fbW91c2VfZG93bl9hbmRfbW92ZSh0aGlzOiBUaHVtYmxlciwgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5saXN0ZW5pbmcgPSB0cnVlO1xuXG4gICAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hpZnQ6IG51bWJlciA9IHRoaXMuZ2V0X3NoaWZ0KHRoYXQuZWxlbWVudCwgZXZlbnQpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uX21vdXNlX21vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uX21vdXNlX21vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICBsZXQgbmV3X3Bvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgICAgbGV0IG5ld19wb3NpdGlvbl9pbl9wZXJjZW50OiBudW1iZXI7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgICAgICBpZiAodGhhdC5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgICAgIG5ld19wb3NpdGlvbl9pbl9wZXJjZW50ID0gbmV3X3Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdfcG9zaXRpb24gPSBldmVudC5jbGllbnRZIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uX2luX3BlcmNlbnQgPSBuZXdfcG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgcG9zaXRpb24gPSBuZXdfcG9zaXRpb25faW5fcGVyY2VudDtcblxuICAgICAgICAgIGlmIChwb3NpdGlvbiA+IDEpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbl9tb3VzZV91cCgpIHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbl9tb3VzZV9tb3ZlKTtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgeyBUaHVtYmxlciB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBUb29sdGlwIGV4dGVuZHMgSGVscGVyIHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIHRvb2x0aXBfdmFsdWU6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbHVlOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbikge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygndG9vbHRpcCcsIHRoaXMub3JpZW50YXRpb24pO1xuICAgICAgdGhpcy5zZXRfaW5uZXJfdGV4dCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXRfaW5uZXJfdGV4dCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICBjb25zdCB2YWw6IG51bWJlciA9IHZhbHVlID4gMFxuICAgICAgICA/IE1hdGguZmxvb3IodmFsdWUpXG4gICAgICAgIDogTWF0aC5jZWlsKHZhbHVlKTtcblxuICAgICAgdGhpcy50b29sdGlwX3ZhbHVlID0gdmFsO1xuICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IFN0cmluZyh2YWwpO1xuICAgIH1cblxuICAgIHN3aXRjaF9oaWRkZW4odGhpczogVG9vbHRpcCwgaXNfdmlzaWJsZTogYm9vbGVhbikge1xuICAgICAgY29uc3QgdGhhdDogVG9vbHRpcCA9IHRoaXM7XG4gICAgICBpZiAoaXNfdmlzaWJsZSkge1xuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgeyBUb29sdGlwIH07XG4iXSwic291cmNlUm9vdCI6IiJ9