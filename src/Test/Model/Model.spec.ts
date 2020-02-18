import { Model } from '../../Plugin/Model/Model';
import { random_number } from '../random_number';

describe(`
Model
`, () => {
  var model: Model = new Model({
    range: [-1000, 1000],
    start: [-500, 500],
    step: 10
  });
  beforeEach(function() {
    model = new Model({
      range: [-1000, 1000],
      start: [-500, 500],
      step: 10
    });
  })
  afterEach(function() {
    model.callbackList = [];
  });

  describe('getPositionFromValue(value: number, range: tRange): number', () => {
    for( let i = 0; i < 10; i++) {
      let value: number = random_number(model.range[0], model.range[1]);
      it(`value: ${value} on range: [${model.range[0]}, ${model.range[1]}]`, () => {
        let to_expect: number = Math.round( ( (value - model.range[0]) / (model.range[1] - model.range[0])) * 1e4) / 1e4; 
        let result: number = model.getPositionFromValue(value, model.range);

        expect(to_expect).toEqual(result);
      });
    }
  });

  describe('getValue_from_position(position: number, range: tRange): number', () => {
    for( let i = 0; i < 10; i++ ) {
      let position: number = random_number(0, 10000) / 10000;
      it(`position: ${position} on range: [${model.range[0]}, ${model.range[1]}]`, () => {
        let to_expect: number = Math.round( (position * (model.range[1] - model.range[0])) + model.range[0] ); 
        let result: number = model.getValue_from_position(position, model.range);

        expect(to_expect).toEqual(result);
      });
    }
  });

  describe('setValue_and_position(new_value: number, i: number)', () => {
    for( let i = 0; i < 10; i++ ) {
      let new_value: number = random_number(model.range[0], model.range[1]);
      let i: number = random_number(0, 1);

      it(`new_value: ${new_value}, i: ${i}`, () => {
        let value: number = new_value > 0
          ? (Math.ceil(new_value / model.step) * model.step)
          : (Math.floor(new_value / model.step) * model.step);

        if(value < model.range[0]) {
          value = model.range[0];
        }
        if(value > model.range[1]) {
          value = model.range[1];
        }

        let position: number = (value - model.range[0]) / (model.range[1] - model.range[0]);
        position *= model.TO_NORMALIZE_POSITION;
        position = Math.round(position);
        position /= model.TO_NORMALIZE_POSITION;

        let to_expect: object = {
          value: value,
          position: position
        };

        model.setValue_and_position(new_value, i);

        let result: object = {
          value: model.value[i],
          position: model.position[i]
        };

        expect(to_expect).toEqual(result);
      });
    }
  });

  describe('on_change_model(callback: iModelCallback)', () => {
    let test_function: iModelCallback = function(modelData: tModelData) {
      let test: tModelData = modelData;
      test.index = modelData.index;
    };
    it('callback is pushed to callbackList', () => {
      let to_expect: iModelCallback[] = [test_function];

      model.on_change_model(test_function);
      let result: iModelCallback[] = model.callbackList;

      expect(to_expect).toEqual(result);
    });
  });

  describe('update()', () => {
    let result: boolean = false;
    let test_function: iModelCallback = function(modelData: tModelData) {
      let test: tModelData = modelData;
      test.index = modelData.index;
      result = true;
    };
    it('callback was executed', () => {
      model.on_change_model(test_function);
      model.update();

      expect(true).toEqual(result);
      
    });
  });

  describe('setNewPosition(tumblerData: tTumblerData)', () => {
    it('get_new_value() was called', () => {
      spyOn(model, 'get_new_value').and.callThrough();
      model.setNewPosition({position: 0.5, index: 0});
      expect(model.get_new_value).toHaveBeenCalled();
    });
    it('check_on_step...() was called', () => {
      spyOn(model, 'check_on_step_movement_to_set_val_and_pos').and.callThrough();
      model.setNewPosition({position: 0.5, index: 0});

      expect(model.check_on_step_movement_to_set_val_and_pos).toHaveBeenCalled();
    });
    it('update() was called', () => {
      spyOn(model, 'update').and.callThrough();
      model.setNewPosition({position: 0.5, index: 0});

      expect(model.update).toHaveBeenCalled();
    });
  });

  describe('get_new_value(tumblerData: tTumblerData)', () => {
    let testValue: number = random_number(model.range[0], model.range[1]);
    let test_index: number = random_number(0, 1);
    it(`value: ${testValue}, index: ${test_index}`, () => {
      let to_expect: number = model.get_new_value({value: testValue, index: test_index});
      let result: number = testValue;
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
    let testPosition: number = Math.random();
    test_index = random_number(0, 1);
    it(`position: ${testPosition}, index: ${test_index}`, () => {
      let to_expect: number = model.get_new_value({position: testPosition, index: test_index});
      let position: number = Math.round(testPosition * model.TO_NORMALIZE_POSITION) / model.TO_NORMALIZE_POSITION;
      let result: number = model.getValue_from_position(position, model.range);

      expect(to_expect).toEqual(result);
    });
  });

  describe('check_on_step_movement_to_set_val_and_pos(..)', () => {
    for( let i = 0; i < 10; i++ ) {
      let testValue: number = random_number(model.range[0] * 10, model.range[1] * 10);
      let test_index: number = random_number(0, 1);
      let test_new_value: number = model.get_new_value({value: testValue, index: test_index});

      let condition: [number, number] = [model.value[test_index] - model.step, model.value[test_index] + model.step];

      it(`value: ${testValue}, index: ${test_index}`, () => {
        spyOn(model, 'setValue_and_position').and.callThrough();
        model.check_on_step_movement_to_set_val_and_pos(test_new_value, test_index);

        let test_param: number = 0;
        if(test_new_value >= condition[1] || test_new_value <= condition[0]) {
          test_param = test_new_value;
        }

        expect(model.setValue_and_position).toHaveBeenCalledWith(test_param, test_index);
      })
    }
  })
});

