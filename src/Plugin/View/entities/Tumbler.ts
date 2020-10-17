import Helper from './Helper';

class Tumbler extends Helper {
    element: HTMLElement;

    listening: boolean = false;

    constructor(public position: number, private orientation: tOrientation, private index: number) {
      super();

      this.element = this.getDivElementWithClass('tumbler', this.orientation);
      this.setNewPosition(this.position);
    }

    setNewPosition(position: number) {
      this.position = position;

      const liter: string = this.orientation === 'horizontal' ? 'X' : 'Y';

      const style: string = `transform: translate${liter}(${Math.round(position * this.TO_TUMBLER_POSITION)}%);`;
      this.element.setAttribute('style', style);
    }

    getShift(element: HTMLElement, event: MouseEvent): number {
      const result: number = this.orientation === 'horizontal'
        ? event.clientX - element.getBoundingClientRect().left
        : event.clientY - element.getBoundingClientRect().top;

      return result;
    }

    onMousedownAndMove(this: Tumbler, container: HTMLElement, callback: iTumblerCallback) {
      const that = this;
      that.listening = true;

      that.element.addEventListener('mousedown', (event: MouseEvent) => {
        event.preventDefault();

        const shift: number = this.getShift(that.element, event);

        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('mouseup', onMouseup);

        function onMousemove(event: MouseEvent) {
          let newPosition: number;
          let newPositionPercent: number;
          let position: number;

          if (that.orientation === 'horizontal') {
            newPosition = event.clientX - shift - container.getBoundingClientRect().left;
            newPositionPercent = newPosition / container.offsetWidth;
          } else {
            newPosition = event.clientY - shift - container.getBoundingClientRect().top;
            newPositionPercent = newPosition / container.offsetHeight;
          }


          position = newPositionPercent;

          if (position > 1) {
            position = 1;
          }
          if (position < 0) {
            position = 0;
          }

          callback({
            position,
            index: that.index,
          });
        }

        function onMouseup() {
          document.removeEventListener('mousemove', onMousemove);
          document.removeEventListener('mouseup', onMouseup);
        }
      });
    }
}
export default Tumbler;
