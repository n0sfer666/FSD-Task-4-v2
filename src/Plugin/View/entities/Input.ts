import { Helper } from './Helper';
import { Tooltip } from './Tooltip';

class Input extends Helper {
  constructor(private type: tInputType, public element: HTMLInputElement, public value?: number, public index?: number) {
    super();
    if (type === 'value') {
      if (this.value !== undefined) {
        this.element.value = String(this.value);
      }
    }
  }

  on_keydown_or_mouseout(this: Input, callback: iTumblerCallback) {
    const that = this;

    if (that.type !== 'value') {
      return false;
    }

    that.element.addEventListener('keydown', on_keydown);
    that.element.addEventListener('mouseout', on_mouseout);

    function on_keydown(event: KeyboardEvent) {
      if (event.key === 'Tab' || event.key === 'Enter') {
        bubbling();
      }
    }
    function on_mouseout() {
      bubbling();
    }
    function bubbling() {
      const value: number = Number(that.element.value);
      if (that.index) {
        callback({
          value,
          index: that.index,
        });
      } else {
        callback({
          value,
          index: 0,
        });
      }
    }
  }

  on_switch_check(this: Input, tooltip: Tooltip[]) {
    const that = this;

    if (that.type !== 'tooltip') {
      return false;
    }
    that.element.addEventListener('change', () => {
      for (let i = 0; i < tooltip.length; i++) {
        if (that.element.checked) {
          tooltip[i].switch_hidden(true);
        } else {
          tooltip[i].switch_hidden(false);
        }
      }
    });
  }
}
export { Input };
