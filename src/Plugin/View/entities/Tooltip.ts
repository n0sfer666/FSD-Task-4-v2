import { Helper } from './Helper';

export class Tooltip extends Helper {

    element: HTMLElement;

    constructor(private value_safe_int: number, private orientation: T_Orientation) {
        super();

        this.element = this.get_div_element_with_class('tooltip', this.orientation);
        this.set_inner_text(this.value_safe_int);
    }

    set_inner_text(value_safe_int: number) {
        this.element.innerText = String( value_safe_int / this.TO_SAVE_INTEGER );
    }
}