import { random_number } from '../../random_number';
import { Helper } from '../../../Plugin/View/entities/Helper';

describe(`
View -> Helper
`, () => {

  let helper: Helper = new Helper();

  describe('getPositionFromValue(value: number, range: tRange): number', () => {
    for( let i = 0; i < 10; i++) {
      let range: tRange = [random_number(-10000, -1), random_number(1, 10000)];
      let value: number = random_number(range[0] - 100, range[1] + 100);

      it(`value: ${value} on range: [${range[0]}, ${range[1]}]`, () => {

        let to_expect: number = Math.round( ( (value - range[0]) / (range[1] - range[0])) * 1e4) / 1e4; 
        if (to_expect < 0) {
          to_expect = 0;
        }
        if(to_expect > 1) {
          to_expect = 1;
        }
        let result: number = helper.getPositionFromValue(value, range);

        expect(to_expect).toEqual(result);
      });
    }
  });

  describe('getDivElementWithClass( cssClass: tCssClasses, orientation: tOrientation ): HTMLElement', () => {
    let classes: tCssClasses[] = ['connect', 'slider', 'tumbler', 'tooltip'];
    let orientations: tOrientation[] = ['horizontal', 'vertical'];
    for(let i = 0; i < classes.length; i++) {
      for( let j = 0; j < orientations.length; j++ ) {
        it(`class: ${classes[i]}, orientation: ${orientations[j]}`, () => {
          let to_expect: HTMLElement = document.createElement('div');
          to_expect.setAttribute('class', `SRS__${classes[i]} SRS__${classes[i]}_${orientations[j]}`);

          let result: HTMLElement = helper.getDivElementWithClass(classes[i], orientations[j]);

          expect(to_expect).toEqual(result);
        });
      }
    }
  });
});