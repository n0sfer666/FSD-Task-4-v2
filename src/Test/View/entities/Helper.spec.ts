import { makeRandomNumber } from '../../makeRandomNumber';
import { Helper } from '../../../Plugin/View/entities/Helper';

describe(`
View -> Helper
`, () => {
  const helper: Helper = new Helper();

  describe('getPositionFromValue(value: number, range: tRange): number', () => {
    for (let i = 0; i < 10; i++) {
      const range: tRange = [makeRandomNumber(-10000, -1), makeRandomNumber(1, 10000)];
      const value: number = makeRandomNumber(range[0] - 100, range[1] + 100);

      it(`value: ${value} on range: [${range[0]}, ${range[1]}]`, () => {
        let toExpect: number = Math.round(((value - range[0]) / (range[1] - range[0])) * 1e4) / 1e4;
        if (toExpect < 0) {
          toExpect = 0;
        }
        if (toExpect > 1) {
          toExpect = 1;
        }
        const result: number = helper.getPositionFromValue(value, range);

        expect(toExpect).toEqual(result);
      });
    }
  });

  describe('getDivElementWithClass( cssClass: tCssClasses, orientation: tOrientation ): HTMLElement', () => {
    const classes: tCssClasses[] = ['connect', 'slider', 'tumbler', 'tooltip'];
    const orientations: tOrientation[] = ['horizontal', 'vertical'];
    for (let i = 0; i < classes.length; i++) {
      for (let j = 0; j < orientations.length; j++) {
        it(`class: ${classes[i]}, orientation: ${orientations[j]}`, () => {
          const toExpect: HTMLElement = document.createElement('div');
          toExpect.setAttribute('class', `SRS__${classes[i]} SRS__${classes[i]}_${orientations[j]}`);

          const result: HTMLElement = helper.getDivElementWithClass(classes[i], orientations[j]);

          expect(toExpect).toEqual(result);
        });
      }
    }
  });
});
