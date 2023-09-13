import Position from "../utils/position.js";
import Rotation from "./Rotation.js";
import Color from "../utils/color.js";
class Shape {
    constructor() {
        this.currentRotation = 0; //index of the rotation currently displayed in the `rotations` array
        this.hasMultipleRotations = true;
        this.rotations = [
            new Rotation([
                [1, 1, 1, 1]
            ])
        ];
        this.isMoving = true;
        this.position = new Position(3, -this.rotations[this.currentRotation].rotation.length);
        this.color = Color.skyBlue;
    }
    moveDown() {
        this.position.moveVertically(1);
    }
    moveLeft() {
        this.position.moveHorizontally(-1);
    }
    moveRight() {
        this.position.moveHorizontally(1);
    }
    rotate() {
        if (this.hasMultipleRotations) {
            this.currentRotation += 1;
            if (this.currentRotation === this.rotations.length)
                this.currentRotation = 0;
        }
    }
    getColor() {
        switch (this.color) {
            case Color.blue:
                return "blue";
            case Color.green:
                return "green";
            case Color.orange:
                return "orange";
            case Color.purple:
                return "purple";
            case Color.red:
                return "red";
            case Color.skyBlue:
                return "skyBlue";
            case Color.yellow:
                return "yellow";
        }
    }
    getCurrentRotationSquares(ShapeIndex) {
        return this.rotations[this.currentRotation].makeSquares(this.position, ShapeIndex, this.getColor());
    }
}
export default Shape;
