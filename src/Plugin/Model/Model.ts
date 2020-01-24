export class Model {

    readonly TO_SAVE_INTEGER: number = 1e20;
    readonly TO_THUMBLER_POSITION: number;
    readonly TO_CONNECT_UPDATE: number;

    value_safe_int: T_Value = [0];
    range_safe_int: T_Range = [0, 0];
    step_safe_int: number = 0;
    position_safe_int: T_Position = [0];

    constructor(private configuration: I_Configuration_Model) {

        this.step_safe_int = this.configuration.value_step * this.TO_SAVE_INTEGER;

        for( let i= 0; i < this.range_safe_int.length; i++ ) {

            if(this.range_safe_int[i] === undefined) {
                this.range_safe_int.push(this.configuration.value_range[i] * this.TO_SAVE_INTEGER);
            } else {
                this.range_safe_int[i] = this.configuration.value_range[i] * this.TO_SAVE_INTEGER;
            }

        };

        for( let i= 0; i < this.value_safe_int.length; i++ ) {

            if(this.value_safe_int[i] === undefined) {
                this.value_safe_int.push(this.configuration.value_start[i] * this.TO_SAVE_INTEGER);
            } else {
                this.value_safe_int[i] = this.configuration.value_start[i] * this.TO_SAVE_INTEGER;
            }

            if(this.position_safe_int[i] === undefined) {
                this.position_safe_int.push( this.get_position_from_value(this.value_safe_int[i], this.range_safe_int) );
            } else {
                this.position_safe_int[i] =  this.get_position_from_value(this.value_safe_int[i], this.range_safe_int);
            }
        };

        this.TO_THUMBLER_POSITION = this.TO_SAVE_INTEGER / 1e3;
        this.TO_CONNECT_UPDATE = this.TO_SAVE_INTEGER / 1e2;
    }

    set_position(thumbler_state: T_Thumbler_Data) {
        if(this.position_safe_int[thumbler_state.index] === undefined) {
            this.position_safe_int.push(thumbler_state.position_safe_int);
        } else {
            this.position_safe_int[thumbler_state.index] = thumbler_state.position_safe_int;
        }
    }

    get_position_from_value(value: number, range: T_Range) {

        let result: number =  ( ( value - range[0] ) / ( range[1] - range[0] ) ) * this.TO_SAVE_INTEGER;

        return result;

    }
}