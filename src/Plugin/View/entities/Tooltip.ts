import { Helper } from './Helper';

export class Tooltip extends Helper {

    value_current: number;
    element: HTMLElement;

    constructor(private value: number, private orientation: T_Orientation) {
        super();

        this.value_current = this.value;
        this.element = this.get_div_element_with_class('tooltip', this.orientation);
        this.set_inner_text(this.value_current);
    }

    set_inner_text(value: number) {
        this.element.innerText = String( value );
        if( this.value_current !== value) {
            this.value_current = value;
        }
    }
}