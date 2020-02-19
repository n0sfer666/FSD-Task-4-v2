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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9UdW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FB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LEdBQUcsS0FBSyxHQUFHLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztvQkFDNUUsa0JBQWtCLEdBQUcsV0FBVyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7aUJBQzNEO2dCQUdELFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztnQkFFOUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixRQUFRLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO2dCQUNELElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtvQkFDaEIsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDZDtnQkFFRCxRQUFRLENBQUM7b0JBQ1AsUUFBUTtvQkFDUixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUM7WUFFRCxTQUFTLFNBQVM7Z0JBQ2hCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDckQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLENBNUVxQixlQUFNLEdBNEUzQjtBQUNRLDBCQUFPIiwiZmlsZSI6IlNpbXBsZVJhbmdlU2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1BsdWdpbi9QbHVnaW4udHNcIik7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vVmlldy9WaWV3JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vTW9kZWwvTW9kZWwnO1xuXG5jbGFzcyBQcmVzZW50ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IFZpZXcsIHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XG4gICAgdGhpcy52aWV3Lm9uQ2hhbmdlVmlldygodHVtYmxlckRhdGE6IHRUdW1ibGVyRGF0YSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2codHVtYmxlckRhdGEpO1xuICAgICAgdGhpcy5tb2RlbC5zZXROZXdQb3NpdGlvbih0dW1ibGVyRGF0YSk7XG4gICAgfSk7XG4gICAgdGhpcy5tb2RlbC5vbkNoYW5nZU1vZGVsKChtb2RlbERhdGE6IHRNb2RlbERhdGEpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsRGF0YSk7XG4gICAgICB0aGlzLnZpZXcudXBkYXRlKG1vZGVsRGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCB7IFByZXNlbnRlciB9O1xuIiwiY2xhc3MgTW9kZWwge1xuICAgIHZhbHVlOiB0VmFsdWUgPSBbMF07XG5cbiAgICByYW5nZTogdFJhbmdlID0gWzAsIDBdO1xuXG4gICAgc3RlcDogbnVtYmVyID0gMDtcblxuICAgIHBvc2l0aW9uOiB0UG9zaXRpb24gPSBbMF07XG5cbiAgICBhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNhbGxiYWNrTGlzdDogaU1vZGVsQ2FsbGJhY2tbXTtcblxuICAgIHJlYWRvbmx5IFRPX05PUk1BTElaRV9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IGlDb25maWdNb2RlbCkge1xuICAgICAgdGhpcy5jYWxsYmFja0xpc3QgPSBbXTtcblxuICAgICAgdGhpcy5zdGVwID0gdGhpcy5jb25maWcuc3RlcDtcblxuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc2V0TmV3UG9zaXRpb24odHVtYmxlckRhdGE6IHRUdW1ibGVyRGF0YSkge1xuICAgICAgY29uc3QgeyBpbmRleCB9ID0gdHVtYmxlckRhdGE7XG4gICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG5cbiAgICAgIGNvbnN0IG5ld1ZhbHVlOiBudW1iZXIgPSB0aGlzLmdldE5ld1ZhbHVlKHR1bWJsZXJEYXRhKTtcblxuICAgICAgdGhpcy5jaGVja1N0ZXBDb25kaXRpb24obmV3VmFsdWUsIGluZGV4KTtcbiAgICAgIC8vIGNoZWNrIGZvciBjb2xsaXNpb25cbiAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA+IDEgJiYgdGhpcy52YWx1ZVsxXSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZVswXSA8IHRoaXMudmFsdWVbMV0pIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXROZXdWYWx1ZSh0dW1ibGVyRGF0YTogdFR1bWJsZXJEYXRhKTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHR1bWJsZXJEYXRhO1xuICAgICAgbGV0IG5ld1ZhbHVlOiBudW1iZXIgPSB0aGlzLnZhbHVlW2luZGV4XTtcbiAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgICBpZiAodHVtYmxlckRhdGEucG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCB0bXBQb3NpdGlvbjogbnVtYmVyID0gTWF0aC5yb3VuZCh0dW1ibGVyRGF0YS5wb3NpdGlvbiAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKTtcbiAgICAgICAgcG9zaXRpb24gPSB0bXBQb3NpdGlvbiAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OO1xuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuZ2V0VmFsdWVGcm9tUG9zaXRpb24ocG9zaXRpb24sIHRoaXMucmFuZ2UpO1xuICAgICAgfSBlbHNlIGlmICh0dW1ibGVyRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdHVtYmxlckRhdGEudmFsdWU7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIHRoaXMudmFsdWVbMV0pIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgPiB0aGlzLnZhbHVlWzFdIC0gdGhpcy5zdGVwKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gMSkge1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSA8IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXApIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZVswXSArIHRoaXMuc3RlcDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICB9XG5cbiAgICBjaGVja1N0ZXBDb25kaXRpb24obmV3VmFsdWU6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xuICAgICAgY29uc3QgY29uZGl0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gW1xuICAgICAgICB0aGlzLnZhbHVlW2luZGV4XSAtIHRoaXMuc3RlcCxcbiAgICAgICAgdGhpcy52YWx1ZVtpbmRleF0gKyB0aGlzLnN0ZXAsXG4gICAgICBdO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPj0gY29uZGl0aW9uWzFdIHx8IG5ld1ZhbHVlIDw9IGNvbmRpdGlvblswXSkge1xuICAgICAgICB0aGlzLnNldFZhbHVlQW5kUG9zaXRpb24obmV3VmFsdWUsIGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrTGlzdC5mb3JFYWNoKChjYWxsYmFjazogaU1vZGVsQ2FsbGJhY2spID0+IHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIGluZGV4OiB0aGlzLmFjdGl2ZUluZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlTW9kZWwoY2FsbGJhY2s6IGlNb2RlbENhbGxiYWNrKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrTGlzdC5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbkZyb21WYWx1ZSh2YWx1ZTogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gKHZhbHVlIC0gcmFuZ2VbMF0pIC8gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pO1xuXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0ICogdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pIC8gdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pO1xuICAgIH1cblxuICAgIGdldFZhbHVlRnJvbVBvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xuICAgICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSAocG9zaXRpb24gKiAocmFuZ2VbMV0gLSByYW5nZVswXSkpICsgcmFuZ2VbMF07XG5cbiAgICAgIHJldHVybiAoTWF0aC5yb3VuZChyZXN1bHQpKTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZUFuZFBvc2l0aW9uKG5ld1ZhbHVlOiBudW1iZXIsIGk6IG51bWJlcikge1xuICAgICAgdGhpcy52YWx1ZVtpXSA9IG5ld1ZhbHVlID4gMFxuICAgICAgICA/IChNYXRoLmNlaWwobmV3VmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKVxuICAgICAgICA6IChNYXRoLmZsb29yKG5ld1ZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcCk7XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlWzBdIDwgdGhpcy5yYW5nZVswXSkge1xuICAgICAgICAgIHRoaXMudmFsdWVbMF0gPSB0aGlzLnJhbmdlWzBdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSAxICYmIHRoaXMudmFsdWVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZVsxXSA+IHRoaXMucmFuZ2VbMV0pIHtcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5yYW5nZVsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5yYW5nZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5yYW5nZS5wdXNoKHRoaXMuY29uZmlnLnJhbmdlW2ldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJhbmdlW2ldID0gdGhpcy5jb25maWcucmFuZ2VbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5zdGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy52YWx1ZVtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKHRoaXMuY29uZmlnLnN0YXJ0W2ldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldID0gdGhpcy5jb25maWcuc3RhcnRbaV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBNb2RlbCB9O1xuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vVmlldy9WaWV3JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9Nb2RlbC9Nb2RlbCc7XG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tICcuL0NvbnRyb2xsZXIvUHJlc2VudGVyJztcblxuY2xhc3MgU2ltcGxlUmFuZ2VTbGlkZXIge1xuICAgIHZpZXc6IFZpZXc7XG5cbiAgICBtb2RlbDogTW9kZWw7XG5cbiAgICBwcmVzZW50ZXI6IFByZXNlbnRlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBKUXVlcnksIHByaXZhdGUgdXNlckNvbmZpZzogaUNvbmZpZ1VzZXIpIHtcbiAgICAgIGNvbnN0IHNsaWRlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lci5nZXQoMCk7XG5cbiAgICAgIGNvbnN0IGRlZmF1bHRDb25maWc6IGlDb25maWdVc2VyID0ge1xuICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICBzdGFydDogWzEwXSxcbiAgICAgICAgcmFuZ2U6IFswLCAxMDBdLFxuICAgICAgICBzdGVwOiAxLFxuICAgICAgICBjb25uZWN0OiB0cnVlLFxuICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgY29tcGxldGVDb25maWc6IGlDb25maWdVc2VyID0ge1xuICAgICAgICBvcmllbnRhdGlvbjogdGhpcy51c2VyQ29uZmlnLm9yaWVudGF0aW9uID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGRlZmF1bHRDb25maWcub3JpZW50YXRpb25cbiAgICAgICAgICA6IHRoaXMudXNlckNvbmZpZy5vcmllbnRhdGlvbixcbiAgICAgICAgc3RhcnQ6IHRoaXMudXNlckNvbmZpZy5zdGFydCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLnN0YXJ0XG4gICAgICAgICAgOiB0aGlzLnVzZXJDb25maWcuc3RhcnQsXG4gICAgICAgIHJhbmdlOiB0aGlzLnVzZXJDb25maWcucmFuZ2UgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZGVmYXVsdENvbmZpZy5yYW5nZVxuICAgICAgICAgIDogdGhpcy51c2VyQ29uZmlnLnJhbmdlLFxuICAgICAgICBzdGVwOiB0aGlzLnVzZXJDb25maWcuc3RlcCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLnN0ZXBcbiAgICAgICAgICA6IHRoaXMudXNlckNvbmZpZy5zdGVwLFxuICAgICAgICBjb25uZWN0OiB0aGlzLnVzZXJDb25maWcuY29ubmVjdCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLmNvbm5lY3RcbiAgICAgICAgICA6IHRoaXMudXNlckNvbmZpZy5jb25uZWN0LFxuICAgICAgICB0b29sdGlwOiB0aGlzLnVzZXJDb25maWcudG9vbHRpcCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBkZWZhdWx0Q29uZmlnLnRvb2x0aXBcbiAgICAgICAgICA6IHRoaXMudXNlckNvbmZpZy50b29sdGlwLFxuICAgICAgICBpbnB1dDogdGhpcy51c2VyQ29uZmlnLmlucHV0LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgbW9kZWxDb25maWc6IGlDb25maWdNb2RlbCA9IHtcbiAgICAgICAgc3RhcnQ6IGNvbXBsZXRlQ29uZmlnLnN0YXJ0LFxuICAgICAgICByYW5nZTogY29tcGxldGVDb25maWcucmFuZ2UsXG4gICAgICAgIHN0ZXA6IGNvbXBsZXRlQ29uZmlnLnN0ZXAsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB2aWV3Q29uZmlnOiBpQ29uZmlnVmlldyA9IHtcbiAgICAgICAgb3JpZW50YXRpb246IGNvbXBsZXRlQ29uZmlnLm9yaWVudGF0aW9uLFxuICAgICAgICBzdGFydDogY29tcGxldGVDb25maWcuc3RhcnQsXG4gICAgICAgIHJhbmdlOiBjb21wbGV0ZUNvbmZpZy5yYW5nZSxcbiAgICAgICAgaXNUb29sdGlwOiBjb21wbGV0ZUNvbmZpZy50b29sdGlwLFxuICAgICAgICBpc0Nvbm5lY3Q6IGNvbXBsZXRlQ29uZmlnLmNvbm5lY3QsXG4gICAgICAgIGlucHV0OiBjb21wbGV0ZUNvbmZpZy5pbnB1dCxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KHNsaWRlckNvbnRhaW5lciwgdmlld0NvbmZpZyk7XG4gICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKG1vZGVsQ29uZmlnKTtcbiAgICAgIHRoaXMucHJlc2VudGVyID0gbmV3IFByZXNlbnRlcih0aGlzLnZpZXcsIHRoaXMubW9kZWwpO1xuICAgIH1cbn1cbmV4cG9ydCB7IFNpbXBsZVJhbmdlU2xpZGVyIH07XG5cbihmdW5jdGlvbiAoJDogSlF1ZXJ5U3RhdGljKSB7XG4gICQuZm4uZXh0ZW5kKHtcbiAgICBTaW1wbGVSYW5nZVNsaWRlcih1c2VyQ29uZmlnOiBpQ29uZmlnVXNlcikge1xuICAgICAgcmV0dXJuIG5ldyBTaW1wbGVSYW5nZVNsaWRlcig8SlF1ZXJ5PiB0aGlzLCA8aUNvbmZpZ1VzZXI+IHVzZXJDb25maWcpO1xuICAgIH0sXG4gIH0pO1xufShqUXVlcnkpKTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vZW50aXRpZXMvSGVscGVyJztcbmltcG9ydCB7IFR1bWJsZXIgfSBmcm9tICcuL2VudGl0aWVzL1R1bWJsZXInO1xuaW1wb3J0IHsgQ29ubmVjdCB9IGZyb20gJy4vZW50aXRpZXMvQ29ubmVjdCc7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9lbnRpdGllcy9Ub29sdGlwJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi9lbnRpdGllcy9JbnB1dCc7XG5cbmNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xuICBwb3NpdGlvbjogdFBvc2l0aW9uID0gWzBdO1xuXG4gIHJhbmdlOiB0UmFuZ2UgPSBbMCwgMF07XG5cbiAgc3RhcnQ6IHRWYWx1ZSA9IFswXTtcblxuICBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uO1xuXG4gIGlzVG9vbHRpcDogYm9vbGVhbjtcblxuICBpc0Nvbm5lY3Q6IGJvb2xlYW47XG5cbiAgc2xpZGVyOiBIVE1MRWxlbWVudDtcblxuICB0dW1ibGVyOiBUdW1ibGVyW10gPSBbXTtcblxuICBjb25uZWN0OiBDb25uZWN0W10gPSBbXTtcblxuICB0b29sdGlwOiBUb29sdGlwW10gPSBbXTtcblxuICBpbnB1dFZhbHVlOiBJbnB1dFtdID0gW107XG5cbiAgaW5wdXRUb29sdGlwPzogSW5wdXQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50LCBwcml2YXRlIGNvbmZpZzogaUNvbmZpZ1ZpZXcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pc1Rvb2x0aXAgPSB0aGlzLmNvbmZpZy5pc1Rvb2x0aXA7XG4gICAgdGhpcy5pc0Nvbm5lY3QgPSB0aGlzLmNvbmZpZy5pc0Nvbm5lY3Q7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuY29uZmlnLm9yaWVudGF0aW9uO1xuXG4gICAgdGhpcy5zbGlkZXIgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ3NsaWRlcicsIHRoaXMub3JpZW50YXRpb24pO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBvbkNoYW5nZVZpZXcoY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy50dW1ibGVyW2ldLm9uTW91c2Vkb3duQW5kTW92ZSh0aGlzLmNvbnRhaW5lciwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dFZhbHVlWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbnB1dFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZVtpXS5vbktleWRvd25Pck1vdXNlb3V0KGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRUb29sdGlwICYmIHRoaXMuaXNUb29sdGlwKSB7XG4gICAgICB0aGlzLmlucHV0VG9vbHRpcC5vblN3aXRjaENoZWNrKHRoaXMudG9vbHRpcCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG1vZGVsRGF0YTogdE1vZGVsRGF0YSkge1xuICAgIGNvbnN0IGk6IG51bWJlciA9IG1vZGVsRGF0YS5pbmRleDtcbiAgICBjb25zdCB7IHBvc2l0aW9uIH0gPSBtb2RlbERhdGE7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gbW9kZWxEYXRhO1xuXG4gICAgdGhpcy5zZXRBY3RpdmV0dW1ibGVyKHBvc2l0aW9uLCBpKTtcblxuICAgIHRoaXMudHVtYmxlcltpXS5zZXROZXdQb3NpdGlvbihwb3NpdGlvbltpXSk7XG5cbiAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcbiAgICAgIHRoaXMudG9vbHRpcFtpXS5zZXRJbm5lclRleHQodmFsdWVbaV0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlucHV0VmFsdWVbMF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5pbnB1dFZhbHVlW2ldLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodmFsdWVbaV0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ29ubmVjdCkge1xuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRQb3NpdGlvbigwLCBwb3NpdGlvblswXSk7XG4gICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uWzFdKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRQb3NpdGlvbihwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldEFjdGl2ZXR1bWJsZXIocG9zaXRpb246IHRQb3NpdGlvbiwgaW5kZXg6IG51bWJlcikge1xuICAgIGlmIChwb3NpdGlvbi5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgdGhpcy50dW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnR1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XG4gICAgICAgIGlmICh0aGlzLmlzVG9vbHRpcCkge1xuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHVtYmxlclsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgdGhpcy50dW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgICAgdGhpcy50b29sdGlwWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnJhbmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5yYW5nZVtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucmFuZ2UucHVzaCh0aGlzLmNvbmZpZy5yYW5nZVtpXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJhbmdlW2ldID0gdGhpcy5jb25maWcucmFuZ2VbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5zdGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuc3RhcnRbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnN0YXJ0LnB1c2godGhpcy5jb25maWcuc3RhcnRbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFydFtpXSA9IHRoaXMuY29uZmlnLnN0YXJ0W2ldO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24ucHVzaCh0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMuc3RhcnRbaV0sIHRoaXMucmFuZ2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMuc3RhcnRbaV0sIHRoaXMucmFuZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy50dW1ibGVyLnB1c2gobmV3IFR1bWJsZXIodGhpcy5wb3NpdGlvbltpXSwgdGhpcy5vcmllbnRhdGlvbiwgaSkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ29ubmVjdCkge1xuICAgICAgaWYgKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29ubmVjdC5wdXNoKG5ldyBDb25uZWN0KHRoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0sIHRoaXMub3JpZW50YXRpb24pKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLmNvbm5lY3RbMF0uZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnRvb2x0aXAucHVzaChuZXcgVG9vbHRpcCh0aGlzLnN0YXJ0W2ldLCB0aGlzLm9yaWVudGF0aW9uKSk7XG5cbiAgICAgICAgdGhpcy50dW1ibGVyW2ldLmVsZW1lbnQuYXBwZW5kKHRoaXMudG9vbHRpcFtpXS5lbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHVtYmxlci5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMudHVtYmxlcltpXS5lbGVtZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQodGhpcy5zbGlkZXIpO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcuaW5wdXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5pbnB1dC52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUucHVzaChuZXcgSW5wdXQoXG4gICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICB0aGlzLmNvbmZpZy5pbnB1dC52YWx1ZVtpXSxcbiAgICAgICAgICB0aGlzLmNvbmZpZy5zdGFydFtpXSxcbiAgICAgICAgICBpLFxuICAgICAgICApKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuaW5wdXQgJiYgdGhpcy5jb25maWcuaW5wdXQudG9vbHRpcCkge1xuICAgICAgdGhpcy5pbnB1dFRvb2x0aXAgPSBuZXcgSW5wdXQoXG4gICAgICAgICd0b29sdGlwJyxcbiAgICAgICAgdGhpcy5jb25maWcuaW5wdXQudG9vbHRpcFswXSxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IFZpZXcgfTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcblxuY2xhc3MgQ29ubmVjdCBleHRlbmRzIEhlbHBlciB7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwb3NpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBzdGFydFBvc2l0aW9uOiBudW1iZXIsXG4gICAgICBwcml2YXRlIGVuZFBvc2l0aW9uOiBudW1iZXIsXG4gICAgICBwcml2YXRlIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24sXG4gICAgKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ2Nvbm5lY3QnLCB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5zdGFydFBvc2l0aW9uLCB0aGlzLmVuZFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBzZXRQb3NpdGlvbihzdGFydFBvc2l0aW9uOiBudW1iZXIsIGVuZFBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IHN0YXJ0OiBudW1iZXIgPSBNYXRoLnJvdW5kKHN0YXJ0UG9zaXRpb24gKiB0aGlzLlRPX0NPTk5FQ1RfVVBEQVRFKTtcbiAgICAgIGNvbnN0IGVuZDogbnVtYmVyID0gTWF0aC5yb3VuZChlbmRQb3NpdGlvbiAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uID0gW3N0YXJ0LCBlbmRdO1xuICAgICAgY29uc3Qgc3R5bGU6IHN0cmluZyA9IHN0YXJ0ID09PSAwXG4gICAgICAgID8gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgPyBgd2lkdGg6ICR7ZW5kfSU7YFxuICAgICAgICAgIDogYGhlaWdodDogJHtlbmR9JTtgXG4gICAgICAgIDogdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgPyBgbGVmdDogJHtzdGFydH0lOyB3aWR0aDogJHsoZW5kIC0gc3RhcnQpfSU7YFxuICAgICAgICAgIDogYHRvcDogJHtzdGFydH0lOyBoZWlnaHQ6ICR7KGVuZCAtIHN0YXJ0KX0lO2A7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgIH1cbn1cbmV4cG9ydCB7IENvbm5lY3QgfTtcbiIsImNsYXNzIEhlbHBlciB7XG4gICAgcmVhZG9ubHkgVE9fVFVNQkxFUl9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xuXG4gICAgcmVhZG9ubHkgVE9fQ09OTkVDVF9VUERBVEU6IG51bWJlciA9IDFlMjtcblxuICAgIGdldFBvc2l0aW9uRnJvbVZhbHVlKHZhbHVlOiBudW1iZXIsIHJhbmdlOiB0UmFuZ2UpOiBudW1iZXIge1xuICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gKCh2YWx1ZSAtIHJhbmdlWzBdKSAvIChyYW5nZVsxXSAtIHJhbmdlWzBdKSk7XG4gICAgICByZXN1bHQgPSBNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fVFVNQkxFUl9QT1NJVElPTikgLyB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT047XG5cbiAgICAgIGlmIChyZXN1bHQgPCAwKSB7XG4gICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID4gMSkge1xuICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBnZXREaXZFbGVtZW50V2l0aENsYXNzKGNzc0NsYXNzOiB0Q3NzQ2xhc3Nlcywgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbik6IEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0IHN0ckNsYXNzOiBzdHJpbmcgPSBgU1JTX18ke2Nzc0NsYXNzfWA7XG4gICAgICBjb25zdCBjc3NDbGFzc1dpdGhvdXRPcmllbnRhdGlvbjogc3RyaW5nID0gYCR7c3RyQ2xhc3N9ICR7c3RyQ2xhc3N9X2A7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoY3NzQ2xhc3NXaXRob3V0T3JpZW50YXRpb24gKyBvcmllbnRhdGlvbikpO1xuXG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG59XG5leHBvcnQgeyBIZWxwZXIgfTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICcuL1Rvb2x0aXAnO1xuXG5jbGFzcyBJbnB1dCBleHRlbmRzIEhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHlwZTogdElucHV0VHlwZSxcbiAgICBwdWJsaWMgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCxcbiAgICBwdWJsaWMgdmFsdWU/OiBudW1iZXIsXG4gICAgcHVibGljIGluZGV4PzogbnVtYmVyLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICh0eXBlID09PSAndmFsdWUnKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IFN0cmluZyh0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbktleWRvd25Pck1vdXNlb3V0KHRoaXM6IElucHV0LCBjYWxsYmFjazogaVR1bWJsZXJDYWxsYmFjaykge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3ZhbHVlJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTtcbiAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBvbk1vdXNlb3V0KTtcblxuICAgIGZ1bmN0aW9uIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ1RhYicgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGFjdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlb3V0KCkge1xuICAgICAgYWN0aW9uKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFjdGlvbigpIHtcbiAgICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSBOdW1iZXIodGhhdC5lbGVtZW50LnZhbHVlKTtcbiAgICAgIGlmICh0aGF0LmluZGV4KSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBpbmRleDogdGhhdC5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3dpdGNoQ2hlY2sodGhpczogSW5wdXQsIHRvb2x0aXA6IFRvb2x0aXBbXSkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYgKHRoYXQudHlwZSAhPT0gJ3Rvb2x0aXAnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvb2x0aXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoYXQuZWxlbWVudC5jaGVja2VkKSB7XG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hIaWRkZW4odHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hIaWRkZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCB7IElucHV0IH07XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XG5cbmNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBIZWxwZXIge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbikge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCd0b29sdGlwJywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICB0aGlzLnNldElubmVyVGV4dCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXRJbm5lclRleHQodmFsdWU6IG51bWJlcikge1xuICAgICAgY29uc3QgdmFsOiBudW1iZXIgPSB2YWx1ZSA+IDBcbiAgICAgICAgPyBNYXRoLmZsb29yKHZhbHVlKVxuICAgICAgICA6IE1hdGguY2VpbCh2YWx1ZSk7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gU3RyaW5nKHZhbCk7XG4gICAgfVxuXG4gICAgc3dpdGNoSGlkZGVuKHRoaXM6IFRvb2x0aXAsIGlzVmlzaWJsZTogYm9vbGVhbikge1xuICAgICAgY29uc3QgdGhhdDogVG9vbHRpcCA9IHRoaXM7XG4gICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgIHRoYXQuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuZWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7IFRvb2x0aXAgfTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcblxuY2xhc3MgVHVtYmxlciBleHRlbmRzIEhlbHBlciB7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBsaXN0ZW5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24sIHByaXZhdGUgaW5kZXg6IG51bWJlcikge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCd0dW1ibGVyJywgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICB0aGlzLnNldE5ld1Bvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xuICAgIH1cblxuICAgIHNldE5ld1Bvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcblxuICAgICAgY29uc3QgbGl0ZXI6IHN0cmluZyA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/ICdYJyA6ICdZJztcblxuICAgICAgY29uc3Qgc3R5bGU6IHN0cmluZyA9IGB0cmFuc2Zvcm06IHRyYW5zbGF0ZSR7bGl0ZXJ9KCR7TWF0aC5yb3VuZChwb3NpdGlvbiAqIHRoaXMuVE9fVFVNQkxFUl9QT1NJVElPTil9JSk7YDtcbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgIH1cblxuICAgIGdldFNoaWZ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XG4gICAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xuICAgICAgICA/IGV2ZW50LmNsaWVudFggLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgICAgOiBldmVudC5jbGllbnRZIC0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgb25Nb3VzZWRvd25BbmRNb3ZlKHRoaXM6IFR1bWJsZXIsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQubGlzdGVuaW5nID0gdHJ1ZTtcblxuICAgICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHNoaWZ0OiBudW1iZXIgPSB0aGlzLmdldFNoaWZ0KHRoYXQuZWxlbWVudCwgZXZlbnQpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2Vtb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2V1cCk7XG5cbiAgICAgICAgZnVuY3Rpb24gb25Nb3VzZW1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICBsZXQgbmV3UG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgICBsZXQgbmV3UG9zaXRpb25QZXJjZW50OiBudW1iZXI7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgICAgICBpZiAodGhhdC5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBuZXdQb3NpdGlvbiA9IGV2ZW50LmNsaWVudFggLSBzaGlmdCAtIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICAgICAgbmV3UG9zaXRpb25QZXJjZW50ID0gbmV3UG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WSAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uUGVyY2VudCA9IG5ld1Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIHBvc2l0aW9uID0gbmV3UG9zaXRpb25QZXJjZW50O1xuXG4gICAgICAgICAgaWYgKHBvc2l0aW9uID4gMSkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgICBpbmRleDogdGhhdC5pbmRleCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uTW91c2V1cCgpIHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlbW92ZSk7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2V1cCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCB7IFR1bWJsZXIgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=