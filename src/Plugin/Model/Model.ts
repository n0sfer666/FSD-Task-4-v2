export class Model {


    value: T_Value = [0];
    range: T_Range = [0, 0];
    step: number = 0;
    position: T_Position = [0];

    index_of_active_thumbler: number = 0;

    callback_list: I_Model_State[];

    constructor(private configuration: I_Configuration_Model) {

        this.callback_list = [];

        this.step = this.configuration.value_step;

        for( let i= 0; i < this.configuration.value_range.length; i++ ) {

            if(this.range[i] === undefined) {
                this.range.push(this.configuration.value_range[i]);
            } else {
                this.range[i] = this.configuration.value_range[i];
            }

        };

        for( let i= 0; i < this.configuration.value_start.length; i++ ) {

            if(this.value[i] === undefined) {
                this.value.push(this.configuration.value_start[i]);
            } else {
                this.value[i] = this.configuration.value_start[i];
            }

            if(this.position[i] === undefined) {
                this.position.push( this.get_position_from_value(this.value[i], this.range) );
            } else {
                this.position[i] =  this.get_position_from_value(this.value[i], this.range);
            }
        }

    }

    set_new_position(thumbler_state: T_Thumbler_Data) {

        let position: number = thumbler_state.position;
        this.index_of_active_thumbler = thumbler_state.index;
        let i: number = this.index_of_active_thumbler;

        let new_value: number = this.get_value_from_position(position, this.range);
        let condition: [number, number] = [this.value[i] - this.step, this.value[i] + this.step];

        if(new_value >= condition[1] || new_value <= condition[0]) {
           this.set_value_and_position(new_value, i);
        }
        if(new_value <= this.range[0]) {
            this.set_value_and_position(this.range[0], i);
        }
        if(new_value >= this.range[1]) {
            this.set_value_and_position(this.range[1], i);
        }

        if(this.position.length > 1 && this.position[1]) {
            if(this.position[0] < this.position [1] ) {
                this.update();
            } else {
                return false;
            }
        } else {
            this.update();
        }
    }

    update() {
        this.callback_list.forEach((callback: I_Model_State) => {
            callback({
                position: this.position,
                value: this.value,
                index: this.index_of_active_thumbler
            });
        })
    }

    on_change_model(callback: I_Model_State) {
        this.callback_list.push(callback);
    }

    get_position_from_value(value: number, range: T_Range): number {

        let result: number = ( value - range[0] ) / ( range[1] - range[0] );

        return (Math.round(result * 1e4) / 1e4);
    }

    get_value_from_position(position: number, range: T_Range): number {

        let result: number  = (position * (range[1] - range[0])) + range[0];

        return (Math.round(result));
    }

    set_value_and_position(new_value: number, i: number) {
        this.value[i] = (Math.round(new_value / this.step * 1e3) * this.step / 1e3);
        this.position[i] = this.get_position_from_value(this.value[i], this.range);
    }
}