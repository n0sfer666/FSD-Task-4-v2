import { random_number } from '../../random_number';
import { Input } from '../../../Plugin/View/entities/Input';
import { Tooltip } from '../../../Plugin/View/entities/Tooltip';

describe(`
View -> Input
`, () => {
  let testValue_input: HTMLInputElement = document.createElement('input');
  let test_tooltip_input: HTMLInputElement = document.createElement('input');
  document.body.append(testValue_input, test_tooltip_input);
  describe('onKeydownOrMouseout', () => {
    let value: number = random_number(0, 100);
    let inputValue: Input = new Input('value', testValue_input, value);

    let result: boolean = false;
      let test_callback: iTumblerCallback = function(tumblerData: tTumblerData) {
        let test = tumblerData.index;
        result = true;
      };
    describe('keydown', () => {
      it('callback action if press Tab', (done: DoneFn) => {
        result = false;
        let test_keyboardEvent_tab: KeyboardEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: "Tab"
        });
        inputValue.onKeydownOrMouseout(test_callback);
        document.dispatchEvent(test_keyboardEvent_tab);

        setTimeout(() => {
          expect(result).toEqual(true);
          
        }, 500);
        done();
      });
      it('callback action if press Enter', (done: DoneFn) => {
        result = false;
        let test_keyboardEvent_enter: KeyboardEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: "Enter"
        });
        inputValue.onKeydownOrMouseout(test_callback);
        document.dispatchEvent(test_keyboardEvent_enter);
        setTimeout(() => {
          expect(result).toEqual(true);
        }, 200);
        done();
      });
    });
    describe('mouseout', () => {
      it('callback action if mouseout', (done: DoneFn) => {
        result = false;
        let test_mouseEvent_mouseout: MouseEvent = new MouseEvent('mouseout');
        inputValue.onKeydownOrMouseout(test_callback);
        inputValue.element.dispatchEvent(test_mouseEvent_mouseout);
        setTimeout(() => {
          expect(result).toEqual(true);
        }, 200);
        done();
      });
    });
  });
  describe('onSwitchCheck', () => {
    let inputTooltip: Input = new Input('tooltip', test_tooltip_input);
    let value: number = random_number(0, 100);
    it('tooltip(s) hidden when input is checked', (done: DoneFn) => {
      let tooltip: Tooltip[] = [new Tooltip(value, 'horizontal')];
      let test_event: Event = new Event('change');
      spyOn(tooltip[0], 'switchHidden');
      inputTooltip.onSwitchCheck(tooltip);
      inputTooltip.element.checked = false;
      inputTooltip.element.dispatchEvent(test_event);
      expect(tooltip[0].switchHidden).toHaveBeenCalledWith(false);
      done();
    });
    it('tooltip(s) not hidden when input is not checked', (done: DoneFn) => {
      let tooltip: Tooltip[] = [new Tooltip(value, 'horizontal')];
      let test_event: Event = new Event('change');
      spyOn(tooltip[0], 'switchHidden');
      inputTooltip.onSwitchCheck(tooltip);
      inputTooltip.element.checked = true;
      inputTooltip.element.dispatchEvent(test_event);
      expect(tooltip[0].switchHidden).toHaveBeenCalledWith(true);
      done();
    });
  });
})