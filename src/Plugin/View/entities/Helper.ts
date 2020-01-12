export class Helper {

    get_position_from_value(value: T_Value, range: T_Range): T_Value {
        let result: T_Value = value;

        for( let i = 0; i < value.length; i++ ) {
            result[i] = ( value[i] - range[0] ) / ( range[1] - range[0] );
        }

        return result;
    }

}