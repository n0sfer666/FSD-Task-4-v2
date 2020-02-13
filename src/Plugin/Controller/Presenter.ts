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
  }
}
export {Presenter};