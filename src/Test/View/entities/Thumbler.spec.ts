import { Thumbler } from '../../../Plugin/View/entities/Thumbler';
import { random_number } from '../../random_number';

describe(`
View -> Thumbler
`, () => {
    describe('set_new_position(position: number)', () => {
        let orientations: T_Orientation[] = ['horizontal', 'vertical'];
        for( let i = 0; i < 10; i++ ) {
            for( let j = 0; j < orientations.length; j++ ) {
                let position: number = Math.random();
                let thumbler: Thumbler = new Thumbler(position, orientations[j], 0);
                
                it(`position: ${position}, orientation: ${orientations[j]}`, () => {
                    let liter: string = orientations[j] === "horizontal" ? 'X' : 'Y';

                    let to_expect: string = `transform: translate${liter}(${ Math.round(position * thumbler.TO_THUMBLER_POSITION) }%);`;

                    thumbler.set_new_position(position);
                    let result: string = thumbler.element.getAttribute('style')!

                    expect(to_expect).toEqual(result);
                })
            } 
        }
    })

    describe('get_shift(element: HTMLElement, event: MouseEvent): number', () => {
        let orientations: T_Orientation[] = ['horizontal', 'vertical'];

        let test_container: HTMLElement = document.createElement('div');
        document.body.setAttribute('style', 'margin: 0; padding: 0;');
        document.body.append(test_container);

        for( let i = 0; i < 10; i++ ) {
            for( let j = 0; j < orientations.length; j++ ) {
                let thumbler: Thumbler = new Thumbler(0, orientations[j], 0);

                let margin: number = random_number(5, 55);
                let event_client: number = margin + random_number(1, 15);

                let event_test: MouseEvent = document.createEvent('MouseEvent');
                event_test.initMouseEvent('click', true, true, window, 0, 0, 0,
                    event_client, // event.clientX
                    event_client, // event.clientY
                    false, false, false, false, 0, null);

                test_container.setAttribute('style', `margin: ${margin}px;`);
                test_container.append(thumbler.element);
                let str_for_it: string = orientations[j] === 'horizontal'
                    ? `orientation: ${orientations[j]}, getBounding...().left: ${thumbler.element.getBoundingClientRect().left}, clientX: ${event_client}`
                    : `orientation: ${orientations[j]}, getBounding...().top: ${thumbler.element.getBoundingClientRect().top}, clientY: ${event_client}`;
                it(str_for_it, () => {
                    let to_expect: number = orientations[j] === 'horizontal'
                        ? event_test.clientX - thumbler.element.getBoundingClientRect().left
                        : event_test.clientY - thumbler.element.getBoundingClientRect().top;
                    let result: number = thumbler.get_shift(thumbler.element, event_test);

                    expect(to_expect).toEqual(result);
                })
                if(test_container.firstChild) {
                    test_container.firstChild.remove();
                };

            }
        }
    })

    describe('on_mouse_down_and_move(this: Thumbler, container: HTMLElement, callback: I_Thumbler_State)', () => {
        let orientations: T_Orientation[] = ['horizontal', 'vertical'];

        document.body.setAttribute('style', 'margin: 0; padding: 0;');
        let test_container: HTMLElement = document.createElement('div');
        document.body.append(test_container);

        for( let i = 0; i < 10; i++ ) {
            for( let j = 0; j < orientations.length; j++ ) {
                let index: number = random_number(0, 1);
                let position: number = Math.random();
                let thumbler: Thumbler = new Thumbler(position, orientations[j], index);
                
                let result: T_Thumbler_Data = { 
                    position: 0,
                    index: 0
                }

                let test_callback: I_Thumbler_State = function(thumbler_state: T_Thumbler_Data) {
                    result.position = thumbler_state.position,
                    result.index = thumbler_state.index
                }

                let size_of_container: number = 300;
                
                let margin: number = random_number(5, 55);
                test_container.setAttribute('style', `width: ${size_of_container}px; height: ${size_of_container}px; margin: ${margin}px;`);

                let value_event_mousedown: number = margin + (Math.round(position * size_of_container)) + random_number(1, 15);
                let value_event_mousemove: number = random_number(-1000, 1000);

                let event_mousedown_test: MouseEvent = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    clientX: value_event_mousedown,
                    clientY: value_event_mousedown
                })
                let event_mousemove_test: MouseEvent = new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    clientX: value_event_mousemove,
                    clientY: value_event_mousemove
                })

                it(`orientation: ${orientations[j]}, container.getBound...: ${margin}, event_client(mousedown): ${value_event_mousedown}, event_client(mousemove): ${value_event_mousemove}`, () => {
                    let to_expect: T_Thumbler_Data = {
                        position: 0,
                        index: 0,
                    }

                    let new_position: number, new_position_in_percent: number, position: number;
                    let shift: number = thumbler.get_shift(thumbler.element, event_mousedown_test);
                    new_position = value_event_mousemove - shift - margin;
                    new_position_in_percent = new_position / size_of_container;

                    position = new_position_in_percent;

                    if(position > 1) {
                        position = 1;
                    }
                    if(position < 0) {
                        position = 0;
                    }

                    to_expect.position = position;
                    to_expect.index = index;

                    thumbler.on_mouse_down_and_move(test_container, test_callback);
                    thumbler.element.dispatchEvent(event_mousedown_test);
                    thumbler.element.dispatchEvent(event_mousemove_test);

                    setTimeout(() => {
                        expect(to_expect).toEqual(result);
                    }, 1000);

                    
                })
            }
        }
    })
})