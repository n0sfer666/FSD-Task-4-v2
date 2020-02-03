import { Helper } from './Helper';

class Tooltip extends Helper {

    element: HTMLElement;
    tooltip_value: number = 0;

    constructor(private value: number, private orientation: T_Orientation) {
        super();

        this.element = this.get_div_element_with_class('tooltip', this.orientation);
        this.set_inner_text(this.value);
    }

    set_inner_text(value: number) {
        
        let val: number = value > 0
                    ? Math.floor(value)
                    : Math.ceil(value);

        this.tooltip_value = val;            
        this.element.innerText = String( val );
    }
}
export {Tooltip};