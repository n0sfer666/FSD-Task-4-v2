import { Model } from '../../Plugin/Model/Model';
import { makeRandomNumber } from '../makeRandomNumber';

describe(`
Model
`, () => {
  let model: Model = new Model({
    range: [-1000, 1000],
    start: [-500, 500],
    step: 10,
  });
  beforeEach(() => {
    model = new Model({
      range: [-1000, 1000],
      start: [-500, 500],
      step: 10,
    });
  });
  afterEach(() => {
    model.callbackList = [];
  });

  describe('getPositionFromValue(value: number, range: tRange): number', () => {
    for (let i = 0; i < 10; i++) {
      const value: number = makeRandomNumber(model.range[0], model.range[1]);
      it(`value: ${value} on range: [${model.range[0]}, ${model.range[1]}]`, () => {
        const toExpect: number = Math.round(((value - model.range[0]) / (model.range[1] - model.range[0])) * 1e4) / 1e4;
        const result: number = model.getPositionFromValue(value, model.range);

        expect(toExpect).toEqual(result);
      });
    }
  });

  describe('getValueFromPosition(position: number, range: tRange): number', () => {
    for (let i = 0; i < 10; i++) {
      const position: number = makeRandomNumber(0, 10000) / 10000;
      it(`position: ${position} on range: [${model.range[0]}, ${model.range[1]}]`, () => {
        const toExpect: number = Math.round((position * (model.range[1] - model.range[0])) + model.range[0]);
        const result: number = model.getValueFromPosition(position, model.range);

        expect(toExpect).toEqual(result);
      });
    }
  });

  describe('setValueAndPosition(newValue: number, i: number)', () => {
    for (let i = 0; i < 10; i++) {
      const newValue: number = makeRandomNumber(model.range[0], model.range[1]);
      const i: number = makeRandomNumber(0, 1);

      it(`newValue: ${newValue}, i: ${i}`, () => {
        let value: number = newValue > 0
          ? (Math.ceil(newValue / model.step) * model.step)
          : (Math.floor(newValue / model.step) * model.step);

        if (value < model.range[0]) {
          value = model.range[0];
        }
        if (value > model.range[1]) {
          value = model.range[1];
        }

        let position: number = (value - model.range[0]) / (model.range[1] - model.range[0]);
        position *= model.TO_NORMALIZE_POSITION;
        position = Math.round(position);
        position /= model.TO_NORMALIZE_POSITION;

        const toExpect: object = {
          value,
          position,
        };

        model.setValueAndPosition(newValue, i);

        const result: object = {
          value: model.value[i],
          position: model.position[i],
        };

        expect(toExpect).toEqual(result);
      });
    }
  });

  describe('onChangeModel(callback: iModelCallback)', () => {
    const testCallback: iModelCallback = function (modelData: tModelData) {
      const test: tModelData = modelData;
      test.index = modelData.index;
    };
    it('callback is pushed to callbackList', () => {
      const toExpect: iModelCallback[] = [testCallback];

      model.onChangeModel(testCallback);
      const result: iModelCallback[] = model.callbackList;

      expect(toExpect).toEqual(result);
    });
  });

  describe('update()', () => {
    let result: boolean = false;
    const testCallback: iModelCallback = function (modelData: tModelData) {
      const test: tModelData = modelData;
      test.index = modelData.index;
      result = true;
    };
    it('callback was executed', () => {
      model.onChangeModel(testCallback);
      model.update();

      expect(true).toEqual(result);
    });
  });

  describe('setNewPosition(tumblerData: tTumblerData)', () => {
    it('getNewValue() was called', () => {
      spyOn(model, 'getNewValue').and.callThrough();
      model.setNewPosition({ position: 0.5, index: 0 });
      expect(model.getNewValue).toHaveBeenCalled();
    });
    it('check_on_step...() was called', () => {
      spyOn(model, 'checkStepCondition').and.callThrough();
      model.setNewPosition({ position: 0.5, index: 0 });

      expect(model.checkStepCondition).toHaveBeenCalled();
    });
    it('update() was called', () => {
      spyOn(model, 'update').and.callThrough();
      model.setNewPosition({ position: 0.5, index: 0 });

      expect(model.update).toHaveBeenCalled();
    });
  });

  describe('getNewValue(tumblerData: tTumblerData)', () => {
    const testValue: number = makeRandomNumber(model.range[0], model.range[1]);
    let testIndex: number = makeRandomNumber(0, 1);
    it(`value: ${testValue}, index: ${testIndex}`, () => {
      const toExpect: number = model.getNewValue({ value: testValue, index: testIndex });
      let result: number = testValue;
      if (testIndex === 0 && model.value[1]) {
        if (result > model.value[1] - model.step) {
          result = model.value[1] - model.step;
        }
      }
      if (testIndex === 1) {
        if (result < model.value[0] + model.step) {
          result = model.value[0] + model.step;
        }
      }
      expect(toExpect).toEqual(result);
    });
    const testPosition: number = Math.random();
    testIndex = makeRandomNumber(0, 1);
    it(`position: ${testPosition}, index: ${testIndex}`, () => {
      const toExpect: number = model.getNewValue({ position: testPosition, index: testIndex });
      const position: number = Math.round(testPosition * model.TO_NORMALIZE_POSITION) / model.TO_NORMALIZE_POSITION;
      const result: number = model.getValueFromPosition(position, model.range);

      expect(toExpect).toEqual(result);
    });
  });

  describe('checkStepCondition(..)', () => {
    for (let i = 0; i < 10; i++) {
      const testValue: number = makeRandomNumber(model.range[0] * 10, model.range[1] * 10);
      const testIndex: number = makeRandomNumber(0, 1);
      const testNewValue: number = model.getNewValue({ value: testValue, index: testIndex });

      const condition: [number, number] = [model.value[testIndex] - model.step, model.value[testIndex] + model.step];

      it(`value: ${testValue}, index: ${testIndex}`, () => {
        spyOn(model, 'setValueAndPosition').and.callThrough();
        model.checkStepCondition(testNewValue, testIndex);

        let testParam: number = 0;
        if (testNewValue >= condition[1] || testNewValue <= condition[0]) {
          testParam = testNewValue;
        }

        expect(model.setValueAndPosition).toHaveBeenCalledWith(testParam, testIndex);
      });
    }
  });
});
