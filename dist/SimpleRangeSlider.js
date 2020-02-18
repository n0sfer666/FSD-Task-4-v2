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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL0NvbnRyb2xsZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvQ29ubmVjdC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvVG9vbHRpcC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9lbnRpdGllcy9UdW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FB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NUUsa0JBQWtCLEdBQUcsV0FBVyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7aUJBQzNEO2dCQUdELFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztnQkFFOUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixRQUFRLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO2dCQUNELElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtvQkFDaEIsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDZDtnQkFFRCxRQUFRLENBQUM7b0JBQ1AsUUFBUTtvQkFDUixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUM7WUFFRCxTQUFTLFNBQVM7Z0JBQ2hCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDckQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLENBNUVxQixlQUFNLEdBNEUzQjtBQUNRLDBCQUFPIiwiZmlsZSI6IlNpbXBsZVJhbmdlU2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1BsdWdpbi9QbHVnaW4udHNcIik7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vVmlldy9WaWV3JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vTW9kZWwvTW9kZWwnO1xuXG5jbGFzcyBQcmVzZW50ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IFZpZXcsIHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XG4gICAgdGhpcy52aWV3Lm9uQ2hhbmdlVmlldygodHVtYmxlckRhdGE6IHRUdW1ibGVyRGF0YSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2codHVtYmxlckRhdGEpO1xuICAgICAgdGhpcy5tb2RlbC5zZXROZXdQb3NpdGlvbih0dW1ibGVyRGF0YSk7XG4gICAgfSk7XG4gICAgdGhpcy5tb2RlbC5vbl9jaGFuZ2VfbW9kZWwoKG1vZGVsRGF0YTogdE1vZGVsRGF0YSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2cobW9kZWxEYXRhKTtcbiAgICAgIHRoaXMudmlldy51cGRhdGUobW9kZWxEYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IHsgUHJlc2VudGVyIH07XG4iLCJjbGFzcyBNb2RlbCB7XG4gICAgdmFsdWU6IHRWYWx1ZSA9IFswXTtcblxuICAgIHJhbmdlOiB0UmFuZ2UgPSBbMCwgMF07XG5cbiAgICBzdGVwOiBudW1iZXIgPSAwO1xuXG4gICAgcG9zaXRpb246IHRQb3NpdGlvbiA9IFswXTtcblxuICAgIGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY2FsbGJhY2tMaXN0OiBpTW9kZWxDYWxsYmFja1tdO1xuXG4gICAgcmVhZG9ubHkgVE9fTk9STUFMSVpFX1BPU0lUSU9OOiBudW1iZXIgPSAxZTQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogaUNvbmZpZ01vZGVsKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrTGlzdCA9IFtdO1xuXG4gICAgICB0aGlzLnN0ZXAgPSB0aGlzLmNvbmZpZy5zdGVwO1xuXG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBzZXROZXdQb3NpdGlvbih0dW1ibGVyRGF0YTogdFR1bWJsZXJEYXRhKSB7XG4gICAgICBjb25zdCB7IGluZGV4IH0gPSB0dW1ibGVyRGF0YTtcbiAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBpbmRleDtcblxuICAgICAgY29uc3QgbmV3X3ZhbHVlOiBudW1iZXIgPSB0aGlzLmdldF9uZXdfdmFsdWUodHVtYmxlckRhdGEpO1xuXG4gICAgICB0aGlzLmNoZWNrX29uX3N0ZXBfbW92ZW1lbnRfdG9fc2V0X3ZhbF9hbmRfcG9zKG5ld192YWx1ZSwgaW5kZXgpO1xuICAgICAgLy8gY2hlY2sgZm9yIGNvbGxpc2lvblxuICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoID4gMSAmJiB0aGlzLnZhbHVlWzFdKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlWzBdIDwgdGhpcy52YWx1ZVsxXSkge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldF9uZXdfdmFsdWUodHVtYmxlckRhdGE6IHRUdW1ibGVyRGF0YSk6IG51bWJlciB7XG4gICAgICBjb25zdCB7IGluZGV4IH0gPSB0dW1ibGVyRGF0YTtcbiAgICAgIGxldCBuZXdfdmFsdWU6IG51bWJlciA9IHRoaXMudmFsdWVbaW5kZXhdO1xuICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgIGlmICh0dW1ibGVyRGF0YS5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvc2l0aW9uID0gTWF0aC5yb3VuZCh0dW1ibGVyRGF0YS5wb3NpdGlvbiAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKSAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OO1xuICAgICAgICBuZXdfdmFsdWUgPSB0aGlzLmdldFZhbHVlX2Zyb21fcG9zaXRpb24ocG9zaXRpb24sIHRoaXMucmFuZ2UpO1xuICAgICAgfSBlbHNlIGlmICh0dW1ibGVyRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld192YWx1ZSA9IHR1bWJsZXJEYXRhLnZhbHVlO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiB0aGlzLnZhbHVlWzFdKSB7XG4gICAgICAgICAgaWYgKG5ld192YWx1ZSA+IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXApIHtcbiAgICAgICAgICAgIG5ld192YWx1ZSA9IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gMSkge1xuICAgICAgICAgIGlmIChuZXdfdmFsdWUgPCB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwKSB7XG4gICAgICAgICAgICBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld192YWx1ZTtcbiAgICB9XG5cbiAgICBjaGVja19vbl9zdGVwX21vdmVtZW50X3RvX3NldF92YWxfYW5kX3BvcyhuZXdfdmFsdWU6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xuICAgICAgY29uc3QgY29uZGl0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gW3RoaXMudmFsdWVbaW5kZXhdIC0gdGhpcy5zdGVwLCB0aGlzLnZhbHVlW2luZGV4XSArIHRoaXMuc3RlcF07XG5cbiAgICAgIGlmIChuZXdfdmFsdWUgPj0gY29uZGl0aW9uWzFdIHx8IG5ld192YWx1ZSA8PSBjb25kaXRpb25bMF0pIHtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZV9hbmRfcG9zaXRpb24obmV3X3ZhbHVlLCBpbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5jYWxsYmFja0xpc3QuZm9yRWFjaCgoY2FsbGJhY2s6IGlNb2RlbENhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbixcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICBpbmRleDogdGhpcy5hY3RpdmVJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBvbl9jaGFuZ2VfbW9kZWwoY2FsbGJhY2s6IGlNb2RlbENhbGxiYWNrKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrTGlzdC5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbkZyb21WYWx1ZSh2YWx1ZTogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gKHZhbHVlIC0gcmFuZ2VbMF0pIC8gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pO1xuXG4gICAgICByZXR1cm4gKE1hdGgucm91bmQocmVzdWx0ICogdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pIC8gdGhpcy5UT19OT1JNQUxJWkVfUE9TSVRJT04pO1xuICAgIH1cblxuICAgIGdldFZhbHVlX2Zyb21fcG9zaXRpb24ocG9zaXRpb246IG51bWJlciwgcmFuZ2U6IHRSYW5nZSk6IG51bWJlciB7XG4gICAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IChwb3NpdGlvbiAqIChyYW5nZVsxXSAtIHJhbmdlWzBdKSkgKyByYW5nZVswXTtcblxuICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKHJlc3VsdCkpO1xuICAgIH1cblxuICAgIHNldFZhbHVlX2FuZF9wb3NpdGlvbihuZXdfdmFsdWU6IG51bWJlciwgaTogbnVtYmVyKSB7XG4gICAgICB0aGlzLnZhbHVlW2ldID0gbmV3X3ZhbHVlID4gMFxuICAgICAgICA/IChNYXRoLmNlaWwobmV3X3ZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcClcbiAgICAgICAgOiAoTWF0aC5mbG9vcihuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVbMF0gPCB0aGlzLnJhbmdlWzBdKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZVswXSA9IHRoaXMucmFuZ2VbMF07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGkgPT09IDEgJiYgdGhpcy52YWx1ZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlWzFdID4gdGhpcy5yYW5nZVsxXSkge1xuICAgICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLnJhbmdlWzFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldFBvc2l0aW9uRnJvbVZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnJhbmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnJhbmdlLnB1c2godGhpcy5jb25maWcucmFuZ2VbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmFuZ2VbaV0gPSB0aGlzLmNvbmZpZy5yYW5nZVtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnN0YXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlLnB1c2godGhpcy5jb25maWcuc3RhcnRbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmFsdWVbaV0gPSB0aGlzLmNvbmZpZy5zdGFydFtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uLnB1c2godGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9IHRoaXMuZ2V0UG9zaXRpb25Gcm9tVmFsdWUodGhpcy52YWx1ZVtpXSwgdGhpcy5yYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB7IE1vZGVsIH07XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi9WaWV3L1ZpZXcnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuL01vZGVsL01vZGVsJztcbmltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gJy4vQ29udHJvbGxlci9QcmVzZW50ZXInO1xuXG5jbGFzcyBTaW1wbGVSYW5nZVNsaWRlciB7XG4gICAgdmlldzogVmlldztcblxuICAgIG1vZGVsOiBNb2RlbDtcblxuICAgIHByZXNlbnRlcjogUHJlc2VudGVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IEpRdWVyeSwgcHJpdmF0ZSB1c2VyX2NvbmZpZzogaUNvbmZpZ1VzZXIpIHtcbiAgICAgIGNvbnN0IHNsaWRlcl9jb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xuXG4gICAgICBjb25zdCBkZWZhdWx0X2NvbmZpZzogaUNvbmZpZ1VzZXIgPSB7XG4gICAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgIHN0YXJ0OiBbMTBdLFxuICAgICAgICByYW5nZTogWzAsIDEwMF0sXG4gICAgICAgIHN0ZXA6IDEsXG4gICAgICAgIGNvbm5lY3Q6IHRydWUsXG4gICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjb21wbGV0ZUNvbmZpZzogaUNvbmZpZ1VzZXIgPSB7XG4gICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLnVzZXJfY29uZmlnLm9yaWVudGF0aW9uID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X2NvbmZpZy5vcmllbnRhdGlvbiA6IHRoaXMudXNlcl9jb25maWcub3JpZW50YXRpb24sXG4gICAgICAgIHN0YXJ0OiB0aGlzLnVzZXJfY29uZmlnLnN0YXJ0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X2NvbmZpZy5zdGFydCA6IHRoaXMudXNlcl9jb25maWcuc3RhcnQsXG4gICAgICAgIHJhbmdlOiB0aGlzLnVzZXJfY29uZmlnLnJhbmdlID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X2NvbmZpZy5yYW5nZSA6IHRoaXMudXNlcl9jb25maWcucmFuZ2UsXG4gICAgICAgIHN0ZXA6IHRoaXMudXNlcl9jb25maWcuc3RlcCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9jb25maWcuc3RlcCA6IHRoaXMudXNlcl9jb25maWcuc3RlcCxcbiAgICAgICAgY29ubmVjdDogdGhpcy51c2VyX2NvbmZpZy5jb25uZWN0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X2NvbmZpZy5jb25uZWN0IDogdGhpcy51c2VyX2NvbmZpZy5jb25uZWN0LFxuICAgICAgICB0b29sdGlwOiB0aGlzLnVzZXJfY29uZmlnLnRvb2x0aXAgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfY29uZmlnLnRvb2x0aXAgOiB0aGlzLnVzZXJfY29uZmlnLnRvb2x0aXAsXG4gICAgICAgIGlucHV0OiB0aGlzLnVzZXJfY29uZmlnLmlucHV0LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgbW9kZWxfY29uZmlnOiBpQ29uZmlnTW9kZWwgPSB7XG4gICAgICAgIHN0YXJ0OiBjb21wbGV0ZUNvbmZpZy5zdGFydCxcbiAgICAgICAgcmFuZ2U6IGNvbXBsZXRlQ29uZmlnLnJhbmdlLFxuICAgICAgICBzdGVwOiBjb21wbGV0ZUNvbmZpZy5zdGVwLFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgdmlld19jb25maWc6IGlDb25maWdWaWV3ID0ge1xuICAgICAgICBvcmllbnRhdGlvbjogY29tcGxldGVDb25maWcub3JpZW50YXRpb24sXG4gICAgICAgIHN0YXJ0OiBjb21wbGV0ZUNvbmZpZy5zdGFydCxcbiAgICAgICAgcmFuZ2U6IGNvbXBsZXRlQ29uZmlnLnJhbmdlLFxuICAgICAgICBpc1Rvb2x0aXA6IGNvbXBsZXRlQ29uZmlnLnRvb2x0aXAsXG4gICAgICAgIGlzQ29ubmVjdDogY29tcGxldGVDb25maWcuY29ubmVjdCxcbiAgICAgICAgaW5wdXQ6IGNvbXBsZXRlQ29uZmlnLmlucHV0LFxuICAgICAgfTtcblxuICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoc2xpZGVyX2NvbnRhaW5lciwgdmlld19jb25maWcpO1xuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChtb2RlbF9jb25maWcpO1xuICAgICAgdGhpcy5wcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKHRoaXMudmlldywgdGhpcy5tb2RlbCk7XG4gICAgfVxufVxuZXhwb3J0IHsgU2ltcGxlUmFuZ2VTbGlkZXIgfTtcblxuKGZ1bmN0aW9uICgkOiBKUXVlcnlTdGF0aWMpIHtcbiAgJC5mbi5leHRlbmQoe1xuICAgIFNpbXBsZVJhbmdlU2xpZGVyKHVzZXJfY29uZmlnOiBpQ29uZmlnVXNlcikge1xuICAgICAgcmV0dXJuIG5ldyBTaW1wbGVSYW5nZVNsaWRlcig8SlF1ZXJ5PiB0aGlzLCA8aUNvbmZpZ1VzZXI+IHVzZXJfY29uZmlnKTtcbiAgICB9LFxuICB9KTtcbn0oalF1ZXJ5KSk7XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL2VudGl0aWVzL0hlbHBlcic7XG5pbXBvcnQgeyBUdW1ibGVyIH0gZnJvbSAnLi9lbnRpdGllcy9UdW1ibGVyJztcbmltcG9ydCB7IENvbm5lY3QgfSBmcm9tICcuL2VudGl0aWVzL0Nvbm5lY3QnO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJy4vZW50aXRpZXMvVG9vbHRpcCc7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4vZW50aXRpZXMvSW5wdXQnO1xuXG5jbGFzcyBWaWV3IGV4dGVuZHMgSGVscGVyIHtcbiAgcG9zaXRpb246IHRQb3NpdGlvbiA9IFswXTtcblxuICByYW5nZTogdFJhbmdlID0gWzAsIDBdO1xuXG4gIHN0YXJ0OiB0VmFsdWUgPSBbMF07XG5cbiAgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbjtcblxuICBpc1Rvb2x0aXA6IGJvb2xlYW47XG5cbiAgaXNDb25uZWN0OiBib29sZWFuO1xuXG4gIHNsaWRlcjogSFRNTEVsZW1lbnQ7XG5cbiAgdHVtYmxlcjogVHVtYmxlcltdID0gW107XG5cbiAgY29ubmVjdDogQ29ubmVjdFtdID0gW107XG5cbiAgdG9vbHRpcDogVG9vbHRpcFtdID0gW107XG5cbiAgaW5wdXRWYWx1ZTogSW5wdXRbXSA9IFtdO1xuXG4gIGlucHV0VG9vbHRpcD86IElucHV0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBjb25maWc6IGlDb25maWdWaWV3KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaXNUb29sdGlwID0gdGhpcy5jb25maWcuaXNUb29sdGlwO1xuICAgIHRoaXMuaXNDb25uZWN0ID0gdGhpcy5jb25maWcuaXNDb25uZWN0O1xuICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLmNvbmZpZy5vcmllbnRhdGlvbjtcblxuICAgIHRoaXMuc2xpZGVyID0gdGhpcy5nZXREaXZFbGVtZW50V2l0aENsYXNzKCdzbGlkZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgb25DaGFuZ2VWaWV3KGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudHVtYmxlcltpXS5vbk1vdXNlZG93bkFuZE1vdmUodGhpcy5jb250YWluZXIsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRWYWx1ZVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW5wdXRWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWVbaV0ub25LZXlkb3duT3JNb3VzZW91dChjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0VG9vbHRpcCAmJiB0aGlzLmlzVG9vbHRpcCkge1xuICAgICAgdGhpcy5pbnB1dFRvb2x0aXAub25Td2l0Y2hDaGVjayh0aGlzLnRvb2x0aXApO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShtb2RlbERhdGE6IHRNb2RlbERhdGEpIHtcbiAgICBjb25zdCBpOiBudW1iZXIgPSBtb2RlbERhdGEuaW5kZXg7XG4gICAgY29uc3QgeyBwb3NpdGlvbiB9ID0gbW9kZWxEYXRhO1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IG1vZGVsRGF0YTtcblxuICAgIHRoaXMuc2V0QWN0aXZldHVtYmxlcihwb3NpdGlvbiwgaSk7XG5cbiAgICB0aGlzLnR1bWJsZXJbaV0uc2V0TmV3UG9zaXRpb24ocG9zaXRpb25baV0pO1xuXG4gICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XG4gICAgICB0aGlzLnRvb2x0aXBbaV0uc2V0SW5uZXJUZXh0KHZhbHVlW2ldKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbnB1dFZhbHVlWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZVtpXS5lbGVtZW50LnZhbHVlID0gU3RyaW5nKHZhbHVlW2ldKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Nvbm5lY3QpIHtcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLmNvbm5lY3RbMF0uc2V0UG9zaXRpb24oMCwgcG9zaXRpb25bMF0pO1xuICAgICAgfSBlbHNlIGlmIChwb3NpdGlvblsxXSkge1xuICAgICAgICB0aGlzLmNvbm5lY3RbMF0uc2V0UG9zaXRpb24ocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRBY3RpdmV0dW1ibGVyKHBvc2l0aW9uOiB0UG9zaXRpb24sIGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIHRoaXMudHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgdGhpcy50dW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190dW1ibGVyX2FjdGl2ZScpO1xuICAgICAgICBpZiAodGhpcy5pc1Rvb2x0aXApIHtcbiAgICAgICAgICB0aGlzLnRvb2x0aXBbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3Rvb2x0aXBfYWN0aXZlJyk7XG4gICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnR1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3R1bWJsZXJfYWN0aXZlJyk7XG4gICAgICAgIHRoaXMudHVtYmxlclswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdHVtYmxlcl9hY3RpdmUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNUb29sdGlwKSB7XG4gICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5yYW5nZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJhbmdlLnB1c2godGhpcy5jb25maWcucmFuZ2VbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yYW5nZVtpXSA9IHRoaXMuY29uZmlnLnJhbmdlW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnN0YXJ0W2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zdGFydC5wdXNoKHRoaXMuY29uZmlnLnN0YXJ0W2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnRbaV0gPSB0aGlzLmNvbmZpZy5zdGFydFtpXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnB1c2godGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnN0YXJ0W2ldLCB0aGlzLnJhbmdlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc2l0aW9uW2ldID0gdGhpcy5nZXRQb3NpdGlvbkZyb21WYWx1ZSh0aGlzLnN0YXJ0W2ldLCB0aGlzLnJhbmdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudHVtYmxlci5wdXNoKG5ldyBUdW1ibGVyKHRoaXMucG9zaXRpb25baV0sIHRoaXMub3JpZW50YXRpb24sIGkpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Nvbm5lY3QpIHtcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLmNvbm5lY3QucHVzaChuZXcgQ29ubmVjdCgwLCB0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLm9yaWVudGF0aW9uKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbm5lY3QucHVzaChuZXcgQ29ubmVjdCh0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdLCB0aGlzLm9yaWVudGF0aW9uKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNsaWRlci5hcHBlbmQodGhpcy5jb25uZWN0WzBdLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzVG9vbHRpcCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy50b29sdGlwLnB1c2gobmV3IFRvb2x0aXAodGhpcy5zdGFydFtpXSwgdGhpcy5vcmllbnRhdGlvbikpO1xuXG4gICAgICAgIHRoaXMudHVtYmxlcltpXS5lbGVtZW50LmFwcGVuZCh0aGlzLnRvb2x0aXBbaV0uZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR1bWJsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLnR1bWJsZXJbaV0uZWxlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMuc2xpZGVyKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5pbnB1dCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLmlucHV0LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuaW5wdXQudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlLnB1c2gobmV3IElucHV0KFxuICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgdGhpcy5jb25maWcuaW5wdXQudmFsdWVbaV0sXG4gICAgICAgICAgdGhpcy5jb25maWcuc3RhcnRbaV0sXG4gICAgICAgICAgaSxcbiAgICAgICAgKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLmlucHV0ICYmIHRoaXMuY29uZmlnLmlucHV0LnRvb2x0aXApIHtcbiAgICAgIHRoaXMuaW5wdXRUb29sdGlwID0gbmV3IElucHV0KFxuICAgICAgICAndG9vbHRpcCcsXG4gICAgICAgIHRoaXMuY29uZmlnLmlucHV0LnRvb2x0aXBbMF0sXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBWaWV3IH07XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XG5cbmNsYXNzIENvbm5lY3QgZXh0ZW5kcyBIZWxwZXIge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgcG9zaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXJ0UG9zaXRpb246IG51bWJlciwgcHJpdmF0ZSBlbmRQb3NpdGlvbjogbnVtYmVyLCBwcml2YXRlIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0RGl2RWxlbWVudFdpdGhDbGFzcygnY29ubmVjdCcsIHRoaXMub3JpZW50YXRpb24pO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLnN0YXJ0UG9zaXRpb24sIHRoaXMuZW5kUG9zaXRpb24pO1xuICAgIH1cblxuICAgIHNldFBvc2l0aW9uKHN0YXJ0UG9zaXRpb246IG51bWJlciwgZW5kUG9zaXRpb246IG51bWJlcikge1xuICAgICAgY29uc3Qgc3RhcnQ6IG51bWJlciA9IE1hdGgucm91bmQoc3RhcnRQb3NpdGlvbiAqIHRoaXMuVE9fQ09OTkVDVF9VUERBVEUpO1xuICAgICAgY29uc3QgZW5kOiBudW1iZXIgPSBNYXRoLnJvdW5kKGVuZFBvc2l0aW9uICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XG5cbiAgICAgIHRoaXMucG9zaXRpb24gPSBbc3RhcnQsIGVuZF07XG4gICAgICBjb25zdCBzdHlsZTogc3RyaW5nID0gc3RhcnQgPT09IDBcbiAgICAgICAgPyB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcbiAgICAgICAgICA/IGB3aWR0aDogJHtlbmR9JTtgXG4gICAgICAgICAgOiBgaGVpZ2h0OiAke2VuZH0lO2BcbiAgICAgICAgOiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcbiAgICAgICAgICA/IGBsZWZ0OiAke3N0YXJ0fSU7IHdpZHRoOiAkeyhlbmQgLSBzdGFydCl9JTtgXG4gICAgICAgICAgOiBgdG9wOiAke3N0YXJ0fSU7IGhlaWdodDogJHsoZW5kIC0gc3RhcnQpfSU7YDtcblxuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgfVxufVxuZXhwb3J0IHsgQ29ubmVjdCB9O1xuIiwiY2xhc3MgSGVscGVyIHtcbiAgICByZWFkb25seSBUT19UVU1CTEVSX1BPU0lUSU9OOiBudW1iZXIgPSAxZTQ7XG5cbiAgICByZWFkb25seSBUT19DT05ORUNUX1VQREFURTogbnVtYmVyID0gMWUyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbkZyb21WYWx1ZSh2YWx1ZTogbnVtYmVyLCByYW5nZTogdFJhbmdlKTogbnVtYmVyIHtcbiAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9ICgodmFsdWUgLSByYW5nZVswXSkgLyAocmFuZ2VbMV0gLSByYW5nZVswXSkpO1xuICAgICAgcmVzdWx0ID0gTWF0aC5yb3VuZChyZXN1bHQgKiB0aGlzLlRPX1RVTUJMRVJfUE9TSVRJT04pIC8gdGhpcy5UT19UVU1CTEVSX1BPU0lUSU9OO1xuXG4gICAgICBpZiAocmVzdWx0IDwgMCkge1xuICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA+IDEpIHtcbiAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZ2V0RGl2RWxlbWVudFdpdGhDbGFzcyhjc3NDbGFzczogdENzc0NsYXNzZXMsIG9yaWVudGF0aW9uOiB0T3JpZW50YXRpb24pOiBIVE1MRWxlbWVudCB7XG4gICAgICBjb25zdCBzdHJDbGFzczogc3RyaW5nID0gYFNSU19fJHtjc3NDbGFzc31gO1xuICAgICAgY29uc3QgY3NzQ2xhc3NXaXRob3V0T3JpZW50YXRpb246IHN0cmluZyA9IGAke3N0ckNsYXNzfSAke3N0ckNsYXNzfV9gO1xuXG4gICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGNzc0NsYXNzV2l0aG91dE9yaWVudGF0aW9uICsgb3JpZW50YXRpb24pKTtcblxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0IHsgSGVscGVyIH07XG4iLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9Ub29sdGlwJztcblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBIZWxwZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IHRJbnB1dFR5cGUsIHB1YmxpYyBlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LCBwdWJsaWMgdmFsdWU/OiBudW1iZXIsIHB1YmxpYyBpbmRleD86IG51bWJlcikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKHR5cGUgPT09ICd2YWx1ZScpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gU3RyaW5nKHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uS2V5ZG93bk9yTW91c2VvdXQodGhpczogSW5wdXQsIGNhbGxiYWNrOiBpVHVtYmxlckNhbGxiYWNrKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICBpZiAodGhhdC50eXBlICE9PSAndmFsdWUnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIG9uTW91c2VvdXQpO1xuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnVGFiJyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTW91c2VvdXQoKSB7XG4gICAgICBhY3Rpb24oKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWN0aW9uKCkge1xuICAgICAgY29uc3QgdmFsdWU6IG51bWJlciA9IE51bWJlcih0aGF0LmVsZW1lbnQudmFsdWUpO1xuICAgICAgaWYgKHRoYXQuaW5kZXgpIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGluZGV4OiB0aGF0LmluZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Td2l0Y2hDaGVjayh0aGlzOiBJbnB1dCwgdG9vbHRpcDogVG9vbHRpcFtdKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICBpZiAodGhhdC50eXBlICE9PSAndG9vbHRpcCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9vbHRpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhhdC5lbGVtZW50LmNoZWNrZWQpIHtcbiAgICAgICAgICB0b29sdGlwW2ldLnN3aXRjaEhpZGRlbih0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b29sdGlwW2ldLnN3aXRjaEhpZGRlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IHsgSW5wdXQgfTtcbiIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcblxuY2xhc3MgVG9vbHRpcCBleHRlbmRzIEhlbHBlciB7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogdE9yaWVudGF0aW9uKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ3Rvb2x0aXAnLCB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICAgIHRoaXMuc2V0SW5uZXJUZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHNldElubmVyVGV4dCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICBjb25zdCB2YWw6IG51bWJlciA9IHZhbHVlID4gMFxuICAgICAgICA/IE1hdGguZmxvb3IodmFsdWUpXG4gICAgICAgIDogTWF0aC5jZWlsKHZhbHVlKTtcblxuICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSBTdHJpbmcodmFsKTtcbiAgICB9XG5cbiAgICBzd2l0Y2hIaWRkZW4odGhpczogVG9vbHRpcCwgaXNWaXNpYmxlOiBib29sZWFuKSB7XG4gICAgICBjb25zdCB0aGF0OiBUb29sdGlwID0gdGhpcztcbiAgICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICAgdGhhdC5lbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5lbGVtZW50LmhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHsgVG9vbHRpcCB9O1xuIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xuXG5jbGFzcyBUdW1ibGVyIGV4dGVuZHMgSGVscGVyIHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGxpc3RlbmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHBvc2l0aW9uOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IHRPcmllbnRhdGlvbiwgcHJpdmF0ZSBpbmRleDogbnVtYmVyKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmdldERpdkVsZW1lbnRXaXRoQ2xhc3MoJ3R1bWJsZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICAgIHRoaXMuc2V0TmV3UG9zaXRpb24odGhpcy5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgc2V0TmV3UG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gICAgICBjb25zdCBsaXRlcjogc3RyaW5nID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ1gnIDogJ1knO1xuXG4gICAgICBjb25zdCBzdHlsZTogc3RyaW5nID0gYHRyYW5zZm9ybTogdHJhbnNsYXRlJHtsaXRlcn0oJHtNYXRoLnJvdW5kKHBvc2l0aW9uICogdGhpcy5UT19UVU1CTEVSX1BPU0lUSU9OKX0lKTtgO1xuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgZ2V0U2hpZnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50KTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXG4gICAgICAgID8gZXZlbnQuY2xpZW50WCAtIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdFxuICAgICAgICA6IGV2ZW50LmNsaWVudFkgLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBvbk1vdXNlZG93bkFuZE1vdmUodGhpczogVHVtYmxlciwgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IGlUdW1ibGVyQ2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5saXN0ZW5pbmcgPSB0cnVlO1xuXG4gICAgICB0aGF0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hpZnQ6IG51bWJlciA9IHRoaXMuZ2V0U2hpZnQodGhhdC5lbGVtZW50LCBldmVudCk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZW1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZXVwKTtcblxuICAgICAgICBmdW5jdGlvbiBvbk1vdXNlbW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICAgIGxldCBuZXdQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICAgIGxldCBuZXdQb3NpdGlvblBlcmNlbnQ6IG51bWJlcjtcbiAgICAgICAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcblxuICAgICAgICAgIGlmICh0aGF0Lm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WCAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgICAgICBuZXdQb3NpdGlvblBlcmNlbnQgPSBuZXdQb3NpdGlvbiAvIGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBldmVudC5jbGllbnRZIC0gc2hpZnQgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgbmV3UG9zaXRpb25QZXJjZW50ID0gbmV3UG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgcG9zaXRpb24gPSBuZXdQb3NpdGlvblBlcmNlbnQ7XG5cbiAgICAgICAgICBpZiAocG9zaXRpb24gPiAxKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwb3NpdGlvbiA8IDApIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgIGluZGV4OiB0aGF0LmluZGV4LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25Nb3VzZXVwKCkge1xuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2Vtb3ZlKTtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZXVwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IHsgVHVtYmxlciB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==