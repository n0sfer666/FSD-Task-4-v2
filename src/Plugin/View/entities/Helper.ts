export class Helper {

    readonly TO_SAVE_INTEGER: number = 1e9;
    readonly TO_THUMBLER_POSITION: number;
    readonly TO_CONNECT_UPDATE: number;

    constructor() {

        this.TO_THUMBLER_POSITION = this.TO_SAVE_INTEGER - (this.TO_SAVE_INTEGER / 1e3);
        this.TO_CONNECT_UPDATE = this.TO_SAVE_INTEGER - (this.TO_SAVE_INTEGER / 1e2);
    }

    get_position_from_value(value: number[], range: T_Range): number[] {
        let result: number[] = value;

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