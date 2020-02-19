import { View } from '../View/View';
import { Model } from '../Model/Model';

class Presenter {
  constructor(private view: View, private model: Model) {
    this.view.onChangeView((tumblerData: tTumblerData) => {
      // console.log(tumblerData);
      this.model.setNewPosition(tumblerData);
    });
    this.model.onChangeModel((modelData: tModelData) => {
      // console.log(modelData);
      this.view.update(modelData);
    });
  }
}
export { Presenter };
