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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Presenter = (function () {\r\n    function Presenter(view, model) {\r\n        this.view = view;\r\n        this.model = model;\r\n        view.on_thumbler_move(function (thumbler_data) {\r\n            model.set_new_position(thumbler_data);\r\n        });\r\n        model.on_change_model(function (model_state) {\r\n            view.update(model_state);\r\n        });\r\n    }\r\n    return Presenter;\r\n}());\r\nexports.Presenter = Presenter;\r\n\n\n//# sourceURL=webpack://SimpleRangeSlider/./src/Plugin/Controller/Presenter.ts?");

/***/ }),

/***/ "./src/Plugin/Model/Model.ts":
/*!***********************************!*\
  !*** ./src/Plugin/Model/Model.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Model = (function () {\r\n    function Model(configuration) {\r\n        this.configuration = configuration;\r\n        this.value = [0];\r\n        this.range = [0, 0];\r\n        this.step = 0;\r\n        this.position = [0];\r\n        this.index_of_active_thumbler = 0;\r\n        this.callback_list = [];\r\n        this.step = this.configuration.value_step;\r\n        for (var i = 0; i < this.configuration.value_range.length; i++) {\r\n            if (this.range[i] === undefined) {\r\n                this.range.push(this.configuration.value_range[i]);\r\n            }\r\n            else {\r\n                this.range[i] = this.configuration.value_range[i];\r\n            }\r\n        }\r\n        ;\r\n        for (var i = 0; i < this.configuration.value_start.length; i++) {\r\n            if (this.value[i] === undefined) {\r\n                this.value.push(this.configuration.value_start[i]);\r\n            }\r\n            else {\r\n                this.value[i] = this.configuration.value_start[i];\r\n            }\r\n            if (this.position[i] === undefined) {\r\n                this.position.push(this.get_position_from_value(this.value[i], this.range));\r\n            }\r\n            else {\r\n                this.position[i] = this.get_position_from_value(this.value[i], this.range);\r\n            }\r\n        }\r\n    }\r\n    Model.prototype.set_new_position = function (thumbler_state) {\r\n        var position = Math.round(thumbler_state.position * 1e4) / 1e4;\r\n        this.index_of_active_thumbler = thumbler_state.index;\r\n        var i = this.index_of_active_thumbler;\r\n        var new_value = this.get_value_from_position(position, this.range);\r\n        var condition = [this.value[i] - this.step, this.value[i] + this.step];\r\n        if (new_value >= condition[1] || new_value <= condition[0]) {\r\n            this.set_value_and_position(new_value, i);\r\n        }\r\n        if (new_value <= this.range[0]) {\r\n            this.set_value_and_position(this.range[0], i);\r\n        }\r\n        if (new_value >= this.range[1]) {\r\n            this.set_value_and_position(this.range[1], i);\r\n        }\r\n        if (this.position.length > 1 && this.position[1]) {\r\n            if (this.position[0] < this.position[1]) {\r\n                this.update();\r\n            }\r\n            else {\r\n                return false;\r\n            }\r\n        }\r\n        else {\r\n            this.update();\r\n        }\r\n    };\r\n    Model.prototype.update = function () {\r\n        var _this = this;\r\n        this.callback_list.forEach(function (callback) {\r\n            callback({\r\n                position: _this.position,\r\n                value: _this.value,\r\n                index: _this.index_of_active_thumbler\r\n            });\r\n        });\r\n    };\r\n    Model.prototype.on_change_model = function (callback) {\r\n        this.callback_list.push(callback);\r\n    };\r\n    Model.prototype.get_position_from_value = function (value, range) {\r\n        var result = (value - range[0]) / (range[1] - range[0]);\r\n        return (Math.round(result * 1e4) / 1e4);\r\n    };\r\n    Model.prototype.get_value_from_position = function (position, range) {\r\n        var result = (position * (range[1] - range[0])) + range[0];\r\n        return (Math.round(result));\r\n    };\r\n    Model.prototype.set_value_and_position = function (new_value, i) {\r\n        this.value[i] = (Math.round(new_value / this.step) * this.step);\r\n        console.log(this.value);\r\n        this.position[i] = this.get_position_from_value(this.value[i], this.range);\r\n    };\r\n    return Model;\r\n}());\r\nexports.Model = Model;\r\n\n\n//# sourceURL=webpack://SimpleRangeSlider/./src/Plugin/Model/Model.ts?");

/***/ }),

/***/ "./src/Plugin/Plugin.ts":
/*!******************************!*\
  !*** ./src/Plugin/Plugin.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar View_1 = __webpack_require__(/*! ./View/View */ \"./src/Plugin/View/View.ts\");\r\nvar Model_1 = __webpack_require__(/*! ./Model/Model */ \"./src/Plugin/Model/Model.ts\");\r\nvar Presenter_1 = __webpack_require__(/*! ./Controller/Presenter */ \"./src/Plugin/Controller/Presenter.ts\");\r\nvar SimpleRangeSlider = (function () {\r\n    function SimpleRangeSlider(container, user_configuration) {\r\n        this.container = container;\r\n        this.user_configuration = user_configuration;\r\n        var slider_container = this.container.get(0);\r\n        var default_Configuration = {\r\n            orientation: 'horizontal',\r\n            start: [10],\r\n            range: [0, 100],\r\n            step: 1,\r\n            connect: true,\r\n            tooltip: false\r\n        };\r\n        var complete_configuration = {\r\n            orientation: this.user_configuration.orientation === undefined ? default_Configuration.orientation : this.user_configuration.orientation,\r\n            start: this.user_configuration.start === undefined ? default_Configuration.start : this.user_configuration.start,\r\n            range: this.user_configuration.range === undefined ? default_Configuration.range : this.user_configuration.range,\r\n            step: this.user_configuration.step === undefined ? default_Configuration.step : this.user_configuration.step,\r\n            connect: this.user_configuration.connect === undefined ? default_Configuration.connect : this.user_configuration.connect,\r\n            tooltip: this.user_configuration.tooltip === undefined ? default_Configuration.tooltip : this.user_configuration.tooltip\r\n        };\r\n        var model_configuration = {\r\n            value_start: complete_configuration.start,\r\n            value_range: complete_configuration.range,\r\n            value_step: complete_configuration.step,\r\n        };\r\n        var view_configuration = {\r\n            orientation: complete_configuration.orientation,\r\n            value_start: complete_configuration.start,\r\n            value_range: complete_configuration.range,\r\n            is_tooltip: complete_configuration.tooltip,\r\n            is_connect: complete_configuration.connect\r\n        };\r\n        this.view = new View_1.View(slider_container, view_configuration);\r\n        this.model = new Model_1.Model(model_configuration);\r\n        this.presenter = new Presenter_1.Presenter(this.view, this.model);\r\n    }\r\n    return SimpleRangeSlider;\r\n}());\r\nexports.SimpleRangeSlider = SimpleRangeSlider;\r\n;\r\n(function ($) {\r\n    $.fn.extend({\r\n        SimpleRangeSlider: function (user_configuration) {\r\n            return new SimpleRangeSlider(this, user_configuration);\r\n        }\r\n    });\r\n}(jQuery));\r\n\n\n//# sourceURL=webpack://SimpleRangeSlider/./src/Plugin/Plugin.ts?");

/***/ }),

/***/ "./src/Plugin/View/View.ts":
/*!*********************************!*\
  !*** ./src/Plugin/View/View.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Helper_1 = __webpack_require__(/*! ./entities/Helper */ \"./src/Plugin/View/entities/Helper.ts\");\r\nvar Thumbler_1 = __webpack_require__(/*! ./entities/Thumbler */ \"./src/Plugin/View/entities/Thumbler.ts\");\r\nvar Connect_1 = __webpack_require__(/*! ./entities/Connect */ \"./src/Plugin/View/entities/Connect.ts\");\r\nvar Tooltip_1 = __webpack_require__(/*! ./entities/Tooltip */ \"./src/Plugin/View/entities/Tooltip.ts\");\r\nvar View = (function (_super) {\r\n    __extends(View, _super);\r\n    function View(container, configuration) {\r\n        var _this = _super.call(this) || this;\r\n        _this.container = container;\r\n        _this.configuration = configuration;\r\n        _this.position = [0];\r\n        _this.value_range = [0, 0];\r\n        _this.value_start = [0];\r\n        _this.thumbler = [];\r\n        _this.connect = [];\r\n        _this.tooltip = [];\r\n        _this.is_tooltip = _this.configuration.is_tooltip;\r\n        _this.is_connect = _this.configuration.is_connect;\r\n        _this.orientation = _this.configuration.orientation;\r\n        for (var i = 0; i < _this.configuration.value_range.length; i++) {\r\n            if (_this.value_range[i] === undefined) {\r\n                _this.value_range.push(_this.configuration.value_range[i]);\r\n            }\r\n            else {\r\n                _this.value_range[i] = _this.configuration.value_range[i];\r\n            }\r\n        }\r\n        ;\r\n        for (var i = 0; i < _this.configuration.value_start.length; i++) {\r\n            if (_this.value_start[i] === undefined) {\r\n                _this.value_start.push(_this.configuration.value_start[i]);\r\n            }\r\n            else {\r\n                _this.value_start[i] = _this.configuration.value_start[i];\r\n            }\r\n            if (_this.position[i] === undefined) {\r\n                _this.position.push(_this.get_position_from_value(_this.value_start[i], _this.value_range));\r\n            }\r\n            else {\r\n                _this.position[i] = _this.get_position_from_value(_this.value_start[i], _this.value_range);\r\n            }\r\n        }\r\n        ;\r\n        _this.slider = _this.get_div_element_with_class('slider', _this.orientation);\r\n        for (var i = 0; i < _this.position.length; i++) {\r\n            _this.thumbler.push(new Thumbler_1.Thumbler(_this.position[i], _this.orientation, i));\r\n        }\r\n        if (_this.is_connect) {\r\n            if (_this.position.length === 1) {\r\n                _this.connect.push(new Connect_1.Connect(0, _this.position[0], _this.orientation));\r\n            }\r\n            else {\r\n                _this.connect.push(new Connect_1.Connect(_this.position[0], _this.position[1], _this.orientation));\r\n            }\r\n            _this.slider.append(_this.connect[0].element);\r\n        }\r\n        if (_this.is_tooltip) {\r\n            for (var i = 0; i < _this.thumbler.length; i++) {\r\n                _this.tooltip.push(new Tooltip_1.Tooltip(_this.value_start[i], _this.orientation));\r\n                _this.thumbler[i].element.append(_this.tooltip[i].element);\r\n            }\r\n        }\r\n        for (var i = 0; i < _this.thumbler.length; i++) {\r\n            _this.slider.append(_this.thumbler[i].element);\r\n        }\r\n        _this.container.append(_this.slider);\r\n        return _this;\r\n    }\r\n    View.prototype.on_thumbler_move = function (callback) {\r\n        for (var i = 0; i < this.thumbler.length; i++) {\r\n            this.thumbler[i].on_mouse_down_and_move(this.container, callback);\r\n        }\r\n    };\r\n    View.prototype.update = function (model_state) {\r\n        var i = model_state.index;\r\n        var position = model_state.position;\r\n        var value = model_state.value;\r\n        if (position.length > 1) {\r\n            if (i === 0) {\r\n                this.thumbler[0].element.classList.add('SRS__thumbler_active');\r\n                this.thumbler[1].element.classList.remove('SRS__thumbler_active');\r\n                if (this.is_tooltip) {\r\n                    this.tooltip[0].element.classList.add('SRS__tooltip_active');\r\n                    this.tooltip[1].element.classList.remove('SRS__tooltip_active');\r\n                }\r\n            }\r\n            else {\r\n                this.thumbler[1].element.classList.add('SRS__thumbler_active');\r\n                this.thumbler[0].element.classList.remove('SRS__thumbler_active');\r\n                if (this.is_tooltip) {\r\n                    this.tooltip[1].element.classList.add('SRS__tooltip_active');\r\n                    this.tooltip[0].element.classList.remove('SRS__tooltip_active');\r\n                }\r\n            }\r\n        }\r\n        this.thumbler[i].set_new_position(position[i]);\r\n        if (this.is_tooltip) {\r\n            this.tooltip[i].set_inner_text(value[i]);\r\n        }\r\n        if (this.is_connect) {\r\n            if (this.position.length === 1) {\r\n                this.connect[0].set_connect_position(0, position[0]);\r\n            }\r\n            else if (position[1]) {\r\n                this.connect[0].set_connect_position(position[0], position[1]);\r\n            }\r\n        }\r\n    };\r\n    return View;\r\n}(Helper_1.Helper));\r\nexports.View = View;\r\n\n\n//# sourceURL=webpack://SimpleRangeSlider/./src/Plugin/View/View.ts?");

/***/ }),

/***/ "./src/Plugin/View/entities/Connect.ts":
/*!*********************************************!*\
  !*** ./src/Plugin/View/entities/Connect.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Helper_1 = __webpack_require__(/*! ./Helper */ \"./src/Plugin/View/entities/Helper.ts\");\r\nvar Connect = (function (_super) {\r\n    __extends(Connect, _super);\r\n    function Connect(position_start, position_end, orientation) {\r\n        var _this = _super.call(this) || this;\r\n        _this.position_start = position_start;\r\n        _this.position_end = position_end;\r\n        _this.orientation = orientation;\r\n        _this.element = _this.get_div_element_with_class('connect', _this.orientation);\r\n        _this.set_connect_position(_this.position_start, _this.position_end);\r\n        return _this;\r\n    }\r\n    Connect.prototype.set_connect_position = function (position_start, position_end) {\r\n        var start = Math.round(position_start * this.TO_CONNECT_UPDATE);\r\n        var end = Math.round(position_end * this.TO_CONNECT_UPDATE);\r\n        var style = start === 0\r\n            ? this.orientation === 'horizontal'\r\n                ? \"width: \" + end + \"%;\"\r\n                : \"height: \" + end + \"%;\"\r\n            : this.orientation === 'horizontal'\r\n                ? \"left: \" + start + \"%; width: \" + (end - start) + \"%;\"\r\n                : \"top: \" + start + \"%; height: \" + (end - start) + \"%;\";\r\n        this.element.setAttribute('style', style);\r\n    };\r\n    return Connect;\r\n}(Helper_1.Helper));\r\nexports.Connect = Connect;\r\n\n\n//# sourceURL=webpack://SimpleRangeSlider/./src/Plugin/View/entities/Connect.ts?");

/***/ }),

/***/ "./src/Plugin/View/entities/Helper.ts":
/*!********************************************!*\
  !*** ./src/Plugin/View/entities/Helper.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Helper = (function () {\r\n    function Helper() {\r\n        this.TO_THUMBLER_POSITION = 1e4;\r\n        this.TO_CONNECT_UPDATE = 1e2;\r\n    }\r\n    Helper.prototype.get_position_from_value = function (value, range) {\r\n        var result = ((value - range[0]) / (range[1] - range[0]));\r\n        return (Math.round(result * 1e4) / 1e4);\r\n    };\r\n    Helper.prototype.get_div_element_with_class = function (css_class, orientation) {\r\n        var str_class = 'SRS__' + css_class;\r\n        var css_class_without_orientation = str_class + ' ' + str_class + '_';\r\n        var element = document.createElement('div');\r\n        element.setAttribute('class', (css_class_without_orientation + orientation));\r\n        return element;\r\n    };\r\n    return Helper;\r\n}());\r\nexports.Helper = Helper;\r\n\n\n//# sourceURL=webpack://SimpleRangeSlider/./src/Plugin/View/entities/Helper.ts?");

/***/ }),

/***/ "./src/Plugin/View/entities/Thumbler.ts":
/*!**********************************************!*\
  !*** ./src/Plugin/View/entities/Thumbler.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Helper_1 = __webpack_require__(/*! ./Helper */ \"./src/Plugin/View/entities/Helper.ts\");\r\nvar Thumbler = (function (_super) {\r\n    __extends(Thumbler, _super);\r\n    function Thumbler(position, orientation, index) {\r\n        var _this = _super.call(this) || this;\r\n        _this.position = position;\r\n        _this.orientation = orientation;\r\n        _this.index = index;\r\n        _this.element = _this.get_div_element_with_class('thumbler', _this.orientation);\r\n        _this.set_new_position(position);\r\n        return _this;\r\n    }\r\n    Thumbler.prototype.set_new_position = function (position) {\r\n        var liter = this.orientation === \"horizontal\" ? 'X' : 'Y';\r\n        var style = \"transform: translate\" + liter + \"(\" + Math.round(position * this.TO_THUMBLER_POSITION) + \"%);\";\r\n        this.element.setAttribute('style', style);\r\n    };\r\n    Thumbler.prototype.get_shift = function (element, event) {\r\n        var result = this.orientation === 'horizontal'\r\n            ? event.clientX - element.getBoundingClientRect().left\r\n            : event.clientY - element.getBoundingClientRect().top;\r\n        return result;\r\n    };\r\n    Thumbler.prototype.on_mouse_down_and_move = function (container, callback) {\r\n        var _this = this;\r\n        var that = this;\r\n        that.element.addEventListener('mousedown', function (event) {\r\n            event.preventDefault();\r\n            var shift = _this.get_shift(that.element, event);\r\n            document.addEventListener('mousemove', on_mouse_move);\r\n            document.addEventListener('mouseup', on_mouse_up);\r\n            function on_mouse_move(event) {\r\n                var new_position, new_position_in_percent, position;\r\n                if (that.orientation === 'horizontal') {\r\n                    new_position = event.clientX - shift - container.getBoundingClientRect().left;\r\n                    new_position_in_percent = new_position / container.offsetWidth;\r\n                }\r\n                else {\r\n                    new_position = event.clientY - shift - container.getBoundingClientRect().top;\r\n                    new_position_in_percent = new_position / container.offsetHeight;\r\n                }\r\n                position = new_position_in_percent;\r\n                if (position > 1) {\r\n                    position = 1;\r\n                }\r\n                if (position < 0) {\r\n                    position = 0;\r\n                }\r\n                callback({ position: position,\r\n                    index: that.index });\r\n            }\r\n            function on_mouse_up() {\r\n                document.removeEventListener('mousemove', on_mouse_move);\r\n                document.removeEventListener('mouseup', on_mouse_up);\r\n            }\r\n        });\r\n    };\r\n    return Thumbler;\r\n}(Helper_1.Helper));\r\nexports.Thumbler = Thumbler;\r\n\n\n//# sourceURL=webpack://SimpleRangeSlider/./src/Plugin/View/entities/Thumbler.ts?");

/***/ }),

/***/ "./src/Plugin/View/entities/Tooltip.ts":
/*!*********************************************!*\
  !*** ./src/Plugin/View/entities/Tooltip.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Helper_1 = __webpack_require__(/*! ./Helper */ \"./src/Plugin/View/entities/Helper.ts\");\r\nvar Tooltip = (function (_super) {\r\n    __extends(Tooltip, _super);\r\n    function Tooltip(value, orientation) {\r\n        var _this = _super.call(this) || this;\r\n        _this.value = value;\r\n        _this.orientation = orientation;\r\n        _this.element = _this.get_div_element_with_class('tooltip', _this.orientation);\r\n        _this.set_inner_text(_this.value);\r\n        return _this;\r\n    }\r\n    Tooltip.prototype.set_inner_text = function (value) {\r\n        var val = value > 0\r\n            ? Math.floor(value)\r\n            : Math.ceil(value);\r\n        this.element.innerText = String(val);\r\n    };\r\n    return Tooltip;\r\n}(Helper_1.Helper));\r\nexports.Tooltip = Tooltip;\r\n\n\n//# sourceURL=webpack://SimpleRangeSlider/./src/Plugin/View/entities/Tooltip.ts?");

/***/ })

/******/ })["default"];
});