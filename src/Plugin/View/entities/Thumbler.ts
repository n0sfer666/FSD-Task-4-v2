import { Helper } from "./Helper";

export class Thumbler extends Helper {

    element: HTMLElement;

    constructor(private position_safe_int: number, private orientation: T_Orientation) {
        super();

        this.element = this.get_div_element_with_class('thumbler', this.orientation);
    }

    set_new_position(position_safe_int: number) {

        let liter: string = this.orientation === "horizontal"
                            ? 'X'
                            : 'Y';

        let style: string = `transform: translate${liter}($)`
    }

}