import Helper from './Helper';
import Tooltip from './Tooltip';

class Input extends Helper {
  private type: tInputType;

  public element: HTMLInputElement;

  public value: number = 0;

  public index: number = 0;

  constructor(type: tInputType, element: HTMLInputElement, value?: number, index?: number) {
    super();
    this.type = type;
    this.element = element;
    if (value) {
      this.value = value;
    }
    if (index) {
      this.index = index;
    }
    if (type === 'value') {
      if (this.value !== undefined) {
        this.element.value = String(this.value);
      }
    }
  }

  onKeydownOrMouseout(this: Input, callback: iTumblerCallback) {
    const that = this;

    if (that.type !== 'value') {
      return false;
    }

    that.element.addEventListener('keydown', onKeydown);
    that.element.addEventListener('mouseout', onMouseout);

    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'Tab' || event.key === 'Enter') {
        action();
      }
    }
    function onMouseout() {
      action();
    }
    function action() {
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

  onSwitchCheck(this: Input, tooltip: Tooltip[]) {
    const that = this;

    if (that.type !== 'tooltip') {
      return false;
    }
    that.element.addEventListener('change', () => {
      for (let i = 0; i < tooltip.length; i++) {
        if (that.element.checked) {
          tooltip[i].switchHidden(true);
        } else {
          tooltip[i].switchHidden(false);
        }
      }
    });
  }
}
export default Input;
