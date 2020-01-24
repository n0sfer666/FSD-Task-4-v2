import { Helper } from "./Helper";

export class Connect extends Helper {
    
    element: HTMLElement;

    constructor(private position_start: number, private position_end: number, private orientation: T_Orientation) {
        super();

        this.element = this.get_div_element_with_class('connect', this.orientation);
        this.set_connect_position(this.position_start, this.position_end)
    }

    set_connect_position(position_start: number, position_end: number) {

        let start: number = position_start * this.TO_CONNECT_UPDATE;
        let end: number = position_end * this.TO_CONNECT_UPDATE;

        let style: string = start === 0
                ? this.orientation === 'horizontal'
                    ? `width: ${end}%;`
                    : `height: ${end}%;`
                : this.orientation === 'horizontal'
                    ? `left: ${start}%; width: ${(end - start)}%;`
                    : `top: ${start}%; height: ${(end - start)}%;`;

        this.element.setAttribute('style', style);
    }
}