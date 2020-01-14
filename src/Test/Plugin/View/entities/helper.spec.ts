import { Helper } from '../../../../Plugin/View/entities/Helper';

describe('View -> entities -> class Helper', () => {

    let helper = new Helper();
    describe('(F) get_position_from value(value, range)', () => {

        let ranges: T_Range[] = [ [-10, 10], [-1000, 1000], [-10000, 10000], [-1000000, 1000000] ];
        let values: T_Value[] = [ [-5], [-3.5], [-8, -4], [-6, 8], [4, 8], [3.5], [5] ];

        for( let i = 0; i < ranges.length; i++ ) {
            for ( let j = 0; j < values.length; j++ ) {
                it(`value: ${values[j]} on range: ${ranges[i]}`, () => {
                    let value: T_Value = values[j];
                    let range: T_Range = ranges[i];

                    let to_expect: T_Value = value;

                    for( let k = 0; k < value.length; k++ ) {
                        to_expect[k] = (value[k] - range[0]) / (range[1] - range[0]) * helper.coefficient;
                        to_expect[k] = Math.floor(to_expect[k]);
                    }

                    let result: T_Value = helper.get_position_from_value(value, range);
                    
                    expect(to_expect).toEqual(result);
                })
            }
        }
    });

    describe('(F) get_div_element_with_class(css_class, orientation)', () => {

        let elements: T_CSS_Classes[] = ['slider', 'thumbler', 'connect', 'tooltip'];
        let orientations: T_Orientation[] = ['horizontal', 'vertical'];

        for( let i = 0; i < elements.length; i++ ) {
            for( let j = 0; j < orientations.length; j++ ) {
                it(`class: ${elements[i]}, orientations: ${orientations[j]}`, () => {
                    let to_expect: HTMLElement = document.createElement('div');
                    to_expect.setAttribute('class', `SRS__${elements[i]} SRS__${elements[i]}_${orientations[j]}`);

                    let result: HTMLElement = helper.get_div_element_with_class(elements[i], orientations[j]);

                    expect(to_expect).toEqual(result);
                });
            };
        };

    });

});