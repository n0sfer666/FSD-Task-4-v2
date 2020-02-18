import { Tumbler } from '../../../Plugin/View/entities/tumbler';
import { random_number } from '../../random_number';

describe(`
View -> tumbler
`, () => {
  describe('setNewPosition(position: number)', () => {
    let orientations: tOrientation[] = ['horizontal', 'vertical'];
    for( let i = 0; i < 10; i++ ) {
      for( let j = 0; j < orientations.length; j++ ) {
        let position: number = Math.random();
        let tumbler: Tumbler = new Tumbler(position, orientations[j], 0);
                
        it(`position: ${position}, orientation: ${orientations[j]}`, () => {
          let liter: string = orientations[j] === 'horizontal' ? 'X' : 'Y';

          let to_expect: string = `transform: translate${liter}(${ Math.round(position * tumbler.TO_TUMBLER_POSITION) }%);`;

          tumbler.setNewPosition(position);
          let result: string = tumbler.element.getAttribute('style')!;

          expect(to_expect).toEqual(result);
        });
      } 
    }
  });

  describe('getShift(element: HTMLElement, event: MouseEvent): number', () => {
    let orientations: tOrientation[] = ['horizontal', 'vertical'];

    let test_container: HTMLElement = document.createElement('div');
    document.body.setAttribute('style', 'margin: 0; padding: 0;');
    document.body.append(test_container);

    for( let i = 0; i < 10; i++ ) {
      for( let j = 0; j < orientations.length; j++ ) {
        let tumbler: Tumbler = new Tumbler(0, orientations[j], 0);

        let margin: number = random_number(5, 55);
        let event_client: number = margin + random_number(1, 15);

        let event_test: MouseEvent = document.createEvent('MouseEvent');
        event_test.initMouseEvent('click', true, true, window, 0, 0, 0,
          event_client, // event.clientX
          event_client, // event.clientY
          false, false, false, false, 0, null);

        test_container.setAttribute('style', `margin: ${margin}px;`);
        test_container.append(tumbler.element);
        let str_for_it: string = orientations[j] === 'horizontal'
          ? `orientation: ${orientations[j]}, getBounding...().left: ${tumbler.element.getBoundingClientRect().left}, clientX: ${event_client}`
          : `orientation: ${orientations[j]}, getBounding...().top: ${tumbler.element.getBoundingClientRect().top}, clientY: ${event_client}`;
        it(str_for_it, () => {
          let to_expect: number = orientations[j] === 'horizontal'
            ? event_test.clientX - tumbler.element.getBoundingClientRect().left
            : event_test.clientY - tumbler.element.getBoundingClientRect().top;
          let result: number = tumbler.getShift(tumbler.element, event_test);

          expect(to_expect).toEqual(result);
        });
        if(test_container.firstChild) {
          test_container.firstChild.remove();
        }

      }
    }
  });

  describe('onMousedownAndMove(this: tumbler, container: HTMLElement, callback: iTumblerCallback)', () => {
    let orientations: tOrientation[] = ['horizontal', 'vertical'];

    document.body.setAttribute('style', 'margin: 0; padding: 0;');
    let test_container: HTMLElement = document.createElement('div');
    document.body.append(test_container);

    for( let i = 0; i < 10; i++ ) {
      for( let j = 0; j < orientations.length; j++ ) {
        let index: number = random_number(0, 1);
        let position: number = Math.random();
        let tumbler: Tumbler = new Tumbler(position, orientations[j], index);
                
        let result: tTumblerData = { 
          position: 0,
          index: 0
        };

        let test_callback: iTumblerCallback = function(tumblerData: tTumblerData) {
          result.position = tumblerData.position,
          result.index = tumblerData.index;
        };

        let size_of_container: number = 300;
                
        let margin: number = random_number(5, 55);
        test_container.setAttribute('style', `width: ${size_of_container}px; height: ${size_of_container}px; margin: ${margin}px;`);

        let value_event_mousedown: number = margin + (Math.round(position * size_of_container)) + random_number(1, 15);
        let value_event_mousemove: number = random_number(-1000, 1000);

        let event_mousedown_test: MouseEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          clientX: value_event_mousedown,
          clientY: value_event_mousedown
        });
        let event_mousemove_test: MouseEvent = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX: value_event_mousemove,
          clientY: value_event_mousemove
        });

        it(`orientation: ${orientations[j]}, container.getBound...: ${margin}, event_client(mousedown): ${value_event_mousedown}, event_client(mousemove): ${value_event_mousemove}`, () => {
          let to_expect: tTumblerData = {
            position: 0,
            index: 0,
          };

          let newPosition: number, newPositionPercent: number, position: number;
          let shift: number = tumbler.getShift(tumbler.element, event_mousedown_test);
          newPosition = value_event_mousemove - shift - margin;
          newPositionPercent = newPosition / size_of_container;

          position = newPositionPercent;

          if(position > 1) {
            position = 1;
          }
          if(position < 0) {
            position = 0;
          }

          to_expect.position = position;
          to_expect.index = index;

          tumbler.onMousedownAndMove(test_container, test_callback);
          tumbler.element.dispatchEvent(event_mousedown_test);
          tumbler.element.dispatchEvent(event_mousemove_test);

          setTimeout(() => {
            expect(to_expect).toEqual(result);
          }, 500);
        });
      }
    }
    if(document.body.firstChild) {
      document.body.firstChild.remove();
    }
  });
});