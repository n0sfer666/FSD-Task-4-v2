import { View } from "../View/View";
import { Model } from "../Model/Model";

export class Presenter {
    constructor(private view: View, private model: Model) {
        view.on_thumbler_move((thumbler_data: T_Thumbler_Data) => {
            // console.log(thumbler_data);
            model.set_new_position(thumbler_data);
        });
        model.on_change_model((model_state: T_Model_Data) => {
            // console.log(model_state);
            view.update(model_state);
        })
    }
}