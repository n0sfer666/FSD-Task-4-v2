import { View } from './View/View';
import { Model } from './Model/Model';
import { Presenter } from './Controller/Presenter';

class SimpleRangeSlider {
    view: View;

    model: Model;

    presenter: Presenter;

    constructor(private container: JQuery, private userConfig: iConfigUser) {
      const sliderContainer: HTMLElement = this.container.get(0);

      const defaultConfig: iConfigUser = this.getDefaultaConfig();

      const completeConfig: iConfigUser = this.getCompleteConfig(this.userConfig, defaultConfig);

      const modelConfig: iConfigModel = this.getModelConfig(completeConfig);

      const viewConfig: iConfigView = this.getViewConfig(completeConfig);
      
      this.view = new View(sliderContainer, viewConfig);
      this.model = new Model(modelConfig);
      this.presenter = new Presenter(this.view, this.model);
    }

    getDefaultaConfig(): iConfigUser {
      return {
        orientation: 'horizontal',
        start: [10],
        range: [0, 100],
        step: 1,
        connect: true,
        tooltip: true,
      }
    }
    getCompleteConfig(userConfig: iConfigUser, defaultConfig: iConfigUser): iConfigUser {
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
      }
    }
    getModelConfig(completeConfig: iConfigUser): iConfigModel {
      return {
        start: completeConfig.start,
        range: completeConfig.range,
        step: completeConfig.step,
      }
    }
    getViewConfig(completeConfig: iConfigUser): iConfigView {
      return {
        orientation: completeConfig.orientation,
        start: completeConfig.start,
        range: completeConfig.range,
        isTooltip: completeConfig.tooltip,
        isConnect: completeConfig.connect,
        input: completeConfig.input,
      }
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
