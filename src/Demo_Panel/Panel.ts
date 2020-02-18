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
      this.template.startConfigInput_min,
      this.template.startConfigInput_max,
      this.template.step_input,
      this.template.orientation_input,
      this.template.connectConfigInput
    ]
    for( let i = 0; i < template_inputs.length; i++ ) {
      this.on_change_input(template_inputs[i]);
    }
  }

  on_change_input(this: Demo_Panel, input: HTMLInputElement) {
    let that = this;

    input.addEventListener('keydown', onKeydown);
    input.addEventListener('mouseout', onMouseout);
    input.addEventListener('change', on_change);

    function onKeydown(event: KeyboardEvent) {
      if(event.key === "Tab" || event.key === "Enter") {
        action();
      }
    }

    function onMouseout() {
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
      let start: T_DEMO_Start = that.template.startConfigInput_max.value !== ''
        ? [
          that.template.startConfigInput_min.value !== ''
            ? Number(that.template.startConfigInput_min.value)
            : that.defaultConfig.start[0],
          Number(that.template.startConfigInput_max.value)
        ]
        : [
          that.template.startConfigInput_min.value !== ''
            ? Number(that.template.startConfigInput_min.value)
            : that.defaultConfig.start[0]
        ]
      let step: number = that.template.step_input.value !== ''
        ? Number(that.template.step_input.value)
        : that.defaultConfig.step;
      let orientation: tOrientation = that.template.orientation_input.checked
        ? 'horizontal'
        : 'vertical';
      let connect: boolean = that.template.connectConfigInput.checked
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