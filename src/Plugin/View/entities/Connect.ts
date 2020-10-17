import Helper from './Helper';

class Connect extends Helper {
  element: HTMLElement;

  position: [number, number] = [0, 0];

  private startPosition: number;

  private endPosition: number;

  private orientation: tOrientation;

  private style: string = '';

  constructor(startPosition: number, endPosition: number, orientation: tOrientation) {
    super();
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.orientation = orientation;

    this.element = this.getDivElementWithClass('connect', this.orientation);
    this.setPosition(this.startPosition, this.endPosition);
  }

  setPosition(startPosition: number, endPosition: number) {
    const start: number = Math.round(startPosition * this.TO_CONNECT_UPDATE);
    const end: number = Math.round(endPosition * this.TO_CONNECT_UPDATE);
    this.position = [start, end];
    if (start === 0) {
      if (this.orientation === 'horizontal') {
        this.style = `width: ${end}%;`;
      } else {
        this.style = `height: ${end}%;`;
      }
    } else if (this.orientation === 'horizontal') {
      this.style = `left: ${start}%; width: ${(end - start)}%;`;
    } else {
      this.style = `top: ${start}%; height: ${(end - start)}%;`;
    }
    this.element.setAttribute('style', this.style);
  }
}
export default Connect;
