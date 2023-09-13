import Position from "../utils/position.js"
import Rotation from "./Rotation.js";
import Color from "../utils/color.js";
import Square from "./Square";

interface IShape{
    position: Position;
    hasMultipleRotations: boolean;
    rotations: Array<Rotation>;
    currentRotation: number;//index of the rotation currently displayed in the `rotations` array
    isMoving: boolean;
    color: Color;

    moveDown(): void;
    moveLeft(): void;
    moveRight(): void;
    rotate(): void;
    getColor(): string;
    getCurrentRotationSquares(shapeIndex: number): Array<Square>;
}

class Shape implements IShape{
    currentRotation: number = 0;//index of the rotation currently displayed in the `rotations` array
    hasMultipleRotations: boolean = true;
    rotations: Array<Rotation> = [
        new Rotation(
            [
                [1, 1, 1, 1]
            ]
        )
    ];
    isMoving: boolean = true;
    position: Position = new Position(3, -this.rotations[this.currentRotation].rotation.length);
    color: Color = Color.skyBlue;

    moveDown(): void {
        this.position.moveVertically(1);
    }

    moveLeft(): void {
        this.position.moveHorizontally(-1);
    }

    moveRight(): void {
        this.position.moveHorizontally(1);
    }

    rotate(): void {
        if(this.hasMultipleRotations){
            this.currentRotation += 1;
            if(this.currentRotation === this.rotations.length)
                this.currentRotation = 0;
        }
    }

    getColor(): string {
        switch(this.color){
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

    getCurrentRotationSquares(ShapeIndex: number): Array<Square>{
        return this.rotations[this.currentRotation].makeSquares(this.position, ShapeIndex, this.getColor());
    }
}

export default Shape;