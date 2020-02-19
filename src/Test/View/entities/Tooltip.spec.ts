import { makeRandomNumber } from '../../makeRandomNumber';
import { Tooltip } from '../../../Plugin/View/entities/Tooltip';

describe(`
View -> Tooltip
`, () => {
  const tooltip: Tooltip = new Tooltip(0, 'horizontal');

  describe('setInnerText(value: number)', () => {
    for (let i = 0; i < 10; i++) {
      const value: number = makeRandomNumber(-10000, 10000);
      it(`value: ${value}`, () => {
        const toExpect: string = String(value);

        tooltip.setInnerText(value);

        expect(toExpect).toEqual(tooltip.element.innerText);
      });
    }
  });
  describe('switchHidden(isVisible: boolean)', () => {
    it('tooltip not hidden when isVisible true', () => {
      tooltip.element.hidden = true;
      tooltip.switchHidden(true);
      expect(tooltip.element.hidden).toBe(false);
    });
    it('tooltip hidden when isVisible false', () => {
      tooltip.element.hidden = false;
      tooltip.switchHidden(false);
      expect(tooltip.element.hidden).toBe(true);
    });
  });
});
