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
        input.addEventListener('keydown', onKeydown);
        input.addEventListener('mouseout', onMouseout);
        input.addEventListener('change', on_change);
        function onKeydown(event) {
            if (event.key === "Tab" || event.key === "Enter") {
                action();
            }
        }
        function onMouseout() {
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
        this.view.onChangeView(function (tumblerData) {
            _this.model.setNewPosition(tumblerData);
        });
        this.model.onChangeModel(function (modelData) {
            _this.view.update(modelData);
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
    function Model(config) {
        this.config = config;
        this.value = [0];
        this.range = [0, 0];
        this.step = 0;
        this.position = [0];
        this.activeIndex = 0;
        this.TO_NORMALIZE_POSITION = 1e4;
        this.callbackList = [];
        this.step = this.config.step;
        this.init();
    }
    Model.prototype.setNewPosition = function (tumblerData) {
        var index = tumblerData.index;
        this.activeIndex = index;
        var newValue = this.getNewValue(tumblerData);
        this.checkStepCondition(newValue, index);
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
    Model.prototype.getNewValue = function (tumblerData) {
        var index = tumblerData.index;
        var newValue = this.value[index];
        var position;
        if (tumblerData.position !== undefined) {
            var tmpPosition = Math.round(tumblerData.position * this.TO_NORMALIZE_POSITION);
            position = tmpPosition / this.TO_NORMALIZE_POSITION;
            newValue = this.getValueFromPosition(position, this.range);
        }
        else if (tumblerData.value !== undefined) {
            newValue = tumblerData.value;
            if (index === 0 && this.value[1]) {
                if (newValue > this.value[1] - this.step) {
                    newValue = this.value[1] - this.step;
                }
            }
            if (index === 1) {
                if (newValue < this.value[0] + this.step) {
                    newValue = this.value[0] + this.step;
                }
            }
        }
        return newValue;
    };
    Model.prototype.checkStepCondition = function (newValue, index) {
        var condition = [
            this.value[index] - this.step,
            this.value[index] + this.step,
        ];
        if (newValue >= condition[1] || newValue <= condition[0]) {
            this.setValueAndPosition(newValue, index);
        }
    };
    Model.prototype.update = function () {
        var _this = this;
        this.callbackList.forEach(function (callback) {
            callback({
                position: _this.position,
                value: _this.value,
                index: _this.activeIndex,
            });
        });
    };
    Model.prototype.onChangeModel = function (callback) {
        this.callbackList.push(callback);
    };
    Model.prototype.getPositionFromValue = function (value, range) {
        var result = (value - range[0]) / (range[1] - range[0]);
        return (Math.round(result * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION);
    };
    Model.prototype.getValueFromPosition = function (position, range) {
        var result = (position * (range[1] - range[0])) + range[0];
        return (Math.round(result));
    };
    Model.prototype.setValueAndPosition = function (newValue, i) {
        this.value[i] = newValue > 0
            ? (Math.ceil(newValue / this.step) * this.step)
            : (Math.floor(newValue / this.step) * this.step);
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
        this.position[i] = this.getPositionFromValue(this.value[i], this.range);
    };
    Model.prototype.init = function () {
        for (var i = 0; i < this.config.range.length; i++) {
            if (this.range[i] === undefined) {
                this.range.push(this.config.range[i]);
            }
            else {
                this.range[i] = this.config.range[i];
            }
        }
        for (var i = 0; i < this.config.start.length; i++) {
            if (this.value[i] === undefined) {
                this.value.push(this.config.start[i]);
            }
            else {
                this.value[i] = this.config.start[i];
            }
            if (this.position[i] === undefined) {
                this.position.push(this.getPositionFromValue(this.value[i], this.range));
            }
            else {
                this.position[i] = this.getPositionFromValue(this.value[i], this.range);
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
    function SimpleRangeSlider(container, userConfig) {
        this.container = container;
        this.userConfig = userConfig;
        var sliderContainer = this.container.get(0);
        var defaultConfig = this.getDefaultaConfig();
        var completeConfig = this.getCompleteConfig(this.userConfig, defaultConfig);
        var modelConfig = this.getModelConfig(completeConfig);
        var viewConfig = this.getViewConfig(completeConfig);
        this.view = new View_1.View(sliderContainer, viewConfig);
        this.model = new Model_1.Model(modelConfig);
        this.presenter = new Presenter_1.Presenter(this.view, this.model);
    }
    SimpleRangeSlider.prototype.getDefaultaConfig = function () {
        return {
            orientation: 'horizontal',
            start: [10],
            range: [0, 100],
            step: 1,
            connect: true,
            tooltip: true,
        };
    };
    SimpleRangeSlider.prototype.getCompleteConfig = function (userConfig, defaultConfig) {
        return {
            orientation: userConfig.orientation === undefined
                ? defaultConfig.orientation
                : userConfig.orientation,
            start: userConfig.start === undefined
                ? defaultConfig.start
                : userConfig.start,
            range: userConfig.range === undefined
                ? defaultConfig.range
                : userConfig.range,
            step: userConfig.step === undefined
                ? defaultConfig.step
                : userConfig.step,
            connect: userConfig.connect === undefined
                ? defaultConfig.connect
                : userConfig.connect,
            tooltip: userConfig.tooltip === undefined
                ? defaultConfig.tooltip
                : userConfig.tooltip,
            input: userConfig.input,
        };
    };
    SimpleRangeSlider.prototype.getModelConfig = function (completeConfig) {
        return {
            start: completeConfig.start,
            range: completeConfig.range,
            step: completeConfig.step,
        };
    };
    SimpleRangeSlider.prototype.getViewConfig = function (completeConfig) {
        return {
            orientation: completeConfig.orientation,
            start: completeConfig.start,
            range: completeConfig.range,
            isTooltip: completeConfig.tooltip,
            isConnect: completeConfig.connect,
            input: completeConfig.input,
        };
    };
    return SimpleRangeSlider;
}());
exports.SimpleRangeSlider = SimpleRangeSlider;
(function ($) {
    $.fn.extend({
        SimpleRangeSlider: function (userConfig) {
            return new SimpleRangeSlider(this, userConfig);
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
var Tumbler_1 = __webpack_require__(/*! ./entities/Tumbler */ "./src/Plugin/View/entities/Tumbler.ts");
var Connect_1 = __webpack_require__(/*! ./entities/Connect */ "./src/Plugin/View/entities/Connect.ts");
var Tooltip_1 = __webpack_require__(/*! ./entities/Tooltip */ "./src/Plugin/View/entities/Tooltip.ts");
var Input_1 = __webpack_require__(/*! ./entities/Input */ "./src/Plugin/View/entities/Input.ts");
var View = (function (_super) {
    __extends(View, _super);
    function View(container, config) {
        var _this = _super.call(this) || this;
        _this.container = container;
        _this.config = config;
        _this.position = [0];
        _this.range = [0, 0];
        _this.start = [0];
        _this.tumbler = [];
        _this.connect = [];
        _this.tooltip = [];
        _this.inputValue = [];
        _this.isTooltip = _this.config.isTooltip;
        _this.isConnect = _this.config.isConnect;
        _this.orientation = _this.config.orientation;
        _this.slider = _this.getDivElementWithClass('slider', _this.orientation);
        _this.init();
        return _this;
    }
    View.prototype.onChangeView = function (callback) {
        for (var i = 0; i < this.tumbler.length; i++) {
            this.tumbler[i].onMousedownAndMove(this.container, callback);
        }
        if (this.inputValue[0] !== undefined) {
            for (var i = 0; i < this.inputValue.length; i++) {
                this.inputValue[i].onKeydownOrMouseout(callback);
            }
        }
        if (this.inputTooltip && this.isTooltip) {
            this.inputTooltip.onSwitchCheck(this.tooltip);
        }
    };
    View.prototype.update = function (modelData) {
        var i = modelData.index;
        var position = modelData.position;
        var value = modelData.value;
        this.setActivetumbler(position, i);
        this.tumbler[i].setNewPosition(position[i]);
        if (this.isTooltip) {
            this.tooltip[i].setInnerText(value[i]);
        }
        if (this.inputValue[0] !== undefined) {
            this.inputValue[i].element.value = String(value[i]);
        }
        if (this.isConnect) {
            if (this.position.length === 1) {
                this.connect[0].setPosition(0, position[0]);
            }
            else if (position[1]) {
                this.connect[0].setPosition(position[0], position[1]);
            }
        }
    };
    View.prototype.setActivetumbler = function (position, index) {
        if (position.length > 1) {
            if (index === 0) {
                this.tumbler[0].element.classList.add('SRS__tumbler_active');
                this.tumbler[1].element.classList.remove('SRS__tumbler_active');
                if (this.isTooltip) {
                    this.tooltip[0].element.classList.add('SRS__tooltip_active');
                    this.tooltip[1].element.classList.remove('SRS__tooltip_active');
                }
            }
            else {
                this.tumbler[1].element.classList.add('SRS__tumbler_active');
                this.tumbler[0].element.classList.remove('SRS__tumbler_active');
                if (this.isTooltip) {
                    this.tooltip[1].element.classList.add('SRS__tooltip_active');
                    this.tooltip[0].element.classList.remove('SRS__tooltip_active');
                }
            }
        }
    };
    View.prototype.init = function () {
        for (var i = 0; i < this.config.range.length; i++) {
            if (this.range[i] === undefined) {
                this.range.push(this.config.range[i]);
            }
            else {
                this.range[i] = this.config.range[i];
            }
        }
        for (var i = 0; i < this.config.start.length; i++) {
            if (this.start[i] === undefined) {
                this.start.push(this.config.start[i]);
            }
            else {
                this.start[i] = this.config.start[i];
            }
            if (this.position[i] === undefined) {
                this.position.push(this.getPositionFromValue(this.start[i], this.range));
            }
            else {
                this.position[i] = this.getPositionFromValue(this.start[i], this.range);
            }
        }
        for (var i = 0; i < this.position.length; i++) {
            this.tumbler.push(new Tumbler_1.default(this.position[i], this.orientation, i));
        }
        if (this.isConnect) {
            if (this.position.length === 1) {
                this.connect.push(new Connect_1.default(0, this.position[0], this.orientation));
            }
            else {
                this.connect.push(new Connect_1.default(this.position[0], this.position[1], this.orientation));
            }
            this.slider.append(this.connect[0].element);
        }
        if (this.isTooltip) {
            for (var i = 0; i < this.tumbler.length; i++) {
                this.tooltip.push(new Tooltip_1.default(this.start[i], this.orientation));
                this.tumbler[i].element.append(this.tooltip[i].element);
            }
        }
        for (var i = 0; i < this.tumbler.length; i++) {
            this.slider.append(this.tumbler[i].element);
        }
        this.container.append(this.slider);
        if (this.config.input !== undefined && this.config.input.value !== undefined) {
            for (var i = 0; i < this.config.input.value.length; i++) {
                this.inputValue.push(new Input_1.default('value', this.config.input.value[i], this.config.start[i], i));
            }
        }
        if (this.config.input && this.config.input.tooltip) {
            this.inputTooltip = new Input_1.default('tooltip', this.config.input.tooltip[0]);
        }
    };
    return View;
}(Helper_1.default));
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
    function Connect(startPosition, endPosition, orientation) {
        var _this = _super.call(this) || this;
        _this.position = [0, 0];
        _this.style = '';
        _this.startPosition = startPosition;
        _this.endPosition = endPosition;
        _this.orientation = orientation;
        _this.element = _this.getDivElementWithClass('connect', _this.orientation);
        _this.setPosition(_this.startPosition, _this.endPosition);
        return _this;
    }
    Connect.prototype.setPosition = function (startPosition, endPosition) {
        var start = Math.round(startPosition * this.TO_CONNECT_UPDATE);
        var end = Math.round(endPosition * this.TO_CONNECT_UPDATE);
        this.position = [start, end];
        if (start === 0) {
            if (this.orientation === 'horizontal') {
                this.style = "width: " + end + "%;";
            }
            else {
                this.style = "height: " + end + "%;";
            }
        }
        else if (this.orientation === 'horizontal') {
            this.style = "left: " + start + "%; width: " + (end - start) + "%;";
        }
        else {
            this.style = "top: " + start + "%; height: " + (end - start) + "%;";
        }
        this.element.setAttribute('style', this.style);
    };
    return Connect;
}(Helper_1.default));
exports.default = Connect;


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
        this.TO_TUMBLER_POSITION = 1e4;
        this.TO_CONNECT_UPDATE = 1e2;
    }
    Helper.prototype.getPositionFromValue = function (value, range) {
        var result = ((value - range[0]) / (range[1] - range[0]));
        result = Math.round(result * this.TO_TUMBLER_POSITION) / this.TO_TUMBLER_POSITION;
        if (result < 0) {
            result = 0;
        }
        if (result > 1) {
            result = 1;
        }
        return result;
    };
    Helper.prototype.getDivElementWithClass = function (cssClass, orientation) {
        var strClass = "SRS__" + cssClass;
        var cssClassWithoutOrientation = strClass + " " + strClass + "_";
        var element = document.createElement('div');
        element.setAttribute('class', (cssClassWithoutOrientation + orientation));
        return element;
    };
    return Helper;
}());
exports.default = Helper;


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
        _this.value = 0;
        _this.index = 0;
        _this.type = type;
        _this.element = element;
        if (value) {
            _this.value = value;
        }
        if (index) {
            _this.index = index;
        }
        if (type === 'value') {
            if (_this.value !== undefined) {
                _this.element.value = String(_this.value);
            }
        }
        return _this;
    }
    Input.prototype.onKeydownOrMouseout = function (callback) {
        var that = this;
        if (that.type !== 'value') {
            return false;
        }
        that.element.addEventListener('keydown', onKeydown);
        that.element.addEventListener('mouseout', onMouseout);
        function onKeydown(event) {
            if (event.key === 'Tab' || event.key === 'Enter') {
                action();
            }
        }
        function onMouseout() {
            action();
        }
        function action() {
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
    Input.prototype.onSwitchCheck = function (tooltip) {
        var that = this;
        if (that.type !== 'tooltip') {
            return false;
        }
        that.element.addEventListener('change', function () {
            for (var i = 0; i < tooltip.length; i++) {
                if (that.element.checked) {
                    tooltip[i].switchHidden(true);
                }
                else {
                    tooltip[i].switchHidden(false);
                }
            }
        });
    };
    return Input;
}(Helper_1.default));
exports.default = Input;


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
        _this.element = _this.getDivElementWithClass('tooltip', _this.orientation);
        _this.setInnerText(_this.value);
        return _this;
    }
    Tooltip.prototype.setInnerText = function (value) {
        var val = value > 0
            ? Math.floor(value)
            : Math.ceil(value);
        this.value = val;
        this.element.innerText = String(val);
    };
    Tooltip.prototype.switchHidden = function (isVisible) {
        var that = this;
        if (isVisible) {
            that.element.hidden = false;
        }
        else {
            that.element.hidden = true;
        }
    };
    return Tooltip;
}(Helper_1.default));
exports.default = Tooltip;


/***/ }),

/***/ "./src/Plugin/View/entities/Tumbler.ts":
/*!*********************************************!*\
  !*** ./src/Plugin/View/entities/Tumbler.ts ***!
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
var Tumbler = (function (_super) {
    __extends(Tumbler, _super);
    function Tumbler(position, orientation, index) {
        var _this = _super.call(this) || this;
        _this.position = position;
        _this.orientation = orientation;
        _this.index = index;
        _this.listening = false;
        _this.element = _this.getDivElementWithClass('tumbler', _this.orientation);
        _this.setNewPosition(_this.position);
        return _this;
    }
    Tumbler.prototype.setNewPosition = function (position) {
        this.position = position;
        var liter = this.orientation === 'horizontal' ? 'X' : 'Y';
        var style = "transform: translate" + liter + "(" + Math.round(position * this.TO_TUMBLER_POSITION) + "%);";
        this.element.setAttribute('style', style);
    };
    Tumbler.prototype.getShift = function (element, event) {
        var result = this.orientation === 'horizontal'
            ? event.clientX - element.getBoundingClientRect().left
            : event.clientY - element.getBoundingClientRect().top;
        return result;
    };
    Tumbler.prototype.onMousedownAndMove = function (container, callback) {
        var _this = this;
        var that = this;
        that.listening = true;
        that.element.addEventListener('mousedown', function (event) {
            event.preventDefault();
            var shift = _this.getShift(that.element, event);
            document.addEventListener('mousemove', onMousemove);
            document.addEventListener('mouseup', onMouseup);
            function onMousemove(event) {
                var newPosition;
                var newPositionPercent;
                var position;
                if (that.orientation === 'horizontal') {
                    newPosition = event.clientX - shift - container.getBoundingClientRect().left;
                    newPositionPercent = newPosition / container.offsetWidth;
                }
                else {
                    newPosition = event.clientY - shift - container.getBoundingClientRect().top;
                    newPositionPercent = newPosition / container.offsetHeight;
                }
                position = newPositionPercent;
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
            function onMouseup() {
                document.removeEventListener('mousemove', onMousemove);
                document.removeEventListener('mouseup', onMouseup);
            }
        });
    };
    return Tumbler;
}(Helper_1.default));
exports.default = Tumbler;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9EZW1vX1BhbmVsL3RlbXBsYXRlLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Db250cm9sbGVyL1ByZXNlbnRlci50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1BsdWdpbi50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9WaWV3LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSGVscGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0lucHV0LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1Rvb2x0aXAudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVHVtYmxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFD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QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQ0E1RXFCLGdCQUFNLEdBNEUzQjtBQUNELGtCQUFlLE9BQU8sQ0FBQyIsImZpbGUiOiJkZW1vUGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50c1wiKTtcbiIsImltcG9ydCB7IFNpbXBsZVJhbmdlU2xpZGVyIH0gZnJvbSAnLi4vUGx1Z2luL1BsdWdpbic7XHJcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZSc7XHJcblxyXG5jbGFzcyBEZW1vX1BhbmVsIHtcclxuXHJcbiAgdGVtcGxhdGU6IFRlbXBsYXRlO1xyXG4gIHJhbmdlX3NsaWRlcjogIFNpbXBsZVJhbmdlU2xpZGVyO1xyXG4gIGVtcHR5X3NsaWRlcjogc3RyaW5nO1xyXG5cclxuICBkZWZhdWx0Q29uZmlnOiBJX0RFTU9fZGVmYXVsdENvbmZpZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZW1vX3BhbmVsOiBKUXVlcnksIHByaXZhdGUgc2xpZGVyOiBKUXVlcnksIHByaXZhdGUgaW5wdXRzOiBJX0RFTU9fSW5wdXQpIHtcclxuICAgIHRoaXMudGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcclxuICAgIHRoaXMuZGVtb19wYW5lbC5hcHBlbmQodGhpcy50ZW1wbGF0ZS5kZW1vX3BhbmVsKTtcclxuXHJcbiAgICB0aGlzLmVtcHR5X3NsaWRlciA9ICcjJyArIHNsaWRlci5nZXQoMCkuaWQ7XHJcblxyXG4gICAgdGhpcy5kZWZhdWx0Q29uZmlnID0ge1xyXG4gICAgICByYW5nZTogWzAsIDEwMF0sXHJcbiAgICAgIHN0YXJ0OiBbMTBdLFxyXG4gICAgICBzdGVwOiAxXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yYW5nZV9zbGlkZXIgPSBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIodGhpcy5zbGlkZXIsIHtcclxuICAgICAgcmFuZ2U6IFstMTAwLCAxMDBdLFxyXG4gICAgICBzdGFydDogWy01MCwgNTBdLFxyXG4gICAgICBzdGVwOiAxMCxcclxuICAgICAgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiB0cnVlLFxyXG4gICAgICBpbnB1dDogdGhpcy5pbnB1dHNcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB0ZW1wbGF0ZV9pbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXSA9IFtcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9taW4sXHJcbiAgICAgIHRoaXMudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWF4LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWF4LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnN0ZXBfaW5wdXQsXHJcbiAgICAgIHRoaXMudGVtcGxhdGUub3JpZW50YXRpb25faW5wdXQsXHJcbiAgICAgIHRoaXMudGVtcGxhdGUuY29ubmVjdENvbmZpZ0lucHV0XHJcbiAgICBdXHJcbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRlbXBsYXRlX2lucHV0cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgdGhpcy5vbl9jaGFuZ2VfaW5wdXQodGVtcGxhdGVfaW5wdXRzW2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uX2NoYW5nZV9pbnB1dCh0aGlzOiBEZW1vX1BhbmVsLCBpbnB1dDogSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBvbk1vdXNlb3V0KTtcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uX2NoYW5nZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgIGlmKGV2ZW50LmtleSA9PT0gXCJUYWJcIiB8fCBldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICAgIGFjdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25Nb3VzZW91dCgpIHtcclxuICAgICAgYWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25fY2hhbmdlKCkge1xyXG4gICAgICBhY3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhY3Rpb24oKSB7XHJcblxyXG4gICAgICBsZXQgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gPSBbXHJcbiAgICAgICAgdGhhdC50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9taW4udmFsdWUgIT09ICcnXHJcbiAgICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnJhbmdlX2lucHV0X21pbi52YWx1ZSlcclxuICAgICAgICAgIDogdGhhdC5kZWZhdWx0Q29uZmlnLnJhbmdlWzBdLFxyXG4gICAgICAgIHRoYXQudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWF4LnZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9tYXgudmFsdWUpXHJcbiAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5yYW5nZVsxXSxcclxuICAgICAgXVxyXG4gICAgICBsZXQgc3RhcnQ6IFRfREVNT19TdGFydCA9IHRoYXQudGVtcGxhdGUuc3RhcnRDb25maWdJbnB1dF9tYXgudmFsdWUgIT09ICcnXHJcbiAgICAgICAgPyBbXHJcbiAgICAgICAgICB0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnZhbHVlKVxyXG4gICAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5zdGFydFswXSxcclxuICAgICAgICAgIE51bWJlcih0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWF4LnZhbHVlKVxyXG4gICAgICAgIF1cclxuICAgICAgICA6IFtcclxuICAgICAgICAgIHRoYXQudGVtcGxhdGUuc3RhcnRDb25maWdJbnB1dF9taW4udmFsdWUgIT09ICcnXHJcbiAgICAgICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUuc3RhcnRDb25maWdJbnB1dF9taW4udmFsdWUpXHJcbiAgICAgICAgICAgIDogdGhhdC5kZWZhdWx0Q29uZmlnLnN0YXJ0WzBdXHJcbiAgICAgICAgXVxyXG4gICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhhdC50ZW1wbGF0ZS5zdGVwX2lucHV0LnZhbHVlICE9PSAnJ1xyXG4gICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUuc3RlcF9pbnB1dC52YWx1ZSlcclxuICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5zdGVwO1xyXG4gICAgICBsZXQgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbiA9IHRoYXQudGVtcGxhdGUub3JpZW50YXRpb25faW5wdXQuY2hlY2tlZFxyXG4gICAgICAgID8gJ2hvcml6b250YWwnXHJcbiAgICAgICAgOiAndmVydGljYWwnO1xyXG4gICAgICBsZXQgY29ubmVjdDogYm9vbGVhbiA9IHRoYXQudGVtcGxhdGUuY29ubmVjdENvbmZpZ0lucHV0LmNoZWNrZWRcclxuICAgICAgICA/IHRydWVcclxuICAgICAgICA6IGZhbHNlO1xyXG5cclxuICAgICAgdGhhdC5zbGlkZXIgPSAkKHRoYXQuZW1wdHlfc2xpZGVyKS5lbXB0eSgpO1xyXG4gICAgICB0aGF0LnJhbmdlX3NsaWRlciA9IG5ldyBTaW1wbGVSYW5nZVNsaWRlcih0aGF0LnNsaWRlciwge1xyXG4gICAgICAgIHJhbmdlOiByYW5nZSxcclxuICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgc3RlcDogc3RlcCxcclxuICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb24sXHJcbiAgICAgICAgY29ubmVjdDogY29ubmVjdCxcclxuICAgICAgICB0b29sdGlwOiB0cnVlLFxyXG4gICAgICAgIGlucHV0OiB0aGF0LmlucHV0c1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtEZW1vX1BhbmVsfTtcclxuXHJcbihmdW5jdGlvbigkOiBKUXVlcnlTdGF0aWMpIHtcclxuICAkLmZuLmV4dGVuZCh7XHJcbiAgICBEZW1vX1BhbmVsOiBmdW5jdGlvbihzbGlkZXI6IEpRdWVyeSwgaW5wdXRzOiBJX0RFTU9fSW5wdXQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEZW1vX1BhbmVsKDxKUXVlcnk+IHRoaXMsIDxKUXVlcnk+IHNsaWRlciwgPElfREVNT19JbnB1dD4gaW5wdXRzKTtcclxuICAgIH1cclxuICB9KTtcclxufSAoalF1ZXJ5KSApOyIsImNsYXNzIFRlbXBsYXRlIHtcclxuICByYW5nZV9pbnB1dF9taW46IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcmFuZ2VfaW5wdXRfbWF4OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBzdGFydENvbmZpZ0lucHV0X21pbjogSFRNTElucHV0RWxlbWVudDtcclxuICBzdGFydENvbmZpZ0lucHV0X21heDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgc3RlcF9pbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgb3JpZW50YXRpb25faW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIGNvbm5lY3RDb25maWdJbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgZGVtb19wYW5lbDogSFRNTEVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyByYW5nZSBsaW5lXHJcbiAgICBsZXQgcmFuZ2VfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIHJhbmdlX3RleHQuaW5uZXJUZXh0ID0gJ1JhbmdlOiAnO1xyXG4gICAgdGhpcy5yYW5nZV9pbnB1dF9taW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnJhbmdlX2lucHV0X21pbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICB0aGlzLnJhbmdlX2lucHV0X21pbi52YWx1ZSA9ICctMTAwJztcclxuICAgIHRoaXMucmFuZ2VfaW5wdXRfbWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9tYXguc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9tYXgudmFsdWUgPSAnMTAwJztcclxuICAgIGxldCByYW5nZV9saW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHJhbmdlX2xpbmUuYXBwZW5kKHJhbmdlX3RleHQsIHRoaXMucmFuZ2VfaW5wdXRfbWluLCB0aGlzLnJhbmdlX2lucHV0X21heCk7XHJcbiAgICAvLyBzdGFydCBsaW5lXHJcbiAgICBsZXQgc3RhcnRfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIHN0YXJ0X3RleHQuaW5uZXJUZXh0ID0gJ1N0YXJ0OiAnO1xyXG4gICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9taW4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21pbi52YWx1ZSA9ICctNTAnO1xyXG4gICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9tYXguc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21heC52YWx1ZSA9ICc1MCc7XHJcbiAgICBsZXQgc3RhcnRfbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBzdGFydF9saW5lLmFwcGVuZChzdGFydF90ZXh0LCB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWluLCB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWF4KTtcclxuICAgIC8vIHN0ZXAgbGluZVxyXG4gICAgbGV0IHN0ZXBfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIHN0ZXBfdGV4dC5pbm5lclRleHQgPSAnU3RlcDogJztcclxuICAgIHRoaXMuc3RlcF9pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc3RlcF9pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICB0aGlzLnN0ZXBfaW5wdXQudmFsdWUgPSAnMTAnO1xyXG4gICAgbGV0IHN0ZXBfbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBzdGVwX2xpbmUuYXBwZW5kKHN0ZXBfdGV4dCwgdGhpcy5zdGVwX2lucHV0KTtcclxuICAgIC8vIG9yaWVudGF0aW9uIGxpbmVcclxuICAgIGxldCBvcmllbnRhdGlvbl90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgb3JpZW50YXRpb25fdGV4dC5pbm5lclRleHQgPSAnT3JpZW50YXRpb24gaG9yaXpvbnRhbC92ZXJ0aWNhbDogJztcclxuICAgIHRoaXMub3JpZW50YXRpb25faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLm9yaWVudGF0aW9uX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xyXG4gICAgICB0aGlzLm9yaWVudGF0aW9uX2lucHV0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgbGV0IG9yaWVudGF0aW9uX2xpbmU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIG9yaWVudGF0aW9uX2xpbmUuYXBwZW5kKG9yaWVudGF0aW9uX3RleHQsIHRoaXMub3JpZW50YXRpb25faW5wdXQpO1xyXG4gICAgLy8gY29ubmVjdCBsaW5lXHJcbiAgICBsZXQgY29ubmVjdF90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgY29ubmVjdF90ZXh0LmlubmVyVGV4dCA9ICdDb25uZWN0IG9uL29mZjogJztcclxuICAgIHRoaXMuY29ubmVjdENvbmZpZ0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5jb25uZWN0Q29uZmlnSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcbiAgICAgIHRoaXMuY29ubmVjdENvbmZpZ0lucHV0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgbGV0IGNvbm5lY3RfbGluZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY29ubmVjdF9saW5lLmFwcGVuZChjb25uZWN0X3RleHQsIHRoaXMuY29ubmVjdENvbmZpZ0lucHV0KTtcclxuXHJcbiAgICB0aGlzLmRlbW9fcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGhpcy5kZW1vX3BhbmVsLmFwcGVuZChyYW5nZV9saW5lLCBzdGFydF9saW5lLCBzdGVwX2xpbmUsIG9yaWVudGF0aW9uX2xpbmUsIGNvbm5lY3RfbGluZSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCB7VGVtcGxhdGV9IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4uL1ZpZXcvVmlldyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL01vZGVsL01vZGVsJztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3OiBWaWV3LCBwcml2YXRlIG1vZGVsOiBNb2RlbCkge1xuICAgIHRoaXMudmlldy5vbkNoYW5nZVZpZXcoKHR1bWJsZXJEYXRhOiB0VHVtYmxlckRhdGEpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHR1bWJsZXJEYXRhKTtcbiAgICAgIHRoaXMubW9kZWwuc2V0TmV3UG9zaXRpb24odHVtYmxlckRhdGEpO1xuICAgIH0pO1xuICAgIHRoaXMubW9kZWwub25DaGFuZ2VNb2RlbCgobW9kZWxEYXRhOiB0TW9kZWxEYXRhKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbERhdGEpO1xuICAgICAgdGhpcy52aWV3LnVwZGF0ZShtb2RlbERhdGEpO1xuICAgIH0pO1xuICB9XG59XG5leHBvcnQgeyBQcmVzZW50ZXIgfTtcbiIsImNsYXNzIE1vZGVsIHtcclxuICAgIHZhbHVlOiB0VmFsdWUgPSBbMF07XHJcblxyXG4gICAgcmFuZ2U6IHRSYW5nZSA9IFswLCAwXTtcclxuXHJcbiAgICBzdGVwOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHBvc2l0aW9uOiB0UG9zaXRpb24gPSBbMF07XHJcblxyXG4gICAgYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY2FsbGJhY2tMaXN0OiBpTW9kZWxDYWxsYmFja1tdO1xyXG5cclxuICAgIHJlYWRvbmx5IFRPX05PUk1BTElaRV9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBpQ29uZmlnTW9kZWwpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja0xpc3QgPSBbXTtcclxuXHJcbiAgICAgIHRoaXMuc3RlcCA9IHRoaXMuY29uZmlnLnN0ZXA7XHJcblxyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXROZXdQb3NpdGlvbih0dW1ibGVyRGF0YTogdFR1bWJsZXJEYXRhKSB7XHJcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHR1bWJsZXJEYXRhO1xyXG4gICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICBjb25zdCBuZXdWYWx1ZTogbnVtYmVyID0gdGhpcy5nZXROZXdWYWx1ZSh0dW1ibGVyRGF0YSk7XHJcblxyXG4gICAgICB0aGlzLmNoZWNrU3RlcENvbmRpdGlvbihuZXdWYWx1ZSwgaW5kZXgpO1xyXG4gICAgICAvLyBjaGVjayBmb3IgY29sbGlzaW9uXHJcbiAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA+IDEgJiYgdGhpcy52YWx1ZVsxXSkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlWzBdIDwgdGhpcy52YWx1ZVsxXSkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmV3VmFsdWUodHVtYmxlckRhdGE6IHRUdW1ibGVyRGF0YSk6IG51bWJlciB7XHJcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHR1bWJsZXJEYXRhO1xyXG4gICAgICBsZXQgbmV3VmFsdWU6IG51bWJlciA9IHRoaXMudmFsdWVbaW5kZXhdO1xyXG4gICAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcclxuXHJcbiAgICAgIGlmICh0dW1ibGVyRGF0YS5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgdG1wUG9zaXRpb246IG51bWJlciA9IE1hdGgucm91bmQodHVtYmxlckRhdGEucG9zaXRpb24gKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTik7XHJcbiAgICAgICAgcG9zaXRpb24gPSB0bXBQb3NpdGlvbiAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OO1xyXG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5nZXRWYWx1ZUZyb21Qb3NpdGlvbihwb3NpdGlvbiwgdGhpcy5yYW5nZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHVtYmxlckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ld1ZhbHVlID0gdHVtYmxlckRhdGEudmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiB0aGlzLnZhbHVlWzFdKSB7XHJcbiAgICAgICAgICBpZiAobmV3VmFsdWUgPiB0aGlzLnZhbHVlWzFdIC0gdGhpcy5zdGVwKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICBpZiAobmV3VmFsdWUgPCB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZVswXSArIHRoaXMuc3RlcDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrU3RlcENvbmRpdGlvbihuZXdWYWx1ZTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFtcclxuICAgICAgICB0aGlzLnZhbHVlW2luZGV4XSAtIHRoaXMuc3RlcCxcclxuICAgICAgICB0aGlzLnZhbHVlW2luZGV4XSArIHRoaXMuc3RlcCxcclxuICAgICAgXTtcclxuXHJcbiAgICAgIGlmIChuZXdWYWx1ZSA+PSBjb25kaXRpb25bMV0gfHwgbmV3VmFsdWUgPD0gY29uZGl0aW9uWzBdKSB7XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZUFuZFBvc2l0aW9uKG5ld1ZhbHVlLCBpbmRleCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tMaXN0LmZvckVhY2goKGNhbGxiYWNrOiBpTW9kZWxDYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgICAgICBpbmRleDogdGhpcy5hY3RpdmVJbmRleCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DaGFuZ2VNb2RlbChjYWxsYmFjazogaU1vZGVsQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5jYWxsYmFja0xpc3QucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UG9zaXRpb25Gcm9tVmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IHRSYW5nZSk6IG51bWJlciB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gKHZhbHVlIC0gcmFuZ2VbMF0pIC8gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pO1xyXG5cclxuICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKSAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZUZyb21Qb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcclxuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSAocG9zaXRpb24gKiAocmFuZ2VbMV0gLSByYW5nZVswXSkpICsgcmFuZ2VbMF07XHJcblxyXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWVBbmRQb3NpdGlvbihuZXdWYWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcclxuICAgICAgdGhpcy52YWx1ZVtpXSA9IG5ld1ZhbHVlID4gMFxyXG4gICAgICAgID8gKE1hdGguY2VpbChuZXdWYWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApXHJcbiAgICAgICAgOiAoTWF0aC5mbG9vcihuZXdWYWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApO1xyXG5cclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMucmFuZ2VbMF0pIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVbMF0gPSB0aGlzLnJhbmdlWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGkgPT09IDEgJiYgdGhpcy52YWx1ZVsxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0gPiB0aGlzLnJhbmdlWzFdKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5yYW5nZVsxXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcucmFuZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnJhbmdlLnB1c2godGhpcy5jb25maWcucmFuZ2VbaV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnJhbmdlW2ldID0gdGhpcy5jb25maWcucmFuZ2VbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnN0YXJ0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKHRoaXMuY29uZmlnLnN0YXJ0W2ldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMuY29uZmlnLnN0YXJ0W2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTW9kZWwgfTtcclxuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vVmlldy9WaWV3JztcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuL01vZGVsL01vZGVsJztcclxuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XHJcblxyXG5jbGFzcyBTaW1wbGVSYW5nZVNsaWRlciB7XHJcbiAgICB2aWV3OiBWaWV3O1xyXG5cclxuICAgIG1vZGVsOiBNb2RlbDtcclxuXHJcbiAgICBwcmVzZW50ZXI6IFByZXNlbnRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSlF1ZXJ5LCBwcml2YXRlIHVzZXJDb25maWc6IGlDb25maWdVc2VyKSB7XHJcbiAgICAgIGNvbnN0IHNsaWRlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lci5nZXQoMCk7XHJcblxyXG4gICAgICBjb25zdCBkZWZhdWx0Q29uZmlnOiBpQ29uZmlnVXNlciA9IHRoaXMuZ2V0RGVmYXVsdGFDb25maWcoKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbXBsZXRlQ29uZmlnOiBpQ29uZmlnVXNlciA9IHRoaXMuZ2V0Q29tcGxldGVDb25maWcodGhpcy51c2VyQ29uZmlnLCBkZWZhdWx0Q29uZmlnKTtcclxuXHJcbiAgICAgIGNvbnN0IG1vZGVsQ29uZmlnOiBpQ29uZmlnTW9kZWwgPSB0aGlzLmdldE1vZGVsQ29uZmlnKGNvbXBsZXRlQ29uZmlnKTtcclxuXHJcbiAgICAgIGNvbnN0IHZpZXdDb25maWc6IGlDb25maWdWaWV3ID0gdGhpcy5nZXRWaWV3Q29uZmlnKGNvbXBsZXRlQ29uZmlnKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KHNsaWRlckNvbnRhaW5lciwgdmlld0NvbmZpZyk7XHJcbiAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwobW9kZWxDb25maWcpO1xyXG4gICAgICB0aGlzLnByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIodGhpcy52aWV3LCB0aGlzLm1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZWZhdWx0YUNvbmZpZygpOiBpQ29uZmlnVXNlciB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcclxuICAgICAgICBzdGFydDogWzEwXSxcclxuICAgICAgICByYW5nZTogWzAsIDEwMF0sXHJcbiAgICAgICAgc3RlcDogMSxcclxuICAgICAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgICAgIHRvb2x0aXA6IHRydWUsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdldENvbXBsZXRlQ29uZmlnKHVzZXJDb25maWc6IGlDb25maWdVc2VyLCBkZWZhdWx0Q29uZmlnOiBpQ29uZmlnVXNlcik6IGlDb25maWdVc2VyIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBvcmllbnRhdGlvbjogdXNlckNvbmZpZy5vcmllbnRhdGlvbiA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcub3JpZW50YXRpb25cclxuICAgICAgICAgIDogdXNlckNvbmZpZy5vcmllbnRhdGlvbixcclxuICAgICAgICBzdGFydDogdXNlckNvbmZpZy5zdGFydCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcuc3RhcnRcclxuICAgICAgICAgIDogdXNlckNvbmZpZy5zdGFydCxcclxuICAgICAgICByYW5nZTogdXNlckNvbmZpZy5yYW5nZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcucmFuZ2VcclxuICAgICAgICAgIDogdXNlckNvbmZpZy5yYW5nZSxcclxuICAgICAgICBzdGVwOiB1c2VyQ29uZmlnLnN0ZXAgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLnN0ZXBcclxuICAgICAgICAgIDogdXNlckNvbmZpZy5zdGVwLFxyXG4gICAgICAgIGNvbm5lY3Q6IHVzZXJDb25maWcuY29ubmVjdCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcuY29ubmVjdFxyXG4gICAgICAgICAgOiB1c2VyQ29uZmlnLmNvbm5lY3QsXHJcbiAgICAgICAgdG9vbHRpcDogdXNlckNvbmZpZy50b29sdGlwID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy50b29sdGlwXHJcbiAgICAgICAgICA6IHVzZXJDb25maWcudG9vbHRpcCxcclxuICAgICAgICBpbnB1dDogdXNlckNvbmZpZy5pbnB1dCxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0TW9kZWxDb25maWcoY29tcGxldGVDb25maWc6IGlDb25maWdVc2VyKTogaUNvbmZpZ01vZGVsIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydDogY29tcGxldGVDb25maWcuc3RhcnQsXHJcbiAgICAgICAgcmFuZ2U6IGNvbXBsZXRlQ29uZmlnLnJhbmdlLFxyXG4gICAgICAgIHN0ZXA6IGNvbXBsZXRlQ29uZmlnLnN0ZXAsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFZpZXdDb25maWcoY29tcGxldGVDb25maWc6IGlDb25maWdVc2VyKTogaUNvbmZpZ1ZpZXcge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiBjb21wbGV0ZUNvbmZpZy5vcmllbnRhdGlvbixcclxuICAgICAgICBzdGFydDogY29tcGxldGVDb25maWcuc3RhcnQsXHJcbiAgICAgICAgcmFuZ2U6IGNvbXBsZXRlQ29uZmlnLnJhbmdlLFxyXG4gICAgICAgIGlzVG9vbHRpcDogY29tcGxldGVDb25maWcudG9vbHRpcCxcclxuICAgICAgICBpc0Nvbm5lY3Q6IGNvbXBsZXRlQ29uZmlnLmNvbm5lY3QsXHJcbiAgICAgICAgaW5wdXQ6IGNvbXBsZXRlQ29uZmlnLmlucHV0LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgU2ltcGxlUmFuZ2VTbGlkZXIgfTtcclxuXHJcbihmdW5jdGlvbiAoJDogSlF1ZXJ5U3RhdGljKSB7XHJcbiAgJC5mbi5leHRlbmQoe1xyXG4gICAgU2ltcGxlUmFuZ2VTbGlkZXIodXNlckNvbmZpZzogaUNvbmZpZ1VzZXIpIHtcclxuICAgICAgcmV0dXJuIG5ldyBTaW1wbGVSYW5nZVNsaWRlcig8SlF1ZXJ5PiB0aGlzLCA8aUNvbmZpZ1VzZXI+IHVzZXJDb25maWcpO1xyXG4gICAgfSxcclxuICB9KTtcclxufShqUXVlcnkpKTtcclxuIiwiaW1wb3J0IEhlbHBlciBmcm9tICcuL2VudGl0aWVzL0hlbHBlcic7XHJcbmltcG9ydCBUdW1ibGVyIGZyb20gJy4vZW50aXRpZXMvVHVtYmxlcic7XHJcbmltcG9ydCBDb25uZWN0IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XHJcbmltcG9ydCBUb29sdGlwIGZyb20gJy4vZW50aXRpZXMvVG9vbHRpcCc7XHJcbmltcG9ydCBJbnB1dCBmcm9tICcuL2VudGl0aWVzL0lucHV0JztcclxuXHJcbmNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xyXG4gIHBvc2l0aW9uOiB0UG9zaXRpb24gPSBbMF07XHJcblxyXG4gIHJhbmdlOiB0UmFuZ2UgPSBbMCwgMF07XHJcblxyXG4gIHN0YXJ0OiB0VmFsdWUgPSBbMF07XHJcblxyXG4gIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb247XHJcblxyXG4gIGlzVG9vbHRpcDogYm9vbGVhbjtcclxuXHJcbiAgaXNDb25uZWN0OiBib29sZWFuO1xyXG5cclxuICBzbGlkZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuICB0dW1ibGVyOiBUdW1ibGVyW10gPSBbXTtcclxuXHJcbiAgY29ubmVjdDogQ29ubmVjdFtdID0gW107XHJcblxyXG4gIHRvb2x0aXA6IFRvb2x0aXBbXSA9IFtdO1xyXG5cclxuICBpbnB1dFZhbHVlOiBJbnB1dFtdID0gW107XHJcblxyXG4gIGlucHV0VG9vbHRpcD86IElucHV0O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHByaXZhdGUgY29uZmlnOiBpQ29uZmlnVmlldykge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmlzVG9vbHRpcCA9IHRoaXMuY29uZmlnLmlzVG9vbHRpcDtcclxuICAgIHRoaXMuaXNDb25uZWN0ID0gdGhpcy5jb25maWcuaXNDb25uZWN0O1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuY29uZmlnLm9yaWVudGF0aW9uO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCdzbGlkZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlVmlldyhjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy50dW1ibGVyW2ldLm9uTW91c2Vkb3duQW5kTW92ZSh0aGlzLmNvbnRhaW5lciwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbnB1dFZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlW2ldLm9uS2V5ZG93bk9yTW91c2VvdXQoY2FsbGJhY2spO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pbnB1dFRvb2x0aXAgJiYgdGhpcy5pc1Rvb2x0aXApIHtcclxuICAgICAgdGhpcy5pbnB1dFRvb2x0aXAub25Td2l0Y2hDaGVjayh0aGlzLnRvb2x0aXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKG1vZGVsRGF0YTogdE1vZGVsRGF0YSkge1xyXG4gICAgY29uc3QgaTogbnVtYmVyID0gbW9kZWxEYXRhLmluZGV4O1xyXG4gICAgY29uc3QgeyBwb3NpdGlvbiB9ID0gbW9kZWxEYXRhO1xyXG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gbW9kZWxEYXRhO1xyXG5cclxuICAgIHRoaXMuc2V0QWN0aXZldHVtYmxlcihwb3NpdGlvbiwgaSk7XHJcblxyXG4gICAgdGhpcy50dW1ibGVyW2ldLnNldE5ld1Bvc2l0aW9uKHBvc2l0aW9uW2ldKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcclxuICAgICAgdGhpcy50b29sdGlwW2ldLnNldElubmVyVGV4dCh2YWx1ZVtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZVtpXS5lbGVtZW50LnZhbHVlID0gU3RyaW5nKHZhbHVlW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0Nvbm5lY3QpIHtcclxuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0WzBdLnNldFBvc2l0aW9uKDAsIHBvc2l0aW9uWzBdKTtcclxuICAgICAgfSBlbHNlIGlmIChwb3NpdGlvblsxXSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRQb3NpdGlvbihwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRBY3RpdmV0dW1ibGVyKHBvc2l0aW9uOiB0UG9zaXRpb24sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChwb3NpdGlvbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMudHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLnR1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudHVtYmxlclsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLnR1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5yYW5nZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZS5wdXNoKHRoaXMuY29uZmlnLnJhbmdlW2ldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJhbmdlW2ldID0gdGhpcy5jb25maWcucmFuZ2VbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnN0YXJ0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0W2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0LnB1c2godGhpcy5jb25maWcuc3RhcnRbaV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RhcnRbaV0gPSB0aGlzLmNvbmZpZy5zdGFydFtpXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCh0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMuc3RhcnRbaV0sIHRoaXMucmFuZ2UpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnN0YXJ0W2ldLCB0aGlzLnJhbmdlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLnR1bWJsZXIucHVzaChuZXcgVHVtYmxlcih0aGlzLnBvc2l0aW9uW2ldLCB0aGlzLm9yaWVudGF0aW9uLCBpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNDb25uZWN0KSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3QucHVzaChuZXcgQ29ubmVjdCh0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdLCB0aGlzLm9yaWVudGF0aW9uKSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMuY29ubmVjdFswXS5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLnRvb2x0aXAucHVzaChuZXcgVG9vbHRpcCh0aGlzLnN0YXJ0W2ldLCB0aGlzLm9yaWVudGF0aW9uKSk7XHJcblxyXG4gICAgICAgIHRoaXMudHVtYmxlcltpXS5lbGVtZW50LmFwcGVuZCh0aGlzLnRvb2x0aXBbaV0uZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy50dW1ibGVyW2ldLmVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLnNsaWRlcik7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcuaW5wdXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLmlucHV0LnZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlLnB1c2gobmV3IElucHV0KFxyXG4gICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgIHRoaXMuY29uZmlnLmlucHV0LnZhbHVlW2ldLFxyXG4gICAgICAgICAgdGhpcy5jb25maWcuc3RhcnRbaV0sXHJcbiAgICAgICAgICBpLFxyXG4gICAgICAgICkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmlucHV0ICYmIHRoaXMuY29uZmlnLmlucHV0LnRvb2x0aXApIHtcclxuICAgICAgdGhpcy5pbnB1dFRvb2x0aXAgPSBuZXcgSW5wdXQoXHJcbiAgICAgICAgJ3Rvb2x0aXAnLFxyXG4gICAgICAgIHRoaXMuY29uZmlnLmlucHV0LnRvb2x0aXBbMF0sXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBWaWV3IH07XHJcbiIsImltcG9ydCBIZWxwZXIgZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBDb25uZWN0IGV4dGVuZHMgSGVscGVyIHtcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgcG9zaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF07XG5cbiAgcHJpdmF0ZSBzdGFydFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBlbmRQb3NpdGlvbjogbnVtYmVyO1xuXG4gIHByaXZhdGUgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbjtcblxuICBwcml2YXRlIHN0eWxlOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihzdGFydFBvc2l0aW9uOiBudW1iZXIsIGVuZFBvc2l0aW9uOiBudW1iZXIsIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XG4gICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygnY29ubmVjdCcsIHRoaXMub3JpZW50YXRpb24pO1xuICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5zdGFydFBvc2l0aW9uLCB0aGlzLmVuZFBvc2l0aW9uKTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHN0YXJ0UG9zaXRpb246IG51bWJlciwgZW5kUG9zaXRpb246IG51bWJlcikge1xuICAgIGNvbnN0IHN0YXJ0OiBudW1iZXIgPSBNYXRoLnJvdW5kKHN0YXJ0UG9zaXRpb24gKiB0aGlzLlRPX0NPTk5FQ1RfVVBEQVRFKTtcbiAgICBjb25zdCBlbmQ6IG51bWJlciA9IE1hdGgucm91bmQoZW5kUG9zaXRpb24gKiB0aGlzLlRPX0NPTk5FQ1RfVVBEQVRFKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gW3N0YXJ0LCBlbmRdO1xuICAgIGlmIChzdGFydCA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICB0aGlzLnN0eWxlID0gYHdpZHRoOiAke2VuZH0lO2A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0eWxlID0gYGhlaWdodDogJHtlbmR9JTtgO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLnN0eWxlID0gYGxlZnQ6ICR7c3RhcnR9JTsgd2lkdGg6ICR7KGVuZCAtIHN0YXJ0KX0lO2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3R5bGUgPSBgdG9wOiAke3N0YXJ0fSU7IGhlaWdodDogJHsoZW5kIC0gc3RhcnQpfSU7YDtcbiAgICB9XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCB0aGlzLnN0eWxlKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29ubmVjdDtcbiIsImNsYXNzIEhlbHBlciB7XG4gICAgcmVhZG9ubHkgVE9fVFVNQkxFUl9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xuXG4gICAgcmVhZG9ubHkgVE9fQ09OTkVDVF9VUERBVEU6IG51bWJlciA9IDFlMjtcblxuICAgIGdldFBvc2l0aW9uRnJvbVZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xuICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gKCh2YWx1ZSAtIHJhbmdlWzBdKSAvIChyYW5nZVsxXSAtIHJhbmdlWzBdKSk7XG4gICAgICByZXN1bHQgPSBNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fVFVNQkxFUl9QT1NJVElPTikgLyB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT047XG5cbiAgICAgIGlmIChyZXN1bHQgPCAwKSB7XG4gICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID4gMSkge1xuICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBnZXREaXZFbGVtZW50V2l0aENsYXNzKGNzc0NsYXNzOiB0Q3NzQ2xhc3Nlcywgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbik6IEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0IHN0ckNsYXNzOiBzdHJpbmcgPSBgU1JTX18ke2Nzc0NsYXNzfWA7XG4gICAgICBjb25zdCBjc3NDbGFzc1dpdGhvdXRPcmllbnRhdGlvbjogc3RyaW5nID0gYCR7c3RyQ2xhc3N9ICR7c3RyQ2xhc3N9X2A7XG4gICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGNzc0NsYXNzV2l0aG91dE9yaWVudGF0aW9uICsgb3JpZW50YXRpb24pKTtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEhlbHBlcjtcbiIsImltcG9ydCBIZWxwZXIgZnJvbSAnLi9IZWxwZXInO1xuaW1wb3J0IFRvb2x0aXAgZnJvbSAnLi9Ub29sdGlwJztcblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBIZWxwZXIge1xuICBwcml2YXRlIHR5cGU6IHRJbnB1dFR5cGU7XG5cbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgcHVibGljIHZhbHVlOiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyBpbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcih0eXBlOiB0SW5wdXRUeXBlLCBlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LCB2YWx1ZT86IG51bWJlciwgaW5kZXg/OiBudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKGluZGV4KSB7XG4gICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAndmFsdWUnKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IFN0cmluZyh0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbktleWRvd25Pck1vdXNlb3V0KHRoaXM6IElucHV0LCBjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3ZhbHVlJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTtcbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBvbk1vdXNlb3V0KTtcblxuICAgIGZ1bmN0aW9uIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ1RhYicgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGFjdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlb3V0KCkge1xuICAgICAgYWN0aW9uKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFjdGlvbigpIHtcbiAgICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSBOdW1iZXIodGhhdC5lbGVtZW50LnZhbHVlKTtcbiAgICAgIGlmICh0aGF0LmluZGV4KSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBpbmRleDogdGhhdC5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3dpdGNoQ2hlY2sodGhpczogSW5wdXQsIHRvb2x0aXA6IFRvb2x0aXBbXSkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3Rvb2x0aXAnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvb2x0aXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoYXQuZWxlbWVudC5jaGVja2VkKSB7XG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hIaWRkZW4odHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hIaWRkZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuIiwiaW1wb3J0IEhlbHBlciBmcm9tICcuL0hlbHBlcic7XG5cbmNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBIZWxwZXIge1xuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgcHVibGljIHZhbHVlOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIsIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ3Rvb2x0aXAnLCB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICB0aGlzLnNldElubmVyVGV4dCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHNldElubmVyVGV4dCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgdmFsOiBudW1iZXIgPSB2YWx1ZSA+IDBcbiAgICAgID8gTWF0aC5mbG9vcih2YWx1ZSlcbiAgICAgIDogTWF0aC5jZWlsKHZhbHVlKTtcblxuICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IFN0cmluZyh2YWwpO1xuICB9XG5cbiAgc3dpdGNoSGlkZGVuKHRoaXM6IFRvb2x0aXAsIGlzVmlzaWJsZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHRoYXQ6IFRvb2x0aXAgPSB0aGlzO1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgIHRoYXQuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBUb29sdGlwO1xuIiwiaW1wb3J0IEhlbHBlciBmcm9tICcuL0hlbHBlcic7XHJcblxyXG5jbGFzcyBUdW1ibGVyIGV4dGVuZHMgSGVscGVyIHtcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGxpc3RlbmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24sIHByaXZhdGUgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCd0dW1ibGVyJywgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICAgIHRoaXMuc2V0TmV3UG9zaXRpb24odGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TmV3UG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgICBjb25zdCBsaXRlcjogc3RyaW5nID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ1gnIDogJ1knO1xyXG5cclxuICAgICAgY29uc3Qgc3R5bGU6IHN0cmluZyA9IGB0cmFuc2Zvcm06IHRyYW5zbGF0ZSR7bGl0ZXJ9KCR7TWF0aC5yb3VuZChwb3NpdGlvbiAqIHRoaXMuVE9fVFVNQkxFUl9QT1NJVElPTil9JSk7YDtcclxuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hpZnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KTogbnVtYmVyIHtcclxuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICA/IGV2ZW50LmNsaWVudFggLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcclxuICAgICAgICA6IGV2ZW50LmNsaWVudFkgLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb3VzZWRvd25BbmRNb3ZlKHRoaXM6IFR1bWJsZXIsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGF0Lmxpc3RlbmluZyA9IHRydWU7XHJcblxyXG4gICAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2hpZnQ6IG51bWJlciA9IHRoaXMuZ2V0U2hpZnQodGhhdC5lbGVtZW50LCBldmVudCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2Vtb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZXVwKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25Nb3VzZW1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgIGxldCBuZXdQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uUGVyY2VudDogbnVtYmVyO1xyXG4gICAgICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgaWYgKHRoYXQub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICBuZXdQb3NpdGlvbiA9IGV2ZW50LmNsaWVudFggLSBzaGlmdCAtIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG4gICAgICAgICAgICBuZXdQb3NpdGlvblBlcmNlbnQgPSBuZXdQb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WSAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgICAgICAgICAgbmV3UG9zaXRpb25QZXJjZW50ID0gbmV3UG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IG5ld1Bvc2l0aW9uUGVyY2VudDtcclxuXHJcbiAgICAgICAgICBpZiAocG9zaXRpb24gPiAxKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChwb3NpdGlvbiA8IDApIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgICAgcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGluZGV4OiB0aGF0LmluZGV4LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbk1vdXNldXAoKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlbW92ZSk7XHJcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZXVwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFR1bWJsZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=