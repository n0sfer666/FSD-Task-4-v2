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
        this.model.on_change_model(function (modelData) {
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
        var new_value = this.get_new_value(tumblerData);
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
    Model.prototype.get_new_value = function (tumblerData) {
        var index = tumblerData.index;
        var new_value = this.value[index];
        var position;
        if (tumblerData.position !== undefined) {
            position = Math.round(tumblerData.position * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION;
            new_value = this.getValue_from_position(position, this.range);
        }
        else if (tumblerData.value !== undefined) {
            new_value = tumblerData.value;
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
        this.callbackList.forEach(function (callback) {
            callback({
                position: _this.position,
                value: _this.value,
                index: _this.activeIndex,
            });
        });
    };
    Model.prototype.on_change_model = function (callback) {
        this.callbackList.push(callback);
    };
    Model.prototype.getPositionFromValue = function (value, range) {
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
    function SimpleRangeSlider(container, user_config) {
        this.container = container;
        this.user_config = user_config;
        var slider_container = this.container.get(0);
        var default_config = {
            orientation: 'horizontal',
            start: [10],
            range: [0, 100],
            step: 1,
            connect: true,
            tooltip: true,
        };
        var completeConfig = {
            orientation: this.user_config.orientation === undefined ? default_config.orientation : this.user_config.orientation,
            start: this.user_config.start === undefined ? default_config.start : this.user_config.start,
            range: this.user_config.range === undefined ? default_config.range : this.user_config.range,
            step: this.user_config.step === undefined ? default_config.step : this.user_config.step,
            connect: this.user_config.connect === undefined ? default_config.connect : this.user_config.connect,
            tooltip: this.user_config.tooltip === undefined ? default_config.tooltip : this.user_config.tooltip,
            input: this.user_config.input,
        };
        var model_config = {
            start: completeConfig.start,
            range: completeConfig.range,
            step: completeConfig.step,
        };
        var view_config = {
            orientation: completeConfig.orientation,
            start: completeConfig.start,
            range: completeConfig.range,
            isTooltip: completeConfig.tooltip,
            isConnect: completeConfig.connect,
            input: completeConfig.input,
        };
        this.view = new View_1.View(slider_container, view_config);
        this.model = new Model_1.Model(model_config);
        this.presenter = new Presenter_1.Presenter(this.view, this.model);
    }
    return SimpleRangeSlider;
}());
exports.SimpleRangeSlider = SimpleRangeSlider;
(function ($) {
    $.fn.extend({
        SimpleRangeSlider: function (user_config) {
            return new SimpleRangeSlider(this, user_config);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9EZW1vX1BhbmVsL3RlbXBsYXRlLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Db250cm9sbGVyL1ByZXNlbnRlci50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1BsdWdpbi50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9WaWV3LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSGVscGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0lucHV0LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1Rvb2x0aXAudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVHVtYmxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFD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ZDtnQkFDRCxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7b0JBQ2hCLFFBQVEsR0FBRyxDQUFDLENBQUM7aUJBQ2Q7Z0JBRUQsUUFBUSxDQUFDO29CQUNQLFFBQVE7b0JBQ1IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNsQixDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsU0FBUyxTQUFTO2dCQUNoQixRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN2RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxDQTVFcUIsZUFBTSxHQTRFM0I7QUFDUSwwQkFBTyIsImZpbGUiOiJkZW1vUGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTaW1wbGVSYW5nZVNsaWRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50c1wiKTtcbiIsImltcG9ydCB7IFNpbXBsZVJhbmdlU2xpZGVyIH0gZnJvbSAnLi4vUGx1Z2luL1BsdWdpbic7XHJcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZSc7XHJcblxyXG5jbGFzcyBEZW1vX1BhbmVsIHtcclxuXHJcbiAgdGVtcGxhdGU6IFRlbXBsYXRlO1xyXG4gIHJhbmdlX3NsaWRlcjogIFNpbXBsZVJhbmdlU2xpZGVyO1xyXG4gIGVtcHR5X3NsaWRlcjogc3RyaW5nO1xyXG5cclxuICBkZWZhdWx0Q29uZmlnOiBJX0RFTU9fRGVmYXVsdF9Db25maWc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVtb19wYW5lbDogSlF1ZXJ5LCBwcml2YXRlIHNsaWRlcjogSlF1ZXJ5LCBwcml2YXRlIGlucHV0czogSV9ERU1PX0lucHV0KSB7XHJcbiAgICB0aGlzLnRlbXBsYXRlID0gbmV3IFRlbXBsYXRlKCk7XHJcbiAgICB0aGlzLmRlbW9fcGFuZWwuYXBwZW5kKHRoaXMudGVtcGxhdGUuZGVtb19wYW5lbCk7XHJcblxyXG4gICAgdGhpcy5lbXB0eV9zbGlkZXIgPSAnIycgKyBzbGlkZXIuZ2V0KDApLmlkO1xyXG5cclxuICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IHtcclxuICAgICAgcmFuZ2U6IFswLCAxMDBdLFxyXG4gICAgICBzdGFydDogWzEwXSxcclxuICAgICAgc3RlcDogMVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmFuZ2Vfc2xpZGVyID0gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKHRoaXMuc2xpZGVyLCB7XHJcbiAgICAgIHJhbmdlOiBbLTEwMCwgMTAwXSxcclxuICAgICAgc3RhcnQ6IFstNTAsIDUwXSxcclxuICAgICAgc3RlcDogMTAsXHJcbiAgICAgIG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIixcclxuICAgICAgY29ubmVjdDogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogdHJ1ZSxcclxuICAgICAgaW5wdXQ6IHRoaXMuaW5wdXRzXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgdGVtcGxhdGVfaW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W10gPSBbXHJcbiAgICAgIHRoaXMudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWluLFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLnJhbmdlX2lucHV0X21heCxcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21pbixcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21heCxcclxuICAgICAgdGhpcy50ZW1wbGF0ZS5zdGVwX2lucHV0LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLm9yaWVudGF0aW9uX2lucHV0LFxyXG4gICAgICB0aGlzLnRlbXBsYXRlLmNvbm5lY3RDb25maWdJbnB1dFxyXG4gICAgXVxyXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0ZW1wbGF0ZV9pbnB1dHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHRoaXMub25fY2hhbmdlX2lucHV0KHRlbXBsYXRlX2lucHV0c1tpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbl9jaGFuZ2VfaW5wdXQodGhpczogRGVtb19QYW5lbCwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTtcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0Jywgb25Nb3VzZW91dCk7XHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbl9jaGFuZ2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICBpZihldmVudC5rZXkgPT09IFwiVGFiXCIgfHwgZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcclxuICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uTW91c2VvdXQoKSB7XHJcbiAgICAgIGFjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uX2NoYW5nZSgpIHtcclxuICAgICAgYWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aW9uKCkge1xyXG5cclxuICAgICAgbGV0IHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdID0gW1xyXG4gICAgICAgIHRoYXQudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWluLnZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5yYW5nZV9pbnB1dF9taW4udmFsdWUpXHJcbiAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5yYW5nZVswXSxcclxuICAgICAgICB0aGF0LnRlbXBsYXRlLnJhbmdlX2lucHV0X21heC52YWx1ZSAhPT0gJydcclxuICAgICAgICAgID8gTnVtYmVyKHRoYXQudGVtcGxhdGUucmFuZ2VfaW5wdXRfbWF4LnZhbHVlKVxyXG4gICAgICAgICAgOiB0aGF0LmRlZmF1bHRDb25maWcucmFuZ2VbMV0sXHJcbiAgICAgIF1cclxuICAgICAgbGV0IHN0YXJ0OiBUX0RFTU9fU3RhcnQgPSB0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWF4LnZhbHVlICE9PSAnJ1xyXG4gICAgICAgID8gW1xyXG4gICAgICAgICAgdGhhdC50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21pbi52YWx1ZSAhPT0gJydcclxuICAgICAgICAgICAgPyBOdW1iZXIodGhhdC50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21pbi52YWx1ZSlcclxuICAgICAgICAgICAgOiB0aGF0LmRlZmF1bHRDb25maWcuc3RhcnRbMF0sXHJcbiAgICAgICAgICBOdW1iZXIodGhhdC50ZW1wbGF0ZS5zdGFydENvbmZpZ0lucHV0X21heC52YWx1ZSlcclxuICAgICAgICBdXHJcbiAgICAgICAgOiBbXHJcbiAgICAgICAgICB0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnZhbHVlICE9PSAnJ1xyXG4gICAgICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnZhbHVlKVxyXG4gICAgICAgICAgICA6IHRoYXQuZGVmYXVsdENvbmZpZy5zdGFydFswXVxyXG4gICAgICAgIF1cclxuICAgICAgbGV0IHN0ZXA6IG51bWJlciA9IHRoYXQudGVtcGxhdGUuc3RlcF9pbnB1dC52YWx1ZSAhPT0gJydcclxuICAgICAgICA/IE51bWJlcih0aGF0LnRlbXBsYXRlLnN0ZXBfaW5wdXQudmFsdWUpXHJcbiAgICAgICAgOiB0aGF0LmRlZmF1bHRDb25maWcuc3RlcDtcclxuICAgICAgbGV0IG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24gPSB0aGF0LnRlbXBsYXRlLm9yaWVudGF0aW9uX2lucHV0LmNoZWNrZWRcclxuICAgICAgICA/ICdob3Jpem9udGFsJ1xyXG4gICAgICAgIDogJ3ZlcnRpY2FsJztcclxuICAgICAgbGV0IGNvbm5lY3Q6IGJvb2xlYW4gPSB0aGF0LnRlbXBsYXRlLmNvbm5lY3RDb25maWdJbnB1dC5jaGVja2VkXHJcbiAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuXHJcbiAgICAgIHRoYXQuc2xpZGVyID0gJCh0aGF0LmVtcHR5X3NsaWRlcikuZW1wdHkoKTtcclxuICAgICAgdGhhdC5yYW5nZV9zbGlkZXIgPSBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIodGhhdC5zbGlkZXIsIHtcclxuICAgICAgICByYW5nZTogcmFuZ2UsXHJcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgIHN0ZXA6IHN0ZXAsXHJcbiAgICAgICAgb3JpZW50YXRpb246IG9yaWVudGF0aW9uLFxyXG4gICAgICAgIGNvbm5lY3Q6IGNvbm5lY3QsXHJcbiAgICAgICAgdG9vbHRpcDogdHJ1ZSxcclxuICAgICAgICBpbnB1dDogdGhhdC5pbnB1dHNcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7RGVtb19QYW5lbH07XHJcblxyXG4oZnVuY3Rpb24oJDogSlF1ZXJ5U3RhdGljKSB7XHJcbiAgJC5mbi5leHRlbmQoe1xyXG4gICAgRGVtb19QYW5lbDogZnVuY3Rpb24oc2xpZGVyOiBKUXVlcnksIGlucHV0czogSV9ERU1PX0lucHV0KSB7XHJcbiAgICAgIHJldHVybiBuZXcgRGVtb19QYW5lbCg8SlF1ZXJ5PiB0aGlzLCA8SlF1ZXJ5PiBzbGlkZXIsIDxJX0RFTU9fSW5wdXQ+IGlucHV0cyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0gKGpRdWVyeSkgKTsiLCJjbGFzcyBUZW1wbGF0ZSB7XHJcbiAgcmFuZ2VfaW5wdXRfbWluOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHJhbmdlX2lucHV0X21heDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgc3RhcnRDb25maWdJbnB1dF9taW46IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgc3RhcnRDb25maWdJbnB1dF9tYXg6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIHN0ZXBfaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIG9yaWVudGF0aW9uX2lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBjb25uZWN0Q29uZmlnSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIGRlbW9fcGFuZWw6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gcmFuZ2UgbGluZVxyXG4gICAgbGV0IHJhbmdlX3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICByYW5nZV90ZXh0LmlubmVyVGV4dCA9ICdSYW5nZTogJztcclxuICAgIHRoaXMucmFuZ2VfaW5wdXRfbWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9taW4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9taW4udmFsdWUgPSAnLTEwMCc7XHJcbiAgICB0aGlzLnJhbmdlX2lucHV0X21heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWF4LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWF4LnZhbHVlID0gJzEwMCc7XHJcbiAgICBsZXQgcmFuZ2VfbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICByYW5nZV9saW5lLmFwcGVuZChyYW5nZV90ZXh0LCB0aGlzLnJhbmdlX2lucHV0X21pbiwgdGhpcy5yYW5nZV9pbnB1dF9tYXgpO1xyXG4gICAgLy8gc3RhcnQgbGluZVxyXG4gICAgbGV0IHN0YXJ0X3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBzdGFydF90ZXh0LmlubmVyVGV4dCA9ICdTdGFydDogJztcclxuICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9taW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWluLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9taW4udmFsdWUgPSAnLTUwJztcclxuICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9tYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnN0YXJ0Q29uZmlnSW5wdXRfbWF4LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMuc3RhcnRDb25maWdJbnB1dF9tYXgudmFsdWUgPSAnNTAnO1xyXG4gICAgbGV0IHN0YXJ0X2xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc3RhcnRfbGluZS5hcHBlbmQoc3RhcnRfdGV4dCwgdGhpcy5zdGFydENvbmZpZ0lucHV0X21pbiwgdGhpcy5zdGFydENvbmZpZ0lucHV0X21heCk7XHJcbiAgICAvLyBzdGVwIGxpbmVcclxuICAgIGxldCBzdGVwX3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBzdGVwX3RleHQuaW5uZXJUZXh0ID0gJ1N0ZXA6ICc7XHJcbiAgICB0aGlzLnN0ZXBfaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLnN0ZXBfaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5zdGVwX2lucHV0LnZhbHVlID0gJzEwJztcclxuICAgIGxldCBzdGVwX2xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc3RlcF9saW5lLmFwcGVuZChzdGVwX3RleHQsIHRoaXMuc3RlcF9pbnB1dCk7XHJcbiAgICAvLyBvcmllbnRhdGlvbiBsaW5lXHJcbiAgICBsZXQgb3JpZW50YXRpb25fdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIG9yaWVudGF0aW9uX3RleHQuaW5uZXJUZXh0ID0gJ09yaWVudGF0aW9uIGhvcml6b250YWwvdmVydGljYWw6ICc7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbl9pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbl9pbnB1dC5jaGVja2VkID0gdHJ1ZTtcclxuICAgIGxldCBvcmllbnRhdGlvbl9saW5lOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBvcmllbnRhdGlvbl9saW5lLmFwcGVuZChvcmllbnRhdGlvbl90ZXh0LCB0aGlzLm9yaWVudGF0aW9uX2lucHV0KTtcclxuICAgIC8vIGNvbm5lY3QgbGluZVxyXG4gICAgbGV0IGNvbm5lY3RfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIGNvbm5lY3RfdGV4dC5pbm5lclRleHQgPSAnQ29ubmVjdCBvbi9vZmY6ICc7XHJcbiAgICB0aGlzLmNvbm5lY3RDb25maWdJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuY29ubmVjdENvbmZpZ0lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xyXG4gICAgICB0aGlzLmNvbm5lY3RDb25maWdJbnB1dC5jaGVja2VkID0gdHJ1ZTtcclxuICAgIGxldCBjb25uZWN0X2xpbmU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNvbm5lY3RfbGluZS5hcHBlbmQoY29ubmVjdF90ZXh0LCB0aGlzLmNvbm5lY3RDb25maWdJbnB1dCk7XHJcblxyXG4gICAgdGhpcy5kZW1vX3BhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRoaXMuZGVtb19wYW5lbC5hcHBlbmQocmFuZ2VfbGluZSwgc3RhcnRfbGluZSwgc3RlcF9saW5lLCBvcmllbnRhdGlvbl9saW5lLCBjb25uZWN0X2xpbmUpO1xyXG4gIH1cclxufVxyXG5leHBvcnQge1RlbXBsYXRlfSIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuLi9WaWV3L1ZpZXcnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi9Nb2RlbC9Nb2RlbCc7XG5cbmNsYXNzIFByZXNlbnRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlldzogVmlldywgcHJpdmF0ZSBtb2RlbDogTW9kZWwpIHtcbiAgICB0aGlzLnZpZXcub25DaGFuZ2VWaWV3KCh0dW1ibGVyRGF0YTogdFR1bWJsZXJEYXRhKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0dW1ibGVyRGF0YSk7XG4gICAgICB0aGlzLm1vZGVsLnNldE5ld1Bvc2l0aW9uKHR1bWJsZXJEYXRhKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLm9uX2NoYW5nZV9tb2RlbCgobW9kZWxEYXRhOiB0TW9kZWxEYXRhKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbERhdGEpO1xuICAgICAgdGhpcy52aWV3LnVwZGF0ZShtb2RlbERhdGEpO1xuICAgIH0pO1xuICB9XG59XG5leHBvcnQgeyBQcmVzZW50ZXIgfTtcbiIsImNsYXNzIE1vZGVsIHtcbiAgICB2YWx1ZTogdFZhbHVlID0gWzBdO1xuXG4gICAgcmFuZ2U6IHRSYW5nZSA9IFswLCAwXTtcblxuICAgIHN0ZXA6IG51bWJlciA9IDA7XG5cbiAgICBwb3NpdGlvbjogdFBvc2l0aW9uID0gWzBdO1xuXG4gICAgYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjYWxsYmFja0xpc3Q6IGlNb2RlbENhbGxiYWNrW107XG5cbiAgICByZWFkb25seSBUT19OT1JNQUxJWkVfUE9TSVRJT046IG51bWJlciA9IDFlNDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBpQ29uZmlnTW9kZWwpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tMaXN0ID0gW107XG5cbiAgICAgIHRoaXMuc3RlcCA9IHRoaXMuY29uZmlnLnN0ZXA7XG5cbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNldE5ld1Bvc2l0aW9uKHR1bWJsZXJEYXRhOiB0VHVtYmxlckRhdGEpIHtcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHR1bWJsZXJEYXRhO1xuICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xuXG4gICAgICBjb25zdCBuZXdfdmFsdWU6IG51bWJlciA9IHRoaXMuZ2V0X25ld192YWx1ZSh0dW1ibGVyRGF0YSk7XG5cbiAgICAgIHRoaXMuY2hlY2tfb25fc3RlcF9tb3ZlbWVudF90b19zZXRfdmFsX2FuZF9wb3MobmV3X3ZhbHVlLCBpbmRleCk7XG4gICAgICAvLyBjaGVjayBmb3IgY29sbGlzaW9uXG4gICAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGggPiAxICYmIHRoaXMudmFsdWVbMV0pIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMF0gPCB0aGlzLnZhbHVlWzFdKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0X25ld192YWx1ZSh0dW1ibGVyRGF0YTogdFR1bWJsZXJEYXRhKTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHR1bWJsZXJEYXRhO1xuICAgICAgbGV0IG5ld192YWx1ZTogbnVtYmVyID0gdGhpcy52YWx1ZVtpbmRleF07XG4gICAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcblxuICAgICAgaWYgKHR1bWJsZXJEYXRhLnBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcG9zaXRpb24gPSBNYXRoLnJvdW5kKHR1bWJsZXJEYXRhLnBvc2l0aW9uICogdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pIC8gdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT047XG4gICAgICAgIG5ld192YWx1ZSA9IHRoaXMuZ2V0VmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbiwgdGhpcy5yYW5nZSk7XG4gICAgICB9IGVsc2UgaWYgKHR1bWJsZXJEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3X3ZhbHVlID0gdHVtYmxlckRhdGEudmFsdWU7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIHRoaXMudmFsdWVbMV0pIHtcbiAgICAgICAgICBpZiAobmV3X3ZhbHVlID4gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAxKSB7XG4gICAgICAgICAgaWYgKG5ld192YWx1ZSA8IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXApIHtcbiAgICAgICAgICAgIG5ld192YWx1ZSA9IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3X3ZhbHVlO1xuICAgIH1cblxuICAgIGNoZWNrX29uX3N0ZXBfbW92ZW1lbnRfdG9fc2V0X3ZhbF9hbmRfcG9zKG5ld192YWx1ZTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICBjb25zdCBjb25kaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbdGhpcy52YWx1ZVtpbmRleF0gLSB0aGlzLnN0ZXAsIHRoaXMudmFsdWVbaW5kZXhdICsgdGhpcy5zdGVwXTtcblxuICAgICAgaWYgKG5ld192YWx1ZSA+PSBjb25kaXRpb25bMV0gfHwgbmV3X3ZhbHVlIDw9IGNvbmRpdGlvblswXSkge1xuICAgICAgICB0aGlzLnNldFZhbHVlX2FuZF9wb3NpdGlvbihuZXdfdmFsdWUsIGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrTGlzdC5mb3JFYWNoKChjYWxsYmFjazogaU1vZGVsQ2FsbGJhY2spID0+IHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIGluZGV4OiB0aGlzLmFjdGl2ZUluZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uX2NoYW5nZV9tb2RlbChjYWxsYmFjazogaU1vZGVsQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tMaXN0LnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGdldFBvc2l0aW9uRnJvbVZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSAodmFsdWUgLSByYW5nZVswXSkgLyAocmFuZ2VbMV0gLSByYW5nZVswXSk7XG5cbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTikgLyB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTik7XG4gICAgfVxuXG4gICAgZ2V0VmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gKHBvc2l0aW9uICogKHJhbmdlWzFdIC0gcmFuZ2VbMF0pKSArIHJhbmdlWzBdO1xuXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0KSk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVfYW5kX3Bvc2l0aW9uKG5ld192YWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcbiAgICAgIHRoaXMudmFsdWVbaV0gPSBuZXdfdmFsdWUgPiAwXG4gICAgICAgID8gKE1hdGguY2VpbChuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKVxuICAgICAgICA6IChNYXRoLmZsb29yKG5ld192YWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMucmFuZ2VbMF0pIHtcbiAgICAgICAgICB0aGlzLnZhbHVlWzBdID0gdGhpcy5yYW5nZVswXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaSA9PT0gMSAmJiB0aGlzLnZhbHVlWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0gPiB0aGlzLnJhbmdlWzFdKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMucmFuZ2VbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcucmFuZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMucmFuZ2UucHVzaCh0aGlzLmNvbmZpZy5yYW5nZVtpXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yYW5nZVtpXSA9IHRoaXMuY29uZmlnLnJhbmdlW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudmFsdWUucHVzaCh0aGlzLmNvbmZpZy5zdGFydFtpXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMuY29uZmlnLnN0YXJ0W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCh0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgTW9kZWwgfTtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuL1ZpZXcvVmlldyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vTW9kZWwvTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XG5cbmNsYXNzIFNpbXBsZVJhbmdlU2xpZGVyIHtcbiAgICB2aWV3OiBWaWV3O1xuXG4gICAgbW9kZWw6IE1vZGVsO1xuXG4gICAgcHJlc2VudGVyOiBQcmVzZW50ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSlF1ZXJ5LCBwcml2YXRlIHVzZXJfY29uZmlnOiBpQ29uZmlnVXNlcikge1xuICAgICAgY29uc3Qgc2xpZGVyX2NvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lci5nZXQoMCk7XG5cbiAgICAgIGNvbnN0IGRlZmF1bHRfY29uZmlnOiBpQ29uZmlnVXNlciA9IHtcbiAgICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgc3RhcnQ6IFsxMF0sXG4gICAgICAgIHJhbmdlOiBbMCwgMTAwXSxcbiAgICAgICAgc3RlcDogMSxcbiAgICAgICAgY29ubmVjdDogdHJ1ZSxcbiAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlQ29uZmlnOiBpQ29uZmlnVXNlciA9IHtcbiAgICAgICAgb3JpZW50YXRpb246IHRoaXMudXNlcl9jb25maWcub3JpZW50YXRpb24gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfY29uZmlnLm9yaWVudGF0aW9uIDogdGhpcy51c2VyX2NvbmZpZy5vcmllbnRhdGlvbixcbiAgICAgICAgc3RhcnQ6IHRoaXMudXNlcl9jb25maWcuc3RhcnQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfY29uZmlnLnN0YXJ0IDogdGhpcy51c2VyX2NvbmZpZy5zdGFydCxcbiAgICAgICAgcmFuZ2U6IHRoaXMudXNlcl9jb25maWcucmFuZ2UgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfY29uZmlnLnJhbmdlIDogdGhpcy51c2VyX2NvbmZpZy5yYW5nZSxcbiAgICAgICAgc3RlcDogdGhpcy51c2VyX2NvbmZpZy5zdGVwID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X2NvbmZpZy5zdGVwIDogdGhpcy51c2VyX2NvbmZpZy5zdGVwLFxuICAgICAgICBjb25uZWN0OiB0aGlzLnVzZXJfY29uZmlnLmNvbm5lY3QgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfY29uZmlnLmNvbm5lY3QgOiB0aGlzLnVzZXJfY29uZmlnLmNvbm5lY3QsXG4gICAgICAgIHRvb2x0aXA6IHRoaXMudXNlcl9jb25maWcudG9vbHRpcCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9jb25maWcudG9vbHRpcCA6IHRoaXMudXNlcl9jb25maWcudG9vbHRpcCxcbiAgICAgICAgaW5wdXQ6IHRoaXMudXNlcl9jb25maWcuaW5wdXQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBtb2RlbF9jb25maWc6IGlDb25maWdNb2RlbCA9IHtcbiAgICAgICAgc3RhcnQ6IGNvbXBsZXRlQ29uZmlnLnN0YXJ0LFxuICAgICAgICByYW5nZTogY29tcGxldGVDb25maWcucmFuZ2UsXG4gICAgICAgIHN0ZXA6IGNvbXBsZXRlQ29uZmlnLnN0ZXAsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB2aWV3X2NvbmZpZzogaUNvbmZpZ1ZpZXcgPSB7XG4gICAgICAgIG9yaWVudGF0aW9uOiBjb21wbGV0ZUNvbmZpZy5vcmllbnRhdGlvbixcbiAgICAgICAgc3RhcnQ6IGNvbXBsZXRlQ29uZmlnLnN0YXJ0LFxuICAgICAgICByYW5nZTogY29tcGxldGVDb25maWcucmFuZ2UsXG4gICAgICAgIGlzVG9vbHRpcDogY29tcGxldGVDb25maWcudG9vbHRpcCxcbiAgICAgICAgaXNDb25uZWN0OiBjb21wbGV0ZUNvbmZpZy5jb25uZWN0LFxuICAgICAgICBpbnB1dDogY29tcGxldGVDb25maWcuaW5wdXQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzbGlkZXJfY29udGFpbmVyLCB2aWV3X2NvbmZpZyk7XG4gICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKG1vZGVsX2NvbmZpZyk7XG4gICAgICB0aGlzLnByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIodGhpcy52aWV3LCB0aGlzLm1vZGVsKTtcbiAgICB9XG59XG5leHBvcnQgeyBTaW1wbGVSYW5nZVNsaWRlciB9O1xuXG4oZnVuY3Rpb24gKCQ6IEpRdWVyeVN0YXRpYykge1xuICAkLmZuLmV4dGVuZCh7XG4gICAgU2ltcGxlUmFuZ2VTbGlkZXIodXNlcl9jb25maWc6IGlDb25maWdVc2VyKSB7XG4gICAgICByZXR1cm4gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKDxKUXVlcnk+IHRoaXMsIDxpQ29uZmlnVXNlcj4gdXNlcl9jb25maWcpO1xuICAgIH0sXG4gIH0pO1xufShqUXVlcnkpKTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vZW50aXRpZXMvSGVscGVyJztcbmltcG9ydCB7IFR1bWJsZXIgfSBmcm9tICcuL2VudGl0aWVzL1R1bWJsZXInO1xuaW1wb3J0IHsgQ29ubmVjdCB9IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9lbnRpdGllcy9Ub29sdGlwJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi9lbnRpdGllcy9JbnB1dCc7XG5cbmNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xuICBwb3NpdGlvbjogdFBvc2l0aW9uID0gWzBdO1xuXG4gIHJhbmdlOiB0UmFuZ2UgPSBbMCwgMF07XG5cbiAgc3RhcnQ6IHRWYWx1ZSA9IFswXTtcblxuICBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uO1xuXG4gIGlzVG9vbHRpcDogYm9vbGVhbjtcblxuICBpc0Nvbm5lY3Q6IGJvb2xlYW47XG5cbiAgc2xpZGVyOiBIVE1MRWxlbWVudDtcblxuICB0dW1ibGVyOiBUdW1ibGVyW10gPSBbXTtcblxuICBjb25uZWN0OiBDb25uZWN0W10gPSBbXTtcblxuICB0b29sdGlwOiBUb29sdGlwW10gPSBbXTtcblxuICBpbnB1dFZhbHVlOiBJbnB1dFtdID0gW107XG5cbiAgaW5wdXRUb29sdGlwPzogSW5wdXQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50LCBwcml2YXRlIGNvbmZpZzogaUNvbmZpZ1ZpZXcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pc1Rvb2x0aXAgPSB0aGlzLmNvbmZpZy5pc1Rvb2x0aXA7XG4gICAgdGhpcy5pc0Nvbm5lY3QgPSB0aGlzLmNvbmZpZy5pc0Nvbm5lY3Q7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuY29uZmlnLm9yaWVudGF0aW9uO1xuXG4gICAgdGhpcy5zbGlkZXIgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ3NsaWRlcicsIHRoaXMub3JpZW50YXRpb24pO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBvbkNoYW5nZVZpZXcoY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy50dW1ibGVyW2ldLm9uTW91c2Vkb3duQW5kTW92ZSh0aGlzLmNvbnRhaW5lciwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dFZhbHVlWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbnB1dFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZVtpXS5vbktleWRvd25Pck1vdXNlb3V0KGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRUb29sdGlwICYmIHRoaXMuaXNUb29sdGlwKSB7XG4gICAgICB0aGlzLmlucHV0VG9vbHRpcC5vblN3aXRjaENoZWNrKHRoaXMudG9vbHRpcCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG1vZGVsRGF0YTogdE1vZGVsRGF0YSkge1xuICAgIGNvbnN0IGk6IG51bWJlciA9IG1vZGVsRGF0YS5pbmRleDtcbiAgICBjb25zdCB7IHBvc2l0aW9uIH0gPSBtb2RlbERhdGE7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gbW9kZWxEYXRhO1xuXG4gICAgdGhpcy5zZXRBY3RpdmV0dW1ibGVyKHBvc2l0aW9uLCBpKTtcblxuICAgIHRoaXMudHVtYmxlcltpXS5zZXROZXdQb3NpdGlvbihwb3NpdGlvbltpXSk7XG5cbiAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcbiAgICAgIHRoaXMudG9vbHRpcFtpXS5zZXRJbm5lclRleHQodmFsdWVbaV0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlucHV0VmFsdWVbMF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5pbnB1dFZhbHVlW2ldLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodmFsdWVbaV0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ29ubmVjdCkge1xuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRQb3NpdGlvbigwLCBwb3NpdGlvblswXSk7XG4gICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uWzFdKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRQb3NpdGlvbihwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldEFjdGl2ZXR1bWJsZXIocG9zaXRpb246IHRQb3NpdGlvbiwgaW5kZXg6IG51bWJlcikge1xuICAgIGlmIChwb3NpdGlvbi5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgdGhpcy50dW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnR1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XG4gICAgICAgIGlmICh0aGlzLmlzVG9vbHRpcCkge1xuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHVtYmxlclsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgdGhpcy50dW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgICAgdGhpcy50b29sdGlwWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnJhbmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucmFuZ2UucHVzaCh0aGlzLmNvbmZpZy5yYW5nZVtpXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJhbmdlW2ldID0gdGhpcy5jb25maWcucmFuZ2VbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5zdGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuc3RhcnRbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnN0YXJ0LnB1c2godGhpcy5jb25maWcuc3RhcnRbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFydFtpXSA9IHRoaXMuY29uZmlnLnN0YXJ0W2ldO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCh0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMuc3RhcnRbaV0sIHRoaXMucmFuZ2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMuc3RhcnRbaV0sIHRoaXMucmFuZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy50dW1ibGVyLnB1c2gobmV3IFR1bWJsZXIodGhpcy5wb3NpdGlvbltpXSwgdGhpcy5vcmllbnRhdGlvbiwgaSkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ29ubmVjdCkge1xuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KHRoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0sIHRoaXMub3JpZW50YXRpb24pKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLmNvbm5lY3RbMF0uZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnRvb2x0aXAucHVzaChuZXcgVG9vbHRpcCh0aGlzLnN0YXJ0W2ldLCB0aGlzLm9yaWVudGF0aW9uKSk7XG5cbiAgICAgICAgdGhpcy50dW1ibGVyW2ldLmVsZW1lbnQuYXBwZW5kKHRoaXMudG9vbHRpcFtpXS5lbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMudHVtYmxlcltpXS5lbGVtZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQodGhpcy5zbGlkZXIpO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcuaW5wdXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5pbnB1dC52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUucHVzaChuZXcgSW5wdXQoXG4gICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICB0aGlzLmNvbmZpZy5pbnB1dC52YWx1ZVtpXSxcbiAgICAgICAgICB0aGlzLmNvbmZpZy5zdGFydFtpXSxcbiAgICAgICAgICBpLFxuICAgICAgICApKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuaW5wdXQgJiYgdGhpcy5jb25maWcuaW5wdXQudG9vbHRpcCkge1xuICAgICAgdGhpcy5pbnB1dFRvb2x0aXAgPSBuZXcgSW5wdXQoXG4gICAgICAgICd0b29sdGlwJyxcbiAgICAgICAgdGhpcy5jb25maWcuaW5wdXQudG9vbHRpcFswXSxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IFZpZXcgfTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcblxuY2xhc3MgQ29ubmVjdCBleHRlbmRzIEhlbHBlciB7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwb3NpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhcnRQb3NpdGlvbjogbnVtYmVyLCBwcml2YXRlIGVuZFBvc2l0aW9uOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbikge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCdjb25uZWN0JywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuc3RhcnRQb3NpdGlvbiwgdGhpcy5lbmRQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24oc3RhcnRQb3NpdGlvbjogbnVtYmVyLCBlbmRQb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICBjb25zdCBzdGFydDogbnVtYmVyID0gTWF0aC5yb3VuZChzdGFydFBvc2l0aW9uICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XG4gICAgICBjb25zdCBlbmQ6IG51bWJlciA9IE1hdGgucm91bmQoZW5kUG9zaXRpb24gKiB0aGlzLlRPX0NPTk5FQ1RfVVBEQVRFKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbiA9IFtzdGFydCwgZW5kXTtcbiAgICAgIGNvbnN0IHN0eWxlOiBzdHJpbmcgPSBzdGFydCA9PT0gMFxuICAgICAgICA/IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xuICAgICAgICAgID8gYHdpZHRoOiAke2VuZH0lO2BcbiAgICAgICAgICA6IGBoZWlnaHQ6ICR7ZW5kfSU7YFxuICAgICAgICA6IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xuICAgICAgICAgID8gYGxlZnQ6ICR7c3RhcnR9JTsgd2lkdGg6ICR7KGVuZCAtIHN0YXJ0KX0lO2BcbiAgICAgICAgICA6IGB0b3A6ICR7c3RhcnR9JTsgaGVpZ2h0OiAkeyhlbmQgLSBzdGFydCl9JTtgO1xuXG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICB9XG59XG5leHBvcnQgeyBDb25uZWN0IH07XG4iLCJjbGFzcyBIZWxwZXIge1xuICAgIHJlYWRvbmx5IFRPX1RVTUJMRVJfUE9TSVRJT046IG51bWJlciA9IDFlNDtcblxuICAgIHJlYWRvbmx5IFRPX0NPTk5FQ1RfVVBEQVRFOiBudW1iZXIgPSAxZTI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIGdldFBvc2l0aW9uRnJvbVZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xuICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gKCh2YWx1ZSAtIHJhbmdlWzBdKSAvIChyYW5nZVsxXSAtIHJhbmdlWzBdKSk7XG4gICAgICByZXN1bHQgPSBNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fVFVNQkxFUl9QT1NJVElPTikgLyB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT047XG5cbiAgICAgIGlmIChyZXN1bHQgPCAwKSB7XG4gICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID4gMSkge1xuICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBnZXREaXZFbGVtZW50V2l0aENsYXNzKGNzc0NsYXNzOiB0Q3NzQ2xhc3Nlcywgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbik6IEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0IHN0ckNsYXNzOiBzdHJpbmcgPSBgU1JTX18ke2Nzc0NsYXNzfWA7XG4gICAgICBjb25zdCBjc3NDbGFzc1dpdGhvdXRPcmllbnRhdGlvbjogc3RyaW5nID0gYCR7c3RyQ2xhc3N9ICR7c3RyQ2xhc3N9X2A7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoY3NzQ2xhc3NXaXRob3V0T3JpZW50YXRpb24gKyBvcmllbnRhdGlvbikpO1xuXG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG59XG5leHBvcnQgeyBIZWxwZXIgfTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICcuL1Rvb2x0aXAnO1xuXG5jbGFzcyBJbnB1dCBleHRlbmRzIEhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogdElucHV0VHlwZSwgcHVibGljIGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIHB1YmxpYyB2YWx1ZT86IG51bWJlciwgcHVibGljIGluZGV4PzogbnVtYmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAodHlwZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25LZXlkb3duT3JNb3VzZW91dCh0aGlzOiBJbnB1dCwgY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIGlmICh0aGF0LnR5cGUgIT09ICd2YWx1ZScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5ZG93bik7XG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0Jywgb25Nb3VzZW91dCk7XG5cbiAgICBmdW5jdGlvbiBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdUYWInIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZW91dCgpIHtcbiAgICAgIGFjdGlvbigpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhY3Rpb24oKSB7XG4gICAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gTnVtYmVyKHRoYXQuZWxlbWVudC52YWx1ZSk7XG4gICAgICBpZiAodGhhdC5pbmRleCkge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblN3aXRjaENoZWNrKHRoaXM6IElucHV0LCB0b29sdGlwOiBUb29sdGlwW10pIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIGlmICh0aGF0LnR5cGUgIT09ICd0b29sdGlwJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b29sdGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGF0LmVsZW1lbnQuY2hlY2tlZCkge1xuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoSGlkZGVuKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoSGlkZGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgeyBJbnB1dCB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBUb29sdGlwIGV4dGVuZHMgSGVscGVyIHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygndG9vbHRpcCcsIHRoaXMub3JpZW50YXRpb24pO1xuICAgICAgdGhpcy5zZXRJbm5lclRleHQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0SW5uZXJUZXh0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IHZhbDogbnVtYmVyID0gdmFsdWUgPiAwXG4gICAgICAgID8gTWF0aC5mbG9vcih2YWx1ZSlcbiAgICAgICAgOiBNYXRoLmNlaWwodmFsdWUpO1xuXG4gICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IFN0cmluZyh2YWwpO1xuICAgIH1cblxuICAgIHN3aXRjaEhpZGRlbih0aGlzOiBUb29sdGlwLCBpc1Zpc2libGU6IGJvb2xlYW4pIHtcbiAgICAgIGNvbnN0IHRoYXQ6IFRvb2x0aXAgPSB0aGlzO1xuICAgICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgeyBUb29sdGlwIH07XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XG5cbmNsYXNzIFR1bWJsZXIgZXh0ZW5kcyBIZWxwZXIge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgbGlzdGVuaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uLCBwcml2YXRlIGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygndHVtYmxlcicsIHRoaXMub3JpZW50YXRpb24pO1xuICAgICAgdGhpcy5zZXROZXdQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBzZXROZXdQb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgIGNvbnN0IGxpdGVyOiBzdHJpbmcgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnWCcgOiAnWSc7XG5cbiAgICAgIGNvbnN0IHN0eWxlOiBzdHJpbmcgPSBgdHJhbnNmb3JtOiB0cmFuc2xhdGUke2xpdGVyfSgke01hdGgucm91bmQocG9zaXRpb24gKiB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT04pfSUpO2A7XG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICB9XG5cbiAgICBnZXRTaGlmdChlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQpOiBudW1iZXIge1xuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcbiAgICAgICAgPyBldmVudC5jbGllbnRYIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG4gICAgICAgIDogZXZlbnQuY2xpZW50WSAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIG9uTW91c2Vkb3duQW5kTW92ZSh0aGlzOiBUdW1ibGVyLCBjb250YWluZXI6IEhUTUxFbGVtZW50LCBjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmxpc3RlbmluZyA9IHRydWU7XG5cbiAgICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBzaGlmdDogbnVtYmVyID0gdGhpcy5nZXRTaGlmdCh0aGF0LmVsZW1lbnQsIGV2ZW50KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlbW92ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNldXApO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uTW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uUGVyY2VudDogbnVtYmVyO1xuICAgICAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgICAgICAgaWYgKHRoYXQub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uUGVyY2VudCA9IG5ld1Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdQb3NpdGlvbiA9IGV2ZW50LmNsaWVudFkgLSBzaGlmdCAtIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICBuZXdQb3NpdGlvblBlcmNlbnQgPSBuZXdQb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICBwb3NpdGlvbiA9IG5ld1Bvc2l0aW9uUGVyY2VudDtcblxuICAgICAgICAgIGlmIChwb3NpdGlvbiA+IDEpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbk1vdXNldXAoKSB7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZW1vdmUpO1xuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNldXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgeyBUdW1ibGVyIH07XG4iXSwic291cmNlUm9vdCI6IiJ9