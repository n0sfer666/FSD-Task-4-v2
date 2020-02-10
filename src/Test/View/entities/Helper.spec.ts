import { random_number } from '../../random_number';
import { Helper } from '../../../Plugin/View/entities/Helper';

describe(`
View -> Helper
`, () => {

  let helper: Helper = new Helper();

  describe('get_position_from_value(value: number, range: T_Range): number', () => {
    for( let i = 0; i < 10; i++) {
      let range: T_Range = [random_number(-10000, -1), random_number(1, 10000)];
      let value: number = random_number(range[0] - 100, range[1] + 100);

      it(`value: ${value} on range: [${range[0]}, ${range[1]}]`, () => {

        let to_expect: number = Math.round( ( (value - range[0]) / (range[1] - range[0])) * 1e4) / 1e4; 
        if (to_expect < 0) {
          to_expect = 0;
        }
        if(to_expect > 1) {
          to_expect = 1;
        }
        let result: number = helper.get_position_from_value(value, range);

        expect(to_expect).toEqual(result);
      });
    }
  });

  describe('get_div_element_with_class( css_class: T_CSS_Classes, orientation: T_Orientation ): HTMLElement', () => {
    let classes: T_CSS_Classes[] = ['connect', 'slider', 'thumbler', 'tooltip'];
    let orientations: T_Orientation[] = ['horizontal', 'vertical'];
    for(let i = 0; i < classes.length; i++) {
      for( let j = 0; j < orientations.length; j++ ) {
        it(`class: ${classes[i]}, orientation: ${orientations[j]}`, () => {
          let to_expect: HTMLElement = document.createElement('div');
          to_expect.setAttribute('class', `SRS__${classes[i]} SRS__${classes[i]}_${orientations[j]}`);

          let result: HTMLElement = helper.get_div_element_with_class(classes[i], orientations[j]);

          expect(to_expect).toEqual(result);
        });
      }
    }
  });
});