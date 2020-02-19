import { View } from '../../Plugin/View/View';
import { makeRandomNumber } from '../makeRandomNumber';

describe(`
View
`, () => {
  describe('onChangeView(callback: iTumblerCallback)', () => {
    const testContainer: HTMLElement = document.createElement('div');
    document.body.append(testContainer);

    const testConfig: iConfigView = {
      range: [0, 100],
      start: [10, 50],
      isConnect: false,
      isTooltip: false,
      orientation: 'horizontal',
    };

    it('listener(s) was created', () => {
      const testCallback: iTumblerCallback = function (tumblerData: tTumblerData) {
        const test: tTumblerData = tumblerData;
        test.index = tumblerData.index;
      };

      const view: View = new View(testContainer, testConfig);
      view.onChangeView(testCallback);

      let toExpect: boolean = true;
      for (let i = 0; i < view.tumbler.length; i++) {
        if (!view.tumbler[i].listening) {
          toExpect = false;
        }
      }
      expect(toExpect).toEqual(true);
    });

    if (document.body.firstChild) {
      document.body.firstChild.remove();
    }
  });

  describe('update(modelData: tModelData) and setActivetumbler()', () => {
    const testContainer: HTMLElement = document.createElement('div');
    document.body.append(testContainer);
    const orientations: tOrientation[] = ['horizontal', 'vertical'];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < orientations.length; j++) {
        const testConfig: iConfigView = {
          range: [0, 100],
          start: [10, 50],
          isConnect: true,
          isTooltip: true,
          orientation: orientations[j],
        };
        const view: View = new View(testContainer, testConfig);

        let minPosition: number = ((Math.random() * 1e4) / 1e4);
        let maxPosition: number = ((Math.random() * 1e4) / 1e4);
        if (maxPosition < minPosition) {
          const tmp: number = minPosition;
          minPosition = maxPosition;
          maxPosition = tmp;
        }
        const testPosition: tPosition = [minPosition, maxPosition];

        let minValue: number = makeRandomNumber(testConfig.range[0], testConfig.range[1]);
        let maxValue: number = makeRandomNumber(testConfig.range[0], testConfig.range[1]);
        if (maxValue < minValue) {
          const tmp: number = minValue;
          minValue = maxValue;
          maxValue = tmp;
        }
        const testValue: tValue = [minValue, maxValue];

        const testModelData: tModelData = {
          index: makeRandomNumber(0, 1),
          position: testPosition,
          value: testValue,
        };

        it(`orientation: ${orientations[j]}, index: ${testModelData.index}, position: ${testPosition}, value: ${testValue}`, () => {
          view.update(testModelData);

          const i: number = testModelData.index;

          const expectChangeClass: boolean = i === 0
            ? view.tumbler[0].element.classList.contains('SRS__tumbler_active')
              && !view.tumbler[1].element.classList.contains('SRS__tumbler_active')
              && view.tooltip[0].element.classList.contains('SRS__tooltip_active')
              && !view.tooltip[1].element.classList.contains('SRS__tooltip_active')
            : view.tumbler[1].element.classList.contains('SRS__tumbler_active')
              && !view.tumbler[0].element.classList.contains('SRS__tumbler_active')
              && view.tooltip[1].element.classList.contains('SRS__tooltip_active')
              && !view.tooltip[0].element.classList.contains('SRS__tooltip_active');

          const expectTumbler: boolean = testPosition[i] === view.tumbler[i].position;

          const expectTooltip: boolean = testValue[i] === view.tooltip[i].value;

          let testPosition: [number, number] = [0, 0];
          if (testPosition[1]) {
            testPosition = [Math.round(testPosition[0] * view.connect[0].TO_CONNECT_UPDATE),
              Math.round(testPosition[1] * view.connect[0].TO_CONNECT_UPDATE)];
          }
          const expectConnect: boolean = testPosition[0] === view.connect[0].position[0]
            && testPosition[1] === view.connect[0].position[1];

          const toExpect: boolean = expectChangeClass && expectTumbler && expectTooltip && expectConnect;
          expect(toExpect).toEqual(true);
        });
      }
    }
  });
});
