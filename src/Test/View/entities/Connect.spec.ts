import { Connect } from '../../../Plugin/View/entities/Connect';

describe(`
View -> Connect
`, () => {
  describe('setPosition(startPosition: number, endPosition: number)', () => {
    const orientations: tOrientation[] = ['horizontal', 'vertical'];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < orientations.length; j++) {
        const connect: Connect = new Connect(0, 0, orientations[j]);
        let startPosition: number = Math.random();
        let endPosition: number = Math.random();
        if (endPosition < startPosition) {
          const tmp: number = startPosition;
          startPosition = endPosition;
          endPosition = tmp;
        }

        it(`startPosition: ${startPosition}, endPosition: ${endPosition} orientation: ${orientations[j]}`, () => {
          const start: number = Math.round(startPosition * connect.TO_CONNECT_UPDATE);
          const end: number = Math.round(endPosition * connect.TO_CONNECT_UPDATE);

          const toExpect: string = start === 0
            ? orientations[j] === 'horizontal'
              ? `width: ${end}%;`
              : `height: ${end}%;`
            : orientations[j] === 'horizontal'
              ? `left: ${start}%; width: ${(end - start)}%;`
              : `top: ${start}%; height: ${(end - start)}%;`;

          connect.setPosition(startPosition, endPosition);
          let result: string;

          result = connect.element.getAttribute('style')!;
          expect(toExpect).toEqual(result);
        });
      }
    }
  });
});
