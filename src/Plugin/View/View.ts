import { Helper } from './entities/Helper';
import { Thumbler } from './entities/Thumbler';
import { Connect } from './entities/Connect';
import { Tooltip } from './entities/Tooltip';

export class View extends Helper {

    position_safe_int: T_Position = [0];

    value_range_safe_int: T_Range = [0, 0];
    value_start_safe_int: T_Value = [0];

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

        for( let i= 0; i < this.configuration.value_range.length; i++ ) {
            if(this.value_range_safe_int[i] === undefined) {
                this.value_range_safe_int.push(this.configuration.value_range[i] * this.TO_SAVE_INTEGER);
            } else {
                this.value_range_safe_int[i] = this.configuration.value_range[i] * this.TO_SAVE_INTEGER;
            }
        };

        for( let i= 0; i < this.configuration.value_start.length; i++ ) {
            
            if(this.value_start_safe_int[i] === undefined) {
                this.value_start_safe_int.push(this.configuration.value_start[i] * this.TO_SAVE_INTEGER);
            } else {
                this.value_start_safe_int[i] = this.configuration.value_start[i] * this.TO_SAVE_INTEGER;
            }

            if(this.position_safe_int[i] === undefined) {
                this.position_safe_int.push( this.get_position_from_value(this.value_start_safe_int[i], this.value_range_safe_int) );
            } else {
                this.position_safe_int[i] =  this.get_position_from_value(this.value_start_safe_int[i], this.value_range_safe_int);
            }
        }; 

        this.slider = this.get_div_element_with_class('slider', this.orientation);

        for( let i = 0; i < this.position_safe_int.length; i++ ) {
            this.thumbler.push(new Thumbler(this.position_safe_int[i], this.orientation, i))
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
                this.tooltip.push( new Tooltip( this.value_start_safe_int[i], this.orientation ) );
                
                this.thumbler[i].element.append(this.tooltip[i].element);
            }
        }

        for( let i = 0; i < this.thumbler.length; i++ ) {
            this.slider.append(this.thumbler[i].element);
        }

        this.container.append(this.slider);
    }

    on_thumbler_move(callback: I_Thumbler_State) {
        for( let i= 0; i < this.thumbler.length; i++ ) {
            this.thumbler[i].on_mouse_down_and_move(this.container, callback);
        }
    }
}