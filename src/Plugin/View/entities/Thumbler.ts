import { Helper } from "./Helper";

export class Thumbler extends Helper {

    element: HTMLElement;

    constructor(private position: number, private orientation: T_Orientation) {
        super();

        this.element = this.get_div_element_with_class('thumbler', this.orientation);
    }

}