import Shape from "./Shape.js";
import Rotation from "./Rotation.js";
import Color from "../utils/color.js";
class J extends Shape {
    constructor() {
        super();
        this.color = Color.blue;
        this.rotations =
            [
                new Rotation([
                    [1, 0, 0],
                    [1, 1, 1]
                ]),
                new Rotation([
                    [1, 1],
                    [1, 0],
                    [1, 0]
                ]),
                new Rotation([
                    [0, 1],
                    [0, 1],
                    [1, 1]
                ]),
                new Rotation([
                    [1, 1, 1],
                    [0, 0, 1]
                ]),
            ];
    }
}
export default J;
