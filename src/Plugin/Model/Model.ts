export class Model {

    readonly TO_SAVE_INTEGER: number = 1e20;
    readonly TO_THUMBLER_POSITION: number;
    readonly TO_CONNECT_UPDATE: number;

    value_safe_int: T_Value;
    range_safe_int: T_Range;
    step_safe_int: number;
    position_safe_int: T_Position = [NaN];

    constructor(private configuration: I_Configuration_Model) {

        this.value_safe_int = this.configuration.value_start;
        this.range_safe_int = this.configuration.value_range;
        this.step_safe_int = this.configuration.value_step;

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

}