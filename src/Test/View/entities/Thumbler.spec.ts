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

    // describe('')
})