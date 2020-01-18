import { Helper } from "./Helper";

export class Connect extends Helper {
    
    element: HTMLElement;

    constructor(private position_start: number, private position_end: number, private orientation: T_Orientation) {
        super();

        this.element = this.get_div_element_with_class('connect', this.orientation);
    }

    set_connect_position(position_start: number, position_end: number) {
        
    }
}