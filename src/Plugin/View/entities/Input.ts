import { Helper } from "./Helper";

class Input extends Helper {
  constructor(public element: HTMLInputElement, public value: number, public index: number) {
    super();
    this.element.value = String(this.value);
  }
  on_keydown_or_mouseout(this: Input, callback: I_Thumbler_State) {
    let that = this;

    that.element.addEventListener('keydown', on_keydown);
    that.element.addEventListener('mouseout', on_mouseout);

    function on_keydown(event: KeyboardEvent) {
      if(event.keyCode === 9 || event.keyCode === 13) {
        bubbling();
      }
    }
    function on_mouseout() {
      bubbling();
    }
    function bubbling() {
      let value: number = Number(that.element.value);
      callback({
        value: value,
        index: that.index
      });
    }
  }
  on_switch_check(this: Input, callback: I_Tooltip_Switch[]) {
    let that = this;

    that.element.addEventListener('change', function() {
      for( let i = 0; i < callback.length; i++) {
        if(that.element.checked) {
          callback[i](true);
        } else {
          callback[i](false);
        }
      }
    })
  }
}
export { Input };