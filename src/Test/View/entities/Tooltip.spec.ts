import { random_number } from '../../random_number';
import { Tooltip } from '../../../Plugin/View/entities/Tooltip';

describe(`
View -> Tooltip
`, () => {
    let tooltip: Tooltip = new Tooltip(0, 'horizontal');

    describe('set_inner_text(value: number)', () => {
        for( let i = 0; i < 10; i++) {
            let value: number = random_number(-10000, 10000);
            it(`value: ${value}`, () => {
                let to_expect: string = String(value);
    
                tooltip.set_inner_text(value);
    
                expect(to_expect).toEqual(tooltip.element.innerText);
            })
        }
    })
})