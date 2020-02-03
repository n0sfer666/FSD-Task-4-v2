import { Helper } from "./Helper";

class Connect extends Helper {
    
    element: HTMLElement;
    connect_position: [number, number] = [0, 0];

    constructor(private position_start: number, private position_end: number, private orientation: T_Orientation) {
        super();

        this.element = this.get_div_element_with_class('connect', this.orientation);
        this.set_connect_position(this.position_start, this.position_end)
    }

    set_connect_position(position_start: number, position_end: number) {

        let start: number = Math.round(position_start * this.TO_CONNECT_UPDATE);
        let end: number = Math.round(position_end * this.TO_CONNECT_UPDATE);

        this.connect_position = [start, end];
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
export {Connect};