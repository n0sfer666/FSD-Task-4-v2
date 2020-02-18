import { View } from './View/View';
import { Model } from './Model/Model';
import { Presenter } from './Controller/Presenter';

class SimpleRangeSlider {
    view: View;

    model: Model;

    presenter: Presenter;

    constructor(private container: JQuery, private user_configuration: iConfigUser) {
      const slider_container: HTMLElement = this.container.get(0);

      const default_Configuration: iConfigUser = {
        orientation: 'horizontal',
        start: [10],
        range: [0, 100],
        step: 1,
        connect: true,
        tooltip: true,
      };

      const complete_configuration: iConfigUser = {
        orientation: this.user_configuration.orientation === undefined ? default_Configuration.orientation : this.user_configuration.orientation,
        start: this.user_configuration.start === undefined ? default_Configuration.start : this.user_configuration.start,
        range: this.user_configuration.range === undefined ? default_Configuration.range : this.user_configuration.range,
        step: this.user_configuration.step === undefined ? default_Configuration.step : this.user_configuration.step,
        connect: this.user_configuration.connect === undefined ? default_Configuration.connect : this.user_configuration.connect,
        tooltip: this.user_configuration.tooltip === undefined ? default_Configuration.tooltip : this.user_configuration.tooltip,
        input: this.user_configuration.input,
      };

      const model_configuration: iConfigModel = {
        value_start: complete_configuration.start,
        value_range: complete_configuration.range,
        value_step: complete_configuration.step,
      };

      const view_configuration: iConfigView = {
        orientation: complete_configuration.orientation,
        value_start: complete_configuration.start,
        value_range: complete_configuration.range,
        is_tooltip: complete_configuration.tooltip,
        is_connect: complete_configuration.connect,
        input: complete_configuration.input,
      };

      this.view = new View(slider_container, view_configuration);
      this.model = new Model(model_configuration);
      this.presenter = new Presenter(this.view, this.model);
    }
}
export { SimpleRangeSlider };

(function ($: JQueryStatic) {
  $.fn.extend({
    SimpleRangeSlider(user_configuration: iConfigUser) {
      return new SimpleRangeSlider(<JQuery> this, <iConfigUser> user_configuration);
    },
  });
}(jQuery));
