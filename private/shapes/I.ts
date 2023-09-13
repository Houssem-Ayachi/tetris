import Shape from "./Shape.js";
import Rotation from "./Rotation.js";

class I extends Shape{
    
    constructor(){
        super();
        this.rotations = 
        [
            new Rotation(
                [
                    [1, 1, 1, 1]
                ]
            ),
            new Rotation(
                [
                    [1],
                    [1],
                    [1],
                    [1]
                ]
            )
        ];
    }
}

export default I;