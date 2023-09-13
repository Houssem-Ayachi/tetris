import Position from "../utils/position.js";

class Square{

    position: Position;
    parentIndex: number;
    color: string;

    constructor(position: Position, parentIndex: number, color: string){
        this.position = position;
        this.parentIndex = parentIndex;
        this.color = color;
    }

}

export default Square;