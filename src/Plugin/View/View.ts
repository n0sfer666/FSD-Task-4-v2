import { Helper } from './entities/Helper';
import { Thumbler } from './entities/Thumbler';
import { Connect } from './entities/Connect';
import { Tooltip } from './entities/Tooltip';

export class View extends Helper {

    position_safe_int: number[];
    step_safe_int: number[];

    value_range: T_Range;
    value_start: T_Value;

    orientation: T_Orientation;

    is_tooltip: boolean;
    is_connect: boolean;

    slider: HTMLElement;
    thumbler: Thumbler[] = [];
    connect: Connect[] = [];
    tooltip: Tooltip[] = [];

    constructor( private container: HTMLElement, private configuration: I_Configuration_View ) {
        super();

        this.is_tooltip = this.configuration.is_tooltip;
        this.is_connect = this.configuration.is_connect;

        this.orientation = this.configuration.orientation;

        this.value_range = this.configuration.value_range;
        this.value_start = this.configuration.value_start;

        this.position_safe_int = this.get_position_from_value( this.value_start, this.value_range );
        this.step_safe_int = this.get_position_from_value([this.configuration.value_step], this.value_range);

        this.slider = this.get_div_element_with_class('slider', this.orientation);

        for( let i = 0; i < this.position_safe_int.length; i++ ) {
            this.thumbler.push(new Thumbler(this.position_safe_int[i], this.step_safe_int[0], this.orientation, i))
        }

        if(this.is_connect) {
            if(this.position_safe_int.length === 1) {
                this.connect.push( new Connect(0, this.position_safe_int[0], this.orientation) );
            } else {
                this.connect.push( new Connect(this.position_safe_int[0], this.position_safe_int[1], this.orientation) );
            }
            this.slider.append(this.connect[0].element);
        }

        if(this.is_tooltip) {
            for( let i = 0; i < this.thumbler.length; i++ ) {
                this.tooltip.push( new Tooltip( this.value_start[i], this.orientation ) );
                
                this.thumbler[i].element.append(this.tooltip[i].element);
            }
        }

        for( let i = 0; i < this.thumbler.length; i++ ) {
            this.slider.append(this.thumbler[i].element);
        }

        this.container.append(this.slider);
    }
}