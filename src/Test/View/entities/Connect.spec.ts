import { Connect } from '../../../Plugin/View/entities/Connect';

describe(`
View -> Connect
`, () => {

    describe('set_connect_position(position_start: number, position_end: number)', () => {
        let orientations: T_Orientation[] = ['horizontal', 'vertical'];
        for( let i =  0; i < 10; i++ ) {
            for( let j = 0; j < orientations.length; j++ ) {
                let connect: Connect = new Connect(0, 0, orientations[j]);
                let position_start: number = Math.random();
                let position_end: number = Math.random();
                if( position_end < position_start ) {
                    let tmp: number = position_start;
                    position_start = position_end;
                    position_end = tmp;
                }

                it(`position_start: ${position_start}, position_end: ${position_end} orientation: ${orientations[j]}`, () => {
                    let start: number = Math.round(position_start * connect.TO_CONNECT_UPDATE);
                    let end: number = Math.round(position_end * connect.TO_CONNECT_UPDATE);
                    
                    let to_expect: string = start === 0
                            ? orientations[j] === 'horizontal'
                                ? `width: ${end}%;`
                                : `height: ${end}%;`
                            : orientations[j] === 'horizontal'
                                ? `left: ${start}%; width: ${(end - start)}%;`
                                : `top: ${start}%; height: ${(end - start)}%;`;

                    connect.set_connect_position(position_start, position_end);
                    let result: string;
                    
                    result = connect.element.getAttribute('style')!
                    expect(to_expect).toEqual(result);
                })
            }
        }
    })
})