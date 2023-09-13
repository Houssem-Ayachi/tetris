import Position from "../utils/position.js";
import Square from "./Square.js";

class Rotation{
    rotation: Array<Array<number>>;

    constructor(rotation: Array<Array<number>>){
        this.rotation = rotation;
    }

    makeSquares(position: Position, parentIndex: number, color: string): Array<Square>{
        let squares: Array<Square> = [];
        for(let i=0;i<this.rotation.length;i++){
            for(let j=0;j<this.rotation[i].length;j++){
                if(this.rotation[i][j] !== 0){
                    squares.push(new Square(new Position(position.x+j, position.y+i), parentIndex, color));
                }
            }
        }
        return squares;
    }
}

export default Rotation;