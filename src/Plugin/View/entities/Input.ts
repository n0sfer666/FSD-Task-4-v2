import { Helper } from "./Helper";
import { Tooltip } from "./Tooltip";

class Input extends Helper {
  constructor(private type: T_Input_Type, public element: HTMLInputElement, public value?: number, public index?: number) {
    super();
    if(type === 'value') {
      this.element.value = String(this.value);
    }
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
      if(that.index) {
        callback({
          value: value,
          index: that.index
        });
      }
    }
  }
  on_switch_check(this: Input, tooltip: Tooltip[]) {
    let that = this;

    that.element.addEventListener('change', function() {
      for( let i = 0; i < tooltip.length; i++) {
        if(that.element.checked) {
          tooltip[i].switch_hidden(true);
        } else {
          tooltip[i].switch_hidden(false);
        }
      }
    })
  }
}
export { Input };