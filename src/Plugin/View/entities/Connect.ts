import { Helper } from "./Helper";

export class Connect extends Helper {
    
    element: HTMLElement;

    constructor(private position_start_safe_int: number, private position_end_safe_int: number, private orientation: T_Orientation) {
        super();

        this.element = this.get_div_element_with_class('connect', this.orientation);
        this.set_connect_position(this.position_start_safe_int, this.position_end_safe_int)
    }

    set_connect_position(position_start_safe_int: number, position_end_safe_int: number) {

        let start: number = position_start_safe_int / this.TO_CONNECT_UPDATE;
        let end: number = position_end_safe_int / this.TO_CONNECT_UPDATE;

        let style: string = position_start_safe_int === 0
                ? this.orientation === 'horizontal'
                    ? `width: ${position_end_safe_int}%;`
                    : `height: ${position_end_safe_int}%;`
                : this.orientation === 'horizontal'
                    ? `left: ${position_start_safe_int}%; width: ${(position_end_safe_int - position_start_safe_int)}%;`
                    : `top: ${position_start_safe_int}%; height: ${(position_end_safe_int - position_start_safe_int)}%;`;

        this.element.setAttribute('style', style);
    }
}