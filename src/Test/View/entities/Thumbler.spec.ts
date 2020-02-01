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
                event_test.initMouseEvent('click', true, true, window, 0, 0, 0, event_client, event_client, false, false, false, false, 0, null);

                test_container.setAttribute('style', `margin: ${margin}px;`);
                test_container.append(thumbler.element);
                let str_for_it: string = orientations[j] === 'horizontal'
                    ? `orientation: ${orientations[j]}, getBounding...().left: ${thumbler.element.getBoundingClientRect().left}, clientX: ${event_client}`
                    : `orientation: ${orientations[j]}, getBounding...().top: ${thumbler.element.getBoundingClientRect().top}, clientY: ${event_client}`;
                it(str_for_it, () => {
                    let to_expect: number = orientations[j] === 'horizontal'
                        ? event_client - thumbler.element.getBoundingClientRect().left
                        : event_client - thumbler.element.getBoundingClientRect().top;
                    let result: number = thumbler.get_shift(thumbler.element, event_test);

                    expect(to_expect).toEqual(result);
                })
                if(test_container.firstChild) {
                    test_container.firstChild.remove();
                };
            }
        }
    })
})