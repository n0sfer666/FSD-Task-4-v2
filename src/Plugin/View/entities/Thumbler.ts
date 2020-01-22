import { Helper } from "./Helper";

export class Thumbler extends Helper {

    element: HTMLElement;
    index: number = 0;

    constructor( private position_safe_int: number, private step_safe_int: number, private orientation: T_Orientation, index?: number ) {
        super();

        this.element = this.get_div_element_with_class('thumbler', this.orientation);

        if(index !== undefined) {
            this.index = index;
        }

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

    on_mouse_down_and_move(this: Thumbler, container: HTMLElement, callback: I_Thumbler_State) {

        let that = this;

        that.element.addEventListener('mousedown', (event: MouseEvent) => {

            event.preventDefault();

            that.element.setAttribute('style', 'z-index: 11;')

            let shift: number = this.get_shift(that.element, event);

            document.addEventListener('mousemove', on_mouse_move);
            document.addEventListener('mouseup', on_mouse_up);

            function on_mouse_move() {

                let new_position: number,
                    new_position_in_percent: number,
                    position_safe_int: number;

                if(that.orientation === 'horizontal') {
                    new_position = event.clientX - shift - container.getBoundingClientRect().left;
                    new_position_in_percent = new_position / container.offsetWidth;
                } else {
                    new_position = event.clientY - shift - container.getBoundingClientRect().top;
                    new_position_in_percent = new_position / container.offsetHeight;
                }
                
                position_safe_int = new_position_in_percent * that.TO_SAVE_INTEGER;

                if(position_safe_int > that.position_safe_int + (that.step_safe_int / 2)) {
                    if(that.position_safe_int + that.step_safe_int >= that.TO_SAVE_INTEGER) {

                        that.position_safe_int = that.TO_SAVE_INTEGER;
                        that.set_new_position(that.position_safe_int);

                    } else {

                        that.position_safe_int = that.position_safe_int + that.step_safe_int;
                        that.set_new_position(that.position_safe_int);

                    }
                }
                
                if(position_safe_int < that.position_safe_int - (that.step_safe_int / 2)) {
                    if(that.position_safe_int - that.step_safe_int <= 0) {

                        that.position_safe_int = 0;
                        that.set_new_position(that.position_safe_int);

                    } else {

                        that.position_safe_int = that.position_safe_int - that.step_safe_int;
                        that.set_new_position(that.position_safe_int);

                    }
                }

                callback({ position_safe_int: that.position_safe_int,
                           index: that.index });
            }

            function on_mouse_up() {
                document.removeEventListener('mousemove', on_mouse_move);
                document.removeEventListener('mouseup', on_mouse_up);

                that.element.setAttribute('style', 'z-index: 10;');
            }
        })

    }


}