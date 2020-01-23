import { View } from "../View/View";
import { Model } from "../Model/Model";

export class Presenter {
    constructor(private view: View, private model: Model) {
        view.on_thumbler_move((thumbler_data: T_Thumbler_Data) => {
            console.log(thumbler_data);
            model.set_position(thumbler_data)
        });
    }
}