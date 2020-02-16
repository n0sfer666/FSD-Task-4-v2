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
  beforeEach(function() {
    model = new Model({
      value_range: [-1000, 1000],
      value_start: [-500, 500],
      value_step: 10
    });
  })
  afterEach(function() {
    model.callback_list = [];
  });

  describe('get_position_from_value(value: number, range: T_Range): number', () => {
    for( let i = 0; i < 10; i++) {
      let value: number = random_number(model.range[0], model.range[1]);
      it(`value: ${value} on range: [${model.range[0]}, ${model.range[1]}]`, () => {
        let to_expect: number = Math.round( ( (value - model.range[0]) / (model.range[1] - model.range[0])) * 1e4) / 1e4; 
        let result: number = model.get_position_from_value(value, model.range);

        expect(to_expect).toEqual(result);
      });
    }
  });

  describe('get_value_from_position(position: number, range: T_Range): number', () => {
    for( let i = 0; i < 10; i++ ) {
      let position: number = random_number(0, 10000) / 10000;
      it(`position: ${position} on range: [${model.range[0]}, ${model.range[1]}]`, () => {
        let to_expect: number = Math.round( (position * (model.range[1] - model.range[0])) + model.range[0] ); 
        let result: number = model.get_value_from_position(position, model.range);

        expect(to_expect).toEqual(result);
      });
    }
  });

  describe('set_value_and_position(new_value: number, i: number)', () => {
    for( let i = 0; i < 10; i++ ) {
      let new_value: number = random_number(model.range[0], model.range[1]);
      let i: number = random_number(0, 1);

      it(`new_value: ${new_value}, i: ${i}`, () => {
        let value: number = new_value > 0
          ? (Math.ceil(new_value / model.step) * model.step)
          : (Math.floor(new_value / model.step) * model.step);

        let position: number = (value - model.range[0]) / (model.range[1] - model.range[0]);
        position *= model.TO_NORMALIZE_POSITION;
        position = Math.round(position);
        position /= model.TO_NORMALIZE_POSITION;

        let to_expect: object = {
          value: value,
          position: position
        };

        model.set_value_and_position(new_value, i);

        let result: object = {
          value: model.value[i],
          position: model.position[i]
        };

        expect(to_expect).toEqual(result);
      });
    }
  });

  describe('on_change_model(callback: I_Model_State)', () => {
    let test_function: I_Model_State = function(model_state: T_Model_Data) {
      let test: T_Model_Data = model_state;
      test.index = model_state.index;
    };
    it('callback is pushed to callback_list', () => {
      let to_expect: I_Model_State[] = [test_function];

      model.on_change_model(test_function);
      let result: I_Model_State[] = model.callback_list;

      expect(to_expect).toEqual(result);
    });
  });

  describe('update()', () => {
    let result: boolean = false;
    let test_function: I_Model_State = function(model_state: T_Model_Data) {
      let test: T_Model_Data = model_state;
      test.index = model_state.index;
      result = true;
    };
    it('callback was executed', () => {
      model.on_change_model(test_function);
      model.update();

      expect(true).toEqual(result);
      
    });
  });

  describe('set_new_position(thumbler_state: T_Thumbler_Data)', () => {
    it('get_new_value() was called', () => {
      spyOn(model, 'get_new_value').and.callThrough();
      model.set_new_position({position: 0.5, index: 0});
      expect(model.get_new_value).toHaveBeenCalled();
    });
    it('check_on_step...() was called', () => {
      spyOn(model, 'check_on_step_movement_to_set_val_and_pos').and.callThrough();
      model.set_new_position({position: 0.5, index: 0});

      expect(model.check_on_step_movement_to_set_val_and_pos).toHaveBeenCalled();
    });
    it('update() was called', () => {
      spyOn(model, 'update').and.callThrough();
      model.set_new_position({position: 0.5, index: 0});

      expect(model.update).toHaveBeenCalled();
    });
  });

  describe('get_new_value(thumbler_state: T_Thumbler_Data)', () => {
    let test_value: number = random_number(model.range[0], model.range[1]);
    let test_index: number = random_number(0, 1);
    it(`value: ${test_value}, index: ${test_index}`, () => {
      let to_expect: number = model.get_new_value({value: test_value, index: test_index});
      let result: number = test_value;
      if(test_index === 0 && model.value[1]) {
        if(result > model.value[1] - model.step) {
          result = model.value[1] - model.step;
        }
      }
      if(test_index === 1) {
        if(result < model.value[0] + model.step) {
          result = model.value[0] + model.step;
        }
      }
      expect(to_expect).toEqual(result);
    })
    let test_position: number = Math.random();
    test_index = random_number(0, 1);
    it(`position: ${test_position}, index: ${test_index}`, () => {
      let to_expect: number = model.get_new_value({position: test_position, index: test_index});
      let position: number = Math.round(test_position * model.TO_NORMALIZE_POSITION) / model.TO_NORMALIZE_POSITION;
      let result: number = model.get_value_from_position(position, model.range);

      expect(to_expect).toEqual(result);
    });
  });

  describe('check_on_step_movement_to_set_val_and_pos(..)', () => {
    for( let i = 0; i < 10; i++ ) {
      let test_value: number = random_number(model.range[0] * 10, model.range[1] * 10);
      let test_index: number = random_number(0, 1);
      let test_new_value: number = model.get_new_value({value: test_value, index: test_index});

      let condition: [number, number] = [model.value[test_index] - model.step, model.value[test_index] + model.step];

      it(`value: ${test_value}, index: ${test_index}`, () => {
        spyOn(model, 'set_value_and_position').and.callThrough();
        model.check_on_step_movement_to_set_val_and_pos(test_new_value, test_index);

        let test_param: number = 0;
        if(test_new_value >= condition[1] || test_new_value <= condition[0]) {
          test_param = test_new_value;
        }
        if(test_new_value <= model.range[0]) {
          test_param = model.range[0];
        } 
        if(test_new_value >= model.range[1]) {
          test_param = model.range[1];
        }

        expect(model.set_value_and_position).toHaveBeenCalledWith(test_param, test_index);
      })
    }
  })
});

