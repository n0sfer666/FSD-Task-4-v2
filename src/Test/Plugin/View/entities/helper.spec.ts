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
            let value: T_Value = [-8, 4];             
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
})