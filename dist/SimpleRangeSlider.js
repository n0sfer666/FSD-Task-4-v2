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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9UdW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FB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O1lBRUQsU0FBUyxTQUFTO2dCQUNoQixRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN2RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxDQTVFcUIsZ0JBQU0sR0E0RTNCO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIiwiZmlsZSI6IlNpbXBsZVJhbmdlU2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1BsdWdpbi9QbHVnaW4udHNcIik7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vVmlldy9WaWV3JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vTW9kZWwvTW9kZWwnO1xuXG5jbGFzcyBQcmVzZW50ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IFZpZXcsIHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XG4gICAgdGhpcy52aWV3Lm9uQ2hhbmdlVmlldygodHVtYmxlckRhdGE6IHRUdW1ibGVyRGF0YSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2codHVtYmxlckRhdGEpO1xuICAgICAgdGhpcy5tb2RlbC5zZXROZXdQb3NpdGlvbih0dW1ibGVyRGF0YSk7XG4gICAgfSk7XG4gICAgdGhpcy5tb2RlbC5vbkNoYW5nZU1vZGVsKChtb2RlbERhdGE6IHRNb2RlbERhdGEpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsRGF0YSk7XG4gICAgICB0aGlzLnZpZXcudXBkYXRlKG1vZGVsRGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCB7IFByZXNlbnRlciB9O1xuIiwiY2xhc3MgTW9kZWwge1xyXG4gICAgdmFsdWU6IHRWYWx1ZSA9IFswXTtcclxuXHJcbiAgICByYW5nZTogdFJhbmdlID0gWzAsIDBdO1xyXG5cclxuICAgIHN0ZXA6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcG9zaXRpb246IHRQb3NpdGlvbiA9IFswXTtcclxuXHJcbiAgICBhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjYWxsYmFja0xpc3Q6IGlNb2RlbENhbGxiYWNrW107XHJcblxyXG4gICAgcmVhZG9ubHkgVE9fTk9STUFMSVpFX1BPU0lUSU9OOiBudW1iZXIgPSAxZTQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IGlDb25maWdNb2RlbCkge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrTGlzdCA9IFtdO1xyXG5cclxuICAgICAgdGhpcy5zdGVwID0gdGhpcy5jb25maWcuc3RlcDtcclxuXHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE5ld1Bvc2l0aW9uKHR1bWJsZXJEYXRhOiB0VHVtYmxlckRhdGEpIHtcclxuICAgICAgY29uc3QgeyBpbmRleCB9ID0gdHVtYmxlckRhdGE7XHJcbiAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAgIGNvbnN0IG5ld1ZhbHVlOiBudW1iZXIgPSB0aGlzLmdldE5ld1ZhbHVlKHR1bWJsZXJEYXRhKTtcclxuXHJcbiAgICAgIHRoaXMuY2hlY2tTdGVwQ29uZGl0aW9uKG5ld1ZhbHVlLCBpbmRleCk7XHJcbiAgICAgIC8vIGNoZWNrIGZvciBjb2xsaXNpb25cclxuICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoID4gMSAmJiB0aGlzLnZhbHVlWzFdKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMF0gPCB0aGlzLnZhbHVlWzFdKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXROZXdWYWx1ZSh0dW1ibGVyRGF0YTogdFR1bWJsZXJEYXRhKTogbnVtYmVyIHtcclxuICAgICAgY29uc3QgeyBpbmRleCB9ID0gdHVtYmxlckRhdGE7XHJcbiAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyID0gdGhpcy52YWx1ZVtpbmRleF07XHJcbiAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyO1xyXG5cclxuICAgICAgaWYgKHR1bWJsZXJEYXRhLnBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCB0bXBQb3NpdGlvbjogbnVtYmVyID0gTWF0aC5yb3VuZCh0dW1ibGVyRGF0YS5wb3NpdGlvbiAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKTtcclxuICAgICAgICBwb3NpdGlvbiA9IHRtcFBvc2l0aW9uIC8gdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT047XHJcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmdldFZhbHVlRnJvbVBvc2l0aW9uKHBvc2l0aW9uLCB0aGlzLnJhbmdlKTtcclxuICAgICAgfSBlbHNlIGlmICh0dW1ibGVyRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbmV3VmFsdWUgPSB0dW1ibGVyRGF0YS52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIHRoaXMudmFsdWVbMV0pIHtcclxuICAgICAgICAgIGlmIChuZXdWYWx1ZSA+IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXApIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlWzFdIC0gdGhpcy5zdGVwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgIGlmIChuZXdWYWx1ZSA8IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXApIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTdGVwQ29uZGl0aW9uKG5ld1ZhbHVlOiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgY29uc3QgY29uZGl0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gW1xyXG4gICAgICAgIHRoaXMudmFsdWVbaW5kZXhdIC0gdGhpcy5zdGVwLFxyXG4gICAgICAgIHRoaXMudmFsdWVbaW5kZXhdICsgdGhpcy5zdGVwLFxyXG4gICAgICBdO1xyXG5cclxuICAgICAgaWYgKG5ld1ZhbHVlID49IGNvbmRpdGlvblsxXSB8fCBuZXdWYWx1ZSA8PSBjb25kaXRpb25bMF0pIHtcclxuICAgICAgICB0aGlzLnNldFZhbHVlQW5kUG9zaXRpb24obmV3VmFsdWUsIGluZGV4KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja0xpc3QuZm9yRWFjaCgoY2FsbGJhY2s6IGlNb2RlbENhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgIGluZGV4OiB0aGlzLmFjdGl2ZUluZGV4LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZU1vZGVsKGNhbGxiYWNrOiBpTW9kZWxDYWxsYmFjaykge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrTGlzdC5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQb3NpdGlvbkZyb21WYWx1ZSh2YWx1ZTogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcclxuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSAodmFsdWUgLSByYW5nZVswXSkgLyAocmFuZ2VbMV0gLSByYW5nZVswXSk7XHJcblxyXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0ICogdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pIC8gdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlRnJvbVBvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xyXG4gICAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IChwb3NpdGlvbiAqIChyYW5nZVsxXSAtIHJhbmdlWzBdKSkgKyByYW5nZVswXTtcclxuXHJcbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZUFuZFBvc2l0aW9uKG5ld1ZhbHVlOiBudW1iZXIsIGk6IG51bWJlcikge1xyXG4gICAgICB0aGlzLnZhbHVlW2ldID0gbmV3VmFsdWUgPiAwXHJcbiAgICAgICAgPyAoTWF0aC5jZWlsKG5ld1ZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcClcclxuICAgICAgICA6IChNYXRoLmZsb29yKG5ld1ZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcCk7XHJcblxyXG4gICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlWzBdIDwgdGhpcy5yYW5nZVswXSkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVswXSA9IHRoaXMucmFuZ2VbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaSA9PT0gMSAmJiB0aGlzLnZhbHVlWzFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZVsxXSA+IHRoaXMucmFuZ2VbMV0pIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLnJhbmdlWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5yYW5nZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLnJhbmdlW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMucmFuZ2UucHVzaCh0aGlzLmNvbmZpZy5yYW5nZVtpXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmFuZ2VbaV0gPSB0aGlzLmNvbmZpZy5yYW5nZVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuc3RhcnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlLnB1c2godGhpcy5jb25maWcuc3RhcnRbaV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5jb25maWcuc3RhcnRbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uLnB1c2godGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNb2RlbCB9O1xyXG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi9WaWV3L1ZpZXcnO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vTW9kZWwvTW9kZWwnO1xyXG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tICcuL0NvbnRyb2xsZXIvUHJlc2VudGVyJztcclxuXHJcbmNsYXNzIFNpbXBsZVJhbmdlU2xpZGVyIHtcclxuICAgIHZpZXc6IFZpZXc7XHJcblxyXG4gICAgbW9kZWw6IE1vZGVsO1xyXG5cclxuICAgIHByZXNlbnRlcjogUHJlc2VudGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBKUXVlcnksIHByaXZhdGUgdXNlckNvbmZpZzogaUNvbmZpZ1VzZXIpIHtcclxuICAgICAgY29uc3Qgc2xpZGVyQ29udGFpbmVyOiBIVE1MRWxlbWVudCA9IHRoaXMuY29udGFpbmVyLmdldCgwKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmF1bHRDb25maWc6IGlDb25maWdVc2VyID0gdGhpcy5nZXREZWZhdWx0YUNvbmZpZygpO1xyXG5cclxuICAgICAgY29uc3QgY29tcGxldGVDb25maWc6IGlDb25maWdVc2VyID0gdGhpcy5nZXRDb21wbGV0ZUNvbmZpZyh0aGlzLnVzZXJDb25maWcsIGRlZmF1bHRDb25maWcpO1xyXG5cclxuICAgICAgY29uc3QgbW9kZWxDb25maWc6IGlDb25maWdNb2RlbCA9IHRoaXMuZ2V0TW9kZWxDb25maWcoY29tcGxldGVDb25maWcpO1xyXG5cclxuICAgICAgY29uc3Qgdmlld0NvbmZpZzogaUNvbmZpZ1ZpZXcgPSB0aGlzLmdldFZpZXdDb25maWcoY29tcGxldGVDb25maWcpO1xyXG4gICAgICBcclxuICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoc2xpZGVyQ29udGFpbmVyLCB2aWV3Q29uZmlnKTtcclxuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChtb2RlbENvbmZpZyk7XHJcbiAgICAgIHRoaXMucHJlc2VudGVyID0gbmV3IFByZXNlbnRlcih0aGlzLnZpZXcsIHRoaXMubW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlZmF1bHRhQ29uZmlnKCk6IGlDb25maWdVc2VyIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxyXG4gICAgICAgIHN0YXJ0OiBbMTBdLFxyXG4gICAgICAgIHJhbmdlOiBbMCwgMTAwXSxcclxuICAgICAgICBzdGVwOiAxLFxyXG4gICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICAgICAgdG9vbHRpcDogdHJ1ZSxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcGxldGVDb25maWcodXNlckNvbmZpZzogaUNvbmZpZ1VzZXIsIGRlZmF1bHRDb25maWc6IGlDb25maWdVc2VyKTogaUNvbmZpZ1VzZXIge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiB1c2VyQ29uZmlnLm9yaWVudGF0aW9uID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy5vcmllbnRhdGlvblxyXG4gICAgICAgICAgOiB1c2VyQ29uZmlnLm9yaWVudGF0aW9uLFxyXG4gICAgICAgIHN0YXJ0OiB1c2VyQ29uZmlnLnN0YXJ0ID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy5zdGFydFxyXG4gICAgICAgICAgOiB1c2VyQ29uZmlnLnN0YXJ0LFxyXG4gICAgICAgIHJhbmdlOiB1c2VyQ29uZmlnLnJhbmdlID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy5yYW5nZVxyXG4gICAgICAgICAgOiB1c2VyQ29uZmlnLnJhbmdlLFxyXG4gICAgICAgIHN0ZXA6IHVzZXJDb25maWcuc3RlcCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcuc3RlcFxyXG4gICAgICAgICAgOiB1c2VyQ29uZmlnLnN0ZXAsXHJcbiAgICAgICAgY29ubmVjdDogdXNlckNvbmZpZy5jb25uZWN0ID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy5jb25uZWN0XHJcbiAgICAgICAgICA6IHVzZXJDb25maWcuY29ubmVjdCxcclxuICAgICAgICB0b29sdGlwOiB1c2VyQ29uZmlnLnRvb2x0aXAgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLnRvb2x0aXBcclxuICAgICAgICAgIDogdXNlckNvbmZpZy50b29sdGlwLFxyXG4gICAgICAgIGlucHV0OiB1c2VyQ29uZmlnLmlucHV0LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRNb2RlbENvbmZpZyhjb21wbGV0ZUNvbmZpZzogaUNvbmZpZ1VzZXIpOiBpQ29uZmlnTW9kZWwge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0YXJ0OiBjb21wbGV0ZUNvbmZpZy5zdGFydCxcclxuICAgICAgICByYW5nZTogY29tcGxldGVDb25maWcucmFuZ2UsXHJcbiAgICAgICAgc3RlcDogY29tcGxldGVDb25maWcuc3RlcCxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Vmlld0NvbmZpZyhjb21wbGV0ZUNvbmZpZzogaUNvbmZpZ1VzZXIpOiBpQ29uZmlnVmlldyB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb3JpZW50YXRpb246IGNvbXBsZXRlQ29uZmlnLm9yaWVudGF0aW9uLFxyXG4gICAgICAgIHN0YXJ0OiBjb21wbGV0ZUNvbmZpZy5zdGFydCxcclxuICAgICAgICByYW5nZTogY29tcGxldGVDb25maWcucmFuZ2UsXHJcbiAgICAgICAgaXNUb29sdGlwOiBjb21wbGV0ZUNvbmZpZy50b29sdGlwLFxyXG4gICAgICAgIGlzQ29ubmVjdDogY29tcGxldGVDb25maWcuY29ubmVjdCxcclxuICAgICAgICBpbnB1dDogY29tcGxldGVDb25maWcuaW5wdXQsXHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBTaW1wbGVSYW5nZVNsaWRlciB9O1xyXG5cclxuKGZ1bmN0aW9uICgkOiBKUXVlcnlTdGF0aWMpIHtcclxuICAkLmZuLmV4dGVuZCh7XHJcbiAgICBTaW1wbGVSYW5nZVNsaWRlcih1c2VyQ29uZmlnOiBpQ29uZmlnVXNlcikge1xyXG4gICAgICByZXR1cm4gbmV3IFNpbXBsZVJhbmdlU2xpZGVyKDxKUXVlcnk+IHRoaXMsIDxpQ29uZmlnVXNlcj4gdXNlckNvbmZpZyk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59KGpRdWVyeSkpO1xyXG4iLCJpbXBvcnQgSGVscGVyIGZyb20gJy4vZW50aXRpZXMvSGVscGVyJztcclxuaW1wb3J0IFR1bWJsZXIgZnJvbSAnLi9lbnRpdGllcy9UdW1ibGVyJztcclxuaW1wb3J0IENvbm5lY3QgZnJvbSAnLi9lbnRpdGllcy9Db25uZWN0JztcclxuaW1wb3J0IFRvb2x0aXAgZnJvbSAnLi9lbnRpdGllcy9Ub29sdGlwJztcclxuaW1wb3J0IElucHV0IGZyb20gJy4vZW50aXRpZXMvSW5wdXQnO1xyXG5cclxuY2xhc3MgVmlldyBleHRlbmRzIEhlbHBlciB7XHJcbiAgcG9zaXRpb246IHRQb3NpdGlvbiA9IFswXTtcclxuXHJcbiAgcmFuZ2U6IHRSYW5nZSA9IFswLCAwXTtcclxuXHJcbiAgc3RhcnQ6IHRWYWx1ZSA9IFswXTtcclxuXHJcbiAgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbjtcclxuXHJcbiAgaXNUb29sdGlwOiBib29sZWFuO1xyXG5cclxuICBpc0Nvbm5lY3Q6IGJvb2xlYW47XHJcblxyXG4gIHNsaWRlcjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHR1bWJsZXI6IFR1bWJsZXJbXSA9IFtdO1xyXG5cclxuICBjb25uZWN0OiBDb25uZWN0W10gPSBbXTtcclxuXHJcbiAgdG9vbHRpcDogVG9vbHRpcFtdID0gW107XHJcblxyXG4gIGlucHV0VmFsdWU6IElucHV0W10gPSBbXTtcclxuXHJcbiAgaW5wdXRUb29sdGlwPzogSW5wdXQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBjb25maWc6IGlDb25maWdWaWV3KSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuaXNUb29sdGlwID0gdGhpcy5jb25maWcuaXNUb29sdGlwO1xyXG4gICAgdGhpcy5pc0Nvbm5lY3QgPSB0aGlzLmNvbmZpZy5pc0Nvbm5lY3Q7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5jb25maWcub3JpZW50YXRpb247XHJcblxyXG4gICAgdGhpcy5zbGlkZXIgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ3NsaWRlcicsIHRoaXMub3JpZW50YXRpb24pO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VWaWV3KGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLnR1bWJsZXJbaV0ub25Nb3VzZWRvd25BbmRNb3ZlKHRoaXMuY29udGFpbmVyLCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pbnB1dFZhbHVlWzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmlucHV0VmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmlucHV0VmFsdWVbaV0ub25LZXlkb3duT3JNb3VzZW91dChjYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlucHV0VG9vbHRpcCAmJiB0aGlzLmlzVG9vbHRpcCkge1xyXG4gICAgICB0aGlzLmlucHV0VG9vbHRpcC5vblN3aXRjaENoZWNrKHRoaXMudG9vbHRpcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUobW9kZWxEYXRhOiB0TW9kZWxEYXRhKSB7XHJcbiAgICBjb25zdCBpOiBudW1iZXIgPSBtb2RlbERhdGEuaW5kZXg7XHJcbiAgICBjb25zdCB7IHBvc2l0aW9uIH0gPSBtb2RlbERhdGE7XHJcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBtb2RlbERhdGE7XHJcblxyXG4gICAgdGhpcy5zZXRBY3RpdmV0dW1ibGVyKHBvc2l0aW9uLCBpKTtcclxuXHJcbiAgICB0aGlzLnR1bWJsZXJbaV0uc2V0TmV3UG9zaXRpb24ocG9zaXRpb25baV0pO1xyXG5cclxuICAgIGlmICh0aGlzLmlzVG9vbHRpcCkge1xyXG4gICAgICB0aGlzLnRvb2x0aXBbaV0uc2V0SW5uZXJUZXh0KHZhbHVlW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pbnB1dFZhbHVlWzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5pbnB1dFZhbHVlW2ldLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodmFsdWVbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzQ29ubmVjdCkge1xyXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbi5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RbMF0uc2V0UG9zaXRpb24oMCwgcG9zaXRpb25bMF0pO1xyXG4gICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uWzFdKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0WzBdLnNldFBvc2l0aW9uKHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEFjdGl2ZXR1bWJsZXIocG9zaXRpb246IHRQb3NpdGlvbiwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy50dW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMudHVtYmxlclsxXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcclxuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50dW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMudHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcclxuICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnJhbmdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLnJhbmdlW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnJhbmdlLnB1c2godGhpcy5jb25maWcucmFuZ2VbaV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmFuZ2VbaV0gPSB0aGlzLmNvbmZpZy5yYW5nZVtpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuc3RhcnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuc3RhcnRbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnQucHVzaCh0aGlzLmNvbmZpZy5zdGFydFtpXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zdGFydFtpXSA9IHRoaXMuY29uZmlnLnN0YXJ0W2ldO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy5zdGFydFtpXSwgdGhpcy5yYW5nZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMuc3RhcnRbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMudHVtYmxlci5wdXNoKG5ldyBUdW1ibGVyKHRoaXMucG9zaXRpb25baV0sIHRoaXMub3JpZW50YXRpb24sIGkpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0Nvbm5lY3QpIHtcclxuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0LnB1c2gobmV3IENvbm5lY3QoMCwgdGhpcy5wb3NpdGlvblswXSwgdGhpcy5vcmllbnRhdGlvbikpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KHRoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0sIHRoaXMub3JpZW50YXRpb24pKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy5jb25uZWN0WzBdLmVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzVG9vbHRpcCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMudG9vbHRpcC5wdXNoKG5ldyBUb29sdGlwKHRoaXMuc3RhcnRbaV0sIHRoaXMub3JpZW50YXRpb24pKTtcclxuXHJcbiAgICAgICAgdGhpcy50dW1ibGVyW2ldLmVsZW1lbnQuYXBwZW5kKHRoaXMudG9vbHRpcFtpXS5lbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50dW1ibGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLnR1bWJsZXJbaV0uZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMuc2xpZGVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcuaW5wdXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5pbnB1dC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuaW5wdXQudmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmlucHV0VmFsdWUucHVzaChuZXcgSW5wdXQoXHJcbiAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgdGhpcy5jb25maWcuaW5wdXQudmFsdWVbaV0sXHJcbiAgICAgICAgICB0aGlzLmNvbmZpZy5zdGFydFtpXSxcclxuICAgICAgICAgIGksXHJcbiAgICAgICAgKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcuaW5wdXQgJiYgdGhpcy5jb25maWcuaW5wdXQudG9vbHRpcCkge1xyXG4gICAgICB0aGlzLmlucHV0VG9vbHRpcCA9IG5ldyBJbnB1dChcclxuICAgICAgICAndG9vbHRpcCcsXHJcbiAgICAgICAgdGhpcy5jb25maWcuaW5wdXQudG9vbHRpcFswXSxcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFZpZXcgfTtcclxuIiwiaW1wb3J0IEhlbHBlciBmcm9tICcuL0hlbHBlcic7XG5cbmNsYXNzIENvbm5lY3QgZXh0ZW5kcyBIZWxwZXIge1xuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBwb3NpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcblxuICBwcml2YXRlIHN0YXJ0UG9zaXRpb246IG51bWJlcjtcblxuICBwcml2YXRlIGVuZFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uO1xuXG4gIHByaXZhdGUgc3R5bGU6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHN0YXJ0UG9zaXRpb246IG51bWJlciwgZW5kUG9zaXRpb246IG51bWJlciwgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcbiAgICB0aGlzLmVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCdjb25uZWN0JywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLnN0YXJ0UG9zaXRpb24sIHRoaXMuZW5kUG9zaXRpb24pO1xuICB9XG5cbiAgc2V0UG9zaXRpb24oc3RhcnRQb3NpdGlvbjogbnVtYmVyLCBlbmRQb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgY29uc3Qgc3RhcnQ6IG51bWJlciA9IE1hdGgucm91bmQoc3RhcnRQb3NpdGlvbiAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xuICAgIGNvbnN0IGVuZDogbnVtYmVyID0gTWF0aC5yb3VuZChlbmRQb3NpdGlvbiAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xuICAgIHRoaXMucG9zaXRpb24gPSBbc3RhcnQsIGVuZF07XG4gICAgaWYgKHN0YXJ0ID09PSAwKSB7XG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSBgd2lkdGg6ICR7ZW5kfSU7YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSBgaGVpZ2h0OiAke2VuZH0lO2A7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMuc3R5bGUgPSBgbGVmdDogJHtzdGFydH0lOyB3aWR0aDogJHsoZW5kIC0gc3RhcnQpfSU7YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdHlsZSA9IGB0b3A6ICR7c3RhcnR9JTsgaGVpZ2h0OiAkeyhlbmQgLSBzdGFydCl9JTtgO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHRoaXMuc3R5bGUpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb25uZWN0O1xuIiwiY2xhc3MgSGVscGVyIHtcbiAgICByZWFkb25seSBUT19UVU1CTEVSX1BPU0lUSU9OOiBudW1iZXIgPSAxZTQ7XG5cbiAgICByZWFkb25seSBUT19DT05ORUNUX1VQREFURTogbnVtYmVyID0gMWUyO1xuXG4gICAgZ2V0UG9zaXRpb25Gcm9tVmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IHRSYW5nZSk6IG51bWJlciB7XG4gICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAoKHZhbHVlIC0gcmFuZ2VbMF0pIC8gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pKTtcbiAgICAgIHJlc3VsdCA9IE1hdGgucm91bmQocmVzdWx0ICogdGhpcy5UT19UVU1CTEVSX1BPU0lUSU9OKSAvIHRoaXMuVE9fVFVNQkxFUl9QT1NJVElPTjtcblxuICAgICAgaWYgKHJlc3VsdCA8IDApIHtcbiAgICAgICAgcmVzdWx0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgPiAxKSB7XG4gICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGdldERpdkVsZW1lbnRXaXRoQ2xhc3MoY3NzQ2xhc3M6IHRDc3NDbGFzc2VzLCBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uKTogSFRNTEVsZW1lbnQge1xuICAgICAgY29uc3Qgc3RyQ2xhc3M6IHN0cmluZyA9IGBTUlNfXyR7Y3NzQ2xhc3N9YDtcbiAgICAgIGNvbnN0IGNzc0NsYXNzV2l0aG91dE9yaWVudGF0aW9uOiBzdHJpbmcgPSBgJHtzdHJDbGFzc30gJHtzdHJDbGFzc31fYDtcbiAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoY3NzQ2xhc3NXaXRob3V0T3JpZW50YXRpb24gKyBvcmllbnRhdGlvbikpO1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgSGVscGVyO1xuIiwiaW1wb3J0IEhlbHBlciBmcm9tICcuL0hlbHBlcic7XG5pbXBvcnQgVG9vbHRpcCBmcm9tICcuL1Rvb2x0aXAnO1xuXG5jbGFzcyBJbnB1dCBleHRlbmRzIEhlbHBlciB7XG4gIHByaXZhdGUgdHlwZTogdElucHV0VHlwZTtcblxuICBwdWJsaWMgZWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblxuICBwdWJsaWMgdmFsdWU6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHRJbnB1dFR5cGUsIGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIHZhbHVlPzogbnVtYmVyLCBpbmRleD86IG51bWJlcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBpZiAoaW5kZXgpIHtcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICd2YWx1ZScpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gU3RyaW5nKHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uS2V5ZG93bk9yTW91c2VvdXQodGhpczogSW5wdXQsIGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICBpZiAodGhhdC50eXBlICE9PSAndmFsdWUnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIG9uTW91c2VvdXQpO1xuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnVGFiJyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTW91c2VvdXQoKSB7XG4gICAgICBhY3Rpb24oKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWN0aW9uKCkge1xuICAgICAgY29uc3QgdmFsdWU6IG51bWJlciA9IE51bWJlcih0aGF0LmVsZW1lbnQudmFsdWUpO1xuICAgICAgaWYgKHRoYXQuaW5kZXgpIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGluZGV4OiB0aGF0LmluZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Td2l0Y2hDaGVjayh0aGlzOiBJbnB1dCwgdG9vbHRpcDogVG9vbHRpcFtdKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICBpZiAodGhhdC50eXBlICE9PSAndG9vbHRpcCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9vbHRpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhhdC5lbGVtZW50LmNoZWNrZWQpIHtcbiAgICAgICAgICB0b29sdGlwW2ldLnN3aXRjaEhpZGRlbih0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b29sdGlwW2ldLnN3aXRjaEhpZGRlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7XG4iLCJpbXBvcnQgSGVscGVyIGZyb20gJy4vSGVscGVyJztcblxuY2xhc3MgVG9vbHRpcCBleHRlbmRzIEhlbHBlciB7XG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBwdWJsaWMgdmFsdWU6IG51bWJlcjtcblxuICBwcml2YXRlIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb247XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlciwgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygndG9vbHRpcCcsIHRoaXMub3JpZW50YXRpb24pO1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0SW5uZXJUZXh0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBjb25zdCB2YWw6IG51bWJlciA9IHZhbHVlID4gMFxuICAgICAgPyBNYXRoLmZsb29yKHZhbHVlKVxuICAgICAgOiBNYXRoLmNlaWwodmFsdWUpO1xuXG4gICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gU3RyaW5nKHZhbCk7XG4gIH1cblxuICBzd2l0Y2hIaWRkZW4odGhpczogVG9vbHRpcCwgaXNWaXNpYmxlOiBib29sZWFuKSB7XG4gICAgY29uc3QgdGhhdDogVG9vbHRpcCA9IHRoaXM7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgdGhhdC5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRvb2x0aXA7XG4iLCJpbXBvcnQgSGVscGVyIGZyb20gJy4vSGVscGVyJztcclxuXHJcbmNsYXNzIFR1bWJsZXIgZXh0ZW5kcyBIZWxwZXIge1xyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgbGlzdGVuaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHBvc2l0aW9uOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbiwgcHJpdmF0ZSBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ3R1bWJsZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgdGhpcy5zZXROZXdQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXROZXdQb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICAgIGNvbnN0IGxpdGVyOiBzdHJpbmcgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnWCcgOiAnWSc7XHJcblxyXG4gICAgICBjb25zdCBzdHlsZTogc3RyaW5nID0gYHRyYW5zZm9ybTogdHJhbnNsYXRlJHtsaXRlcn0oJHtNYXRoLnJvdW5kKHBvc2l0aW9uICogdGhpcy5UT19UVU1CTEVSX1BPU0lUSU9OKX0lKTtgO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTaGlmdChlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQpOiBudW1iZXIge1xyXG4gICAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgID8gZXZlbnQuY2xpZW50WCAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdFxyXG4gICAgICAgIDogZXZlbnQuY2xpZW50WSAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vdXNlZG93bkFuZE1vdmUodGhpczogVHVtYmxlciwgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoYXQubGlzdGVuaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBzaGlmdDogbnVtYmVyID0gdGhpcy5nZXRTaGlmdCh0aGF0LmVsZW1lbnQsIGV2ZW50KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZW1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNldXApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbk1vdXNlbW92ZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgICBsZXQgbmV3UG9zaXRpb25QZXJjZW50OiBudW1iZXI7XHJcbiAgICAgICAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcclxuXHJcbiAgICAgICAgICBpZiAodGhhdC5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WCAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uUGVyY2VudCA9IG5ld1Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBldmVudC5jbGllbnRZIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG4gICAgICAgICAgICBuZXdQb3NpdGlvblBlcmNlbnQgPSBuZXdQb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgIHBvc2l0aW9uID0gbmV3UG9zaXRpb25QZXJjZW50O1xyXG5cclxuICAgICAgICAgIGlmIChwb3NpdGlvbiA+IDEpIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICBwb3NpdGlvbixcclxuICAgICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXgsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uTW91c2V1cCgpIHtcclxuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2Vtb3ZlKTtcclxuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNldXApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVHVtYmxlcjtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==