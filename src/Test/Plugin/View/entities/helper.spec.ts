import { Helper } from '../../../../Plugin/View/entities/Helper';

describe('View -> entities -> class Helper', () => {

    let helper = new Helper();
    describe('(F) get_position_from value(value, range)', () => {

        let range: T_Range = [-10, 10];

        it('value is [-5]     on range [-10, 10]', () => {
            let to_expect: T_Value = [0.25];
            let value: T_Value = [-5];
            let result: T_Value = helper.get_position_from_value(value, range);

            expect(to_expect).toEqual(result);
        });
        it('value is [-3.5]   on range [-10, 10]', () => {
            let to_expect: T_Value = [0.325];
            let value: T_Value = [-3.5];
            let result: T_Value = helper.get_position_from_value(value, range);

            expect(to_expect).toEqual(result);
        });
        it('value is [-8, -4] on range [-10, 10]', () => {
            let to_expect: T_Value = [0.1, 0.3];
            let value: T_Value = [-8, -4];             
            let result: T_Value = helper.get_position_from_value(value, range);

            expect(to_expect).toEqual(result);
        });
        it('value is [5]      on range [-10, 10]', () => {
            let to_expect: T_Value = [0.75];
            let value: T_Value = [5];
            let result: T_Value = helper.get_position_from_value(value, range);

            expect(to_expect).toEqual(result);
        });
        it('value is [3.5]    on range [-10, 10]', () => {
            let to_expect: T_Value = [0.675];
            let value: T_Value = [3.5];
            let result: T_Value = helper.get_position_from_value(value, range);

            expect(to_expect).toEqual(result);
        });
        it('value is [4, 8]   on range [-10, 10]', () => {
            let to_expect: T_Value = [0.7, 0.9];
            let value: T_Value = [4, 8];
            let result: T_Value = helper.get_position_from_value(value, range);

            expect(to_expect).toEqual(result);
        });
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