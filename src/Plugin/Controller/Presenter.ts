import { View } from '../View/View';
import { Model } from '../Model/Model';

class Presenter {
  constructor(private view: View, private model: Model) {
    this.view.on_change_view((thumbler_data: T_Thumbler_Data) => {
      // console.log(thumbler_data);
      this.model.set_new_position(thumbler_data);
    });
    this.model.on_change_model((model_state: T_Model_Data) => {
      // console.log(model_state);
      this.view.update(model_state);
    });
    if(this.view.input !== undefined) {
      for( let i = 0; i < this.view.input.length; i++ ) {
        this.view.input[i].addEventListener('keydown', (event: KeyboardEvent) => {
          if(event.keyCode === 9 || event.keyCode === 13) {
            if(this.view.input) {
              let position: number = this.model.get_position_from_value(
                Number(this.view.input[i].value),
                this.model.range
              );
                            
              let input_data: T_Thumbler_Data = {
                position: position,
                index: i
              };
              this.model.set_new_position(input_data);
            }
          }
        });
      }
    }
  }
}
export {Presenter};