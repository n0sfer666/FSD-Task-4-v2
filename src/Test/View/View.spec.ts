import { View } from '../../Plugin/View/View';
import { random_number } from '../random_number';

describe(`
View
`, () => {
  describe('onChangeView(callback: iTumblerCallback)', () => {
    let test_container: HTMLElement = document.createElement('div');
    document.body.append(test_container);

    let test_config: iConfigView = {
      range: [0, 100],
      start: [10, 50],
      isConnect: false,
      isTooltip: false,
      orientation: 'horizontal',
    };

    it('listener(s) was created', () => {            
      let test_callback: iTumblerCallback = function(tumblerData: tTumblerData) {
        let test: tTumblerData = tumblerData;
        test.index = tumblerData.index;
      };

      let view: View = new View(test_container, test_config);
      view.onChangeView(test_callback);

      let to_expect: boolean = true;
      for( let i = 0; i < view.tumbler.length; i++ ) {
        if(!view.tumbler[i].listening) {
          to_expect = false;
        }
      }
      expect(to_expect).toEqual(true);
    });

    if(document.body.firstChild) {
      document.body.firstChild.remove();
    }
  });

  describe('update(modelData: tModelData) and setActivetumbler()', () => {
    let test_container: HTMLElement = document.createElement('div');
    document.body.append(test_container);
    let orientations: tOrientation[] = ['horizontal', 'vertical'];
        
    for( let i = 0; i < 10; i++) {
      for( let j = 0; j < orientations.length; j++) {
        let test_config: iConfigView = {
          range: [0, 100],
          start: [10, 50],
          isConnect: true,
          isTooltip: true,
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

        let value_min: number = random_number(test_config.range[0], test_config.range[1]);
        let value_max: number = random_number(test_config.range[0], test_config.range[1]);
        if(value_max < value_min) {
          let tmp: number = value_min;
          value_min = value_max;
          value_max = tmp;
        }
        let testValue: tValue = [value_min, value_max];

        let test_modelData: tModelData = {
          index: random_number(0, 1),
          position: testPosition,
          value: testValue
        };

        it(`orientation: ${orientations[j]}, index: ${test_modelData.index}, position: ${testPosition}, value: ${testValue}`, () => {
          view.update(test_modelData);

          let i: number = test_modelData.index;

          let expect_change_class: boolean = i === 0
            ? view.tumbler[0].element.classList.contains('SRS__tumbler_active') &&
              !view.tumbler[1].element.classList.contains('SRS__tumbler_active') &&
              view.tooltip[0].element.classList.contains('SRS__tooltip_active') &&
              !view.tooltip[1].element.classList.contains('SRS__tooltip_active')
            : view.tumbler[1].element.classList.contains('SRS__tumbler_active') &&
              !view.tumbler[0].element.classList.contains('SRS__tumbler_active') &&
              view.tooltip[1].element.classList.contains('SRS__tooltip_active') &&
              !view.tooltip[0].element.classList.contains('SRS__tooltip_active');
          
          let expect_tumbler: boolean = testPosition[i] === view.tumbler[i].position;
          
          let expect_tooltip: boolean = testValue[i] === view.tooltip[i].value;

          let test_position: [number, number] = [0, 0];
          if(testPosition[1]) { 
            test_position = [Math.round(testPosition[0] * view.connect[0].TO_CONNECT_UPDATE),
              Math.round(testPosition[1] * view.connect[0].TO_CONNECT_UPDATE)];
          }
          let expect_connect: boolean = 
            test_position[0] === view.connect[0].position[0] &&
            test_position[1] === view.connect[0].position[1];

          let to_expect: boolean = expect_change_class && expect_tumbler && expect_tooltip && expect_connect;
          expect(to_expect).toEqual(true);
        });
      }
    };
  });
});