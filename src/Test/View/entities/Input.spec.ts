import { random_number } from '../../random_number';
import { Input } from '../../../Plugin/View/entities/Input';
import { Tooltip } from '../../../Plugin/View/entities/Tooltip';

describe(`
View -> Input
`, () => {
  let test_value_input: HTMLInputElement = document.createElement('input');
  let test_tooltip_input: HTMLInputElement = document.createElement('input');
  document.body.append(test_value_input, test_tooltip_input);
  describe('on_keydown_or_mouseout', () => {
    let value: number = random_number(0, 100);
    let input_value: Input = new Input('value', test_value_input, value);

    let result: boolean = false;
      let test_callback: I_Thumbler_State = function(thumbler_state: T_Thumbler_Data) {
        let test = thumbler_state.index;
        result = true;
      };
    describe('keydown', () => {
      it('callback bubbling if press Tab', (done: DoneFn) => {
        result = false;
        let test_keyboardEvent_tab: KeyboardEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: "Tab"
        });
        input_value.on_keydown_or_mouseout(test_callback);
        document.dispatchEvent(test_keyboardEvent_tab);

        setTimeout(() => {
          expect(result).toEqual(true);
          
        }, 500);
        done();
      });
      it('callback bubbling if press Enter', (done: DoneFn) => {
        result = false;
        let test_keyboardEvent_enter: KeyboardEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: "Enter"
        });
        input_value.on_keydown_or_mouseout(test_callback);
        document.dispatchEvent(test_keyboardEvent_enter);
        setTimeout(() => {
          expect(result).toEqual(true);
        }, 200);
        done();
      });
    });
    describe('mouseout', () => {
      it('callback bubbling if mouseout', (done: DoneFn) => {
        result = false;
        let test_mouseEvent_mouseout: MouseEvent = new MouseEvent('mouseout');
        input_value.on_keydown_or_mouseout(test_callback);
        input_value.element.dispatchEvent(test_mouseEvent_mouseout);
        setTimeout(() => {
          expect(result).toEqual(true);
        }, 200);
        done();
      });
    });
  });
  describe('on_switch_check', () => {
    let input_tooltip: Input = new Input('tooltip', test_tooltip_input);
    let value: number = random_number(0, 100);
    it('tooltip(s) hidden when input is checked', (done: DoneFn) => {
      let tooltip: Tooltip[] = [new Tooltip(value, 'horizontal')];
      let test_event: Event = new Event('change');
      spyOn(tooltip[0], 'switch_hidden');
      input_tooltip.on_switch_check(tooltip);
      input_tooltip.element.checked = false;
      input_tooltip.element.dispatchEvent(test_event);
      expect(tooltip[0].switch_hidden).toHaveBeenCalledWith(false);
      done();
    });
    it('tooltip(s) not hidden when input is not checked', (done: DoneFn) => {
      let tooltip: Tooltip[] = [new Tooltip(value, 'horizontal')];
      let test_event: Event = new Event('change');
      spyOn(tooltip[0], 'switch_hidden');
      input_tooltip.on_switch_check(tooltip);
      input_tooltip.element.checked = true;
      input_tooltip.element.dispatchEvent(test_event);
      expect(tooltip[0].switch_hidden).toHaveBeenCalledWith(true);
      done();
    });
  });
})