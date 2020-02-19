import { Helper } from './Helper';

class Connect extends Helper {
    element: HTMLElement;

    position: [number, number] = [0, 0];

    constructor(
      private startPosition: number,
      private endPosition: number,
      private orientation: tOrientation,
    ) {
      super();

      this.element = this.getDivElementWithClass('connect', this.orientation);
      this.setPosition(this.startPosition, this.endPosition);
    }

    setPosition(startPosition: number, endPosition: number) {
      const start: number = Math.round(startPosition * this.TO_CONNECT_UPDATE);
      const end: number = Math.round(endPosition * this.TO_CONNECT_UPDATE);

      this.position = [start, end];
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
