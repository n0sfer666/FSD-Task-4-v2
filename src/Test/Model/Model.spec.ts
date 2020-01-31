import { Model } from '../../Plugin/Model/Model';
import { random_number } from '../random_number';

describe(`
Model
`, () => {
    var model: Model = new Model({
        value_range: [-1000, 1000],
        value_start: [-500, 500],
        value_step: 10
    });

    afterEach(function() {
        model.callback_list = [];
    })

    describe('get_position_from_value(value: number, range: T_Range): number', () => {
        for( let i = 0; i < 10; i++) {
            let value: number = random_number(model.range[0], model.range[1]);
            it(`value: ${value} on range: [${model.range[0]}, ${model.range[1]}]`, () => {
                let to_expect: number = Math.round( ( (value - model.range[0]) / (model.range[1] - model.range[0])) * 1e4) / 1e4; 
                let result: number = model.get_position_from_value(value, model.range);

                expect(to_expect).toEqual(result);
            })
        }
    })

    describe('get_value_from_position(position: number, range: T_Range): number', () => {
        for( let i = 0; i < 10; i++ ) {
            let position: number = random_number(0, 10000) / 10000;
            it(`position: ${position} on range: [${model.range[0]}, ${model.range[1]}]`, () => {
                let to_expect: number = Math.round( (position * (model.range[1] - model.range[0])) + model.range[0] ); 
                let result: number = model.get_value_from_position(position, model.range);

                expect(to_expect).toEqual(result);
            })
        }
    });

    describe('set_value_and_position(new_value: number, i: number)', () => {
        for( let i = 0; i < 10; i++ ) {
            let new_value: number = random_number(model.range[0] - 1000, model.range[1] + 1000);
            let i: number = random_number(0, 1);

            it(`new_value: ${new_value}, i: ${i}`, () => {
                let value: number = new_value > 0
                    ? (Math.ceil(new_value / model.step) * model.step)
                    : (Math.floor(new_value / model.step) * model.step);

                    if(value > model.range[1]) {
                        value = model.range[1];
                    }
                    if(value < model.range[0]) {
                        value = model.range[0];
                    }

                let position: number = Math.round( ( (value - model.range[0]) / (model.range[1] - model.range[0])) * 1e4) / 1e4; 

                let to_expect: object = {
                    value: value,
                    position: position
                }

                model.set_value_and_position(new_value, i);

                let result: object = {
                    value: model.value[i],
                    position: model.position[i]
                }

                expect(to_expect).toEqual(result);
            })
        }
    });

    describe('on_change_model(callback: I_Model_State)', () => {
        let test_function: I_Model_State = function(model_state: T_Model_Data) {
            let test: string = 'test';
        }
        it('callback is pushed to callback_list', () => {
            let to_expect: I_Model_State[] = [test_function];

            model.on_change_model(test_function);
            let result: I_Model_State[] = model.callback_list;

            expect(to_expect).toEqual(result);
        })
    });

    describe('update()', () => {
        let result: boolean = false;
        let test_function: I_Model_State = function(model_state: T_Model_Data) {
            result = true;
        }
        it('callback was executed', () => {
            model.on_change_model(test_function);
            model.update();
            expect(true).toEqual(result);
        })
    });

    describe('set_new_position(thumbler_state: T_Thumbler_Data)', () => {
        for( let i = 0; i < 10; i++ ) {
            let thumbler_state: T_Thumbler_Data = {
                position: (random_number(0, 10000) / 10000),
                index: random_number(0, 1)
            }

            let result: T_Model_Data;

            let test_function: I_Model_State = function(model_state: T_Model_Data) {
                result = model_state;
            }

            it(`thumbler_state = { pos: ${thumbler_state.position}, index: ${thumbler_state.index} } was set correct`, () => {
                model.on_change_model(test_function);
                model.set_new_position(thumbler_state);

                let to_expect: T_Model_Data = {
                    position: model.position,
                    value: model.value,
                    index: model.index_of_active_thumbler
                }

                expect(to_expect).toEqual(result);
            })
        }
    })
})

