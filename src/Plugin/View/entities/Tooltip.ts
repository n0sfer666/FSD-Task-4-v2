import { Helper } from './Helper';

class Tooltip extends Helper {
    element: HTMLElement;

    constructor(public value: number, private orientation: tOrientation) {
      super();

      this.element = this.getDivElementWithClass('tooltip', this.orientation);
      this.setInnerText(this.value);
    }

    setInnerText(value: number) {
      const val: number = value > 0
        ? Math.floor(value)
        : Math.ceil(value);

      this.value = val;
      this.element.innerText = String(val);
    }

    switchHidden(this: Tooltip, isVisible: boolean) {
      const that: Tooltip = this;
      if (isVisible) {
        that.element.hidden = false;
      } else {
        that.element.hidden = true;
      }
    }
}
export { Tooltip };
