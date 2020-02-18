import { View } from '../../Plugin/View/View';
import { random_number } from '../random_number';

describe(`
View
`, () => {
  describe('on_change_view(callback: iTumblerCallback)', () => {
    let test_container: HTMLElement = document.createElement('div');
    document.body.append(test_container);

    let test_config: iConfigView = {
      value_range: [0, 100],
      value_start: [10, 50],
      is_connect: false,
      is_tooltip: false,
      orientation: 'horizontal',
    };

    it('listener(s) was created', () => {            
      let test_callback: iTumblerCallback = function(thumbler_state: tTumblerData) {
        let test: tTumblerData = thumbler_state;
        test.index = thumbler_state.index;
      };

      let view: View = new View(test_container, test_config);
      view.on_change_view(test_callback);

      let to_expect: boolean = true;
      for( let i = 0; i < view.thumbler.length; i++ ) {
        if(!view.thumbler[i].listening) {
          to_expect = false;
        }
      }
      expect(to_expect).toEqual(true);
    });

    if(document.body.firstChild) {
      document.body.firstChild.remove();
    }
  });

  describe('update(model_state: tModelData) and set_active_thumbler()', () => {
    let test_container: HTMLElement = document.createElement('div');
    document.body.append(test_container);
    let orientations: tOrientation[] = ['horizontal', 'vertical'];
        
    for( let i = 0; i < 10; i++) {
      for( let j = 0; j < orientations.length; j++) {
        let test_config: iConfigView = {
          value_range: [0, 100],
          value_start: [10, 50],
          is_connect: true,
          is_tooltip: true,
          orientation: orientations[j],
        };
        let view: View = new View(test_container, test_config);

        let position_min: number = ( ( Math.random() * 1e4 ) / 1e4 );
        let position_max: number = ( ( Math.random() * 1e4 ) / 1e4 );
        if(position_max < position_min) {
          let tmp: number = position_min;
          position_min = position_max;
          position_max = tmp;
        }
        let testPosition: tPosition = [position_min, position_max];

        let value_min: number = random_number(test_config.value_range[0], test_config.value_range[1]);
        let value_max: number = random_number(test_config.value_range[0], test_config.value_range[1]);
        if(value_max < value_min) {
          let tmp: number = value_min;
          value_min = value_max;
          value_max = tmp;
        }
        let testValue: tValue = [value_min, value_max];

        let test_model_state: tModelData = {
          index: random_number(0, 1),
          position: testPosition,
          value: testValue
        };

        it(`orientation: ${orientations[j]}, index: ${test_model_state.index}, position: ${testPosition}, value: ${testValue}`, () => {
          view.update(test_model_state);

          let i: number = test_model_state.index;

          let expect_change_class: boolean = i === 0
            ? view.thumbler[0].element.classList.contains('SRS__thumbler_active') &&
              !view.thumbler[1].element.classList.contains('SRS__thumbler_active') &&
              view.tooltip[0].element.classList.contains('SRS__tooltip_active') &&
              !view.tooltip[1].element.classList.contains('SRS__tooltip_active')
            : view.thumbler[1].element.classList.contains('SRS__thumbler_active') &&
              !view.thumbler[0].element.classList.contains('SRS__thumbler_active') &&
              view.tooltip[1].element.classList.contains('SRS__tooltip_active') &&
              !view.tooltip[0].element.classList.contains('SRS__tooltip_active');
          
          let expect_thumbler: boolean = testPosition[i] === view.thumbler[i].thumbler_position;
          
          let expect_tooltip: boolean = testValue[i] === view.tooltip[i].tooltip_value;

          let test_connectPosition: [number, number] = [0, 0];
          if(testPosition[1]) { 
            test_connectPosition = [Math.round(testPosition[0] * view.connect[0].TO_CONNECT_UPDATE),
              Math.round(testPosition[1] * view.connect[0].TO_CONNECT_UPDATE)];
          }
          let expect_connect: boolean = 
            test_connectPosition[0] === view.connect[0].connectPosition[0] &&
            test_connectPosition[1] === view.connect[0].connectPosition[1];

          let to_expect: boolean = expect_change_class && expect_thumbler && expect_tooltip && expect_connect;
          expect(to_expect).toEqual(true);
        });
      }
    };
  });
});