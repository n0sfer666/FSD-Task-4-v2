import { Helper } from "./Helper";

export class Thumbler extends Helper {

    element: HTMLElement;

    constructor( private position_safe_int: number, private orientation: T_Orientation ) {
        super();

        this.element = this.get_div_element_with_class('thumbler', this.orientation);
    }

    set_new_position(position_safe_int: number) {

        let liter: string = this.orientation === "horizontal" ? 'X' : 'Y';

        let style: string = `transform: translate${liter}(${ (position_safe_int / this.TO_THUMBLER_POSITION) }%);`;

        this.element.setAttribute('style', style);

    }

    get_shift(element: HTMLElement, event: MouseEvent): number {

        let result: number = this.orientation === 'horizontal'
                    ? event.clientX - element.getBoundingClientRect().left
                    : event.clientY - element.getBoundingClientRect().top;

        return result;

    }

    // on_mouse_down_and_move(element: HTMLElement, container: HTMLElement) {

    //     let orientation =

    // }


}