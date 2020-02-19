import { makeRandomNumber } from '../../makeRandomNumber';
import { Input } from '../../../Plugin/View/entities/Input';
import { Tooltip } from '../../../Plugin/View/entities/Tooltip';

describe(`
View -> Input
`, () => {
  const testValueInput: HTMLInputElement = document.createElement('input');
  const testTooltipInput: HTMLInputElement = document.createElement('input');
  document.body.append(testValueInput, testTooltipInput);
  describe('onKeydownOrMouseout', () => {
    const value: number = makeRandomNumber(0, 100);
    const inputValue: Input = new Input('value', testValueInput, value);

    let result: boolean = false;
    const testCallback: iTumblerCallback = function (tumblerData: tTumblerData) {
      const test = tumblerData.index;
      result = true;
    };
    describe('keydown', () => {
      it('callback action if press Tab', (done: DoneFn) => {
        result = false;
        const testKeydownTab: KeyboardEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: 'Tab',
        });
        inputValue.onKeydownOrMouseout(testCallback);
        document.dispatchEvent(testKeydownTab);

        setTimeout(() => {
          expect(result).toEqual(true);
        }, 200);
        done();
      });
      it('callback action if press Enter', (done: DoneFn) => {
        result = false;
        const testKeydownEnter: KeyboardEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: 'Enter',
        });
        inputValue.onKeydownOrMouseout(testCallback);
        document.dispatchEvent(testKeydownEnter);
        setTimeout(() => {
          expect(result).toEqual(true);
        }, 200);
        done();
      });
    });
    describe('mouseout', () => {
      it('callback action if mouseout', (done: DoneFn) => {
        result = false;
        const testMouseout: MouseEvent = new MouseEvent('mouseout');
        inputValue.onKeydownOrMouseout(testCallback);
        inputValue.element.dispatchEvent(testMouseout);
        setTimeout(() => {
          expect(result).toEqual(true);
        }, 200);
        done();
      });
    });
  });
  describe('onSwitchCheck', () => {
    const inputTooltip: Input = new Input('tooltip', testTooltipInput);
    const value: number = makeRandomNumber(0, 100);
    it('tooltip(s) hidden when input is checked', (done: DoneFn) => {
      const tooltip: Tooltip[] = [new Tooltip(value, 'horizontal')];
      const testEvent: Event = new Event('change');
      spyOn(tooltip[0], 'switchHidden');
      inputTooltip.onSwitchCheck(tooltip);
      inputTooltip.element.checked = false;
      inputTooltip.element.dispatchEvent(testEvent);
      expect(tooltip[0].switchHidden).toHaveBeenCalledWith(false);
      done();
    });
    it('tooltip(s) not hidden when input is not checked', (done: DoneFn) => {
      const tooltip: Tooltip[] = [new Tooltip(value, 'horizontal')];
      const testEvent: Event = new Event('change');
      spyOn(tooltip[0], 'switchHidden');
      inputTooltip.onSwitchCheck(tooltip);
      inputTooltip.element.checked = true;
      inputTooltip.element.dispatchEvent(testEvent);
      expect(tooltip[0].switchHidden).toHaveBeenCalledWith(true);
      done();
    });
  });
});
