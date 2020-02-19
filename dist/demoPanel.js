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
        var defaultConfig = {
            orientation: 'horizontal',
            start: [10],
            range: [0, 100],
            step: 1,
            connect: true,
            tooltip: true,
        };
        var completeConfig = {
            orientation: this.userConfig.orientation === undefined
                ? defaultConfig.orientation
                : this.userConfig.orientation,
            start: this.userConfig.start === undefined
                ? defaultConfig.start
                : this.userConfig.start,
            range: this.userConfig.range === undefined
                ? defaultConfig.range
                : this.userConfig.range,
            step: this.userConfig.step === undefined
                ? defaultConfig.step
                : this.userConfig.step,
            connect: this.userConfig.connect === undefined
                ? defaultConfig.connect
                : this.userConfig.connect,
            tooltip: this.userConfig.tooltip === undefined
                ? defaultConfig.tooltip
                : this.userConfig.tooltip,
            input: this.userConfig.input,
        };
        var modelConfig = {
            start: completeConfig.start,
            range: completeConfig.range,
            step: completeConfig.step,
        };
        var viewConfig = {
            orientation: completeConfig.orientation,
            start: completeConfig.start,
            range: completeConfig.range,
            isTooltip: completeConfig.tooltip,
            isConnect: completeConfig.connect,
            input: completeConfig.input,
        };
        this.view = new View_1.View(sliderContainer, viewConfig);
        this.model = new Model_1.Model(modelConfig);
        this.presenter = new Presenter_1.Presenter(this.view, this.model);
    }
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
            this.tumbler.push(new Tumbler_1.Tumbler(this.position[i], this.orientation, i));
        }
        if (this.isConnect) {
            if (this.position.length === 1) {
                this.connect.push(new Connect_1.Connect(0, this.position[0], this.orientation));
            }
            else {
                this.connect.push(new Connect_1.Connect(this.position[0], this.position[1], this.orientation));
            }
            this.slider.append(this.connect[0].element);
        }
        if (this.isTooltip) {
            for (var i = 0; i < this.tumbler.length; i++) {
                this.tooltip.push(new Tooltip_1.Tooltip(this.start[i], this.orientation));
                this.tumbler[i].element.append(this.tooltip[i].element);
            }
        }
        for (var i = 0; i < this.tumbler.length; i++) {
            this.slider.append(this.tumbler[i].element);
        }
        this.container.append(this.slider);
        if (this.config.input !== undefined && this.config.input.value !== undefined) {
            for (var i = 0; i < this.config.input.value.length; i++) {
                this.inputValue.push(new Input_1.Input('value', this.config.input.value[i], this.config.start[i], i));
            }
        }
        if (this.config.input && this.config.input.tooltip) {
            this.inputTooltip = new Input_1.Input('tooltip', this.config.input.tooltip[0]);
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
    function Connect(startPosition, endPosition, orientation) {
        var _this = _super.call(this) || this;
        _this.startPosition = startPosition;
        _this.endPosition = endPosition;
        _this.orientation = orientation;
        _this.position = [0, 0];
        _this.element = _this.getDivElementWithClass('connect', _this.orientation);
        _this.setPosition(_this.startPosition, _this.endPosition);
        return _this;
    }
    Connect.prototype.setPosition = function (startPosition, endPosition) {
        var start = Math.round(startPosition * this.TO_CONNECT_UPDATE);
        var end = Math.round(endPosition * this.TO_CONNECT_UPDATE);
        this.position = [start, end];
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
}(Helper_1.Helper));
exports.Input = Input;


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
}(Helper_1.Helper));
exports.Tooltip = Tooltip;


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
}(Helper_1.Helper));
exports.Tumbler = Tumbler;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9EZW1vX1BhbmVsL3RlbXBsYXRlLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Db250cm9sbGVyL1ByZXNlbnRlci50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1BsdWdpbi50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9WaWV3LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSGVscGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0lucHV0LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1Rvb2x0aXAudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVHVtYmxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFD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LElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtvQkFDaEIsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDZDtnQkFDRCxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7b0JBQ2hCLFFBQVEsR0FBRyxDQUFDLENBQUM7aUJBQ2Q7Z0JBRUQsUUFBUSxDQUFDO29CQUNQLFFBQVE7b0JBQ1IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNsQixDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsU0FBUyxTQUFTO2dCQUNoQixRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN2RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxDQTVFcUIsZUFBTSxHQTRFM0I7QUFDUSwwQkFBTyIsImZpbGUiOiJkZW1vUGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50c1wiKTtcbiIsImltcG9ydCB7IFNpbXBsZVJhbmdlU2xpZGVyIH0gZnJvbSAnLi4vUGx1Z2luL1BsdWdpbic7XHJcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZSc7XHJcblxyXG5jbGFzcyBEZW1vX1BhbmVsIHtcclxuXHJcbiAgdGVtcGxhdGU6IFRlbXBsYXRlO1xyXG4gIHJhbmdlX3NsaWRlcjogIFNpbXBsZVJhbmdlU2xpZGVyO1xyXG4gIGVtcHR5X3NsaWRlcjogc3RyaW5nO1xyXG5cclxuICBkZWZhdWx0Q29uZmlnOiBJX0RFTU9fZGVmYXVsdENvbmZpZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZW1vX3BhbmVsOiBKUXVlcnksIHByaXZhdGUgc2xpZGVyOiBKUXVlcnksIHByaXZhdGUgaW5wdXRzOiBJX0RFTU9fSW5wdXQpIHtcclxuICAgIHRoaXMudGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcclxuICAgIHRoaXMuZGVtb19wYW5lbC5hcHBlbmQodGhpcy50ZW1wbGF0ZS5kZW1vX3BhbmVsKTtcclxuXHJcbiAgICB0aGlzLmVtcHR5X3NsaWRlciA9ICcjJyArIHNsaWRlci5nZXQoMCkuaWQ7XHJcblxyXG4gICAgdGhpcy5kZWZhdWx0Q29uZmlnID0ge1xyXG4gICAgICByYW5nZTogWzAsIDEwMF0sXHJcbiAgICAgIHN0YXJ0OiBbMTBdLFxyXG4gICAgICBzdGVwOiAxXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yYW5nZV9zbGlkZXIgPSBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIodGhpcy5zbGlkZXIsIHtcclxuICAgICAgcmFuZ2U6IFstMTAwLCAxMDBdLFxyXG4gICAgICBzdGFydDogWy01MCwgNTBdLFxyXG4gICAgICBzdGVwOiAxMCxcclxuICAgICAgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiB0cnVlLFxyXG4gICAgICBpbnB1dDogdGhpcy5pbnB1dHNcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB0ZW1wbGF0ZV9pbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXSA9IFtcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9taW4sXHJcbiAgICAgIHRoaXMudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWF4LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWF4LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnN0ZXBfaW5wdXQsXHJcbiAgICAgIHRoaXMudGVtcGxhdGUub3JpZW50YXRpb25faW5wdXQsXHJcbiAgICAgIHRoaXMudGVtcGxhdGUuY29ubmVjdENvbmZpZ0lucHV0XHJcbiAgICBdXHJcbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRlbXBsYXRlX2lucHV0cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgdGhpcy5vbl9jaGFuZ2VfaW5wdXQodGVtcGxhdGVfaW5wdXRzW2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uX2NoYW5nZV9pbnB1dCh0aGlzOiBEZW1vX1BhbmVsLCBpbnB1dDogSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBvbk1vdXNlb3V0KTtcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uX2NoYW5nZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgIGlmKGV2ZW50LmtleSA9PT0gXCJUYWJcIiB8fCBldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICAgIGFjdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25Nb3VzZW91dCgpIHtcclxuICAgICAgYWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25fY2hhbmdlKCkge1xyXG4gICAgICBhY3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhY3Rpb24oKSB7XHJcblxyXG4gICAgICBsZXQgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gPSBbXHJcbiAgICAgICAgdGhhdC50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9taW4udmFsdWUgIT09ICcnXHJcbiAgICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnJhbmdlX2lucHV0X21pbi52YWx1ZSlcclxuICAgICAgICAgIDogdGhhdC5kZWZhdWx0Q29uZmlnLnJhbmdlWzBdLFxyXG4gICAgICAgIHRoYXQudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWF4LnZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9tYXgudmFsdWUpXHJcbiAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5yYW5nZVsxXSxcclxuICAgICAgXVxyXG4gICAgICBsZXQgc3RhcnQ6IFRfREVNT19TdGFydCA9IHRoYXQudGVtcGxhdGUuc3RhcnRDb25maWdJbnB1dF9tYXgudmFsdWUgIT09ICcnXHJcbiAgICAgICAgPyBbXHJcbiAgICAgICAgICB0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnZhbHVlKVxyXG4gICAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5zdGFydFswXSxcclxuICAgICAgICAgIE51bWJlcih0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWF4LnZhbHVlKVxyXG4gICAgICAgIF1cclxuICAgICAgICA6IFtcclxuICAgICAgICAgIHRoYXQudGVtcGxhdGUuc3RhcnRDb25maWdJbnB1dF9taW4udmFsdWUgIT09ICcnXHJcbiAgICAgICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUuc3RhcnRDb25maWdJbnB1dF9taW4udmFsdWUpXHJcbiAgICAgICAgICAgIDogdGhhdC5kZWZhdWx0Q29uZmlnLnN0YXJ0WzBdXHJcbiAgICAgICAgXVxyXG4gICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhhdC50ZW1wbGF0ZS5zdGVwX2lucHV0LnZhbHVlICE9PSAnJ1xyXG4gICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUuc3RlcF9pbnB1dC52YWx1ZSlcclxuICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5zdGVwO1xyXG4gICAgICBsZXQgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbiA9IHRoYXQudGVtcGxhdGUub3JpZW50YXRpb25faW5wdXQuY2hlY2tlZFxyXG4gICAgICAgID8gJ2hvcml6b250YWwnXHJcbiAgICAgICAgOiAndmVydGljYWwnO1xyXG4gICAgICBsZXQgY29ubmVjdDogYm9vbGVhbiA9IHRoYXQudGVtcGxhdGUuY29ubmVjdENvbmZpZ0lucHV0LmNoZWNrZWRcclxuICAgICAgICA/IHRydWVcclxuICAgICAgICA6IGZhbHNlO1xyXG5cclxuICAgICAgdGhhdC5zbGlkZXIgPSAkKHRoYXQuZW1wdHlfc2xpZGVyKS5lbXB0eSgpO1xyXG4gICAgICB0aGF0LnJhbmdlX3NsaWRlciA9IG5ldyBTaW1wbGVSYW5nZVNsaWRlcih0aGF0LnNsaWRlciwge1xyXG4gICAgICAgIHJhbmdlOiByYW5nZSxcclxuICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgc3RlcDogc3RlcCxcclxuICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb24sXHJcbiAgICAgICAgY29ubmVjdDogY29ubmVjdCxcclxuICAgICAgICB0b29sdGlwOiB0cnVlLFxyXG4gICAgICAgIGlucHV0OiB0aGF0LmlucHV0c1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtEZW1vX1BhbmVsfTtcclxuXHJcbihmdW5jdGlvbigkOiBKUXVlcnlTdGF0aWMpIHtcclxuICAkLmZuLmV4dGVuZCh7XHJcbiAgICBEZW1vX1BhbmVsOiBmdW5jdGlvbihzbGlkZXI6IEpRdWVyeSwgaW5wdXRzOiBJX0RFTU9fSW5wdXQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEZW1vX1BhbmVsKDxKUXVlcnk+IHRoaXMsIDxKUXVlcnk+IHNsaWRlciwgPElfREVNT19JbnB1dD4gaW5wdXRzKTtcclxuICAgIH1cclxuICB9KTtcclxufSAoalF1ZXJ5KSApOyIsImNsYXNzIFRlbXBsYXRlIHtcclxuICByYW5nZV9pbnB1dF9taW46IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcmFuZ2VfaW5wdXRfbWF4OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBzdGFydENvbmZpZ0lucHV0X21pbjogSFRNTElucHV0RWxlbWVudDtcclxuICBzdGFydENvbmZpZ0lucHV0X21heDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgc3RlcF9pbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgb3JpZW50YXRpb25faW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIGNvbm5lY3RDb25maWdJbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgZGVtb19wYW5lbDogSFRNTEVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyByYW5nZSBsaW5lXHJcbiAgICBsZXQgcmFuZ2VfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIHJhbmdlX3RleHQuaW5uZXJUZXh0ID0gJ1JhbmdlOiAnO1xyXG4gICAgdGhpcy5yYW5nZV9pbnB1dF9taW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnJhbmdlX2lucHV0X21pbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICB0aGlzLnJhbmdlX2lucHV0X21pbi52YWx1ZSA9ICctMTAwJztcclxuICAgIHRoaXMucmFuZ2VfaW5wdXRfbWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9tYXguc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9tYXgudmFsdWUgPSAnMTAwJztcclxuICAgIGxldCByYW5nZV9saW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHJhbmdlX2xpbmUuYXBwZW5kKHJhbmdlX3RleHQsIHRoaXMucmFuZ2VfaW5wdXRfbWluLCB0aGlzLnJhbmdlX2lucHV0X21heCk7XHJcbiAgICAvLyBzdGFydCBsaW5lXHJcbiAgICBsZXQgc3RhcnRfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIHN0YXJ0X3RleHQuaW5uZXJUZXh0ID0gJ1N0YXJ0OiAnO1xyXG4gICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9taW4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21pbi52YWx1ZSA9ICctNTAnO1xyXG4gICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9tYXguc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5zdGFydENvbmZpZ0lucHV0X21heC52YWx1ZSA9ICc1MCc7XHJcbiAgICBsZXQgc3RhcnRfbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBzdGFydF9saW5lLmFwcGVuZChzdGFydF90ZXh0LCB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWluLCB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWF4KTtcclxuICAgIC8vIHN0ZXAgbGluZVxyXG4gICAgbGV0IHN0ZXBfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIHN0ZXBfdGV4dC5pbm5lclRleHQgPSAnU3RlcDogJztcclxuICAgIHRoaXMuc3RlcF9pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc3RlcF9pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICB0aGlzLnN0ZXBfaW5wdXQudmFsdWUgPSAnMTAnO1xyXG4gICAgbGV0IHN0ZXBfbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBzdGVwX2xpbmUuYXBwZW5kKHN0ZXBfdGV4dCwgdGhpcy5zdGVwX2lucHV0KTtcclxuICAgIC8vIG9yaWVudGF0aW9uIGxpbmVcclxuICAgIGxldCBvcmllbnRhdGlvbl90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgb3JpZW50YXRpb25fdGV4dC5pbm5lclRleHQgPSAnT3JpZW50YXRpb24gaG9yaXpvbnRhbC92ZXJ0aWNhbDogJztcclxuICAgIHRoaXMub3JpZW50YXRpb25faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLm9yaWVudGF0aW9uX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xyXG4gICAgICB0aGlzLm9yaWVudGF0aW9uX2lucHV0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgbGV0IG9yaWVudGF0aW9uX2xpbmU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIG9yaWVudGF0aW9uX2xpbmUuYXBwZW5kKG9yaWVudGF0aW9uX3RleHQsIHRoaXMub3JpZW50YXRpb25faW5wdXQpO1xyXG4gICAgLy8gY29ubmVjdCBsaW5lXHJcbiAgICBsZXQgY29ubmVjdF90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgY29ubmVjdF90ZXh0LmlubmVyVGV4dCA9ICdDb25uZWN0IG9uL29mZjogJztcclxuICAgIHRoaXMuY29ubmVjdENvbmZpZ0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5jb25uZWN0Q29uZmlnSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcbiAgICAgIHRoaXMuY29ubmVjdENvbmZpZ0lucHV0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgbGV0IGNvbm5lY3RfbGluZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY29ubmVjdF9saW5lLmFwcGVuZChjb25uZWN0X3RleHQsIHRoaXMuY29ubmVjdENvbmZpZ0lucHV0KTtcclxuXHJcbiAgICB0aGlzLmRlbW9fcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGhpcy5kZW1vX3BhbmVsLmFwcGVuZChyYW5nZV9saW5lLCBzdGFydF9saW5lLCBzdGVwX2xpbmUsIG9yaWVudGF0aW9uX2xpbmUsIGNvbm5lY3RfbGluZSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCB7VGVtcGxhdGV9IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4uL1ZpZXcvVmlldyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL01vZGVsL01vZGVsJztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3OiBWaWV3LCBwcml2YXRlIG1vZGVsOiBNb2RlbCkge1xuICAgIHRoaXMudmlldy5vbkNoYW5nZVZpZXcoKHR1bWJsZXJEYXRhOiB0VHVtYmxlckRhdGEpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHR1bWJsZXJEYXRhKTtcbiAgICAgIHRoaXMubW9kZWwuc2V0TmV3UG9zaXRpb24odHVtYmxlckRhdGEpO1xuICAgIH0pO1xuICAgIHRoaXMubW9kZWwub25DaGFuZ2VNb2RlbCgobW9kZWxEYXRhOiB0TW9kZWxEYXRhKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbERhdGEpO1xuICAgICAgdGhpcy52aWV3LnVwZGF0ZShtb2RlbERhdGEpO1xuICAgIH0pO1xuICB9XG59XG5leHBvcnQgeyBQcmVzZW50ZXIgfTtcbiIsImNsYXNzIE1vZGVsIHtcbiAgICB2YWx1ZTogdFZhbHVlID0gWzBdO1xuXG4gICAgcmFuZ2U6IHRSYW5nZSA9IFswLCAwXTtcblxuICAgIHN0ZXA6IG51bWJlciA9IDA7XG5cbiAgICBwb3NpdGlvbjogdFBvc2l0aW9uID0gWzBdO1xuXG4gICAgYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjYWxsYmFja0xpc3Q6IGlNb2RlbENhbGxiYWNrW107XG5cbiAgICByZWFkb25seSBUT19OT1JNQUxJWkVfUE9TSVRJT046IG51bWJlciA9IDFlNDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBpQ29uZmlnTW9kZWwpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tMaXN0ID0gW107XG5cbiAgICAgIHRoaXMuc3RlcCA9IHRoaXMuY29uZmlnLnN0ZXA7XG5cbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNldE5ld1Bvc2l0aW9uKHR1bWJsZXJEYXRhOiB0VHVtYmxlckRhdGEpIHtcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHR1bWJsZXJEYXRhO1xuICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xuXG4gICAgICBjb25zdCBuZXdWYWx1ZTogbnVtYmVyID0gdGhpcy5nZXROZXdWYWx1ZSh0dW1ibGVyRGF0YSk7XG5cbiAgICAgIHRoaXMuY2hlY2tTdGVwQ29uZGl0aW9uKG5ld1ZhbHVlLCBpbmRleCk7XG4gICAgICAvLyBjaGVjayBmb3IgY29sbGlzaW9uXG4gICAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGggPiAxICYmIHRoaXMudmFsdWVbMV0pIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMF0gPCB0aGlzLnZhbHVlWzFdKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TmV3VmFsdWUodHVtYmxlckRhdGE6IHRUdW1ibGVyRGF0YSk6IG51bWJlciB7XG4gICAgICBjb25zdCB7IGluZGV4IH0gPSB0dW1ibGVyRGF0YTtcbiAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyID0gdGhpcy52YWx1ZVtpbmRleF07XG4gICAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcblxuICAgICAgaWYgKHR1bWJsZXJEYXRhLnBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgdG1wUG9zaXRpb246IG51bWJlciA9IE1hdGgucm91bmQodHVtYmxlckRhdGEucG9zaXRpb24gKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTik7XG4gICAgICAgIHBvc2l0aW9uID0gdG1wUG9zaXRpb24gLyB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTjtcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmdldFZhbHVlRnJvbVBvc2l0aW9uKHBvc2l0aW9uLCB0aGlzLnJhbmdlKTtcbiAgICAgIH0gZWxzZSBpZiAodHVtYmxlckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHR1bWJsZXJEYXRhLnZhbHVlO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiB0aGlzLnZhbHVlWzFdKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlID4gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlWzFdIC0gdGhpcy5zdGVwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IDEpIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgPCB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgfVxuXG4gICAgY2hlY2tTdGVwQ29uZGl0aW9uKG5ld1ZhbHVlOiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IGNvbmRpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFtcbiAgICAgICAgdGhpcy52YWx1ZVtpbmRleF0gLSB0aGlzLnN0ZXAsXG4gICAgICAgIHRoaXMudmFsdWVbaW5kZXhdICsgdGhpcy5zdGVwLFxuICAgICAgXTtcblxuICAgICAgaWYgKG5ld1ZhbHVlID49IGNvbmRpdGlvblsxXSB8fCBuZXdWYWx1ZSA8PSBjb25kaXRpb25bMF0pIHtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZUFuZFBvc2l0aW9uKG5ld1ZhbHVlLCBpbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5jYWxsYmFja0xpc3QuZm9yRWFjaCgoY2FsbGJhY2s6IGlNb2RlbENhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbixcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICBpbmRleDogdGhpcy5hY3RpdmVJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZU1vZGVsKGNhbGxiYWNrOiBpTW9kZWxDYWxsYmFjaykge1xuICAgICAgdGhpcy5jYWxsYmFja0xpc3QucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZ2V0UG9zaXRpb25Gcm9tVmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IHRSYW5nZSk6IG51bWJlciB7XG4gICAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9ICh2YWx1ZSAtIHJhbmdlWzBdKSAvIChyYW5nZVsxXSAtIHJhbmdlWzBdKTtcblxuICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKSAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKTtcbiAgICB9XG5cbiAgICBnZXRWYWx1ZUZyb21Qb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gKHBvc2l0aW9uICogKHJhbmdlWzFdIC0gcmFuZ2VbMF0pKSArIHJhbmdlWzBdO1xuXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0KSk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVBbmRQb3NpdGlvbihuZXdWYWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcbiAgICAgIHRoaXMudmFsdWVbaV0gPSBuZXdWYWx1ZSA+IDBcbiAgICAgICAgPyAoTWF0aC5jZWlsKG5ld1ZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcClcbiAgICAgICAgOiAoTWF0aC5mbG9vcihuZXdWYWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMucmFuZ2VbMF0pIHtcbiAgICAgICAgICB0aGlzLnZhbHVlWzBdID0gdGhpcy5yYW5nZVswXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaSA9PT0gMSAmJiB0aGlzLnZhbHVlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0gPiB0aGlzLnJhbmdlWzFdKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMucmFuZ2VbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcucmFuZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMucmFuZ2UucHVzaCh0aGlzLmNvbmZpZy5yYW5nZVtpXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yYW5nZVtpXSA9IHRoaXMuY29uZmlnLnJhbmdlW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudmFsdWUucHVzaCh0aGlzLmNvbmZpZy5zdGFydFtpXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMuY29uZmlnLnN0YXJ0W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCh0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgTW9kZWwgfTtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuL1ZpZXcvVmlldyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vTW9kZWwvTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XG5cbmNsYXNzIFNpbXBsZVJhbmdlU2xpZGVyIHtcbiAgICB2aWV3OiBWaWV3O1xuXG4gICAgbW9kZWw6IE1vZGVsO1xuXG4gICAgcHJlc2VudGVyOiBQcmVzZW50ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSlF1ZXJ5LCBwcml2YXRlIHVzZXJDb25maWc6IGlDb25maWdVc2VyKSB7XG4gICAgICBjb25zdCBzbGlkZXJDb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xuXG4gICAgICBjb25zdCBkZWZhdWx0Q29uZmlnOiBpQ29uZmlnVXNlciA9IHtcbiAgICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgc3RhcnQ6IFsxMF0sXG4gICAgICAgIHJhbmdlOiBbMCwgMTAwXSxcbiAgICAgICAgc3RlcDogMSxcbiAgICAgICAgY29ubmVjdDogdHJ1ZSxcbiAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlQ29uZmlnOiBpQ29uZmlnVXNlciA9IHtcbiAgICAgICAgb3JpZW50YXRpb246IHRoaXMudXNlckNvbmZpZy5vcmllbnRhdGlvbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLm9yaWVudGF0aW9uXG4gICAgICAgICAgOiB0aGlzLnVzZXJDb25maWcub3JpZW50YXRpb24sXG4gICAgICAgIHN0YXJ0OiB0aGlzLnVzZXJDb25maWcuc3RhcnQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy5zdGFydFxuICAgICAgICAgIDogdGhpcy51c2VyQ29uZmlnLnN0YXJ0LFxuICAgICAgICByYW5nZTogdGhpcy51c2VyQ29uZmlnLnJhbmdlID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcucmFuZ2VcbiAgICAgICAgICA6IHRoaXMudXNlckNvbmZpZy5yYW5nZSxcbiAgICAgICAgc3RlcDogdGhpcy51c2VyQ29uZmlnLnN0ZXAgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy5zdGVwXG4gICAgICAgICAgOiB0aGlzLnVzZXJDb25maWcuc3RlcCxcbiAgICAgICAgY29ubmVjdDogdGhpcy51c2VyQ29uZmlnLmNvbm5lY3QgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy5jb25uZWN0XG4gICAgICAgICAgOiB0aGlzLnVzZXJDb25maWcuY29ubmVjdCxcbiAgICAgICAgdG9vbHRpcDogdGhpcy51c2VyQ29uZmlnLnRvb2x0aXAgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy50b29sdGlwXG4gICAgICAgICAgOiB0aGlzLnVzZXJDb25maWcudG9vbHRpcCxcbiAgICAgICAgaW5wdXQ6IHRoaXMudXNlckNvbmZpZy5pbnB1dCxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1vZGVsQ29uZmlnOiBpQ29uZmlnTW9kZWwgPSB7XG4gICAgICAgIHN0YXJ0OiBjb21wbGV0ZUNvbmZpZy5zdGFydCxcbiAgICAgICAgcmFuZ2U6IGNvbXBsZXRlQ29uZmlnLnJhbmdlLFxuICAgICAgICBzdGVwOiBjb21wbGV0ZUNvbmZpZy5zdGVwLFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgdmlld0NvbmZpZzogaUNvbmZpZ1ZpZXcgPSB7XG4gICAgICAgIG9yaWVudGF0aW9uOiBjb21wbGV0ZUNvbmZpZy5vcmllbnRhdGlvbixcbiAgICAgICAgc3RhcnQ6IGNvbXBsZXRlQ29uZmlnLnN0YXJ0LFxuICAgICAgICByYW5nZTogY29tcGxldGVDb25maWcucmFuZ2UsXG4gICAgICAgIGlzVG9vbHRpcDogY29tcGxldGVDb25maWcudG9vbHRpcCxcbiAgICAgICAgaXNDb25uZWN0OiBjb21wbGV0ZUNvbmZpZy5jb25uZWN0LFxuICAgICAgICBpbnB1dDogY29tcGxldGVDb25maWcuaW5wdXQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzbGlkZXJDb250YWluZXIsIHZpZXdDb25maWcpO1xuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChtb2RlbENvbmZpZyk7XG4gICAgICB0aGlzLnByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIodGhpcy52aWV3LCB0aGlzLm1vZGVsKTtcbiAgICB9XG59XG5leHBvcnQgeyBTaW1wbGVSYW5nZVNsaWRlciB9O1xuXG4oZnVuY3Rpb24gKCQ6IEpRdWVyeVN0YXRpYykge1xuICAkLmZuLmV4dGVuZCh7XG4gICAgU2ltcGxlUmFuZ2VTbGlkZXIodXNlckNvbmZpZzogaUNvbmZpZ1VzZXIpIHtcbiAgICAgIHJldHVybiBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIoPEpRdWVyeT4gdGhpcywgPGlDb25maWdVc2VyPiB1c2VyQ29uZmlnKTtcbiAgICB9LFxuICB9KTtcbn0oalF1ZXJ5KSk7XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL2VudGl0aWVzL0hlbHBlcic7XG5pbXBvcnQgeyBUdW1ibGVyIH0gZnJvbSAnLi9lbnRpdGllcy9UdW1ibGVyJztcbmltcG9ydCB7IENvbm5lY3QgfSBmcm9tICcuL2VudGl0aWVzL0Nvbm5lY3QnO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJy4vZW50aXRpZXMvVG9vbHRpcCc7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4vZW50aXRpZXMvSW5wdXQnO1xuXG5jbGFzcyBWaWV3IGV4dGVuZHMgSGVscGVyIHtcbiAgcG9zaXRpb246IHRQb3NpdGlvbiA9IFswXTtcblxuICByYW5nZTogdFJhbmdlID0gWzAsIDBdO1xuXG4gIHN0YXJ0OiB0VmFsdWUgPSBbMF07XG5cbiAgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbjtcblxuICBpc1Rvb2x0aXA6IGJvb2xlYW47XG5cbiAgaXNDb25uZWN0OiBib29sZWFuO1xuXG4gIHNsaWRlcjogSFRNTEVsZW1lbnQ7XG5cbiAgdHVtYmxlcjogVHVtYmxlcltdID0gW107XG5cbiAgY29ubmVjdDogQ29ubmVjdFtdID0gW107XG5cbiAgdG9vbHRpcDogVG9vbHRpcFtdID0gW107XG5cbiAgaW5wdXRWYWx1ZTogSW5wdXRbXSA9IFtdO1xuXG4gIGlucHV0VG9vbHRpcD86IElucHV0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBjb25maWc6IGlDb25maWdWaWV3KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaXNUb29sdGlwID0gdGhpcy5jb25maWcuaXNUb29sdGlwO1xuICAgIHRoaXMuaXNDb25uZWN0ID0gdGhpcy5jb25maWcuaXNDb25uZWN0O1xuICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLmNvbmZpZy5vcmllbnRhdGlvbjtcblxuICAgIHRoaXMuc2xpZGVyID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCdzbGlkZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgb25DaGFuZ2VWaWV3KGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudHVtYmxlcltpXS5vbk1vdXNlZG93bkFuZE1vdmUodGhpcy5jb250YWluZXIsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW5wdXRWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWVbaV0ub25LZXlkb3duT3JNb3VzZW91dChjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0VG9vbHRpcCAmJiB0aGlzLmlzVG9vbHRpcCkge1xuICAgICAgdGhpcy5pbnB1dFRvb2x0aXAub25Td2l0Y2hDaGVjayh0aGlzLnRvb2x0aXApO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShtb2RlbERhdGE6IHRNb2RlbERhdGEpIHtcbiAgICBjb25zdCBpOiBudW1iZXIgPSBtb2RlbERhdGEuaW5kZXg7XG4gICAgY29uc3QgeyBwb3NpdGlvbiB9ID0gbW9kZWxEYXRhO1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IG1vZGVsRGF0YTtcblxuICAgIHRoaXMuc2V0QWN0aXZldHVtYmxlcihwb3NpdGlvbiwgaSk7XG5cbiAgICB0aGlzLnR1bWJsZXJbaV0uc2V0TmV3UG9zaXRpb24ocG9zaXRpb25baV0pO1xuXG4gICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XG4gICAgICB0aGlzLnRvb2x0aXBbaV0uc2V0SW5uZXJUZXh0KHZhbHVlW2ldKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbnB1dFZhbHVlWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZVtpXS5lbGVtZW50LnZhbHVlID0gU3RyaW5nKHZhbHVlW2ldKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Nvbm5lY3QpIHtcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLmNvbm5lY3RbMF0uc2V0UG9zaXRpb24oMCwgcG9zaXRpb25bMF0pO1xuICAgICAgfSBlbHNlIGlmIChwb3NpdGlvblsxXSkge1xuICAgICAgICB0aGlzLmNvbm5lY3RbMF0uc2V0UG9zaXRpb24ocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRBY3RpdmV0dW1ibGVyKHBvc2l0aW9uOiB0UG9zaXRpb24sIGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIHRoaXMudHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgdGhpcy50dW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnR1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XG4gICAgICAgIHRoaXMudHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XG4gICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5yYW5nZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJhbmdlLnB1c2godGhpcy5jb25maWcucmFuZ2VbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yYW5nZVtpXSA9IHRoaXMuY29uZmlnLnJhbmdlW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnN0YXJ0W2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zdGFydC5wdXNoKHRoaXMuY29uZmlnLnN0YXJ0W2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnRbaV0gPSB0aGlzLmNvbmZpZy5zdGFydFtpXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnB1c2godGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnN0YXJ0W2ldLCB0aGlzLnJhbmdlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnN0YXJ0W2ldLCB0aGlzLnJhbmdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudHVtYmxlci5wdXNoKG5ldyBUdW1ibGVyKHRoaXMucG9zaXRpb25baV0sIHRoaXMub3JpZW50YXRpb24sIGkpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Nvbm5lY3QpIHtcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLmNvbm5lY3QucHVzaChuZXcgQ29ubmVjdCgwLCB0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLm9yaWVudGF0aW9uKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbm5lY3QucHVzaChuZXcgQ29ubmVjdCh0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdLCB0aGlzLm9yaWVudGF0aW9uKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy5jb25uZWN0WzBdLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzVG9vbHRpcCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy50b29sdGlwLnB1c2gobmV3IFRvb2x0aXAodGhpcy5zdGFydFtpXSwgdGhpcy5vcmllbnRhdGlvbikpO1xuXG4gICAgICAgIHRoaXMudHVtYmxlcltpXS5lbGVtZW50LmFwcGVuZCh0aGlzLnRvb2x0aXBbaV0uZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLnR1bWJsZXJbaV0uZWxlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMuc2xpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5pbnB1dCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLmlucHV0LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuaW5wdXQudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlLnB1c2gobmV3IElucHV0KFxuICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgdGhpcy5jb25maWcuaW5wdXQudmFsdWVbaV0sXG4gICAgICAgICAgdGhpcy5jb25maWcuc3RhcnRbaV0sXG4gICAgICAgICAgaSxcbiAgICAgICAgKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLmlucHV0ICYmIHRoaXMuY29uZmlnLmlucHV0LnRvb2x0aXApIHtcbiAgICAgIHRoaXMuaW5wdXRUb29sdGlwID0gbmV3IElucHV0KFxuICAgICAgICAndG9vbHRpcCcsXG4gICAgICAgIHRoaXMuY29uZmlnLmlucHV0LnRvb2x0aXBbMF0sXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBWaWV3IH07XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XG5cbmNsYXNzIENvbm5lY3QgZXh0ZW5kcyBIZWxwZXIge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgcG9zaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgc3RhcnRQb3NpdGlvbjogbnVtYmVyLFxuICAgICAgcHJpdmF0ZSBlbmRQb3NpdGlvbjogbnVtYmVyLFxuICAgICAgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uLFxuICAgICkge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCdjb25uZWN0JywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuc3RhcnRQb3NpdGlvbiwgdGhpcy5lbmRQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24oc3RhcnRQb3NpdGlvbjogbnVtYmVyLCBlbmRQb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICBjb25zdCBzdGFydDogbnVtYmVyID0gTWF0aC5yb3VuZChzdGFydFBvc2l0aW9uICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XG4gICAgICBjb25zdCBlbmQ6IG51bWJlciA9IE1hdGgucm91bmQoZW5kUG9zaXRpb24gKiB0aGlzLlRPX0NPTk5FQ1RfVVBEQVRFKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbiA9IFtzdGFydCwgZW5kXTtcbiAgICAgIGNvbnN0IHN0eWxlOiBzdHJpbmcgPSBzdGFydCA9PT0gMFxuICAgICAgICA/IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xuICAgICAgICAgID8gYHdpZHRoOiAke2VuZH0lO2BcbiAgICAgICAgICA6IGBoZWlnaHQ6ICR7ZW5kfSU7YFxuICAgICAgICA6IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xuICAgICAgICAgID8gYGxlZnQ6ICR7c3RhcnR9JTsgd2lkdGg6ICR7KGVuZCAtIHN0YXJ0KX0lO2BcbiAgICAgICAgICA6IGB0b3A6ICR7c3RhcnR9JTsgaGVpZ2h0OiAkeyhlbmQgLSBzdGFydCl9JTtgO1xuXG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICB9XG59XG5leHBvcnQgeyBDb25uZWN0IH07XG4iLCJjbGFzcyBIZWxwZXIge1xuICAgIHJlYWRvbmx5IFRPX1RVTUJMRVJfUE9TSVRJT046IG51bWJlciA9IDFlNDtcblxuICAgIHJlYWRvbmx5IFRPX0NPTk5FQ1RfVVBEQVRFOiBudW1iZXIgPSAxZTI7XG5cbiAgICBnZXRQb3NpdGlvbkZyb21WYWx1ZSh2YWx1ZTogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9ICgodmFsdWUgLSByYW5nZVswXSkgLyAocmFuZ2VbMV0gLSByYW5nZVswXSkpO1xuICAgICAgcmVzdWx0ID0gTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT04pIC8gdGhpcy5UT19UVU1CTEVSX1BPU0lUSU9OO1xuXG4gICAgICBpZiAocmVzdWx0IDwgMCkge1xuICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA+IDEpIHtcbiAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZ2V0RGl2RWxlbWVudFdpdGhDbGFzcyhjc3NDbGFzczogdENzc0NsYXNzZXMsIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pOiBIVE1MRWxlbWVudCB7XG4gICAgICBjb25zdCBzdHJDbGFzczogc3RyaW5nID0gYFNSU19fJHtjc3NDbGFzc31gO1xuICAgICAgY29uc3QgY3NzQ2xhc3NXaXRob3V0T3JpZW50YXRpb246IHN0cmluZyA9IGAke3N0ckNsYXNzfSAke3N0ckNsYXNzfV9gO1xuXG4gICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGNzc0NsYXNzV2l0aG91dE9yaWVudGF0aW9uICsgb3JpZW50YXRpb24pKTtcblxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0IHsgSGVscGVyIH07XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9Ub29sdGlwJztcblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBIZWxwZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHR5cGU6IHRJbnB1dFR5cGUsXG4gICAgcHVibGljIGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsXG4gICAgcHVibGljIHZhbHVlPzogbnVtYmVyLFxuICAgIHB1YmxpYyBpbmRleD86IG51bWJlcixcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAodHlwZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25LZXlkb3duT3JNb3VzZW91dCh0aGlzOiBJbnB1dCwgY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIGlmICh0aGF0LnR5cGUgIT09ICd2YWx1ZScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5ZG93bik7XG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0Jywgb25Nb3VzZW91dCk7XG5cbiAgICBmdW5jdGlvbiBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdUYWInIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZW91dCgpIHtcbiAgICAgIGFjdGlvbigpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhY3Rpb24oKSB7XG4gICAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gTnVtYmVyKHRoYXQuZWxlbWVudC52YWx1ZSk7XG4gICAgICBpZiAodGhhdC5pbmRleCkge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblN3aXRjaENoZWNrKHRoaXM6IElucHV0LCB0b29sdGlwOiBUb29sdGlwW10pIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIGlmICh0aGF0LnR5cGUgIT09ICd0b29sdGlwJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b29sdGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGF0LmVsZW1lbnQuY2hlY2tlZCkge1xuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoSGlkZGVuKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoSGlkZGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgeyBJbnB1dCB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBUb29sdGlwIGV4dGVuZHMgSGVscGVyIHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygndG9vbHRpcCcsIHRoaXMub3JpZW50YXRpb24pO1xuICAgICAgdGhpcy5zZXRJbm5lclRleHQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0SW5uZXJUZXh0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IHZhbDogbnVtYmVyID0gdmFsdWUgPiAwXG4gICAgICAgID8gTWF0aC5mbG9vcih2YWx1ZSlcbiAgICAgICAgOiBNYXRoLmNlaWwodmFsdWUpO1xuXG4gICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IFN0cmluZyh2YWwpO1xuICAgIH1cblxuICAgIHN3aXRjaEhpZGRlbih0aGlzOiBUb29sdGlwLCBpc1Zpc2libGU6IGJvb2xlYW4pIHtcbiAgICAgIGNvbnN0IHRoYXQ6IFRvb2x0aXAgPSB0aGlzO1xuICAgICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgeyBUb29sdGlwIH07XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XG5cbmNsYXNzIFR1bWJsZXIgZXh0ZW5kcyBIZWxwZXIge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgbGlzdGVuaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uLCBwcml2YXRlIGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygndHVtYmxlcicsIHRoaXMub3JpZW50YXRpb24pO1xuICAgICAgdGhpcy5zZXROZXdQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBzZXROZXdQb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgIGNvbnN0IGxpdGVyOiBzdHJpbmcgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnWCcgOiAnWSc7XG5cbiAgICAgIGNvbnN0IHN0eWxlOiBzdHJpbmcgPSBgdHJhbnNmb3JtOiB0cmFuc2xhdGUke2xpdGVyfSgke01hdGgucm91bmQocG9zaXRpb24gKiB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT04pfSUpO2A7XG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICB9XG5cbiAgICBnZXRTaGlmdChlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQpOiBudW1iZXIge1xuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcbiAgICAgICAgPyBldmVudC5jbGllbnRYIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG4gICAgICAgIDogZXZlbnQuY2xpZW50WSAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIG9uTW91c2Vkb3duQW5kTW92ZSh0aGlzOiBUdW1ibGVyLCBjb250YWluZXI6IEhUTUxFbGVtZW50LCBjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmxpc3RlbmluZyA9IHRydWU7XG5cbiAgICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBzaGlmdDogbnVtYmVyID0gdGhpcy5nZXRTaGlmdCh0aGF0LmVsZW1lbnQsIGV2ZW50KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlbW92ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNldXApO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uTW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uUGVyY2VudDogbnVtYmVyO1xuICAgICAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgICAgICAgaWYgKHRoYXQub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uUGVyY2VudCA9IG5ld1Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdQb3NpdGlvbiA9IGV2ZW50LmNsaWVudFkgLSBzaGlmdCAtIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICBuZXdQb3NpdGlvblBlcmNlbnQgPSBuZXdQb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICBwb3NpdGlvbiA9IG5ld1Bvc2l0aW9uUGVyY2VudDtcblxuICAgICAgICAgIGlmIChwb3NpdGlvbiA+IDEpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbk1vdXNldXAoKSB7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZW1vdmUpO1xuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNldXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgeyBUdW1ibGVyIH07XG4iXSwic291cmNlUm9vdCI6IiJ9