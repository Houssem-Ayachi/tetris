import Shape from "./Shape.js";
import Rotation from "./Rotation.js";
import Color from "../utils/color.js";
class O extends Shape {
    constructor() {
        super();
        this.color = Color.yellow;
        this.hasMultipleRotations = false;
        this.rotations =
            [
                new Rotation([
                    [1, 1],
                    [1, 1]
                ]),
            ];
    }
}
export default O;
