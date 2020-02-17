import { SimpleRangeSlider } from '../Plugin/Plugin';
import { Template } from './template';

class Demo_Panel {

  template: Template;

  constructor(private demo_panel: JQuery, private slider: JQuery, private inputs: I_DEMO_Input) {
    this.template = new Template();
    this.demo_panel.append(this.template.demo_panel);

    let range_slider:  SimpleRangeSlider;
    range_slider = new SimpleRangeSlider(slider, {
      range: [-100, 100],
      start: [-50, 50],
      step: 10,
      orientation: "horizontal",
      connect: true,
      tooltip: true,
      input: inputs
    })
  }
}

export {Demo_Panel};

(function($: JQueryStatic) {
  $.fn.extend({
    Demo_Panel: function(slider: JQuery, inputs: I_DEMO_Input) {
      return new Demo_Panel(<JQuery> this, <JQuery> slider, <I_DEMO_Input> inputs);
    }
  });
} (jQuery) );