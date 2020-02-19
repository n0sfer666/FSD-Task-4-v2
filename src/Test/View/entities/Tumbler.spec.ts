import { Tumbler } from '../../../Plugin/View/entities/tumbler';
import { makeRandomNumber } from '../../makeRandomNumber';

describe(`
View -> tumbler
`, () => {
  describe('setNewPosition(position: number)', () => {
    const orientations: tOrientation[] = ['horizontal', 'vertical'];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < orientations.length; j++) {
        const position: number = Math.random();
        const tumbler: Tumbler = new Tumbler(position, orientations[j], 0);

        it(`position: ${position}, orientation: ${orientations[j]}`, () => {
          const liter: string = orientations[j] === 'horizontal' ? 'X' : 'Y';

          const toExpect: string = `transform: translate${liter}(${Math.round(position * tumbler.TO_TUMBLER_POSITION)}%);`;

          tumbler.setNewPosition(position);
          const result: string = tumbler.element.getAttribute('style')!;

          expect(toExpect).toEqual(result);
        });
      }
    }
  });

  describe('getShift(element: HTMLElement, event: MouseEvent): number', () => {
    const orientations: tOrientation[] = ['horizontal', 'vertical'];

    const testContainer: HTMLElement = document.createElement('div');
    document.body.setAttribute('style', 'margin: 0; padding: 0;');
    document.body.append(testContainer);

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < orientations.length; j++) {
        const tumbler: Tumbler = new Tumbler(0, orientations[j], 0);

        const margin: number = makeRandomNumber(5, 55);
        const eventClient: number = margin + makeRandomNumber(1, 15);

        const eventTest: MouseEvent = document.createEvent('MouseEvent');
        eventTest.initMouseEvent('click', true, true, window, 0, 0, 0,
          eventClient, // event.clientX
          eventClient, // event.clientY
          false, false, false, false, 0, null);

        testContainer.setAttribute('style', `margin: ${margin}px;`);
        testContainer.append(tumbler.element);
        const description: string = orientations[j] === 'horizontal'
          ? `orientation: ${orientations[j]}, getBounding...().left: ${tumbler.element.getBoundingClientRect().left}, clientX: ${eventClient}`
          : `orientation: ${orientations[j]}, getBounding...().top: ${tumbler.element.getBoundingClientRect().top}, clientY: ${eventClient}`;
        it(description, () => {
          const toExpect: number = orientations[j] === 'horizontal'
            ? eventTest.clientX - tumbler.element.getBoundingClientRect().left
            : eventTest.clientY - tumbler.element.getBoundingClientRect().top;
          const result: number = tumbler.getShift(tumbler.element, eventTest);

          expect(toExpect).toEqual(result);
        });
        if (testContainer.firstChild) {
          testContainer.firstChild.remove();
        }
      }
    }
  });

  describe('onMousedownAndMove(this: tumbler, container: HTMLElement, callback: iTumblerCallback)', () => {
    const orientations: tOrientation[] = ['horizontal', 'vertical'];

    document.body.setAttribute('style', 'margin: 0; padding: 0;');
    const testContainer: HTMLElement = document.createElement('div');
    document.body.append(testContainer);

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < orientations.length; j++) {
        const index: number = makeRandomNumber(0, 1);
        const position: number = Math.random();
        const tumbler: Tumbler = new Tumbler(position, orientations[j], index);

        const result: tTumblerData = {
          position: 0,
          index: 0,
        };

        const testCallback: iTumblerCallback = function (tumblerData: tTumblerData) {
          result.position = tumblerData.position,
          result.index = tumblerData.index;
        };

        const containerSize: number = 300;

        const margin: number = makeRandomNumber(5, 55);
        testContainer.setAttribute('style', `width: ${containerSize}px; height: ${containerSize}px; margin: ${margin}px;`);

        const valueEventMousedown: number = margin + (Math.round(position * containerSize)) + makeRandomNumber(1, 15);
        const valueEventMousemove: number = makeRandomNumber(-1000, 1000);

        const testEventMousedown: MouseEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          clientX: valueEventMousedown,
          clientY: valueEventMousedown,
        });
        const testEventMousemove: MouseEvent = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX: valueEventMousemove,
          clientY: valueEventMousemove,
        });

        it(`orientation: ${orientations[j]}, container.getBound...: ${margin}, eventClient(mousedown): ${valueEventMousedown}, eventClient(mousemove): ${valueEventMousemove}`, () => {
          const toExpect: tTumblerData = {
            position: 0,
            index: 0,
          };

          let newPosition: number; let newPositionPercent: number; let
            position: number;
          const shift: number = tumbler.getShift(tumbler.element, testEventMousedown);
          newPosition = valueEventMousemove - shift - margin;
          newPositionPercent = newPosition / containerSize;

          position = newPositionPercent;

          if (position > 1) {
            position = 1;
          }
          if (position < 0) {
            position = 0;
          }

          toExpect.position = position;
          toExpect.index = index;

          tumbler.onMousedownAndMove(testContainer, testCallback);
          tumbler.element.dispatchEvent(testEventMousedown);
          tumbler.element.dispatchEvent(testEventMousemove);

          setTimeout(() => {
            expect(toExpect).toEqual(result);
          }, 500);
        });
      }
    }
    if (document.body.firstChild) {
      document.body.firstChild.remove();
    }
  });
});
