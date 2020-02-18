class Helper {
    readonly TO_THUMBLER_POSITION: number = 1e4;

    readonly TO_CONNECT_UPDATE: number = 1e2;

    constructor() {

    }

    get_position_from_value(value: number, range: T_Range): number {
      let result: number = ((value - range[0]) / (range[1] - range[0]));
      result = Math.round(result * this.TO_THUMBLER_POSITION) / this.TO_THUMBLER_POSITION;

      if (result < 0) {
        result = 0;
      }
      if (result > 1) {
        result = 1;
      }
      return result;
    }

    get_div_element_with_class(css_class: T_CSS_Classes, orientation: T_Orientation): HTMLElement {
      const str_class: string = `SRS__${css_class}`;
      const css_class_without_orientation: string = `${str_class} ${str_class}_`;

      const element: HTMLElement = document.createElement('div');
      element.setAttribute('class', (css_class_without_orientation + orientation));

      return element;
    }
}
export { Helper };
