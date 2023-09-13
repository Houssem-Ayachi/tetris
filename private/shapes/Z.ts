import Shape from "./Shape.js";
import Rotation from "./Rotation.js";
import Color from "../utils/color.js";

class Z extends Shape{

    constructor(){
        super();
        this.color = Color.red;
        this.rotations = 
        [
            new Rotation(
                [
                    [1, 1, 0],
                    [0, 1, 1]
                ]
            ),
            new Rotation(
                [
                    [0, 1],
                    [1, 1],
                    [1, 0]
                ]
            )
        ]

    }
}

export default Z;