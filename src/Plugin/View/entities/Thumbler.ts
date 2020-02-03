import { Helper } from "./Helper";

class Thumbler extends Helper {

    element: HTMLElement;

    thumbler_position: number = 0;
    listening: boolean = false;

    constructor( private position: number, private orientation: T_Orientation, private index: number ) {
        super();

        this.element = this.get_div_element_with_class('thumbler', this.orientation);
        this.set_new_position(position);

    }

    set_new_position(position: number) {
        this.thumbler_position = position;

        let liter: string = this.orientation === "horizontal" ? 'X' : 'Y';

        let style: string = `transform: translate${liter}(${ Math.round(position * this.TO_THUMBLER_POSITION) }%);`;
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
        that.listening = true;
        
        that.element.addEventListener('mousedown', (event: MouseEvent) => {

            event.preventDefault();

            let shift: number = this.get_shift(that.element, event);

            document.addEventListener('mousemove', on_mouse_move);
            document.addEventListener('mouseup', on_mouse_up);

            function on_mouse_move(event: MouseEvent) {

                let new_position: number,
                    new_position_in_percent: number,
                    position: number;
                
                if(that.orientation === 'horizontal') {
                    new_position = event.clientX - shift - container.getBoundingClientRect().left;
                    new_position_in_percent = new_position / container.offsetWidth;
                } else {
                    new_position = event.clientY - shift - container.getBoundingClientRect().top;
                    new_position_in_percent = new_position / container.offsetHeight;
                }

                
                position = new_position_in_percent;

                if(position > 1) {
                    position = 1;
                }
                if(position < 0) {
                    position = 0;
                }

                callback({ position: position,
                           index: that.index });
            }

            function on_mouse_up() {
                document.removeEventListener('mousemove', on_mouse_move);
                document.removeEventListener('mouseup', on_mouse_up);
            }
        })
    }
}
export {Thumbler};