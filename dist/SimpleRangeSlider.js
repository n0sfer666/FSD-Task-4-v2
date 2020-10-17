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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9UdW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FB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RSxXQUFXLENBQUMsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQ0E1RXFCLGdCQUFNLEdBNEUzQjtBQUNELGtCQUFlLE9BQU8sQ0FBQyIsImZpbGUiOiJTaW1wbGVSYW5nZVNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNpbXBsZVJhbmdlU2xpZGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNpbXBsZVJhbmdlU2xpZGVyXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9QbHVnaW4vUGx1Z2luLnRzXCIpO1xuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4uL1ZpZXcvVmlldyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL01vZGVsL01vZGVsJztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3OiBWaWV3LCBwcml2YXRlIG1vZGVsOiBNb2RlbCkge1xuICAgIHRoaXMudmlldy5vbkNoYW5nZVZpZXcoKHR1bWJsZXJEYXRhOiB0VHVtYmxlckRhdGEpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHR1bWJsZXJEYXRhKTtcbiAgICAgIHRoaXMubW9kZWwuc2V0TmV3UG9zaXRpb24odHVtYmxlckRhdGEpO1xuICAgIH0pO1xuICAgIHRoaXMubW9kZWwub25DaGFuZ2VNb2RlbCgobW9kZWxEYXRhOiB0TW9kZWxEYXRhKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbERhdGEpO1xuICAgICAgdGhpcy52aWV3LnVwZGF0ZShtb2RlbERhdGEpO1xuICAgIH0pO1xuICB9XG59XG5leHBvcnQgeyBQcmVzZW50ZXIgfTtcbiIsImNsYXNzIE1vZGVsIHtcclxuICAgIHZhbHVlOiB0VmFsdWUgPSBbMF07XHJcblxyXG4gICAgcmFuZ2U6IHRSYW5nZSA9IFswLCAwXTtcclxuXHJcbiAgICBzdGVwOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHBvc2l0aW9uOiB0UG9zaXRpb24gPSBbMF07XHJcblxyXG4gICAgYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY2FsbGJhY2tMaXN0OiBpTW9kZWxDYWxsYmFja1tdO1xyXG5cclxuICAgIHJlYWRvbmx5IFRPX05PUk1BTElaRV9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBpQ29uZmlnTW9kZWwpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja0xpc3QgPSBbXTtcclxuXHJcbiAgICAgIHRoaXMuc3RlcCA9IHRoaXMuY29uZmlnLnN0ZXA7XHJcblxyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXROZXdQb3NpdGlvbih0dW1ibGVyRGF0YTogdFR1bWJsZXJEYXRhKSB7XHJcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHR1bWJsZXJEYXRhO1xyXG4gICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICBjb25zdCBuZXdWYWx1ZTogbnVtYmVyID0gdGhpcy5nZXROZXdWYWx1ZSh0dW1ibGVyRGF0YSk7XHJcblxyXG4gICAgICB0aGlzLmNoZWNrU3RlcENvbmRpdGlvbihuZXdWYWx1ZSwgaW5kZXgpO1xyXG4gICAgICAvLyBjaGVjayBmb3IgY29sbGlzaW9uXHJcbiAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA+IDEgJiYgdGhpcy52YWx1ZVsxXSkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlWzBdIDwgdGhpcy52YWx1ZVsxXSkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmV3VmFsdWUodHVtYmxlckRhdGE6IHRUdW1ibGVyRGF0YSk6IG51bWJlciB7XHJcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHR1bWJsZXJEYXRhO1xyXG4gICAgICBsZXQgbmV3VmFsdWU6IG51bWJlciA9IHRoaXMudmFsdWVbaW5kZXhdO1xyXG4gICAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcclxuXHJcbiAgICAgIGlmICh0dW1ibGVyRGF0YS5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgdG1wUG9zaXRpb246IG51bWJlciA9IE1hdGgucm91bmQodHVtYmxlckRhdGEucG9zaXRpb24gKiB0aGlzLlRPX05PUk1BTElaRV9QT1NJVElPTik7XHJcbiAgICAgICAgcG9zaXRpb24gPSB0bXBQb3NpdGlvbiAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OO1xyXG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5nZXRWYWx1ZUZyb21Qb3NpdGlvbihwb3NpdGlvbiwgdGhpcy5yYW5nZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHVtYmxlckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ld1ZhbHVlID0gdHVtYmxlckRhdGEudmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiB0aGlzLnZhbHVlWzFdKSB7XHJcbiAgICAgICAgICBpZiAobmV3VmFsdWUgPiB0aGlzLnZhbHVlWzFdIC0gdGhpcy5zdGVwKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZVsxXSAtIHRoaXMuc3RlcDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICBpZiAobmV3VmFsdWUgPCB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZVswXSArIHRoaXMuc3RlcDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrU3RlcENvbmRpdGlvbihuZXdWYWx1ZTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFtcclxuICAgICAgICB0aGlzLnZhbHVlW2luZGV4XSAtIHRoaXMuc3RlcCxcclxuICAgICAgICB0aGlzLnZhbHVlW2luZGV4XSArIHRoaXMuc3RlcCxcclxuICAgICAgXTtcclxuXHJcbiAgICAgIGlmIChuZXdWYWx1ZSA+PSBjb25kaXRpb25bMV0gfHwgbmV3VmFsdWUgPD0gY29uZGl0aW9uWzBdKSB7XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZUFuZFBvc2l0aW9uKG5ld1ZhbHVlLCBpbmRleCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tMaXN0LmZvckVhY2goKGNhbGxiYWNrOiBpTW9kZWxDYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgICAgICBpbmRleDogdGhpcy5hY3RpdmVJbmRleCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DaGFuZ2VNb2RlbChjYWxsYmFjazogaU1vZGVsQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5jYWxsYmFja0xpc3QucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UG9zaXRpb25Gcm9tVmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IHRSYW5nZSk6IG51bWJlciB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gKHZhbHVlIC0gcmFuZ2VbMF0pIC8gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pO1xyXG5cclxuICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKSAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZUZyb21Qb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcclxuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSAocG9zaXRpb24gKiAocmFuZ2VbMV0gLSByYW5nZVswXSkpICsgcmFuZ2VbMF07XHJcblxyXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWVBbmRQb3NpdGlvbihuZXdWYWx1ZTogbnVtYmVyLCBpOiBudW1iZXIpIHtcclxuICAgICAgdGhpcy52YWx1ZVtpXSA9IG5ld1ZhbHVlID4gMFxyXG4gICAgICAgID8gKE1hdGguY2VpbChuZXdWYWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApXHJcbiAgICAgICAgOiAoTWF0aC5mbG9vcihuZXdWYWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXApO1xyXG5cclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMucmFuZ2VbMF0pIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVbMF0gPSB0aGlzLnJhbmdlWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGkgPT09IDEgJiYgdGhpcy52YWx1ZVsxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0gPiB0aGlzLnJhbmdlWzFdKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5yYW5nZVsxXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcucmFuZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnJhbmdlLnB1c2godGhpcy5jb25maWcucmFuZ2VbaV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnJhbmdlW2ldID0gdGhpcy5jb25maWcucmFuZ2VbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnN0YXJ0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKHRoaXMuY29uZmlnLnN0YXJ0W2ldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMuY29uZmlnLnN0YXJ0W2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTW9kZWwgfTtcclxuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vVmlldy9WaWV3JztcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuL01vZGVsL01vZGVsJztcclxuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XHJcblxyXG5jbGFzcyBTaW1wbGVSYW5nZVNsaWRlciB7XHJcbiAgICB2aWV3OiBWaWV3O1xyXG5cclxuICAgIG1vZGVsOiBNb2RlbDtcclxuXHJcbiAgICBwcmVzZW50ZXI6IFByZXNlbnRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSlF1ZXJ5LCBwcml2YXRlIHVzZXJDb25maWc6IGlDb25maWdVc2VyKSB7XHJcbiAgICAgIGNvbnN0IHNsaWRlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lci5nZXQoMCk7XHJcblxyXG4gICAgICBjb25zdCBkZWZhdWx0Q29uZmlnOiBpQ29uZmlnVXNlciA9IHRoaXMuZ2V0RGVmYXVsdGFDb25maWcoKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbXBsZXRlQ29uZmlnOiBpQ29uZmlnVXNlciA9IHRoaXMuZ2V0Q29tcGxldGVDb25maWcodGhpcy51c2VyQ29uZmlnLCBkZWZhdWx0Q29uZmlnKTtcclxuXHJcbiAgICAgIGNvbnN0IG1vZGVsQ29uZmlnOiBpQ29uZmlnTW9kZWwgPSB0aGlzLmdldE1vZGVsQ29uZmlnKGNvbXBsZXRlQ29uZmlnKTtcclxuXHJcbiAgICAgIGNvbnN0IHZpZXdDb25maWc6IGlDb25maWdWaWV3ID0gdGhpcy5nZXRWaWV3Q29uZmlnKGNvbXBsZXRlQ29uZmlnKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KHNsaWRlckNvbnRhaW5lciwgdmlld0NvbmZpZyk7XHJcbiAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwobW9kZWxDb25maWcpO1xyXG4gICAgICB0aGlzLnByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIodGhpcy52aWV3LCB0aGlzLm1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZWZhdWx0YUNvbmZpZygpOiBpQ29uZmlnVXNlciB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcclxuICAgICAgICBzdGFydDogWzEwXSxcclxuICAgICAgICByYW5nZTogWzAsIDEwMF0sXHJcbiAgICAgICAgc3RlcDogMSxcclxuICAgICAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgICAgIHRvb2x0aXA6IHRydWUsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdldENvbXBsZXRlQ29uZmlnKHVzZXJDb25maWc6IGlDb25maWdVc2VyLCBkZWZhdWx0Q29uZmlnOiBpQ29uZmlnVXNlcik6IGlDb25maWdVc2VyIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBvcmllbnRhdGlvbjogdXNlckNvbmZpZy5vcmllbnRhdGlvbiA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcub3JpZW50YXRpb25cclxuICAgICAgICAgIDogdXNlckNvbmZpZy5vcmllbnRhdGlvbixcclxuICAgICAgICBzdGFydDogdXNlckNvbmZpZy5zdGFydCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcuc3RhcnRcclxuICAgICAgICAgIDogdXNlckNvbmZpZy5zdGFydCxcclxuICAgICAgICByYW5nZTogdXNlckNvbmZpZy5yYW5nZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcucmFuZ2VcclxuICAgICAgICAgIDogdXNlckNvbmZpZy5yYW5nZSxcclxuICAgICAgICBzdGVwOiB1c2VyQ29uZmlnLnN0ZXAgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLnN0ZXBcclxuICAgICAgICAgIDogdXNlckNvbmZpZy5zdGVwLFxyXG4gICAgICAgIGNvbm5lY3Q6IHVzZXJDb25maWcuY29ubmVjdCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcuY29ubmVjdFxyXG4gICAgICAgICAgOiB1c2VyQ29uZmlnLmNvbm5lY3QsXHJcbiAgICAgICAgdG9vbHRpcDogdXNlckNvbmZpZy50b29sdGlwID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy50b29sdGlwXHJcbiAgICAgICAgICA6IHVzZXJDb25maWcudG9vbHRpcCxcclxuICAgICAgICBpbnB1dDogdXNlckNvbmZpZy5pbnB1dCxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0TW9kZWxDb25maWcoY29tcGxldGVDb25maWc6IGlDb25maWdVc2VyKTogaUNvbmZpZ01vZGVsIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydDogY29tcGxldGVDb25maWcuc3RhcnQsXHJcbiAgICAgICAgcmFuZ2U6IGNvbXBsZXRlQ29uZmlnLnJhbmdlLFxyXG4gICAgICAgIHN0ZXA6IGNvbXBsZXRlQ29uZmlnLnN0ZXAsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFZpZXdDb25maWcoY29tcGxldGVDb25maWc6IGlDb25maWdVc2VyKTogaUNvbmZpZ1ZpZXcge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiBjb21wbGV0ZUNvbmZpZy5vcmllbnRhdGlvbixcclxuICAgICAgICBzdGFydDogY29tcGxldGVDb25maWcuc3RhcnQsXHJcbiAgICAgICAgcmFuZ2U6IGNvbXBsZXRlQ29uZmlnLnJhbmdlLFxyXG4gICAgICAgIGlzVG9vbHRpcDogY29tcGxldGVDb25maWcudG9vbHRpcCxcclxuICAgICAgICBpc0Nvbm5lY3Q6IGNvbXBsZXRlQ29uZmlnLmNvbm5lY3QsXHJcbiAgICAgICAgaW5wdXQ6IGNvbXBsZXRlQ29uZmlnLmlucHV0LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgU2ltcGxlUmFuZ2VTbGlkZXIgfTtcclxuXHJcbihmdW5jdGlvbiAoJDogSlF1ZXJ5U3RhdGljKSB7XHJcbiAgJC5mbi5leHRlbmQoe1xyXG4gICAgU2ltcGxlUmFuZ2VTbGlkZXIodXNlckNvbmZpZzogaUNvbmZpZ1VzZXIpIHtcclxuICAgICAgcmV0dXJuIG5ldyBTaW1wbGVSYW5nZVNsaWRlcig8SlF1ZXJ5PiB0aGlzLCA8aUNvbmZpZ1VzZXI+IHVzZXJDb25maWcpO1xyXG4gICAgfSxcclxuICB9KTtcclxufShqUXVlcnkpKTtcclxuIiwiaW1wb3J0IEhlbHBlciBmcm9tICcuL2VudGl0aWVzL0hlbHBlcic7XHJcbmltcG9ydCBUdW1ibGVyIGZyb20gJy4vZW50aXRpZXMvVHVtYmxlcic7XHJcbmltcG9ydCBDb25uZWN0IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XHJcbmltcG9ydCBUb29sdGlwIGZyb20gJy4vZW50aXRpZXMvVG9vbHRpcCc7XHJcbmltcG9ydCBJbnB1dCBmcm9tICcuL2VudGl0aWVzL0lucHV0JztcclxuXHJcbmNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xyXG4gIHBvc2l0aW9uOiB0UG9zaXRpb24gPSBbMF07XHJcblxyXG4gIHJhbmdlOiB0UmFuZ2UgPSBbMCwgMF07XHJcblxyXG4gIHN0YXJ0OiB0VmFsdWUgPSBbMF07XHJcblxyXG4gIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb247XHJcblxyXG4gIGlzVG9vbHRpcDogYm9vbGVhbjtcclxuXHJcbiAgaXNDb25uZWN0OiBib29sZWFuO1xyXG5cclxuICBzbGlkZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuICB0dW1ibGVyOiBUdW1ibGVyW10gPSBbXTtcclxuXHJcbiAgY29ubmVjdDogQ29ubmVjdFtdID0gW107XHJcblxyXG4gIHRvb2x0aXA6IFRvb2x0aXBbXSA9IFtdO1xyXG5cclxuICBpbnB1dFZhbHVlOiBJbnB1dFtdID0gW107XHJcblxyXG4gIGlucHV0VG9vbHRpcD86IElucHV0O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHByaXZhdGUgY29uZmlnOiBpQ29uZmlnVmlldykge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmlzVG9vbHRpcCA9IHRoaXMuY29uZmlnLmlzVG9vbHRpcDtcclxuICAgIHRoaXMuaXNDb25uZWN0ID0gdGhpcy5jb25maWcuaXNDb25uZWN0O1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuY29uZmlnLm9yaWVudGF0aW9uO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCdzbGlkZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlVmlldyhjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy50dW1ibGVyW2ldLm9uTW91c2Vkb3duQW5kTW92ZSh0aGlzLmNvbnRhaW5lciwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbnB1dFZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlW2ldLm9uS2V5ZG93bk9yTW91c2VvdXQoY2FsbGJhY2spO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pbnB1dFRvb2x0aXAgJiYgdGhpcy5pc1Rvb2x0aXApIHtcclxuICAgICAgdGhpcy5pbnB1dFRvb2x0aXAub25Td2l0Y2hDaGVjayh0aGlzLnRvb2x0aXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKG1vZGVsRGF0YTogdE1vZGVsRGF0YSkge1xyXG4gICAgY29uc3QgaTogbnVtYmVyID0gbW9kZWxEYXRhLmluZGV4O1xyXG4gICAgY29uc3QgeyBwb3NpdGlvbiB9ID0gbW9kZWxEYXRhO1xyXG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gbW9kZWxEYXRhO1xyXG5cclxuICAgIHRoaXMuc2V0QWN0aXZldHVtYmxlcihwb3NpdGlvbiwgaSk7XHJcblxyXG4gICAgdGhpcy50dW1ibGVyW2ldLnNldE5ld1Bvc2l0aW9uKHBvc2l0aW9uW2ldKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcclxuICAgICAgdGhpcy50b29sdGlwW2ldLnNldElubmVyVGV4dCh2YWx1ZVtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZVtpXS5lbGVtZW50LnZhbHVlID0gU3RyaW5nKHZhbHVlW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0Nvbm5lY3QpIHtcclxuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0WzBdLnNldFBvc2l0aW9uKDAsIHBvc2l0aW9uWzBdKTtcclxuICAgICAgfSBlbHNlIGlmIChwb3NpdGlvblsxXSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRQb3NpdGlvbihwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRBY3RpdmV0dW1ibGVyKHBvc2l0aW9uOiB0UG9zaXRpb24sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChwb3NpdGlvbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMudHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLnR1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudHVtYmxlclsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLnR1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5yYW5nZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZS5wdXNoKHRoaXMuY29uZmlnLnJhbmdlW2ldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJhbmdlW2ldID0gdGhpcy5jb25maWcucmFuZ2VbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnN0YXJ0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0W2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0LnB1c2godGhpcy5jb25maWcuc3RhcnRbaV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RhcnRbaV0gPSB0aGlzLmNvbmZpZy5zdGFydFtpXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCh0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMuc3RhcnRbaV0sIHRoaXMucmFuZ2UpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnN0YXJ0W2ldLCB0aGlzLnJhbmdlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLnR1bWJsZXIucHVzaChuZXcgVHVtYmxlcih0aGlzLnBvc2l0aW9uW2ldLCB0aGlzLm9yaWVudGF0aW9uLCBpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNDb25uZWN0KSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3QucHVzaChuZXcgQ29ubmVjdCh0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdLCB0aGlzLm9yaWVudGF0aW9uKSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMuY29ubmVjdFswXS5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLnRvb2x0aXAucHVzaChuZXcgVG9vbHRpcCh0aGlzLnN0YXJ0W2ldLCB0aGlzLm9yaWVudGF0aW9uKSk7XHJcblxyXG4gICAgICAgIHRoaXMudHVtYmxlcltpXS5lbGVtZW50LmFwcGVuZCh0aGlzLnRvb2x0aXBbaV0uZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy50dW1ibGVyW2ldLmVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLnNsaWRlcik7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcuaW5wdXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLmlucHV0LnZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlLnB1c2gobmV3IElucHV0KFxyXG4gICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgIHRoaXMuY29uZmlnLmlucHV0LnZhbHVlW2ldLFxyXG4gICAgICAgICAgdGhpcy5jb25maWcuc3RhcnRbaV0sXHJcbiAgICAgICAgICBpLFxyXG4gICAgICAgICkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmlucHV0ICYmIHRoaXMuY29uZmlnLmlucHV0LnRvb2x0aXApIHtcclxuICAgICAgdGhpcy5pbnB1dFRvb2x0aXAgPSBuZXcgSW5wdXQoXHJcbiAgICAgICAgJ3Rvb2x0aXAnLFxyXG4gICAgICAgIHRoaXMuY29uZmlnLmlucHV0LnRvb2x0aXBbMF0sXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBWaWV3IH07XHJcbiIsImltcG9ydCBIZWxwZXIgZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBDb25uZWN0IGV4dGVuZHMgSGVscGVyIHtcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgcG9zaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF07XG5cbiAgcHJpdmF0ZSBzdGFydFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBlbmRQb3NpdGlvbjogbnVtYmVyO1xuXG4gIHByaXZhdGUgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbjtcblxuICBwcml2YXRlIHN0eWxlOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihzdGFydFBvc2l0aW9uOiBudW1iZXIsIGVuZFBvc2l0aW9uOiBudW1iZXIsIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XG4gICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygnY29ubmVjdCcsIHRoaXMub3JpZW50YXRpb24pO1xuICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5zdGFydFBvc2l0aW9uLCB0aGlzLmVuZFBvc2l0aW9uKTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHN0YXJ0UG9zaXRpb246IG51bWJlciwgZW5kUG9zaXRpb246IG51bWJlcikge1xuICAgIGNvbnN0IHN0YXJ0OiBudW1iZXIgPSBNYXRoLnJvdW5kKHN0YXJ0UG9zaXRpb24gKiB0aGlzLlRPX0NPTk5FQ1RfVVBEQVRFKTtcbiAgICBjb25zdCBlbmQ6IG51bWJlciA9IE1hdGgucm91bmQoZW5kUG9zaXRpb24gKiB0aGlzLlRPX0NPTk5FQ1RfVVBEQVRFKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gW3N0YXJ0LCBlbmRdO1xuICAgIGlmIChzdGFydCA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICB0aGlzLnN0eWxlID0gYHdpZHRoOiAke2VuZH0lO2A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0eWxlID0gYGhlaWdodDogJHtlbmR9JTtgO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLnN0eWxlID0gYGxlZnQ6ICR7c3RhcnR9JTsgd2lkdGg6ICR7KGVuZCAtIHN0YXJ0KX0lO2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3R5bGUgPSBgdG9wOiAke3N0YXJ0fSU7IGhlaWdodDogJHsoZW5kIC0gc3RhcnQpfSU7YDtcbiAgICB9XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCB0aGlzLnN0eWxlKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29ubmVjdDtcbiIsImNsYXNzIEhlbHBlciB7XG4gICAgcmVhZG9ubHkgVE9fVFVNQkxFUl9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xuXG4gICAgcmVhZG9ubHkgVE9fQ09OTkVDVF9VUERBVEU6IG51bWJlciA9IDFlMjtcblxuICAgIGdldFBvc2l0aW9uRnJvbVZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xuICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gKCh2YWx1ZSAtIHJhbmdlWzBdKSAvIChyYW5nZVsxXSAtIHJhbmdlWzBdKSk7XG4gICAgICByZXN1bHQgPSBNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fVFVNQkxFUl9QT1NJVElPTikgLyB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT047XG5cbiAgICAgIGlmIChyZXN1bHQgPCAwKSB7XG4gICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID4gMSkge1xuICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBnZXREaXZFbGVtZW50V2l0aENsYXNzKGNzc0NsYXNzOiB0Q3NzQ2xhc3Nlcywgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbik6IEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0IHN0ckNsYXNzOiBzdHJpbmcgPSBgU1JTX18ke2Nzc0NsYXNzfWA7XG4gICAgICBjb25zdCBjc3NDbGFzc1dpdGhvdXRPcmllbnRhdGlvbjogc3RyaW5nID0gYCR7c3RyQ2xhc3N9ICR7c3RyQ2xhc3N9X2A7XG4gICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGNzc0NsYXNzV2l0aG91dE9yaWVudGF0aW9uICsgb3JpZW50YXRpb24pKTtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEhlbHBlcjtcbiIsImltcG9ydCBIZWxwZXIgZnJvbSAnLi9IZWxwZXInO1xuaW1wb3J0IFRvb2x0aXAgZnJvbSAnLi9Ub29sdGlwJztcblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBIZWxwZXIge1xuICBwcml2YXRlIHR5cGU6IHRJbnB1dFR5cGU7XG5cbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgcHVibGljIHZhbHVlPzogbnVtYmVyO1xuXG4gIHB1YmxpYyBpbmRleD86IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih0eXBlOiB0SW5wdXRUeXBlLCBlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LCB2YWx1ZT86IG51bWJlciwgaW5kZXg/OiBudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKGluZGV4KSB7XG4gICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAndmFsdWUnKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IFN0cmluZyh0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbktleWRvd25Pck1vdXNlb3V0KHRoaXM6IElucHV0LCBjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3ZhbHVlJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTtcbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBvbk1vdXNlb3V0KTtcblxuICAgIGZ1bmN0aW9uIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ1RhYicgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGFjdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlb3V0KCkge1xuICAgICAgYWN0aW9uKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFjdGlvbigpIHtcbiAgICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSBOdW1iZXIodGhhdC5lbGVtZW50LnZhbHVlKTtcbiAgICAgIGlmICh0aGF0LmluZGV4KSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBpbmRleDogdGhhdC5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3dpdGNoQ2hlY2sodGhpczogSW5wdXQsIHRvb2x0aXA6IFRvb2x0aXBbXSkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3Rvb2x0aXAnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvb2x0aXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoYXQuZWxlbWVudC5jaGVja2VkKSB7XG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hIaWRkZW4odHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hIaWRkZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuIiwiaW1wb3J0IEhlbHBlciBmcm9tICcuL0hlbHBlcic7XG5cbmNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBIZWxwZXIge1xuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgcHVibGljIHZhbHVlOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIsIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ3Rvb2x0aXAnLCB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICB0aGlzLnNldElubmVyVGV4dCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHNldElubmVyVGV4dCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgdmFsOiBudW1iZXIgPSB2YWx1ZSA+IDBcbiAgICAgID8gTWF0aC5mbG9vcih2YWx1ZSlcbiAgICAgIDogTWF0aC5jZWlsKHZhbHVlKTtcblxuICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IFN0cmluZyh2YWwpO1xuICB9XG5cbiAgc3dpdGNoSGlkZGVuKHRoaXM6IFRvb2x0aXAsIGlzVmlzaWJsZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHRoYXQ6IFRvb2x0aXAgPSB0aGlzO1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgIHRoYXQuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBUb29sdGlwO1xuIiwiaW1wb3J0IEhlbHBlciBmcm9tICcuL0hlbHBlcic7XHJcblxyXG5jbGFzcyBUdW1ibGVyIGV4dGVuZHMgSGVscGVyIHtcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGxpc3RlbmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24sIHByaXZhdGUgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCd0dW1ibGVyJywgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICAgIHRoaXMuc2V0TmV3UG9zaXRpb24odGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TmV3UG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgICBjb25zdCBsaXRlcjogc3RyaW5nID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ1gnIDogJ1knO1xyXG5cclxuICAgICAgY29uc3Qgc3R5bGU6IHN0cmluZyA9IGB0cmFuc2Zvcm06IHRyYW5zbGF0ZSR7bGl0ZXJ9KCR7TWF0aC5yb3VuZChwb3NpdGlvbiAqIHRoaXMuVE9fVFVNQkxFUl9QT1NJVElPTil9JSk7YDtcclxuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hpZnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KTogbnVtYmVyIHtcclxuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICA/IGV2ZW50LmNsaWVudFggLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcclxuICAgICAgICA6IGV2ZW50LmNsaWVudFkgLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb3VzZWRvd25BbmRNb3ZlKHRoaXM6IFR1bWJsZXIsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGF0Lmxpc3RlbmluZyA9IHRydWU7XHJcblxyXG4gICAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2hpZnQ6IG51bWJlciA9IHRoaXMuZ2V0U2hpZnQodGhhdC5lbGVtZW50LCBldmVudCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2Vtb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZXVwKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25Nb3VzZW1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgIGxldCBuZXdQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uUGVyY2VudDogbnVtYmVyO1xyXG4gICAgICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgaWYgKHRoYXQub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICBuZXdQb3NpdGlvbiA9IGV2ZW50LmNsaWVudFggLSBzaGlmdCAtIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG4gICAgICAgICAgICBuZXdQb3NpdGlvblBlcmNlbnQgPSBuZXdQb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WSAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgICAgICAgICAgbmV3UG9zaXRpb25QZXJjZW50ID0gbmV3UG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IG5ld1Bvc2l0aW9uUGVyY2VudDtcclxuXHJcbiAgICAgICAgICBpZiAocG9zaXRpb24gPiAxKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChwb3NpdGlvbiA8IDApIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgICAgcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGluZGV4OiB0aGF0LmluZGV4LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbk1vdXNldXAoKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlbW92ZSk7XHJcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZXVwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFR1bWJsZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=