export class SimpleRangeSlider {

    constructor(private container: JQuery, private user_configuration: I_Configuration_User) {

        let slider_container: HTMLElement = this.container.get(0);
        
        let default_Configuration: I_Configuration_User = {
            orientation: 'horizontal',
            start:       [10],
            range:       [0, 100],
            step:        1,
            connect:     true,
            tooltip:     false
        }

        let complete_configuration: I_Configuration_User = {
            orientation: this.user_configuration.orientation === undefined ? default_Configuration.orientation : this.user_configuration.orientation,
            start:       this.user_configuration.start === undefined ? default_Configuration.start : this.user_configuration.start,
            range:       this.user_configuration.range === undefined ? default_Configuration.range : this.user_configuration.range,
            step:        this.user_configuration.step === undefined ? default_Configuration.step : this.user_configuration.step,
            connect:     this.user_configuration.connect === undefined ? default_Configuration.connect : this.user_configuration.connect,
            tooltip:     this.user_configuration.tooltip === undefined ? default_Configuration.tooltip : this.user_configuration.tooltip
        }

        let view_configuration: object = {
            orientation: complete_configuration.orientation,
            value_start: complete_configuration.start,
            value_range: complete_configuration.range,
            value_step:  complete_configuration.step,
            is_tooltip:  complete_configuration.tooltip,
            is_connect:  complete_configuration.connect
        }

        let model_configuration: object = {
            value_start: complete_configuration.start,
            value_range: complete_configuration.range,
            value_step:  complete_configuration.step,
        }



        
    }

}

;(function($: JQueryStatic) {
    $.fn.extend({
        SimpleRangeSlider: function(user_configuration: I_Configuration_User) {
            return new SimpleRangeSlider(<JQuery>this, <I_Configuration_User>user_configuration);
        }
    });
}(jQuery))