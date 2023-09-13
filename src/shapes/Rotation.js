import Position from "../utils/position.js";
import Square from "./Square.js";
class Rotation {
    constructor(rotation) {
        this.rotation = rotation;
    }
    makeSquares(position, parentIndex, color) {
        let squares = [];
        for (let i = 0; i < this.rotation.length; i++) {
            for (let j = 0; j < this.rotation[i].length; j++) {
                if (this.rotation[i][j] !== 0) {
                    squares.push(new Square(new Position(position.x + j, position.y + i), parentIndex, color));
                }
            }
        }
        return squares;
    }
}
export default Rotation;
