import Shape from "./shapes/Shape.js";
import Square from "./shapes/Square.js";
import Position from "./utils/position.js";

import {I, J, L, O, S, T, Z} from "./shapes/index.js";

class Board{

    numberOfHorizontalSquares = 10;
    numberOfVerticalSquares = 21; // only 20 is displayed with the first one hidden to spawn shapes inside (might change later depending on the heighest shape's height)
    numberOfSquares = this.numberOfHorizontalSquares * this.numberOfVerticalSquares;
    
    currentMovingShape: number = -1;
    heldShapes: Array<Shape> = [];

    horizontalMovement: number = 0; //should be set to -1 (left), 1 (right), 0 (stop)
    moveDownVelocity: number = 10;

    board: Array<Array<Square>> = [];

    constructor(){
        this.emptyBoard();
        this.addShape();
    }

    //fill the board with black squares
    emptyBoard(){
        let tempBoard: Array<Array<Square>> = [];
        for(let i=0;i<this.numberOfVerticalSquares;i++){
            let row: Array<Square> = [];
            for(let j=0;j<this.numberOfHorizontalSquares;j++){
                row.push(
                    new Square(new Position(j, i), -1, "black")
                );
            }
            tempBoard.push(row);
        }
        this.board = tempBoard;
    }

    private updateBoard(){
        this.heldShapes.forEach((shape, index) => {
            let squares = shape.getCurrentRotationSquares(index);
            squares.forEach(square => {
                try{
                    this.board[square.position.y][square.position.x] = square;
                }catch{}
            });
        });
    }

    //returns true if game is lost
    update(time: number): boolean{
        //input process
        this.moveHorizontally();
        if(this.shapeCanMoveDown()){
            if(time % this.moveDownVelocity == 0)//used to seperate down movement velocity from the playground's refresh rate (to better read input)
            this.heldShapes[this.currentMovingShape].moveDown();
        }else{
            this.heldShapes[this.currentMovingShape].isMoving = false;
            //end game if held shape is stopped at the top
            if(this.heldShapes[this.currentMovingShape].position.y <= 0){
                console.log("end");
                return true;
            }
            this.checkFullRow();
            this.addShape();
        }
        //board update
        this.emptyBoard();
        this.updateBoard();
        return false;
    }

    private moveHorizontally(){
        let movingShape = this.heldShapes[this.currentMovingShape]
        if(!this.movingShapeCollidingHorizontally()){
            if(this.horizontalMovement > 0){
                movingShape.moveRight();
            }else if(this.horizontalMovement < 0){
                movingShape.moveLeft();
            }
        }
    }

    private addShape(){
        let randomShapeNumber = Math.floor(Math.random() * 7);
        switch(randomShapeNumber){
            case 0:
                this.heldShapes.push(new I());
                break;
            case 1:
                this.heldShapes.push(new J());
                break;
            case 2:
                this.heldShapes.push(new L());
                break;
            case 3:
                this.heldShapes.push(new O());
                break;
            case 4:
                this.heldShapes.push(new S());
                break;
            case 5:
                this.heldShapes.push(new T());
                break;
            case 6:
                this.heldShapes.push(new Z());
                break;
        }
        this.currentMovingShape++;
    }

    private shapeCanMoveDown(){
        let heldShape = this.heldShapes[this.currentMovingShape];
        let heldShapeHeight = heldShape.rotations[heldShape.currentRotation].rotation.length;
        return heldShape.position.y + heldShapeHeight  <= 20 && !this.movingShapeCollidingDown();
    }

    private movingShapeCollidingHorizontally(){
        let currentMovingShape: Shape = this.heldShapes[this.currentMovingShape];
        let squares = currentMovingShape.getCurrentRotationSquares(this.currentMovingShape);
        if(this.movingShapeCollidingRighWall())
            return true;
        if(this.movingShapeCollidingLeftWall()){
            return true
        }
        for(let square of squares){
            if(this.horizontalMovement > 0){
                try{
                    let rightNeighboringSquare = this.board[square.position.y][square.position.x+1]
                    if(rightNeighboringSquare.parentIndex !== -1 && rightNeighboringSquare.parentIndex !== square.parentIndex)
                        return true;
                }catch{}
            }else if(this.horizontalMovement < 0){
                try{
                    let leftNeighboringSquare = this.board[square.position.y][square.position.x-1]
                    if(leftNeighboringSquare.parentIndex !== -1 && leftNeighboringSquare.parentIndex !== square.parentIndex)
                        return true;
                }catch{}
            }
        }
        return false;
    }

    private movingShapeCollidingRighWall(): boolean{
        let currentMovingShape: Shape = this.heldShapes[this.currentMovingShape];
        let movingShapeWidth = currentMovingShape.rotations[currentMovingShape.currentRotation].rotation[0].length;
        return this.horizontalMovement > 0 && currentMovingShape.position.x + movingShapeWidth >= this.numberOfHorizontalSquares;
    }

    private movingShapeCollidingLeftWall(): boolean{
        let currentMovingShape: Shape = this.heldShapes[this.currentMovingShape];
        return this.horizontalMovement < 0 && currentMovingShape.position.x == 0;
    }

   private  movingShapeCollidingDown(){
        let currentMovingShape: Shape = this.heldShapes[this.currentMovingShape];
        let squares = currentMovingShape.getCurrentRotationSquares(this.currentMovingShape);
        for(let square of squares){
            if(this.board[square.position.y+1][square.position.x].parentIndex !== -1 && this.board[square.position.y+1][square.position.x].parentIndex !== square.parentIndex){
                return true;
            }
        }
        return false;
    }

    rotateCurrentMovingShape(){
        //check if shape is colliding to the right
        this.heldShapes[this.currentMovingShape].rotate();
        let currentMovingShape: Shape = this.heldShapes[this.currentMovingShape];
        let movingShapeWidth = currentMovingShape.rotations[currentMovingShape.currentRotation].rotation[0].length;
        if( this.movingShapeCollidingRighWall() && currentMovingShape.position.x + movingShapeWidth >= this.numberOfHorizontalSquares){
            let offset = currentMovingShape.position.x + movingShapeWidth - this.numberOfHorizontalSquares;
            currentMovingShape.position.x -= offset;
        }else if(this.movingShapeCollidingLeftWall()){
            currentMovingShape.position.x = 0;
        }
    }

    //pretty sure there is a better to implement this function but i did this at 3 am and was basically auto-piloting sooooo good luck understanding it
    private checkFullRow(){
        let fullRows: number[] = [];
        for(let i=this.board.length - 1;i>-1;i--){//searching for all full rows
            //searching for a full row by scanning each row from bottom to top
            let row = this.board[i];
            let fullRow = true;
            for(let j=0;j<row.length;j++){
                if(row[j].parentIndex === -1){
                    fullRow = false;
                    break;
                }
            }
            if(fullRow)
                fullRows.push(i);
        }
        if(fullRows.length > 0){
            for(let i of fullRows){
                this.heldShapes.forEach((shape, parentIndex) => {
                    let shapeSquares = shape.getCurrentRotationSquares(parentIndex);
                    for(let k=0;k<shapeSquares.length;k++){
                        let square = shapeSquares[k];
                        if(square.position.y == i){//found a square in the full row
                            let rotationRowIndex = square.position.y - shape.position.y;
                            let rotation = shape.rotations[shape.currentRotation].rotation;
                            rotation.splice(rotationRowIndex, 1);//remove the row in the full Board row
                            if(rotation.length === 0){//if shape has no squares in it left remove it
                                this.heldShapes.splice(parentIndex, 1);
                                this.currentMovingShape--;
                            }
                            break;
                        }
                    }
                });
                this.moveShapesDown(i);
            }
        }
    }

    private moveShapesDown(startRow: number){
        for(let shape of this.heldShapes){
            if(shape.position.y < startRow){
                shape.position.y++;
            }
        }
    }

}

export default Board;