export class Helper {

    readonly TO_SAVE_INTEGER: number = 1e9;
    readonly FROM_SAVE_INTEGER_TO_THUMBLER_POSITION: number = 1e6;
    readonly FROM_SAVE_INTEGER_TO_CONNECT_UPDATE: number = 1e7;

    get_position_from_value(value: T_Value, range: T_Range): T_Position {
        let result: T_Value = value;

        for( let i = 0; i < value.length; i++ ) {
            result[i] = ( value[i] - range[0] ) / ( range[1] - range[0] ) * this.TO_SAVE_INTEGER;
            result[i] =  Math.round(result[i]);
        }

        return result;
    }

    get_div_element_with_class( css_class: T_CSS_Classes, orientation: T_Orientation ): HTMLElement {
        let str_class: string = 'SRS__' + css_class;
        let css_class_without_orientation: string = str_class + ' ' + str_class + '_';

        let element: HTMLElement = document.createElement('div');
        element.setAttribute('class', (css_class_without_orientation + orientation) );

        return element;
    }

}