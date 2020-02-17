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
        var range_slider;
        range_slider = new Plugin_1.SimpleRangeSlider(slider, {
            range: [-100, 100],
            start: [-50, 50],
            step: 10,
            orientation: "horizontal",
            connect: true,
            tooltip: true,
            input: inputs
        });
    }
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
        this.start_input_min = document.createElement('input');
        this.start_input_min.setAttribute('type', 'text');
        this.start_input_min.value = '-50';
        this.start_input_max = document.createElement('input');
        this.start_input_max.setAttribute('type', 'text');
        this.start_input_max.value = '50';
        var start_line = document.createElement('div');
        start_line.append(start_text, this.start_input_min, this.start_input_max);
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
        this.connect_input = document.createElement('input');
        this.connect_input.setAttribute('type', 'checkbox');
        this.connect_input.checked = true;
        var connect_line = document.createElement('div');
        connect_line.append(connect_text, this.connect_input);
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
            new_value = this.get_value_from_position(position, this.range);
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
            this.set_value_and_position(new_value, index);
        }
        if (new_value <= this.range[0]) {
            this.set_value_and_position(this.range[0], index);
        }
        if (new_value >= this.range[1]) {
            this.set_value_and_position(this.range[1], index);
        }
    };
    Model.prototype.update = function () {
        var _this = this;
        this.callback_list.forEach(function (callback) {
            callback({
                position: _this.position,
                value: _this.value,
                index: _this.index_of_active_thumbler
            });
        });
    };
    Model.prototype.on_change_model = function (callback) {
        this.callback_list.push(callback);
    };
    Model.prototype.get_position_from_value = function (value, range) {
        var result = (value - range[0]) / (range[1] - range[0]);
        return (Math.round(result * this.TO_NORMALIZE_POSITION) / this.TO_NORMALIZE_POSITION);
    };
    Model.prototype.get_value_from_position = function (position, range) {
        var result = (position * (range[1] - range[0])) + range[0];
        return (Math.round(result));
    };
    Model.prototype.set_value_and_position = function (new_value, i) {
        this.value[i] = new_value > 0
            ? (Math.ceil(new_value / this.step) * this.step)
            : (Math.floor(new_value / this.step) * this.step);
        this.position[i] = this.get_position_from_value(this.value[i], this.range);
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
                this.position.push(this.get_position_from_value(this.value[i], this.range));
            }
            else {
                this.position[i] = this.get_position_from_value(this.value[i], this.range);
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
            tooltip: true
        };
        var complete_configuration = {
            orientation: this.user_configuration.orientation === undefined ? default_Configuration.orientation : this.user_configuration.orientation,
            start: this.user_configuration.start === undefined ? default_Configuration.start : this.user_configuration.start,
            range: this.user_configuration.range === undefined ? default_Configuration.range : this.user_configuration.range,
            step: this.user_configuration.step === undefined ? default_Configuration.step : this.user_configuration.step,
            connect: this.user_configuration.connect === undefined ? default_Configuration.connect : this.user_configuration.connect,
            tooltip: this.user_configuration.tooltip === undefined ? default_Configuration.tooltip : this.user_configuration.tooltip,
            input: this.user_configuration.input
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
            input: complete_configuration.input
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
        }
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
        _this.input_value = [];
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
        if (this.input_value[0] !== undefined) {
            for (var i = 0; i < this.input_value.length; i++) {
                this.input_value[i].on_keydown_or_mouseout(callback);
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
        if (this.input_value[0] !== undefined) {
            this.input_value[i].element.value = String(value[i]);
        }
        if (this.is_connect) {
            if (this.position.length === 1) {
                this.connect[0].set_connect_position(0, position[0]);
            }
            else if (position[1]) {
                this.connect[0].set_connect_position(position[0], position[1]);
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
                this.position.push(this.get_position_from_value(this.value_start[i], this.value_range));
            }
            else {
                this.position[i] = this.get_position_from_value(this.value_start[i], this.value_range);
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
                this.input_value.push(new Input_1.Input('value', this.configuration.input.value[i], this.configuration.value_start[i], i));
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
        _this.connect_position = [0, 0];
        _this.element = _this.get_div_element_with_class('connect', _this.orientation);
        _this.set_connect_position(_this.position_start, _this.position_end);
        return _this;
    }
    Connect.prototype.set_connect_position = function (position_start, position_end) {
        var start = Math.round(position_start * this.TO_CONNECT_UPDATE);
        var end = Math.round(position_end * this.TO_CONNECT_UPDATE);
        this.connect_position = [start, end];
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
    Helper.prototype.get_position_from_value = function (value, range) {
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
        var str_class = 'SRS__' + css_class;
        var css_class_without_orientation = str_class + ' ' + str_class + '_';
        var element = document.createElement('div');
        element.setAttribute('class', (css_class_without_orientation + orientation));
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
            if (event.key === "Tab" || event.key === "Enter") {
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
                    index: that.index
                });
            }
            else {
                callback({
                    value: value,
                    index: 0
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
                var new_position, new_position_in_percent, position;
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
                callback({ position: position,
                    index: that.index });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvRGVtb19QYW5lbC9QYW5lbC50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9EZW1vX1BhbmVsL3RlbXBsYXRlLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9Db250cm9sbGVyL1ByZXNlbnRlci50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1BsdWdpbi50cyIsIndlYnBhY2s6Ly9TaW1wbGVSYW5nZVNsaWRlci8uL3NyYy9QbHVnaW4vVmlldy9WaWV3LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vU2ltcGxlUmFuZ2VTbGlkZXIvLi9zcmMvUGx1Z2luL1ZpZXcvZW50aXRpZXMvSGVscGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL0lucHV0LnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1RodW1ibGVyLnRzIiwid2VicGFjazovL1NpbXBsZVJhbmdlU2xpZGVyLy4vc3JjL1BsdWdpbi9WaWV3L2VudGl0aWVzL1Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FB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O1lBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDekMsQ0FBQztJQUNELCtCQUFhLEdBQWIsVUFBNkIsVUFBbUI7UUFDOUMsSUFBSSxJQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3pCLElBQUcsVUFBVSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQ0E3QnFCLGVBQU0sR0E2QjNCO0FBQ08sMEJBQU8iLCJmaWxlIjoiZGVtb1BhbmVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2ltcGxlUmFuZ2VTbGlkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL0RlbW9fUGFuZWwvUGFuZWwudHNcIik7XG4iLCJpbXBvcnQgeyBTaW1wbGVSYW5nZVNsaWRlciB9IGZyb20gJy4uL1BsdWdpbi9QbHVnaW4nO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJy4vdGVtcGxhdGUnO1xyXG5cclxuY2xhc3MgRGVtb19QYW5lbCB7XHJcblxyXG4gIHRlbXBsYXRlOiBUZW1wbGF0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZW1vX3BhbmVsOiBKUXVlcnksIHByaXZhdGUgc2xpZGVyOiBKUXVlcnksIHByaXZhdGUgaW5wdXRzOiBJX0RFTU9fSW5wdXQpIHtcclxuICAgIHRoaXMudGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcclxuICAgIHRoaXMuZGVtb19wYW5lbC5hcHBlbmQodGhpcy50ZW1wbGF0ZS5kZW1vX3BhbmVsKTtcclxuXHJcbiAgICBsZXQgcmFuZ2Vfc2xpZGVyOiAgU2ltcGxlUmFuZ2VTbGlkZXI7XHJcbiAgICByYW5nZV9zbGlkZXIgPSBuZXcgU2ltcGxlUmFuZ2VTbGlkZXIoc2xpZGVyLCB7XHJcbiAgICAgIHJhbmdlOiBbLTEwMCwgMTAwXSxcclxuICAgICAgc3RhcnQ6IFstNTAsIDUwXSxcclxuICAgICAgc3RlcDogMTAsXHJcbiAgICAgIG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIixcclxuICAgICAgY29ubmVjdDogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogdHJ1ZSxcclxuICAgICAgaW5wdXQ6IGlucHV0c1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7RGVtb19QYW5lbH07XHJcblxyXG4oZnVuY3Rpb24oJDogSlF1ZXJ5U3RhdGljKSB7XHJcbiAgJC5mbi5leHRlbmQoe1xyXG4gICAgRGVtb19QYW5lbDogZnVuY3Rpb24oc2xpZGVyOiBKUXVlcnksIGlucHV0czogSV9ERU1PX0lucHV0KSB7XHJcbiAgICAgIHJldHVybiBuZXcgRGVtb19QYW5lbCg8SlF1ZXJ5PiB0aGlzLCA8SlF1ZXJ5PiBzbGlkZXIsIDxJX0RFTU9fSW5wdXQ+IGlucHV0cyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0gKGpRdWVyeSkgKTsiLCJjbGFzcyBUZW1wbGF0ZSB7XHJcbiAgcmFuZ2VfaW5wdXRfbWluOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHJhbmdlX2lucHV0X21heDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgc3RhcnRfaW5wdXRfbWluOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHN0YXJ0X2lucHV0X21heDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgc3RlcF9pbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgb3JpZW50YXRpb25faW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIGNvbm5lY3RfaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIGRlbW9fcGFuZWw6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gcmFuZ2UgbGluZVxyXG4gICAgbGV0IHJhbmdlX3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICByYW5nZV90ZXh0LmlubmVyVGV4dCA9ICdSYW5nZTogJztcclxuICAgIHRoaXMucmFuZ2VfaW5wdXRfbWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9taW4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5yYW5nZV9pbnB1dF9taW4udmFsdWUgPSAnLTEwMCc7XHJcbiAgICB0aGlzLnJhbmdlX2lucHV0X21heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWF4LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgIHRoaXMucmFuZ2VfaW5wdXRfbWF4LnZhbHVlID0gJzEwMCc7XHJcbiAgICBsZXQgcmFuZ2VfbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICByYW5nZV9saW5lLmFwcGVuZChyYW5nZV90ZXh0LCB0aGlzLnJhbmdlX2lucHV0X21pbiwgdGhpcy5yYW5nZV9pbnB1dF9tYXgpO1xyXG4gICAgLy8gc3RhcnQgbGluZVxyXG4gICAgbGV0IHN0YXJ0X3RleHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBzdGFydF90ZXh0LmlubmVyVGV4dCA9ICdTdGFydDogJztcclxuICAgIHRoaXMuc3RhcnRfaW5wdXRfbWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5zdGFydF9pbnB1dF9taW4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5zdGFydF9pbnB1dF9taW4udmFsdWUgPSAnLTUwJztcclxuICAgIHRoaXMuc3RhcnRfaW5wdXRfbWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgdGhpcy5zdGFydF9pbnB1dF9tYXguc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgdGhpcy5zdGFydF9pbnB1dF9tYXgudmFsdWUgPSAnNTAnO1xyXG4gICAgbGV0IHN0YXJ0X2xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc3RhcnRfbGluZS5hcHBlbmQoc3RhcnRfdGV4dCwgdGhpcy5zdGFydF9pbnB1dF9taW4sIHRoaXMuc3RhcnRfaW5wdXRfbWF4KTtcclxuICAgIC8vIHN0ZXAgbGluZVxyXG4gICAgbGV0IHN0ZXBfdGV4dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIHN0ZXBfdGV4dC5pbm5lclRleHQgPSAnU3RlcDogJztcclxuICAgIHRoaXMuc3RlcF9pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc3RlcF9pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICB0aGlzLnN0ZXBfaW5wdXQudmFsdWUgPSAnMTAnO1xyXG4gICAgbGV0IHN0ZXBfbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBzdGVwX2xpbmUuYXBwZW5kKHN0ZXBfdGV4dCwgdGhpcy5zdGVwX2lucHV0KTtcclxuICAgIC8vIG9yaWVudGF0aW9uIGxpbmVcclxuICAgIGxldCBvcmllbnRhdGlvbl90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgb3JpZW50YXRpb25fdGV4dC5pbm5lclRleHQgPSAnT3JpZW50YXRpb24gaG9yaXpvbnRhbC92ZXJ0aWNhbDogJztcclxuICAgIHRoaXMub3JpZW50YXRpb25faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICB0aGlzLm9yaWVudGF0aW9uX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xyXG4gICAgICB0aGlzLm9yaWVudGF0aW9uX2lucHV0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgbGV0IG9yaWVudGF0aW9uX2xpbmU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIG9yaWVudGF0aW9uX2xpbmUuYXBwZW5kKG9yaWVudGF0aW9uX3RleHQsIHRoaXMub3JpZW50YXRpb25faW5wdXQpO1xyXG4gICAgLy8gY29ubmVjdCBsaW5lXHJcbiAgICBsZXQgY29ubmVjdF90ZXh0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgY29ubmVjdF90ZXh0LmlubmVyVGV4dCA9ICdDb25uZWN0IG9uL29mZjogJztcclxuICAgIHRoaXMuY29ubmVjdF9pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuY29ubmVjdF9pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcclxuICAgICAgdGhpcy5jb25uZWN0X2lucHV0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgbGV0IGNvbm5lY3RfbGluZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY29ubmVjdF9saW5lLmFwcGVuZChjb25uZWN0X3RleHQsIHRoaXMuY29ubmVjdF9pbnB1dCk7XHJcblxyXG4gICAgdGhpcy5kZW1vX3BhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRoaXMuZGVtb19wYW5lbC5hcHBlbmQocmFuZ2VfbGluZSwgc3RhcnRfbGluZSwgc3RlcF9saW5lLCBvcmllbnRhdGlvbl9saW5lLCBjb25uZWN0X2xpbmUpO1xyXG4gIH1cclxufVxyXG5leHBvcnQge1RlbXBsYXRlfSIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuLi9WaWV3L1ZpZXcnO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL01vZGVsL01vZGVsJztcclxuXHJcbmNsYXNzIFByZXNlbnRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3OiBWaWV3LCBwcml2YXRlIG1vZGVsOiBNb2RlbCkge1xyXG4gICAgdGhpcy52aWV3Lm9uX2NoYW5nZV92aWV3KCh0aHVtYmxlcl9kYXRhOiBUX1RodW1ibGVyX0RhdGEpID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2codGh1bWJsZXJfZGF0YSk7XHJcbiAgICAgIHRoaXMubW9kZWwuc2V0X25ld19wb3NpdGlvbih0aHVtYmxlcl9kYXRhKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5tb2RlbC5vbl9jaGFuZ2VfbW9kZWwoKG1vZGVsX3N0YXRlOiBUX01vZGVsX0RhdGEpID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2cobW9kZWxfc3RhdGUpO1xyXG4gICAgICB0aGlzLnZpZXcudXBkYXRlKG1vZGVsX3N0YXRlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5leHBvcnQge1ByZXNlbnRlcn07IiwiY2xhc3MgTW9kZWwge1xyXG5cclxuXHJcbiAgICB2YWx1ZTogVF9WYWx1ZSA9IFswXTtcclxuICAgIHJhbmdlOiBUX1JhbmdlID0gWzAsIDBdO1xyXG4gICAgc3RlcDogbnVtYmVyID0gMDtcclxuICAgIHBvc2l0aW9uOiBUX1Bvc2l0aW9uID0gWzBdO1xyXG5cclxuICAgIGluZGV4X29mX2FjdGl2ZV90aHVtYmxlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjYWxsYmFja19saXN0OiBJX01vZGVsX1N0YXRlW107XHJcblxyXG4gICAgcmVhZG9ubHkgVE9fTk9STUFMSVpFX1BPU0lUSU9OOiBudW1iZXIgPSAxZTQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fTW9kZWwpIHtcclxuXHJcbiAgICAgIHRoaXMuY2FsbGJhY2tfbGlzdCA9IFtdO1xyXG5cclxuICAgICAgdGhpcy5zdGVwID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0ZXA7XHJcblxyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfbmV3X3Bvc2l0aW9uKHRodW1ibGVyX3N0YXRlOiBUX1RodW1ibGVyX0RhdGEpIHtcclxuXHJcbiAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGh1bWJsZXJfc3RhdGUuaW5kZXg7XHJcbiAgICAgIHRoaXMuaW5kZXhfb2ZfYWN0aXZlX3RodW1ibGVyID0gaW5kZXg7XHJcblxyXG4gICAgICBsZXQgbmV3X3ZhbHVlOiBudW1iZXIgPSB0aGlzLmdldF9uZXdfdmFsdWUodGh1bWJsZXJfc3RhdGUpO1xyXG5cclxuICAgICAgdGhpcy5jaGVja19vbl9zdGVwX21vdmVtZW50X3RvX3NldF92YWxfYW5kX3BvcyhuZXdfdmFsdWUsIGluZGV4KTtcclxuICAgICAgLy8gY2hlY2sgZm9yIGNvbGxpc2lvblxyXG4gICAgICBpZih0aGlzLnZhbHVlLmxlbmd0aCA+IDEgJiYgdGhpcy52YWx1ZVsxXSkge1xyXG4gICAgICAgIGlmKHRoaXMudmFsdWVbMF0gPCB0aGlzLnZhbHVlWzFdICkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X25ld192YWx1ZSh0aHVtYmxlcl9zdGF0ZTogVF9UaHVtYmxlcl9EYXRhKTogbnVtYmVyIHtcclxuICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aHVtYmxlcl9zdGF0ZS5pbmRleDtcclxuICAgICAgbGV0IG5ld192YWx1ZTogbnVtYmVyID0gdGhpcy52YWx1ZVtpbmRleF07IFxyXG4gICAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcclxuXHJcbiAgICAgIGlmKHRodW1ibGVyX3N0YXRlLnBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHsgIFxyXG4gICAgICAgIHBvc2l0aW9uID0gTWF0aC5yb3VuZCh0aHVtYmxlcl9zdGF0ZS5wb3NpdGlvbiAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKSAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OO1xyXG4gICAgICAgIG5ld192YWx1ZSA9IHRoaXMuZ2V0X3ZhbHVlX2Zyb21fcG9zaXRpb24ocG9zaXRpb24sIHRoaXMucmFuZ2UpO1xyXG4gICAgICB9IGVsc2UgaWYodGh1bWJsZXJfc3RhdGUudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ld192YWx1ZSA9IHRodW1ibGVyX3N0YXRlLnZhbHVlO1xyXG5cclxuICAgICAgICBpZihpbmRleCA9PT0gMCAmJiB0aGlzLnZhbHVlWzFdKSB7XHJcbiAgICAgICAgICBpZihuZXdfdmFsdWUgPiB0aGlzLnZhbHVlWzFdIC0gdGhpcy5zdGVwKSB7XHJcbiAgICAgICAgICAgIG5ld192YWx1ZSA9IHRoaXMudmFsdWVbMV0gLSB0aGlzLnN0ZXA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICBpZihuZXdfdmFsdWUgPCB0aGlzLnZhbHVlWzBdICsgdGhpcy5zdGVwKSB7XHJcbiAgICAgICAgICAgIG5ld192YWx1ZSA9IHRoaXMudmFsdWVbMF0gKyB0aGlzLnN0ZXA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXdfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tfb25fc3RlcF9tb3ZlbWVudF90b19zZXRfdmFsX2FuZF9wb3MobmV3X3ZhbHVlOiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgbGV0IGNvbmRpdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFt0aGlzLnZhbHVlW2luZGV4XSAtIHRoaXMuc3RlcCwgdGhpcy52YWx1ZVtpbmRleF0gKyB0aGlzLnN0ZXBdO1xyXG5cclxuICAgICAgaWYobmV3X3ZhbHVlID49IGNvbmRpdGlvblsxXSB8fCBuZXdfdmFsdWUgPD0gY29uZGl0aW9uWzBdKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfdmFsdWVfYW5kX3Bvc2l0aW9uKG5ld192YWx1ZSwgaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKG5ld192YWx1ZSA8PSB0aGlzLnJhbmdlWzBdKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfdmFsdWVfYW5kX3Bvc2l0aW9uKHRoaXMucmFuZ2VbMF0sIGluZGV4KTtcclxuICAgICAgfVxyXG4gICAgICBpZihuZXdfdmFsdWUgPj0gdGhpcy5yYW5nZVsxXSkge1xyXG4gICAgICAgIHRoaXMuc2V0X3ZhbHVlX2FuZF9wb3NpdGlvbih0aGlzLnJhbmdlWzFdLCBpbmRleCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tfbGlzdC5mb3JFYWNoKChjYWxsYmFjazogSV9Nb2RlbF9TdGF0ZSkgPT4ge1xyXG4gICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgICAgICBpbmRleDogdGhpcy5pbmRleF9vZl9hY3RpdmVfdGh1bWJsZXJcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25fY2hhbmdlX21vZGVsKGNhbGxiYWNrOiBJX01vZGVsX1N0YXRlKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tfbGlzdC5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh2YWx1ZTogbnVtYmVyLCByYW5nZTogVF9SYW5nZSk6IG51bWJlciB7XHJcblxyXG4gICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAoIHZhbHVlIC0gcmFuZ2VbMF0gKSAvICggcmFuZ2VbMV0gLSByYW5nZVswXSApO1xyXG5cclxuICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKSAvIHRoaXMuVE9fTk9STUFMSVpFX1BPU0lUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfdmFsdWVfZnJvbV9wb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyLCByYW5nZTogVF9SYW5nZSk6IG51bWJlciB7XHJcblxyXG4gICAgICBsZXQgcmVzdWx0OiBudW1iZXIgID0gKHBvc2l0aW9uICogKHJhbmdlWzFdIC0gcmFuZ2VbMF0pKSArIHJhbmdlWzBdO1xyXG5cclxuICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKHJlc3VsdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldF92YWx1ZV9hbmRfcG9zaXRpb24obmV3X3ZhbHVlOiBudW1iZXIsIGk6IG51bWJlcikge1xyXG4gICAgICB0aGlzLnZhbHVlW2ldID0gbmV3X3ZhbHVlID4gMFxyXG4gICAgICAgID8gKE1hdGguY2VpbChuZXdfdmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwKVxyXG4gICAgICAgIDogKE1hdGguZmxvb3IobmV3X3ZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcCk7XHJcbiAgICAgICAgXHJcbiAgICAgIHRoaXMucG9zaXRpb25baV0gPSB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgIGZvciggbGV0IGk9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2UubGVuZ3RoOyBpKysgKSB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmFuZ2VbaV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5yYW5nZS5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9yYW5nZVtpXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmFuZ2VbaV0gPSB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfcmFuZ2VbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yKCBsZXQgaT0gMDsgaSA8IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydC5sZW5ndGg7IGkrKyApIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy52YWx1ZVtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucG9zaXRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKCB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVbaV0sIHRoaXMucmFuZ2UpICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucG9zaXRpb25baV0gPSAgdGhpcy5nZXRfcG9zaXRpb25fZnJvbV92YWx1ZSh0aGlzLnZhbHVlW2ldLCB0aGlzLnJhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtNb2RlbH07IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vVmlldy9WaWV3JztcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuL01vZGVsL01vZGVsJztcclxuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9Db250cm9sbGVyL1ByZXNlbnRlcic7XHJcblxyXG5jbGFzcyBTaW1wbGVSYW5nZVNsaWRlciB7XHJcblxyXG4gICAgdmlldzogVmlldztcclxuICAgIG1vZGVsOiBNb2RlbDtcclxuICAgIHByZXNlbnRlcjogUHJlc2VudGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBKUXVlcnksIHByaXZhdGUgdXNlcl9jb25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlcikge1xyXG5cclxuICAgICAgbGV0IHNsaWRlcl9jb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIuZ2V0KDApO1xyXG4gICAgICAgIFxyXG4gICAgICBsZXQgZGVmYXVsdF9Db25maWd1cmF0aW9uOiBJX0NvbmZpZ3VyYXRpb25fVXNlciA9IHtcclxuICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxyXG4gICAgICAgIHN0YXJ0OiAgICAgICBbMTBdLFxyXG4gICAgICAgIHJhbmdlOiAgICAgICBbMCwgMTAwXSxcclxuICAgICAgICBzdGVwOiAgICAgICAgMSxcclxuICAgICAgICBjb25uZWN0OiAgICAgdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOiAgICAgdHJ1ZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Vc2VyID0ge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5vcmllbnRhdGlvbiA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLm9yaWVudGF0aW9uIDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24sXHJcbiAgICAgICAgc3RhcnQ6ICAgICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0YXJ0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24uc3RhcnQgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGFydCxcclxuICAgICAgICByYW5nZTogICAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24ucmFuZ2UgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5yYW5nZSA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnJhbmdlLFxyXG4gICAgICAgIHN0ZXA6ICAgICAgICB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5zdGVwID09PSB1bmRlZmluZWQgPyBkZWZhdWx0X0NvbmZpZ3VyYXRpb24uc3RlcCA6IHRoaXMudXNlcl9jb25maWd1cmF0aW9uLnN0ZXAsXHJcbiAgICAgICAgY29ubmVjdDogICAgIHRoaXMudXNlcl9jb25maWd1cmF0aW9uLmNvbm5lY3QgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRfQ29uZmlndXJhdGlvbi5jb25uZWN0IDogdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24uY29ubmVjdCxcclxuICAgICAgICB0b29sdGlwOiAgICAgdGhpcy51c2VyX2NvbmZpZ3VyYXRpb24udG9vbHRpcCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdF9Db25maWd1cmF0aW9uLnRvb2x0aXAgOiB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi50b29sdGlwLFxyXG4gICAgICAgIGlucHV0OiAgICAgICB0aGlzLnVzZXJfY29uZmlndXJhdGlvbi5pbnB1dFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IG1vZGVsX2NvbmZpZ3VyYXRpb246IElfQ29uZmlndXJhdGlvbl9Nb2RlbCA9IHtcclxuICAgICAgICB2YWx1ZV9zdGFydDogY29tcGxldGVfY29uZmlndXJhdGlvbi5zdGFydCxcclxuICAgICAgICB2YWx1ZV9yYW5nZTogY29tcGxldGVfY29uZmlndXJhdGlvbi5yYW5nZSxcclxuICAgICAgICB2YWx1ZV9zdGVwOiAgY29tcGxldGVfY29uZmlndXJhdGlvbi5zdGVwLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IHZpZXdfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1ZpZXcgPSB7XHJcbiAgICAgICAgb3JpZW50YXRpb246IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24sXHJcbiAgICAgICAgdmFsdWVfc3RhcnQ6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24uc3RhcnQsXHJcbiAgICAgICAgdmFsdWVfcmFuZ2U6IGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24ucmFuZ2UsXHJcbiAgICAgICAgaXNfdG9vbHRpcDogIGNvbXBsZXRlX2NvbmZpZ3VyYXRpb24udG9vbHRpcCxcclxuICAgICAgICBpc19jb25uZWN0OiAgY29tcGxldGVfY29uZmlndXJhdGlvbi5jb25uZWN0LFxyXG4gICAgICAgIGlucHV0OiAgICAgICBjb21wbGV0ZV9jb25maWd1cmF0aW9uLmlucHV0XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzbGlkZXJfY29udGFpbmVyLCB2aWV3X2NvbmZpZ3VyYXRpb24pO1xyXG4gICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKG1vZGVsX2NvbmZpZ3VyYXRpb24pO1xyXG4gICAgICB0aGlzLnByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIodGhpcy52aWV3LCB0aGlzLm1vZGVsKTtcclxuXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtTaW1wbGVSYW5nZVNsaWRlcn07XHJcblxyXG4oZnVuY3Rpb24oJDogSlF1ZXJ5U3RhdGljKSB7XHJcbiAgJC5mbi5leHRlbmQoe1xyXG4gICAgU2ltcGxlUmFuZ2VTbGlkZXI6IGZ1bmN0aW9uKHVzZXJfY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1VzZXIpIHtcclxuICAgICAgcmV0dXJuIG5ldyBTaW1wbGVSYW5nZVNsaWRlcig8SlF1ZXJ5PiB0aGlzLCA8SV9Db25maWd1cmF0aW9uX1VzZXI+IHVzZXJfY29uZmlndXJhdGlvbik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0gKGpRdWVyeSkgKTsiLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL2VudGl0aWVzL0hlbHBlcic7XHJcbmltcG9ydCB7IFRodW1ibGVyIH0gZnJvbSAnLi9lbnRpdGllcy9UaHVtYmxlcic7XHJcbmltcG9ydCB7IENvbm5lY3QgfSBmcm9tICcuL2VudGl0aWVzL0Nvbm5lY3QnO1xyXG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9lbnRpdGllcy9Ub29sdGlwJztcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuL2VudGl0aWVzL0lucHV0JztcclxuXHJcbmNsYXNzIFZpZXcgZXh0ZW5kcyBIZWxwZXIge1xyXG5cclxuICBwb3NpdGlvbjogVF9Qb3NpdGlvbiA9IFswXTtcclxuXHJcbiAgdmFsdWVfcmFuZ2U6IFRfUmFuZ2UgPSBbMCwgMF07XHJcbiAgdmFsdWVfc3RhcnQ6IFRfVmFsdWUgPSBbMF07XHJcblxyXG4gIG9yaWVudGF0aW9uOiBUX09yaWVudGF0aW9uO1xyXG5cclxuICBpc190b29sdGlwOiBib29sZWFuO1xyXG4gIGlzX2Nvbm5lY3Q6IGJvb2xlYW47XHJcblxyXG4gIHNsaWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGh1bWJsZXI6IFRodW1ibGVyW10gPSBbXTtcclxuICBjb25uZWN0OiBDb25uZWN0W10gPSBbXTtcclxuICB0b29sdGlwOiBUb29sdGlwW10gPSBbXTtcclxuXHJcbiAgaW5wdXRfdmFsdWU6IElucHV0W10gPSBbXTtcclxuICBpbnB1dF90b29sdGlwPzogSW5wdXQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHByaXZhdGUgY29uZmlndXJhdGlvbjogSV9Db25maWd1cmF0aW9uX1ZpZXcgKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuaXNfdG9vbHRpcCA9IHRoaXMuY29uZmlndXJhdGlvbi5pc190b29sdGlwO1xyXG4gICAgdGhpcy5pc19jb25uZWN0ID0gdGhpcy5jb25maWd1cmF0aW9uLmlzX2Nvbm5lY3Q7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5jb25maWd1cmF0aW9uLm9yaWVudGF0aW9uO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygnc2xpZGVyJywgdGhpcy5vcmllbnRhdGlvbik7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBvbl9jaGFuZ2VfdmlldyhjYWxsYmFjazogSV9UaHVtYmxlcl9TdGF0ZSkge1xyXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICB0aGlzLnRodW1ibGVyW2ldLm9uX21vdXNlX2Rvd25fYW5kX21vdmUodGhpcy5jb250YWluZXIsIGNhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIGlmKCB0aGlzLmlucHV0X3ZhbHVlWzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmlucHV0X3ZhbHVlLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRfdmFsdWVbaV0ub25fa2V5ZG93bl9vcl9tb3VzZW91dChjYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKCB0aGlzLmlucHV0X3Rvb2x0aXAgJiYgdGhpcy5pc190b29sdGlwKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRfdG9vbHRpcC5vbl9zd2l0Y2hfY2hlY2sodGhpcy50b29sdGlwKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgdXBkYXRlKG1vZGVsX3N0YXRlOiBUX01vZGVsX0RhdGEpIHtcclxuICAgIGxldCBpOiBudW1iZXIgPSBtb2RlbF9zdGF0ZS5pbmRleDtcclxuICAgIGxldCBwb3NpdGlvbjogVF9Qb3NpdGlvbiA9IG1vZGVsX3N0YXRlLnBvc2l0aW9uO1xyXG4gICAgbGV0IHZhbHVlOiBUX1ZhbHVlID0gbW9kZWxfc3RhdGUudmFsdWU7XHJcblxyXG4gICAgdGhpcy5zZXRfYWN0aXZlX3RodW1ibGVyKHBvc2l0aW9uLCBpKTtcclxuXHJcbiAgICB0aGlzLnRodW1ibGVyW2ldLnNldF9uZXdfcG9zaXRpb24ocG9zaXRpb25baV0pO1xyXG5cclxuICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICB0aGlzLnRvb2x0aXBbaV0uc2V0X2lubmVyX3RleHQodmFsdWVbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMuaW5wdXRfdmFsdWVbMF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmlucHV0X3ZhbHVlW2ldLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodmFsdWVbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMuaXNfY29ubmVjdCkge1xyXG4gICAgICBpZih0aGlzLnBvc2l0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdF9wb3NpdGlvbigwLCBwb3NpdGlvblswXSk7XHJcbiAgICAgIH0gZWxzZSBpZihwb3NpdGlvblsxXSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFswXS5zZXRfY29ubmVjdF9wb3NpdGlvbihwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRfYWN0aXZlX3RodW1ibGVyKHBvc2l0aW9uOiBUX1Bvc2l0aW9uLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZihwb3NpdGlvbi5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICBpZihpbmRleCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMudGh1bWJsZXJbMF0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMudGh1bWJsZXJbMV0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTUlNfX3RodW1ibGVyX2FjdGl2ZScpO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfdG9vbHRpcCkge1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzBdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgICAgdGhpcy50b29sdGlwWzFdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190b29sdGlwX2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnRodW1ibGVyWzFdLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLnRodW1ibGVyWzBdLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU1JTX190aHVtYmxlcl9hY3RpdmUnKTtcclxuICAgICAgICBpZih0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgICAgIHRoaXMudG9vbHRpcFsxXS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICAgIHRoaXMudG9vbHRpcFswXS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NSU19fdG9vbHRpcF9hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgaW5pdCgpIHtcclxuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICBpZih0aGlzLnZhbHVlX3JhbmdlW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnZhbHVlX3JhbmdlLnB1c2godGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnZhbHVlX3JhbmdlW2ldID0gdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3JhbmdlW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWVfc3RhcnQubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgaWYodGhpcy52YWx1ZV9zdGFydFtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZV9zdGFydC5wdXNoKHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZV9zdGFydFtpXSA9IHRoaXMuY29uZmlndXJhdGlvbi52YWx1ZV9zdGFydFtpXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYodGhpcy5wb3NpdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKCB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMudmFsdWVfcmFuZ2UpICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbltpXSA9ICB0aGlzLmdldF9wb3NpdGlvbl9mcm9tX3ZhbHVlKHRoaXMudmFsdWVfc3RhcnRbaV0sIHRoaXMudmFsdWVfcmFuZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvbi5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgdGhpcy50aHVtYmxlci5wdXNoKG5ldyBUaHVtYmxlcih0aGlzLnBvc2l0aW9uW2ldLCB0aGlzLm9yaWVudGF0aW9uLCBpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5pc19jb25uZWN0KSB7XHJcbiAgICAgIGlmKHRoaXMucG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0LnB1c2goIG5ldyBDb25uZWN0KDAsIHRoaXMucG9zaXRpb25bMF0sIHRoaXMub3JpZW50YXRpb24pICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0LnB1c2goIG5ldyBDb25uZWN0KHRoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0sIHRoaXMub3JpZW50YXRpb24pICk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKHRoaXMuY29ubmVjdFswXS5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0aGlzLmlzX3Rvb2x0aXApIHtcclxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRodW1ibGVyLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRoaXMudG9vbHRpcC5wdXNoKCBuZXcgVG9vbHRpcCggdGhpcy52YWx1ZV9zdGFydFtpXSwgdGhpcy5vcmllbnRhdGlvbiApICk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy50aHVtYmxlcltpXS5lbGVtZW50LmFwcGVuZCh0aGlzLnRvb2x0aXBbaV0uZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRoaXMudGh1bWJsZXIubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZCh0aGlzLnRodW1ibGVyW2ldLmVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLnNsaWRlcik7XHJcbiAgICBcclxuICAgIGlmKHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnZhbHVlLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRfdmFsdWUucHVzaChuZXcgSW5wdXQoXHJcbiAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnZhbHVlW2ldLFxyXG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlX3N0YXJ0W2ldLFxyXG4gICAgICAgICAgaVxyXG4gICAgICAgICkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5jb25maWd1cmF0aW9uLmlucHV0ICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnB1dC50b29sdGlwKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRfdG9vbHRpcCA9IG5ldyBJbnB1dChcclxuICAgICAgICAndG9vbHRpcCcsXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmlucHV0LnRvb2x0aXBbMF1cclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtWaWV3fTsiLCJpbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuL0hlbHBlcic7XHJcblxyXG5jbGFzcyBDb25uZWN0IGV4dGVuZHMgSGVscGVyIHtcclxuICAgIFxyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25uZWN0X3Bvc2l0aW9uOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9zaXRpb25fc3RhcnQ6IG51bWJlciwgcHJpdmF0ZSBwb3NpdGlvbl9lbmQ6IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbikge1xyXG4gICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygnY29ubmVjdCcsIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgICB0aGlzLnNldF9jb25uZWN0X3Bvc2l0aW9uKHRoaXMucG9zaXRpb25fc3RhcnQsIHRoaXMucG9zaXRpb25fZW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfY29ubmVjdF9wb3NpdGlvbihwb3NpdGlvbl9zdGFydDogbnVtYmVyLCBwb3NpdGlvbl9lbmQ6IG51bWJlcikge1xyXG5cclxuICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgPSBNYXRoLnJvdW5kKHBvc2l0aW9uX3N0YXJ0ICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XHJcbiAgICAgIGxldCBlbmQ6IG51bWJlciA9IE1hdGgucm91bmQocG9zaXRpb25fZW5kICogdGhpcy5UT19DT05ORUNUX1VQREFURSk7XHJcblxyXG4gICAgICB0aGlzLmNvbm5lY3RfcG9zaXRpb24gPSBbc3RhcnQsIGVuZF07XHJcbiAgICAgIGxldCBzdHlsZTogc3RyaW5nID0gc3RhcnQgPT09IDBcclxuICAgICAgICA/IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgICAgPyBgd2lkdGg6ICR7ZW5kfSU7YFxyXG4gICAgICAgICAgOiBgaGVpZ2h0OiAke2VuZH0lO2BcclxuICAgICAgICA6IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xyXG4gICAgICAgICAgPyBgbGVmdDogJHtzdGFydH0lOyB3aWR0aDogJHsoZW5kIC0gc3RhcnQpfSU7YFxyXG4gICAgICAgICAgOiBgdG9wOiAke3N0YXJ0fSU7IGhlaWdodDogJHsoZW5kIC0gc3RhcnQpfSU7YDtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7Q29ubmVjdH07IiwiY2xhc3MgSGVscGVyIHtcclxuXHJcbiAgICByZWFkb25seSBUT19USFVNQkxFUl9QT1NJVElPTjogbnVtYmVyID0gMWU0O1xyXG4gICAgcmVhZG9ubHkgVE9fQ09OTkVDVF9VUERBVEU6IG51bWJlciA9IDFlMjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3Bvc2l0aW9uX2Zyb21fdmFsdWUodmFsdWU6IG51bWJlciwgcmFuZ2U6IFRfUmFuZ2UpOiBudW1iZXIge1xyXG5cclxuICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gICggKCB2YWx1ZSAtIHJhbmdlWzBdICkgLyAoIHJhbmdlWzFdIC0gcmFuZ2VbMF0gKSApO1xyXG4gICAgICByZXN1bHQgPSBNYXRoLnJvdW5kKHJlc3VsdCAqIHRoaXMuVE9fVEhVTUJMRVJfUE9TSVRJT04pIC8gdGhpcy5UT19USFVNQkxFUl9QT1NJVElPTjtcclxuXHJcbiAgICAgIGlmKCByZXN1bHQgPCAwICkge1xyXG4gICAgICAgIHJlc3VsdCA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgaWYoIHJlc3VsdCA+IDEgKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9kaXZfZWxlbWVudF93aXRoX2NsYXNzKCBjc3NfY2xhc3M6IFRfQ1NTX0NsYXNzZXMsIG9yaWVudGF0aW9uOiBUX09yaWVudGF0aW9uICk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgbGV0IHN0cl9jbGFzczogc3RyaW5nID0gJ1NSU19fJyArIGNzc19jbGFzcztcclxuICAgICAgbGV0IGNzc19jbGFzc193aXRob3V0X29yaWVudGF0aW9uOiBzdHJpbmcgPSBzdHJfY2xhc3MgKyAnICcgKyBzdHJfY2xhc3MgKyAnXyc7XHJcblxyXG4gICAgICBsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGNzc19jbGFzc193aXRob3V0X29yaWVudGF0aW9uICsgb3JpZW50YXRpb24pICk7XHJcblxyXG4gICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IHtIZWxwZXJ9OyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gXCIuL0hlbHBlclwiO1xyXG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSBcIi4vVG9vbHRpcFwiO1xyXG5cclxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBIZWxwZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogVF9JbnB1dF9UeXBlLCBwdWJsaWMgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgcHVibGljIHZhbHVlPzogbnVtYmVyLCBwdWJsaWMgaW5kZXg/OiBudW1iZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZih0eXBlID09PSAndmFsdWUnKSB7XHJcbiAgICAgIGlmKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IFN0cmluZyh0aGlzLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBvbl9rZXlkb3duX29yX21vdXNlb3V0KHRoaXM6IElucHV0LCBjYWxsYmFjazogSV9UaHVtYmxlcl9TdGF0ZSkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIGlmKHRoYXQudHlwZSAhPT0gJ3ZhbHVlJykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbl9rZXlkb3duKTtcclxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIG9uX21vdXNlb3V0KTtcclxuXHJcbiAgICBmdW5jdGlvbiBvbl9rZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgIGlmKGV2ZW50LmtleSA9PT0gXCJUYWJcIiB8fCBldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICAgIGJ1YmJsaW5nKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uX21vdXNlb3V0KCkgeyAgICAgIFxyXG4gICAgICBidWJibGluZygpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYnViYmxpbmcoKSB7XHJcbiAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gTnVtYmVyKHRoYXQuZWxlbWVudC52YWx1ZSk7XHJcbiAgICAgIGlmKHRoYXQuaW5kZXgpIHtcclxuICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICBpbmRleDogdGhhdC5pbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBvbl9zd2l0Y2hfY2hlY2sodGhpczogSW5wdXQsIHRvb2x0aXA6IFRvb2x0aXBbXSkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIGlmKHRoYXQudHlwZSAhPT0gJ3Rvb2x0aXAnKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoYXQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB0b29sdGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYodGhhdC5lbGVtZW50LmNoZWNrZWQpIHtcclxuICAgICAgICAgIHRvb2x0aXBbaV0uc3dpdGNoX2hpZGRlbih0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9vbHRpcFtpXS5zd2l0Y2hfaGlkZGVuKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbmV4cG9ydCB7IElucHV0IH07IiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9IZWxwZXInO1xyXG5cclxuY2xhc3MgVGh1bWJsZXIgZXh0ZW5kcyBIZWxwZXIge1xyXG5cclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIHRodW1ibGVyX3Bvc2l0aW9uOiBudW1iZXIgPSAwO1xyXG4gICAgbGlzdGVuaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgcG9zaXRpb246IG51bWJlciwgcHJpdmF0ZSBvcmllbnRhdGlvbjogVF9PcmllbnRhdGlvbiwgcHJpdmF0ZSBpbmRleDogbnVtYmVyICkge1xyXG4gICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRfZGl2X2VsZW1lbnRfd2l0aF9jbGFzcygndGh1bWJsZXInLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgdGhpcy5zZXRfbmV3X3Bvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRfbmV3X3Bvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgdGhpcy50aHVtYmxlcl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgICAgbGV0IGxpdGVyOiBzdHJpbmcgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnWCcgOiAnWSc7XHJcblxyXG4gICAgICBsZXQgc3R5bGU6IHN0cmluZyA9IGB0cmFuc2Zvcm06IHRyYW5zbGF0ZSR7bGl0ZXJ9KCR7IE1hdGgucm91bmQocG9zaXRpb24gKiB0aGlzLlRPX1RIVU1CTEVSX1BPU0lUSU9OKSB9JSk7YDtcclxuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3NoaWZ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XHJcblxyXG4gICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICA/IGV2ZW50LmNsaWVudFggLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcclxuICAgICAgICA6IGV2ZW50LmNsaWVudFkgLSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uX21vdXNlX2Rvd25fYW5kX21vdmUodGhpczogVGh1bWJsZXIsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiBJX1RodW1ibGVyX1N0YXRlKSB7XHJcblxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoYXQubGlzdGVuaW5nID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgdGhhdC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBsZXQgc2hpZnQ6IG51bWJlciA9IHRoaXMuZ2V0X3NoaWZ0KHRoYXQuZWxlbWVudCwgZXZlbnQpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbl9tb3VzZV9tb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25fbW91c2VfdXApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbl9tb3VzZV9tb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgbGV0IG5ld19wb3NpdGlvbjogbnVtYmVyLFxyXG4gICAgICAgICAgICBuZXdfcG9zaXRpb25faW5fcGVyY2VudDogbnVtYmVyLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICBpZih0aGF0Lm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WCAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgIG5ld19wb3NpdGlvbl9pbl9wZXJjZW50ID0gbmV3X3Bvc2l0aW9uIC8gY29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uID0gZXZlbnQuY2xpZW50WSAtIHNoaWZ0IC0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgICAgICAgICAgbmV3X3Bvc2l0aW9uX2luX3BlcmNlbnQgPSBuZXdfcG9zaXRpb24gLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgcG9zaXRpb24gPSBuZXdfcG9zaXRpb25faW5fcGVyY2VudDtcclxuXHJcbiAgICAgICAgICBpZihwb3NpdGlvbiA+IDEpIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYocG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjYWxsYmFjayh7IHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgaW5kZXg6IHRoYXQuaW5kZXggfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbl9tb3VzZV91cCgpIHtcclxuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uX21vdXNlX21vdmUpO1xyXG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uX21vdXNlX3VwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7VGh1bWJsZXJ9OyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vSGVscGVyJztcclxuXHJcbmNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBIZWxwZXIge1xyXG5cclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgdG9vbHRpcF92YWx1ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbHVlOiBudW1iZXIsIHByaXZhdGUgb3JpZW50YXRpb246IFRfT3JpZW50YXRpb24pIHtcclxuICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0X2Rpdl9lbGVtZW50X3dpdGhfY2xhc3MoJ3Rvb2x0aXAnLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgICAgdGhpcy5zZXRfaW5uZXJfdGV4dCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfaW5uZXJfdGV4dCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgIGxldCB2YWw6IG51bWJlciA9IHZhbHVlID4gMFxyXG4gICAgICAgID8gTWF0aC5mbG9vcih2YWx1ZSlcclxuICAgICAgICA6IE1hdGguY2VpbCh2YWx1ZSk7XHJcblxyXG4gICAgICB0aGlzLnRvb2x0aXBfdmFsdWUgPSB2YWw7ICAgICAgICAgICAgXHJcbiAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSBTdHJpbmcoIHZhbCApO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoX2hpZGRlbih0aGlzOiBUb29sdGlwLCBpc192aXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgIGxldCB0aGF0OiBUb29sdGlwID0gdGhpcztcclxuICAgICAgaWYoaXNfdmlzaWJsZSkge1xyXG4gICAgICAgIHRoYXQuZWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGF0LmVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7VG9vbHRpcH07Il0sInNvdXJjZVJvb3QiOiIifQ==