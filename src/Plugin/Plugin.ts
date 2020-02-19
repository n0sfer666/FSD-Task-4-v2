import { View } from './View/View';
import { Model } from './Model/Model';
import { Presenter } from './Controller/Presenter';

class SimpleRangeSlider {
    view: View;

    model: Model;

    presenter: Presenter;

    constructor(private container: JQuery, private userConfig: iConfigUser) {
      const sliderContainer: HTMLElement = this.container.get(0);

      const defaultConfig: iConfigUser = {
        orientation: 'horizontal',
        start: [10],
        range: [0, 100],
        step: 1,
        connect: true,
        tooltip: true,
      };

      const completeConfig: iConfigUser = {
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

      const modelConfig: iConfigModel = {
        start: completeConfig.start,
        range: completeConfig.range,
        step: completeConfig.step,
      };

      const viewConfig: iConfigView = {
        orientation: completeConfig.orientation,
        start: completeConfig.start,
        range: completeConfig.range,
        isTooltip: completeConfig.tooltip,
        isConnect: completeConfig.connect,
        input: completeConfig.input,
      };

      this.view = new View(sliderContainer, viewConfig);
      this.model = new Model(modelConfig);
      this.presenter = new Presenter(this.view, this.model);
    }
}
export { SimpleRangeSlider };

(function ($: JQueryStatic) {
  $.fn.extend({
    SimpleRangeSlider(userConfig: iConfigUser) {
      return new SimpleRangeSlider(<JQuery> this, <iConfigUser> userConfig);
    },
  });
}(jQuery));
