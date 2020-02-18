import { SimpleRangeSlider } from '../Plugin/Plugin';
import { Template } from './template';

class Demo_Panel {

  template: Template;
  range_slider:  SimpleRangeSlider;
  empty_slider: string;

  defaultConfig: I_DEMO_Default_Config;

  constructor(private demo_panel: JQuery, private slider: JQuery, private inputs: I_DEMO_Input) {
    this.template = new Template();
    this.demo_panel.append(this.template.demo_panel);

    this.empty_slider = '#' + slider.get(0).id;

    this.defaultConfig = {
      range: [0, 100],
      start: [10],
      step: 1
    }

    this.range_slider = new SimpleRangeSlider(this.slider, {
      range: [-100, 100],
      start: [-50, 50],
      step: 10,
      orientation: "horizontal",
      connect: true,
      tooltip: true,
      input: this.inputs
    });

    let template_inputs: HTMLInputElement[] = [
      this.template.range_input_min,
      this.template.range_input_max,
      this.template.start_input_min,
      this.template.start_input_max,
      this.template.step_input,
      this.template.orientation_input,
      this.template.connect_input
    ]
    for( let i = 0; i < template_inputs.length; i++ ) {
      this.on_change_input(template_inputs[i]);
    }
  }

  on_change_input(this: Demo_Panel, input: HTMLInputElement) {
    let that = this;

    input.addEventListener('keydown', on_keydown);
    input.addEventListener('mouseout', on_mouseout);
    input.addEventListener('change', on_change);

    function on_keydown(event: KeyboardEvent) {
      if(event.key === "Tab" || event.key === "Enter") {
        action();
      }
    }

    function on_mouseout() {
      action();
    }

    function on_change() {
      action();
    }

    function action() {

      let range: [number, number] = [
        that.template.range_input_min.value !== ''
          ? Number(that.template.range_input_min.value)
          : that.defaultConfig.range[0],
        that.template.range_input_max.value !== ''
          ? Number(that.template.range_input_max.value)
          : that.defaultConfig.range[1],
      ]
      let start: T_DEMO_Start = that.template.start_input_max.value !== ''
        ? [
          that.template.start_input_min.value !== ''
            ? Number(that.template.start_input_min.value)
            : that.defaultConfig.start[0],
          Number(that.template.start_input_max.value)
        ]
        : [
          that.template.start_input_min.value !== ''
            ? Number(that.template.start_input_min.value)
            : that.defaultConfig.start[0]
        ]
      let step: number = that.template.step_input.value !== ''
        ? Number(that.template.step_input.value)
        : that.defaultConfig.step;
      let orientation: T_Orientation = that.template.orientation_input.checked
        ? 'horizontal'
        : 'vertical';
      let connect: boolean = that.template.connect_input.checked
        ? true
        : false;

      that.slider = $(that.empty_slider).empty();
      that.range_slider = new SimpleRangeSlider(that.slider, {
        range: range,
        start: start,
        step: step,
        orientation: orientation,
        connect: connect,
        tooltip: true,
        input: that.inputs
      })
    }
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