import { View } from './View/View';
import { Model } from './Model/Model';
import { Presenter } from './Controller/Presenter';

class SimpleRangeSlider {

    view: View;
    model: Model;
    presenter: Presenter;

    constructor(private container: JQuery, private user_configuration: I_Configuration_User) {

      let slider_container: HTMLElement = this.container.get(0);
        
      let default_Configuration: I_Configuration_User = {
        orientation: 'horizontal',
        start:       [10],
        range:       [0, 100],
        step:        1,
        connect:     true,
        tooltip:     false
      };

      let complete_configuration: I_Configuration_User = {
        orientation: this.user_configuration.orientation === undefined ? default_Configuration.orientation : this.user_configuration.orientation,
        start:       this.user_configuration.start === undefined ? default_Configuration.start : this.user_configuration.start,
        range:       this.user_configuration.range === undefined ? default_Configuration.range : this.user_configuration.range,
        step:        this.user_configuration.step === undefined ? default_Configuration.step : this.user_configuration.step,
        connect:     this.user_configuration.connect === undefined ? default_Configuration.connect : this.user_configuration.connect,
        tooltip:     this.user_configuration.tooltip === undefined ? default_Configuration.tooltip : this.user_configuration.tooltip,
        input:       this.user_configuration.input
      };

      let model_configuration: I_Configuration_Model = {
        value_start: complete_configuration.start,
        value_range: complete_configuration.range,
        value_step:  complete_configuration.step,
      };

      let view_configuration: I_Configuration_View = {
        orientation: complete_configuration.orientation,
        value_start: complete_configuration.start,
        value_range: complete_configuration.range,
        is_tooltip:  complete_configuration.tooltip,
        is_connect:  complete_configuration.connect,
        input:       complete_configuration.input
      };

      this.view = new View(slider_container, view_configuration);
      this.model = new Model(model_configuration);
      this.presenter = new Presenter(this.view, this.model);

    }
}
export {SimpleRangeSlider};

(function($: JQueryStatic) {
  $.fn.extend({
    SimpleRangeSlider: function(user_configuration: I_Configuration_User) {
      return new SimpleRangeSlider(<JQuery> this, <I_Configuration_User> user_configuration);
    }
  });
} (jQuery) );