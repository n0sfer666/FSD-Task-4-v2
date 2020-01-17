import { Tooltip } from '../../../../Plugin/View/entities/Tooltip';

describe('View -> entities -> class Tooltip', () => {

    let tooltip: Tooltip = new Tooltip(1, 'horizontal');
    let values: number[] = [-9999999, -999999, -99999, -9999, -999, -99, -9, 
                            0,
                            9, 99, 999, 9999, 99999, 999999, 9999999];

    describe('(F) set_inner_text(value)', () => {

        for( let i = 0; i < values.length; i++ ) {

            it(`value: ${values[i]}, innerText`, () => {

                tooltip.set_inner_text(values[i]);

                expect(String(values[i])).toEqual(tooltip.element.innerText);
            });

            it(`value: ${values[i]}, value_current`, () => {

                tooltip.set_inner_text(values[i]);

                expect(values[i]).toEqual(tooltip.value_current);
            });
            
        }
    })
})