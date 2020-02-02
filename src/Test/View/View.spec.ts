import { View } from "../../Plugin/View/View";

describe(`
View
`, () => {
    describe('on_change_view(callback: I_Thumbler_State)', () => {
        let test_container: HTMLElement = document.createElement('div');
        document.body.append(test_container);

        let config: I_Configuration_View = {
            value_range: [0, 100],
            value_start: [10, 50],
            is_connect: false,
            is_tooltip: false,
            orientation: 'horizontal',
        }

        it('callback was bubbly', () => {            
            let test_callback: I_Thumbler_State = function(thumbler_state: T_Thumbler_Data) {
                let test: string = 'test';
            }

            let view: View = new View(test_container, config);
            view.on_change_view(test_callback);

            let to_expect: boolean = true;
            for( let i = 0; i < view.thumbler.length; i++ ) {
                if(!view.thumbler[i].listening) {
                    to_expect = false;
                }
            }
            expect(to_expect).toEqual(true);
        })

        if(document.body.firstChild) {
            document.body.firstChild.remove();
        }
    })
})