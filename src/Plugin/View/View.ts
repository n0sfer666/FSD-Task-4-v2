import { Helper } from './entities/Helper';

export class View extends Helper {

    position_current: T_Position;
    position_step: number;
    position_scale: number[] = [0];

    value_range: T_Range;

    orientation: T_Orientation;

    is_tooltip: boolean;
    is_connect: boolean;

    constructor( private container: HTMLElement, private configuration: I_Configuration_View ) {
        super();

        this.is_tooltip = this.configuration.is_tooltip;
        this.is_connect = this.configuration.is_connect;

        this.orientation = this.configuration.orientation;

        this.value_range = this.configuration.value_range;

        this.position_current = this.get_position_from_value( this.configuration.value_start, this.value_range );
        this.position_step = ( this.configuration.value_step - this.value_range[0] ) / ( this.value_range[1] - this.value_range[0] );
// console.log(this.position_scale[ this.position_scale.length - 1 ] <= 1)
        while( this.position_scale[ this.position_scale.length - 1 ] <= 1000 ) {
            this.position_scale.push( Math.floor(this.position_scale[ this.position_scale.length - 1 ] + this.position_step) );
        }
        // do {
        //     let i: number = 0;
        //     let next: number = this.position_scale[i] + this.position_step;

        //     this.position_scale.push( next )

        //     i++;

        // } while( this.position_scale[ this.position_scale.length - 1 ] <= 1 );
    }
}