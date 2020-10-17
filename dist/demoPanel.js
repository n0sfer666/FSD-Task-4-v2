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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9EZW1vX1BhbmVsL3RlbXBsYXRlLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Db250cm9sbGVyL1ByZXNlbnRlci50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1BsdWdpbi50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9WaWV3LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSGVscGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0lucHV0LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1Rvb2x0aXAudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVHVtYmxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFD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TSxHQTRFM0I7QUFDRCxrQkFBZSxPQUFPLENBQUMiLCJmaWxlIjoiZGVtb1BhbmVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL0RlbW9fUGFuZWwvUGFuZWwudHNcIik7XG4iLCJpbXBvcnQgeyBTaW1wbGVSYW5nZVNsaWRlciB9IGZyb20gJy4uL1BsdWdpbi9QbHVnaW4nO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJy4vdGVtcGxhdGUnO1xyXG5cclxuY2xhc3MgRGVtb19QYW5lbCB7XHJcblxyXG4gIHRlbXBsYXRlOiBUZW1wbGF0ZTtcclxuICByYW5nZV9zbGlkZXI6ICBTaW1wbGVSYW5nZVNsaWRlcjtcclxuICBlbXB0eV9zbGlkZXI6IHN0cmluZztcclxuXHJcbiAgZGVmYXVsdENvbmZpZzogSV9ERU1PX2RlZmF1bHRDb25maWc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVtb19wYW5lbDogSlF1ZXJ5LCBwcml2YXRlIHNsaWRlcjogSlF1ZXJ5LCBwcml2YXRlIGlucHV0czogSV9ERU1PX0lucHV0KSB7XHJcbiAgICB0aGlzLnRlbXBsYXRlID0gbmV3IFRlbXBsYXRlKCk7XHJcbiAgICB0aGlzLmRlbW9fcGFuZWwuYXBwZW5kKHRoaXMudGVtcGxhdGUuZGVtb19wYW5lbCk7XHJcblxyXG4gICAgdGhpcy5lbXB0eV9zbGlkZXIgPSAnIycgKyBzbGlkZXIuZ2V0KDApLmlkO1xyXG5cclxuICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IHtcclxuICAgICAgcmFuZ2U6IFswLCAxMDBdLFxyXG4gICAgICBzdGFydDogWzEwXSxcclxuICAgICAgc3RlcDogMVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmFuZ2Vfc2xpZGVyID0gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKHRoaXMuc2xpZGVyLCB7XHJcbiAgICAgIHJhbmdlOiBbLTEwMCwgMTAwXSxcclxuICAgICAgc3RhcnQ6IFstNTAsIDUwXSxcclxuICAgICAgc3RlcDogMTAsXHJcbiAgICAgIG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIixcclxuICAgICAgY29ubmVjdDogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogdHJ1ZSxcclxuICAgICAgaW5wdXQ6IHRoaXMuaW5wdXRzXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgdGVtcGxhdGVfaW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W10gPSBbXHJcbiAgICAgIHRoaXMudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWluLFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnJhbmdlX2lucHV0X21heCxcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21pbixcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21heCxcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGVwX2lucHV0LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLm9yaWVudGF0aW9uX2lucHV0LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLmNvbm5lY3RDb25maWdJbnB1dFxyXG4gICAgXVxyXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0ZW1wbGF0ZV9pbnB1dHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHRoaXMub25fY2hhbmdlX2lucHV0KHRlbXBsYXRlX2lucHV0c1tpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbl9jaGFuZ2VfaW5wdXQodGhpczogRGVtb19QYW5lbCwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTtcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0Jywgb25Nb3VzZW91dCk7XHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbl9jaGFuZ2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICBpZihldmVudC5rZXkgPT09IFwiVGFiXCIgfHwgZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcclxuICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uTW91c2VvdXQoKSB7XHJcbiAgICAgIGFjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uX2NoYW5nZSgpIHtcclxuICAgICAgYWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aW9uKCkge1xyXG5cclxuICAgICAgbGV0IHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdID0gW1xyXG4gICAgICAgIHRoYXQudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWluLnZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9taW4udmFsdWUpXHJcbiAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5yYW5nZVswXSxcclxuICAgICAgICB0aGF0LnRlbXBsYXRlLnJhbmdlX2lucHV0X21heC52YWx1ZSAhPT0gJydcclxuICAgICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWF4LnZhbHVlKVxyXG4gICAgICAgICAgOiB0aGF0LmRlZmF1bHRDb25maWcucmFuZ2VbMV0sXHJcbiAgICAgIF1cclxuICAgICAgbGV0IHN0YXJ0OiBUX0RFTU9fU3RhcnQgPSB0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWF4LnZhbHVlICE9PSAnJ1xyXG4gICAgICAgID8gW1xyXG4gICAgICAgICAgdGhhdC50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21pbi52YWx1ZSAhPT0gJydcclxuICAgICAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21pbi52YWx1ZSlcclxuICAgICAgICAgICAgOiB0aGF0LmRlZmF1bHRDb25maWcuc3RhcnRbMF0sXHJcbiAgICAgICAgICBOdW1iZXIodGhhdC50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21heC52YWx1ZSlcclxuICAgICAgICBdXHJcbiAgICAgICAgOiBbXHJcbiAgICAgICAgICB0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnZhbHVlKVxyXG4gICAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5zdGFydFswXVxyXG4gICAgICAgIF1cclxuICAgICAgbGV0IHN0ZXA6IG51bWJlciA9IHRoYXQudGVtcGxhdGUuc3RlcF9pbnB1dC52YWx1ZSAhPT0gJydcclxuICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnN0ZXBfaW5wdXQudmFsdWUpXHJcbiAgICAgICAgOiB0aGF0LmRlZmF1bHRDb25maWcuc3RlcDtcclxuICAgICAgbGV0IG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24gPSB0aGF0LnRlbXBsYXRlLm9yaWVudGF0aW9uX2lucHV0LmNoZWNrZWRcclxuICAgICAgICA/ICdob3Jpem9udGFsJ1xyXG4gICAgICAgIDogJ3ZlcnRpY2FsJztcclxuICAgICAgbGV0IGNvbm5lY3Q6IGJvb2xlYW4gPSB0aGF0LnRlbXBsYXRlLmNvbm5lY3RDb25maWdJbnB1dC5jaGVja2VkXHJcbiAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuXHJcbiAgICAgIHRoYXQuc2xpZGVyID0gJCh0aGF0LmVtcHR5X3NsaWRlcikuZW1wdHkoKTtcclxuICAgICAgdGhhdC5yYW5nZV9zbGlkZXIgPSBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIodGhhdC5zbGlkZXIsIHtcclxuICAgICAgICByYW5nZTogcmFuZ2UsXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgIHN0ZXA6IHN0ZXAsXHJcbiAgICAgICAgb3JpZW50YXRpb246IG9yaWVudGF0aW9uLFxyXG4gICAgICAgIGNvbm5lY3Q6IGNvbm5lY3QsXHJcbiAgICAgICAgdG9vbHRpcDogdHJ1ZSxcclxuICAgICAgICBpbnB1dDogdGhhdC5pbnB1dHNcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7RGVtb19QYW5lbH07XHJcblxyXG4oZnVuY3Rpb24oJDogSlF1ZXJ5U3RhdGljKSB7XHJcbiAgJC5mbi5leHRlbmQoe1xyXG4gICAgRGVtb19QYW5lbDogZnVuY3Rpb24oc2xpZGVyOiBKUXVlcnksIGlucHV0czogSV9ERU1PX0lucHV0KSB7XHJcbiAgICAgIHJldHVybiBuZXcgRGVtb19QYW5lbCg8SlF1ZXJ5PiB0aGlzLCA8SlF1ZXJ5PiBzbGlkZXIsIDxJX0RFTU9fSW5wdXQ+IGlucHV0cyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0gKGpRdWVyeSkgKTsiLCJjbGFzcyBUZW1wbGF0ZSB7XHJcbiAgcmFuZ2VfaW5wdXRfbWluOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHJhbmdlX2lucHV0X21heDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgc3RhcnRDb25maWdJbnB1dF9taW46IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgc3RhcnRDb25maWdJbnB1dF9tYXg6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIHN0ZXBfaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIG9yaWVudGF0aW9uX2lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBjb25uZWN0Q29uZmlnSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIGRlbW9fcGFuZWw6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gcmFuZ2UgbGluZVxyXG4gICAgbGV0IHJhbmdlX3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICByYW5nZV90ZXh0LmlubmVyVGV4dCA9ICdSYW5nZTogJztcclxuICAgIHRoaXMucmFuZ2VfaW5wdXRfbWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9taW4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9taW4udmFsdWUgPSAnLTEwMCc7XHJcbiAgICB0aGlzLnJhbmdlX2lucHV0X21heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWF4LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWF4LnZhbHVlID0gJzEwMCc7XHJcbiAgICBsZXQgcmFuZ2VfbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICByYW5nZV9saW5lLmFwcGVuZChyYW5nZV90ZXh0LCB0aGlzLnJhbmdlX2lucHV0X21pbiwgdGhpcy5yYW5nZV9pbnB1dF9tYXgpO1xyXG4gICAgLy8gc3RhcnQgbGluZVxyXG4gICAgbGV0IHN0YXJ0X3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBzdGFydF90ZXh0LmlubmVyVGV4dCA9ICdTdGFydDogJztcclxuICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9taW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9taW4udmFsdWUgPSAnLTUwJztcclxuICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9tYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWF4LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9tYXgudmFsdWUgPSAnNTAnO1xyXG4gICAgbGV0IHN0YXJ0X2xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc3RhcnRfbGluZS5hcHBlbmQoc3RhcnRfdGV4dCwgdGhpcy5zdGFydENvbmZpZ0lucHV0X21pbiwgdGhpcy5zdGFydENvbmZpZ0lucHV0X21heCk7XHJcbiAgICAvLyBzdGVwIGxpbmVcclxuICAgIGxldCBzdGVwX3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBzdGVwX3RleHQuaW5uZXJUZXh0ID0gJ1N0ZXA6ICc7XHJcbiAgICB0aGlzLnN0ZXBfaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnN0ZXBfaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5zdGVwX2lucHV0LnZhbHVlID0gJzEwJztcclxuICAgIGxldCBzdGVwX2xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc3RlcF9saW5lLmFwcGVuZChzdGVwX3RleHQsIHRoaXMuc3RlcF9pbnB1dCk7XHJcbiAgICAvLyBvcmllbnRhdGlvbiBsaW5lXHJcbiAgICBsZXQgb3JpZW50YXRpb25fdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIG9yaWVudGF0aW9uX3RleHQuaW5uZXJUZXh0ID0gJ09yaWVudGF0aW9uIGhvcml6b250YWwvdmVydGljYWw6ICc7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbl9pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbl9pbnB1dC5jaGVja2VkID0gdHJ1ZTtcclxuICAgIGxldCBvcmllbnRhdGlvbl9saW5lOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBvcmllbnRhdGlvbl9saW5lLmFwcGVuZChvcmllbnRhdGlvbl90ZXh0LCB0aGlzLm9yaWVudGF0aW9uX2lucHV0KTtcclxuICAgIC8vIGNvbm5lY3QgbGluZVxyXG4gICAgbGV0IGNvbm5lY3RfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIGNvbm5lY3RfdGV4dC5pbm5lclRleHQgPSAnQ29ubmVjdCBvbi9vZmY6ICc7XHJcbiAgICB0aGlzLmNvbm5lY3RDb25maWdJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuY29ubmVjdENvbmZpZ0lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xyXG4gICAgICB0aGlzLmNvbm5lY3RDb25maWdJbnB1dC5jaGVja2VkID0gdHJ1ZTtcclxuICAgIGxldCBjb25uZWN0X2xpbmU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNvbm5lY3RfbGluZS5hcHBlbmQoY29ubmVjdF90ZXh0LCB0aGlzLmNvbm5lY3RDb25maWdJbnB1dCk7XHJcblxyXG4gICAgdGhpcy5kZW1vX3BhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRoaXMuZGVtb19wYW5lbC5hcHBlbmQocmFuZ2VfbGluZSwgc3RhcnRfbGluZSwgc3RlcF9saW5lLCBvcmllbnRhdGlvbl9saW5lLCBjb25uZWN0X2xpbmUpO1xyXG4gIH1cclxufVxyXG5leHBvcnQge1RlbXBsYXRlfSIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuLi9WaWV3L1ZpZXcnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi9Nb2RlbC9Nb2RlbCc7XG5cbmNsYXNzIFByZXNlbnRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlldzogVmlldywgcHJpdmF0ZSBtb2RlbDogTW9kZWwpIHtcbiAgICB0aGlzLnZpZXcub25DaGFuZ2VWaWV3KCh0dW1ibGVyRGF0YTogdFR1bWJsZXJEYXRhKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0dW1ibGVyRGF0YSk7XG4gICAgICB0aGlzLm1vZGVsLnNldE5ld1Bvc2l0aW9uKHR1bWJsZXJEYXRhKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLm9uQ2hhbmdlTW9kZWwoKG1vZGVsRGF0YTogdE1vZGVsRGF0YSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2cobW9kZWxEYXRhKTtcbiAgICAgIHRoaXMudmlldy51cGRhdGUobW9kZWxEYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IHsgUHJlc2VudGVyIH07XG4iLCJjbGFzcyBNb2RlbCB7XHJcbiAgICB2YWx1ZTogdFZhbHVlID0gWzBdO1xyXG5cclxuICAgIHJhbmdlOiB0UmFuZ2UgPSBbMCwgMF07XHJcblxyXG4gICAgc3RlcDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwb3NpdGlvbjogdFBvc2l0aW9uID0gWzBdO1xyXG5cclxuICAgIGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNhbGxiYWNrTGlzdDogaU1vZGVsQ2FsbGJhY2tbXTtcclxuXHJcbiAgICByZWFkb25seSBUT19OT1JNQUxJWkVfUE9TSVRJT046IG51bWJlciA9IDFlNDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogaUNvbmZpZ01vZGVsKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tMaXN0ID0gW107XHJcblxyXG4gICAgICB0aGlzLnN0ZXAgPSB0aGlzLmNvbmZpZy5zdGVwO1xyXG5cclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TmV3UG9zaXRpb24odHVtYmxlckRhdGE6IHRUdW1ibGVyRGF0YSkge1xyXG4gICAgICBjb25zdCB7IGluZGV4IH0gPSB0dW1ibGVyRGF0YTtcclxuICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgY29uc3QgbmV3VmFsdWU6IG51bWJlciA9IHRoaXMuZ2V0TmV3VmFsdWUodHVtYmxlckRhdGEpO1xyXG5cclxuICAgICAgdGhpcy5jaGVja1N0ZXBDb25kaXRpb24obmV3VmFsdWUsIGluZGV4KTtcclxuICAgICAgLy8gY2hlY2sgZm9yIGNvbGxpc2lvblxyXG4gICAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGggPiAxICYmIHRoaXMudmFsdWVbMV0pIHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMudmFsdWVbMV0pIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE5ld1ZhbHVlKHR1bWJsZXJEYXRhOiB0VHVtYmxlckRhdGEpOiBudW1iZXIge1xyXG4gICAgICBjb25zdCB7IGluZGV4IH0gPSB0dW1ibGVyRGF0YTtcclxuICAgICAgbGV0IG5ld1ZhbHVlOiBudW1iZXIgPSB0aGlzLnZhbHVlW2luZGV4XTtcclxuICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgICBpZiAodHVtYmxlckRhdGEucG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IHRtcFBvc2l0aW9uOiBudW1iZXIgPSBNYXRoLnJvdW5kKHR1bWJsZXJEYXRhLnBvc2l0aW9uICogdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pO1xyXG4gICAgICAgIHBvc2l0aW9uID0gdG1wUG9zaXRpb24gLyB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTjtcclxuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuZ2V0VmFsdWVGcm9tUG9zaXRpb24ocG9zaXRpb24sIHRoaXMucmFuZ2UpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR1bWJsZXJEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBuZXdWYWx1ZSA9IHR1bWJsZXJEYXRhLnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPT09IDAgJiYgdGhpcy52YWx1ZVsxXSkge1xyXG4gICAgICAgICAgaWYgKG5ld1ZhbHVlID4gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcCkge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgaWYgKG5ld1ZhbHVlIDwgdGhpcy52YWx1ZVswXSArIHRoaXMuc3RlcCkge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1N0ZXBDb25kaXRpb24obmV3VmFsdWU6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICBjb25zdCBjb25kaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbXHJcbiAgICAgICAgdGhpcy52YWx1ZVtpbmRleF0gLSB0aGlzLnN0ZXAsXHJcbiAgICAgICAgdGhpcy52YWx1ZVtpbmRleF0gKyB0aGlzLnN0ZXAsXHJcbiAgICAgIF07XHJcblxyXG4gICAgICBpZiAobmV3VmFsdWUgPj0gY29uZGl0aW9uWzFdIHx8IG5ld1ZhbHVlIDw9IGNvbmRpdGlvblswXSkge1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWVBbmRQb3NpdGlvbihuZXdWYWx1ZSwgaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrTGlzdC5mb3JFYWNoKChjYWxsYmFjazogaU1vZGVsQ2FsbGJhY2spID0+IHtcclxuICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbixcclxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgICAgaW5kZXg6IHRoaXMuYWN0aXZlSW5kZXgsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhbmdlTW9kZWwoY2FsbGJhY2s6IGlNb2RlbENhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tMaXN0LnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBvc2l0aW9uRnJvbVZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xyXG4gICAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9ICh2YWx1ZSAtIHJhbmdlWzBdKSAvIChyYW5nZVsxXSAtIHJhbmdlWzBdKTtcclxuXHJcbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTikgLyB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWVGcm9tUG9zaXRpb24ocG9zaXRpb246IG51bWJlciwgcmFuZ2U6IHRSYW5nZSk6IG51bWJlciB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gKHBvc2l0aW9uICogKHJhbmdlWzFdIC0gcmFuZ2VbMF0pKSArIHJhbmdlWzBdO1xyXG5cclxuICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKHJlc3VsdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlQW5kUG9zaXRpb24obmV3VmFsdWU6IG51bWJlciwgaTogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmFsdWVbaV0gPSBuZXdWYWx1ZSA+IDBcclxuICAgICAgICA/IChNYXRoLmNlaWwobmV3VmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKVxyXG4gICAgICAgIDogKE1hdGguZmxvb3IobmV3VmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKTtcclxuXHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMF0gPCB0aGlzLnJhbmdlWzBdKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlWzBdID0gdGhpcy5yYW5nZVswXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpID09PSAxICYmIHRoaXMudmFsdWVbMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlWzFdID4gdGhpcy5yYW5nZVsxXSkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMucmFuZ2VbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnJhbmdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5yYW5nZS5wdXNoKHRoaXMuY29uZmlnLnJhbmdlW2ldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5yYW5nZVtpXSA9IHRoaXMuY29uZmlnLnJhbmdlW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5zdGFydC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMudmFsdWUucHVzaCh0aGlzLmNvbmZpZy5zdGFydFtpXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLmNvbmZpZy5zdGFydFtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCh0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1vZGVsIH07XHJcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuL1ZpZXcvVmlldyc7XHJcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9Nb2RlbC9Nb2RlbCc7XHJcbmltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gJy4vQ29udHJvbGxlci9QcmVzZW50ZXInO1xyXG5cclxuY2xhc3MgU2ltcGxlUmFuZ2VTbGlkZXIge1xyXG4gICAgdmlldzogVmlldztcclxuXHJcbiAgICBtb2RlbDogTW9kZWw7XHJcblxyXG4gICAgcHJlc2VudGVyOiBQcmVzZW50ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IEpRdWVyeSwgcHJpdmF0ZSB1c2VyQ29uZmlnOiBpQ29uZmlnVXNlcikge1xyXG4gICAgICBjb25zdCBzbGlkZXJDb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xyXG5cclxuICAgICAgY29uc3QgZGVmYXVsdENvbmZpZzogaUNvbmZpZ1VzZXIgPSB0aGlzLmdldERlZmF1bHRhQ29uZmlnKCk7XHJcblxyXG4gICAgICBjb25zdCBjb21wbGV0ZUNvbmZpZzogaUNvbmZpZ1VzZXIgPSB0aGlzLmdldENvbXBsZXRlQ29uZmlnKHRoaXMudXNlckNvbmZpZywgZGVmYXVsdENvbmZpZyk7XHJcblxyXG4gICAgICBjb25zdCBtb2RlbENvbmZpZzogaUNvbmZpZ01vZGVsID0gdGhpcy5nZXRNb2RlbENvbmZpZyhjb21wbGV0ZUNvbmZpZyk7XHJcblxyXG4gICAgICBjb25zdCB2aWV3Q29uZmlnOiBpQ29uZmlnVmlldyA9IHRoaXMuZ2V0Vmlld0NvbmZpZyhjb21wbGV0ZUNvbmZpZyk7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzbGlkZXJDb250YWluZXIsIHZpZXdDb25maWcpO1xyXG4gICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKG1vZGVsQ29uZmlnKTtcclxuICAgICAgdGhpcy5wcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKHRoaXMudmlldywgdGhpcy5tb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVmYXVsdGFDb25maWcoKTogaUNvbmZpZ1VzZXIge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXHJcbiAgICAgICAgc3RhcnQ6IFsxMF0sXHJcbiAgICAgICAgcmFuZ2U6IFswLCAxMDBdLFxyXG4gICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgY29ubmVjdDogdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOiB0cnVlLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRDb21wbGV0ZUNvbmZpZyh1c2VyQ29uZmlnOiBpQ29uZmlnVXNlciwgZGVmYXVsdENvbmZpZzogaUNvbmZpZ1VzZXIpOiBpQ29uZmlnVXNlciB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb3JpZW50YXRpb246IHVzZXJDb25maWcub3JpZW50YXRpb24gPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLm9yaWVudGF0aW9uXHJcbiAgICAgICAgICA6IHVzZXJDb25maWcub3JpZW50YXRpb24sXHJcbiAgICAgICAgc3RhcnQ6IHVzZXJDb25maWcuc3RhcnQgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLnN0YXJ0XHJcbiAgICAgICAgICA6IHVzZXJDb25maWcuc3RhcnQsXHJcbiAgICAgICAgcmFuZ2U6IHVzZXJDb25maWcucmFuZ2UgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLnJhbmdlXHJcbiAgICAgICAgICA6IHVzZXJDb25maWcucmFuZ2UsXHJcbiAgICAgICAgc3RlcDogdXNlckNvbmZpZy5zdGVwID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy5zdGVwXHJcbiAgICAgICAgICA6IHVzZXJDb25maWcuc3RlcCxcclxuICAgICAgICBjb25uZWN0OiB1c2VyQ29uZmlnLmNvbm5lY3QgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLmNvbm5lY3RcclxuICAgICAgICAgIDogdXNlckNvbmZpZy5jb25uZWN0LFxyXG4gICAgICAgIHRvb2x0aXA6IHVzZXJDb25maWcudG9vbHRpcCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcudG9vbHRpcFxyXG4gICAgICAgICAgOiB1c2VyQ29uZmlnLnRvb2x0aXAsXHJcbiAgICAgICAgaW5wdXQ6IHVzZXJDb25maWcuaW5wdXQsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdldE1vZGVsQ29uZmlnKGNvbXBsZXRlQ29uZmlnOiBpQ29uZmlnVXNlcik6IGlDb25maWdNb2RlbCB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhcnQ6IGNvbXBsZXRlQ29uZmlnLnN0YXJ0LFxyXG4gICAgICAgIHJhbmdlOiBjb21wbGV0ZUNvbmZpZy5yYW5nZSxcclxuICAgICAgICBzdGVwOiBjb21wbGV0ZUNvbmZpZy5zdGVwLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRWaWV3Q29uZmlnKGNvbXBsZXRlQ29uZmlnOiBpQ29uZmlnVXNlcik6IGlDb25maWdWaWV3IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBvcmllbnRhdGlvbjogY29tcGxldGVDb25maWcub3JpZW50YXRpb24sXHJcbiAgICAgICAgc3RhcnQ6IGNvbXBsZXRlQ29uZmlnLnN0YXJ0LFxyXG4gICAgICAgIHJhbmdlOiBjb21wbGV0ZUNvbmZpZy5yYW5nZSxcclxuICAgICAgICBpc1Rvb2x0aXA6IGNvbXBsZXRlQ29uZmlnLnRvb2x0aXAsXHJcbiAgICAgICAgaXNDb25uZWN0OiBjb21wbGV0ZUNvbmZpZy5jb25uZWN0LFxyXG4gICAgICAgIGlucHV0OiBjb21wbGV0ZUNvbmZpZy5pbnB1dCxcclxuICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFNpbXBsZVJhbmdlU2xpZGVyIH07XHJcblxyXG4oZnVuY3Rpb24gKCQ6IEpRdWVyeVN0YXRpYykge1xyXG4gICQuZm4uZXh0ZW5kKHtcclxuICAgIFNpbXBsZVJhbmdlU2xpZGVyKHVzZXJDb25maWc6IGlDb25maWdVc2VyKSB7XHJcbiAgICAgIHJldHVybiBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIoPEpRdWVyeT4gdGhpcywgPGlDb25maWdVc2VyPiB1c2VyQ29uZmlnKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn0oalF1ZXJ5KSk7XHJcbiIsImltcG9ydCBIZWxwZXIgZnJvbSAnLi9lbnRpdGllcy9IZWxwZXInO1xyXG5pbXBvcnQgVHVtYmxlciBmcm9tICcuL2VudGl0aWVzL1R1bWJsZXInO1xyXG5pbXBvcnQgQ29ubmVjdCBmcm9tICcuL2VudGl0aWVzL0Nvbm5lY3QnO1xyXG5pbXBvcnQgVG9vbHRpcCBmcm9tICcuL2VudGl0aWVzL1Rvb2x0aXAnO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9lbnRpdGllcy9JbnB1dCc7XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgSGVscGVyIHtcclxuICBwb3NpdGlvbjogdFBvc2l0aW9uID0gWzBdO1xyXG5cclxuICByYW5nZTogdFJhbmdlID0gWzAsIDBdO1xyXG5cclxuICBzdGFydDogdFZhbHVlID0gWzBdO1xyXG5cclxuICBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uO1xyXG5cclxuICBpc1Rvb2x0aXA6IGJvb2xlYW47XHJcblxyXG4gIGlzQ29ubmVjdDogYm9vbGVhbjtcclxuXHJcbiAgc2xpZGVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgdHVtYmxlcjogVHVtYmxlcltdID0gW107XHJcblxyXG4gIGNvbm5lY3Q6IENvbm5lY3RbXSA9IFtdO1xyXG5cclxuICB0b29sdGlwOiBUb29sdGlwW10gPSBbXTtcclxuXHJcbiAgaW5wdXRWYWx1ZTogSW5wdXRbXSA9IFtdO1xyXG5cclxuICBpbnB1dFRvb2x0aXA/OiBJbnB1dDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50LCBwcml2YXRlIGNvbmZpZzogaUNvbmZpZ1ZpZXcpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5pc1Rvb2x0aXAgPSB0aGlzLmNvbmZpZy5pc1Rvb2x0aXA7XHJcbiAgICB0aGlzLmlzQ29ubmVjdCA9IHRoaXMuY29uZmlnLmlzQ29ubmVjdDtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLmNvbmZpZy5vcmllbnRhdGlvbjtcclxuXHJcbiAgICB0aGlzLnNsaWRlciA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygnc2xpZGVyJywgdGhpcy5vcmllbnRhdGlvbik7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZVZpZXcoY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50dW1ibGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMudHVtYmxlcltpXS5vbk1vdXNlZG93bkFuZE1vdmUodGhpcy5jb250YWluZXIsIGNhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlucHV0VmFsdWVbMF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW5wdXRWYWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZVtpXS5vbktleWRvd25Pck1vdXNlb3V0KGNhbGxiYWNrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaW5wdXRUb29sdGlwICYmIHRoaXMuaXNUb29sdGlwKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRUb29sdGlwLm9uU3dpdGNoQ2hlY2sodGhpcy50b29sdGlwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZShtb2RlbERhdGE6IHRNb2RlbERhdGEpIHtcclxuICAgIGNvbnN0IGk6IG51bWJlciA9IG1vZGVsRGF0YS5pbmRleDtcclxuICAgIGNvbnN0IHsgcG9zaXRpb24gfSA9IG1vZGVsRGF0YTtcclxuICAgIGNvbnN0IHsgdmFsdWUgfSA9IG1vZGVsRGF0YTtcclxuXHJcbiAgICB0aGlzLnNldEFjdGl2ZXR1bWJsZXIocG9zaXRpb24sIGkpO1xyXG5cclxuICAgIHRoaXMudHVtYmxlcltpXS5zZXROZXdQb3NpdGlvbihwb3NpdGlvbltpXSk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XHJcbiAgICAgIHRoaXMudG9vbHRpcFtpXS5zZXRJbm5lclRleHQodmFsdWVbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlucHV0VmFsdWVbMF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmlucHV0VmFsdWVbaV0uZWxlbWVudC52YWx1ZSA9IFN0cmluZyh2YWx1ZVtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNDb25uZWN0KSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRQb3NpdGlvbigwLCBwb3NpdGlvblswXSk7XHJcbiAgICAgIH0gZWxzZSBpZiAocG9zaXRpb25bMV0pIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RbMF0uc2V0UG9zaXRpb24ocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0QWN0aXZldHVtYmxlcihwb3NpdGlvbjogdFBvc2l0aW9uLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID4gMSkge1xyXG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICB0aGlzLnR1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy50dW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVG9vbHRpcCkge1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzBdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnR1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy50dW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVG9vbHRpcCkge1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcucmFuZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMucmFuZ2UucHVzaCh0aGlzLmNvbmZpZy5yYW5nZVtpXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZVtpXSA9IHRoaXMuY29uZmlnLnJhbmdlW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5zdGFydC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5zdGFydFtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydC5wdXNoKHRoaXMuY29uZmlnLnN0YXJ0W2ldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0YXJ0W2ldID0gdGhpcy5jb25maWcuc3RhcnRbaV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnB1c2godGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnN0YXJ0W2ldLCB0aGlzLnJhbmdlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy5zdGFydFtpXSwgdGhpcy5yYW5nZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy50dW1ibGVyLnB1c2gobmV3IFR1bWJsZXIodGhpcy5wb3NpdGlvbltpXSwgdGhpcy5vcmllbnRhdGlvbiwgaSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzQ29ubmVjdCkge1xyXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbi5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3QucHVzaChuZXcgQ29ubmVjdCgwLCB0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLm9yaWVudGF0aW9uKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0LnB1c2gobmV3IENvbm5lY3QodGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSwgdGhpcy5vcmllbnRhdGlvbikpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLmNvbm5lY3RbMF0uZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50dW1ibGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy50b29sdGlwLnB1c2gobmV3IFRvb2x0aXAodGhpcy5zdGFydFtpXSwgdGhpcy5vcmllbnRhdGlvbikpO1xyXG5cclxuICAgICAgICB0aGlzLnR1bWJsZXJbaV0uZWxlbWVudC5hcHBlbmQodGhpcy50b29sdGlwW2ldLmVsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMudHVtYmxlcltpXS5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQodGhpcy5zbGlkZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5pbnB1dCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLmlucHV0LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5pbnB1dC52YWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZS5wdXNoKG5ldyBJbnB1dChcclxuICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICB0aGlzLmNvbmZpZy5pbnB1dC52YWx1ZVtpXSxcclxuICAgICAgICAgIHRoaXMuY29uZmlnLnN0YXJ0W2ldLFxyXG4gICAgICAgICAgaSxcclxuICAgICAgICApKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5pbnB1dCAmJiB0aGlzLmNvbmZpZy5pbnB1dC50b29sdGlwKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRUb29sdGlwID0gbmV3IElucHV0KFxyXG4gICAgICAgICd0b29sdGlwJyxcclxuICAgICAgICB0aGlzLmNvbmZpZy5pbnB1dC50b29sdGlwWzBdLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVmlldyB9O1xyXG4iLCJpbXBvcnQgSGVscGVyIGZyb20gJy4vSGVscGVyJztcblxuY2xhc3MgQ29ubmVjdCBleHRlbmRzIEhlbHBlciB7XG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIHBvc2l0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xuXG4gIHByaXZhdGUgc3RhcnRQb3NpdGlvbjogbnVtYmVyO1xuXG4gIHByaXZhdGUgZW5kUG9zaXRpb246IG51bWJlcjtcblxuICBwcml2YXRlIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb247XG5cbiAgcHJpdmF0ZSBzdHlsZTogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3Ioc3RhcnRQb3NpdGlvbjogbnVtYmVyLCBlbmRQb3NpdGlvbjogbnVtYmVyLCBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xuICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ2Nvbm5lY3QnLCB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuc3RhcnRQb3NpdGlvbiwgdGhpcy5lbmRQb3NpdGlvbik7XG4gIH1cblxuICBzZXRQb3NpdGlvbihzdGFydFBvc2l0aW9uOiBudW1iZXIsIGVuZFBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICBjb25zdCBzdGFydDogbnVtYmVyID0gTWF0aC5yb3VuZChzdGFydFBvc2l0aW9uICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XG4gICAgY29uc3QgZW5kOiBudW1iZXIgPSBNYXRoLnJvdW5kKGVuZFBvc2l0aW9uICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XG4gICAgdGhpcy5wb3NpdGlvbiA9IFtzdGFydCwgZW5kXTtcbiAgICBpZiAoc3RhcnQgPT09IDApIHtcbiAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgdGhpcy5zdHlsZSA9IGB3aWR0aDogJHtlbmR9JTtgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdHlsZSA9IGBoZWlnaHQ6ICR7ZW5kfSU7YDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgdGhpcy5zdHlsZSA9IGBsZWZ0OiAke3N0YXJ0fSU7IHdpZHRoOiAkeyhlbmQgLSBzdGFydCl9JTtgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0eWxlID0gYHRvcDogJHtzdGFydH0lOyBoZWlnaHQ6ICR7KGVuZCAtIHN0YXJ0KX0lO2A7XG4gICAgfVxuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdGhpcy5zdHlsZSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvbm5lY3Q7XG4iLCJjbGFzcyBIZWxwZXIge1xuICAgIHJlYWRvbmx5IFRPX1RVTUJMRVJfUE9TSVRJT046IG51bWJlciA9IDFlNDtcblxuICAgIHJlYWRvbmx5IFRPX0NPTk5FQ1RfVVBEQVRFOiBudW1iZXIgPSAxZTI7XG5cbiAgICBnZXRQb3NpdGlvbkZyb21WYWx1ZSh2YWx1ZTogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9ICgodmFsdWUgLSByYW5nZVswXSkgLyAocmFuZ2VbMV0gLSByYW5nZVswXSkpO1xuICAgICAgcmVzdWx0ID0gTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT04pIC8gdGhpcy5UT19UVU1CTEVSX1BPU0lUSU9OO1xuXG4gICAgICBpZiAocmVzdWx0IDwgMCkge1xuICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA+IDEpIHtcbiAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZ2V0RGl2RWxlbWVudFdpdGhDbGFzcyhjc3NDbGFzczogdENzc0NsYXNzZXMsIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pOiBIVE1MRWxlbWVudCB7XG4gICAgICBjb25zdCBzdHJDbGFzczogc3RyaW5nID0gYFNSU19fJHtjc3NDbGFzc31gO1xuICAgICAgY29uc3QgY3NzQ2xhc3NXaXRob3V0T3JpZW50YXRpb246IHN0cmluZyA9IGAke3N0ckNsYXNzfSAke3N0ckNsYXNzfV9gO1xuICAgICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIChjc3NDbGFzc1dpdGhvdXRPcmllbnRhdGlvbiArIG9yaWVudGF0aW9uKSk7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBIZWxwZXI7XG4iLCJpbXBvcnQgSGVscGVyIGZyb20gJy4vSGVscGVyJztcbmltcG9ydCBUb29sdGlwIGZyb20gJy4vVG9vbHRpcCc7XG5cbmNsYXNzIElucHV0IGV4dGVuZHMgSGVscGVyIHtcbiAgcHJpdmF0ZSB0eXBlOiB0SW5wdXRUeXBlO1xuXG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIHB1YmxpYyB2YWx1ZT86IG51bWJlcjtcblxuICBwdWJsaWMgaW5kZXg/OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IodHlwZTogdElucHV0VHlwZSwgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgdmFsdWU/OiBudW1iZXIsIGluZGV4PzogbnVtYmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIGlmIChpbmRleCkge1xuICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25LZXlkb3duT3JNb3VzZW91dCh0aGlzOiBJbnB1dCwgY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIGlmICh0aGF0LnR5cGUgIT09ICd2YWx1ZScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5ZG93bik7XG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0Jywgb25Nb3VzZW91dCk7XG5cbiAgICBmdW5jdGlvbiBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdUYWInIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZW91dCgpIHtcbiAgICAgIGFjdGlvbigpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhY3Rpb24oKSB7XG4gICAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gTnVtYmVyKHRoYXQuZWxlbWVudC52YWx1ZSk7XG4gICAgICBpZiAodGhhdC5pbmRleCkge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblN3aXRjaENoZWNrKHRoaXM6IElucHV0LCB0b29sdGlwOiBUb29sdGlwW10pIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIGlmICh0aGF0LnR5cGUgIT09ICd0b29sdGlwJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b29sdGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGF0LmVsZW1lbnQuY2hlY2tlZCkge1xuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoSGlkZGVuKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoSGlkZGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbnB1dDtcbiIsImltcG9ydCBIZWxwZXIgZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBUb29sdGlwIGV4dGVuZHMgSGVscGVyIHtcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xuXG4gIHByaXZhdGUgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbjtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZTogbnVtYmVyLCBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCd0b29sdGlwJywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgdGhpcy5zZXRJbm5lclRleHQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXRJbm5lclRleHQodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IHZhbDogbnVtYmVyID0gdmFsdWUgPiAwXG4gICAgICA/IE1hdGguZmxvb3IodmFsdWUpXG4gICAgICA6IE1hdGguY2VpbCh2YWx1ZSk7XG5cbiAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSBTdHJpbmcodmFsKTtcbiAgfVxuXG4gIHN3aXRjaEhpZGRlbih0aGlzOiBUb29sdGlwLCBpc1Zpc2libGU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB0aGF0OiBUb29sdGlwID0gdGhpcztcbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcDtcbiIsImltcG9ydCBIZWxwZXIgZnJvbSAnLi9IZWxwZXInO1xyXG5cclxuY2xhc3MgVHVtYmxlciBleHRlbmRzIEhlbHBlciB7XHJcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBsaXN0ZW5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uLCBwcml2YXRlIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygndHVtYmxlcicsIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgICB0aGlzLnNldE5ld1Bvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE5ld1Bvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgICAgY29uc3QgbGl0ZXI6IHN0cmluZyA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/ICdYJyA6ICdZJztcclxuXHJcbiAgICAgIGNvbnN0IHN0eWxlOiBzdHJpbmcgPSBgdHJhbnNmb3JtOiB0cmFuc2xhdGUke2xpdGVyfSgke01hdGgucm91bmQocG9zaXRpb24gKiB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT04pfSUpO2A7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNoaWZ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXHJcbiAgICAgICAgPyBldmVudC5jbGllbnRYIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XHJcbiAgICAgICAgOiBldmVudC5jbGllbnRZIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2Vkb3duQW5kTW92ZSh0aGlzOiBUdW1ibGVyLCBjb250YWluZXI6IEhUTUxFbGVtZW50LCBjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgdGhhdC5saXN0ZW5pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNoaWZ0OiBudW1iZXIgPSB0aGlzLmdldFNoaWZ0KHRoYXQuZWxlbWVudCwgZXZlbnQpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlbW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2V1cCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uTW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICBsZXQgbmV3UG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICAgIGxldCBuZXdQb3NpdGlvblBlcmNlbnQ6IG51bWJlcjtcclxuICAgICAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyO1xyXG5cclxuICAgICAgICAgIGlmICh0aGF0Lm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgbmV3UG9zaXRpb25QZXJjZW50ID0gbmV3UG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdQb3NpdGlvbiA9IGV2ZW50LmNsaWVudFkgLSBzaGlmdCAtIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uUGVyY2VudCA9IG5ld1Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgcG9zaXRpb24gPSBuZXdQb3NpdGlvblBlcmNlbnQ7XHJcblxyXG4gICAgICAgICAgaWYgKHBvc2l0aW9uID4gMSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uLFxyXG4gICAgICAgICAgICBpbmRleDogdGhhdC5pbmRleCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25Nb3VzZXVwKCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZW1vdmUpO1xyXG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2V1cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBUdW1ibGVyO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9