import { View } from './View/View';
import { Model } from './Model/Model';
import { Presenter } from './Controller/Presenter';

class SimpleRangeSlider {
    view: View;

    model: Model;

    presenter: Presenter;

    constructor(private container: JQuery, private user_config: iConfigUser) {
      const slider_container: HTMLElement = this.container.get(0);

      const default_config: iConfigUser = {
        orientation: 'horizontal',
        start: [10],
        range: [0, 100],
        step: 1,
        connect: true,
        tooltip: true,
      };

      const completeConfig: iConfigUser = {
        orientation: this.user_config.orientation === undefined ? default_config.orientation : this.user_config.orientation,
        start: this.user_config.start === undefined ? default_config.start : this.user_config.start,
        range: this.user_config.range === undefined ? default_config.range : this.user_config.range,
        step: this.user_config.step === undefined ? default_config.step : this.user_config.step,
        connect: this.user_config.connect === undefined ? default_config.connect : this.user_config.connect,
        tooltip: this.user_config.tooltip === undefined ? default_config.tooltip : this.user_config.tooltip,
        input: this.user_config.input,
      };

      const model_config: iConfigModel = {
        start: completeConfig.start,
        range: completeConfig.range,
        step: completeConfig.step,
      };

      const view_config: iConfigView = {
        orientation: completeConfig.orientation,
        start: completeConfig.start,
        range: completeConfig.range,
        isTooltip: completeConfig.tooltip,
        isConnect: completeConfig.connect,
        input: completeConfig.input,
      };

      this.view = new View(slider_container, view_config);
      this.model = new Model(model_config);
      this.presenter = new Presenter(this.view, this.model);
    }
}
export { SimpleRangeSlider };

(function ($: JQueryStatic) {
  $.fn.extend({
    SimpleRangeSlider(user_config: iConfigUser) {
      return new SimpleRangeSlider(<JQuery> this, <iConfigUser> user_config);
    },
  });
}(jQuery));
