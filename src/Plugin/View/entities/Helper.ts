class Helper {
    readonly TO_TUMBLER_POSITION: number = 1e4;

    readonly TO_CONNECT_UPDATE: number = 1e2;

    getPositionFromValue(value: number, range: tRange): number {
      let result: number = ((value - range[0]) / (range[1] - range[0]));
      result = Math.round(result * this.TO_TUMBLER_POSITION) / this.TO_TUMBLER_POSITION;

      if (result < 0) {
        result = 0;
      }
      if (result > 1) {
        result = 1;
      }
      return result;
    }

    getDivElementWithClass(cssClass: tCssClasses, orientation: tOrientation): HTMLElement {
      const strClass: string = `SRS__${cssClass}`;
      const cssClassWithoutOrientation: string = `${strClass} ${strClass}_`;
      const element: HTMLElement = document.createElement('div');
      element.setAttribute('class', (cssClassWithoutOrientation + orientation));
      return element;
    }
}
export default Helper;
