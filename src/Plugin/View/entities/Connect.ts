import { Helper } from "./Helper";

export class Connect extends Helper {
    
    element: HTMLElement;

    constructor(private position_start: number, private position_end: number, private orientation: T_Orientation) {
        super();

        this.element = this.get_div_element_with_class('connect', this.orientation);
        this.set_connect_position(this.position_start, this.position_end)
    }

    set_connect_position(position_start: number, position_end: number) {

        let start: number = position_start / this.TO_CONNECT_UPDATE;
        let end: number = position_end / this.TO_CONNECT_UPDATE;

        let style: string = position_start === 0
                ? this.orientation === 'horizontal'
                    ? `width: ${position_end}%;`
                    : `height: ${position_end}%;`
                : this.orientation === 'horizontal'
                    ? `left: ${position_start}%; width: ${(position_end - position_start)}%;`
                    : `top: ${position_start}%; height: ${(position_end - position_start)}%;`;

        this.element.setAttribute('style', style);
    }
}