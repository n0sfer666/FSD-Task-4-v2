import { Helper } from './Helper';

class Connect extends Helper {
    element: HTMLElement;

    connectPosition: [number, number] = [0, 0];

    constructor(private position_start: number, private position_end: number, private orientation: tOrientation) {
      super();

      this.element = this.get_div_element_with_class('connect', this.orientation);
      this.set_connectPosition(this.position_start, this.position_end);
    }

    set_connectPosition(position_start: number, position_end: number) {
      const start: number = Math.round(position_start * this.TO_CONNECT_UPDATE);
      const end: number = Math.round(position_end * this.TO_CONNECT_UPDATE);

      this.connectPosition = [start, end];
      const style: string = start === 0
        ? this.orientation === 'horizontal'
          ? `width: ${end}%;`
          : `height: ${end}%;`
        : this.orientation === 'horizontal'
          ? `left: ${start}%; width: ${(end - start)}%;`
          : `top: ${start}%; height: ${(end - start)}%;`;

      this.element.setAttribute('style', style);
    }
}
export { Connect };
