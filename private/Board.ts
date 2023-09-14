import Shape from "./shapes/Shape.js";
import Square from "./shapes/Square.js";
import Position from "./utils/position.js";

import {I, J, L, O, S, T, Z} from "./shapes/index.js";
import Score from "./Score.js";

class Board{
    numberOfHorizontalSquares = 10;
    numberOfVerticalSquares = 21; // only 20 is displayed with the first one hidden to spawn shapes inside (might change later depending on the heighest shape's height)
    numberOfSquares = this.numberOfHorizontalSquares * this.numberOfVerticalSquares;
    
    currentMovingShape: number = -1;
    heldShapes: Array<Shape> = [];

    horizontalMovement: number = 0; //should be set to -1 (left), 1 (right), 0 (stop)
    moveDownVelocity: number = 10;

    board: Array<Array<Square>> = [];
    scoreHandler: Score;

    constructor(scoreHandler: Score){
        this.emptyBoard();
        this.addShape();
        this.scoreHandler = scoreHandler;
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
        const movingShapeSquares = this.heldShapes[this.currentMovingShape].getCurrentRotationSquares(this.currentMovingShape);
        for(let square of movingShapeSquares){
            try{
                this.board[square.position.y][square.position.x] = square;
            }catch{}
        }
    }

    pasteShapeOnBoard(shape: Shape, shapeIndex: number){
        for(let square of shape.getCurrentRotationSquares(shapeIndex)){
            try{
                this.board[square.position.y][square.position.x] = square;
            }catch{}
        }
    }

    removeMovingShapeFromBoard(){
        const shape = this.heldShapes[this.currentMovingShape];
        for(let square of shape.getCurrentRotationSquares(this.currentMovingShape)){
            try{
                this.board[square.position.y][square.position.x] = new Square(new Position(square.position.x, square.position.y), -1, "black");
            }catch{};
        }
    }

    //returns true if game is lost
    update(time: number){
        this.removeMovingShapeFromBoard();
        //input process
        this.moveHorizontally();
        if(this.shapeCanMoveDown()){
            if(time % this.moveDownVelocity == 0){//used to seperate down movement velocity from the playground's refresh rate (to better read input)
                this.heldShapes[this.currentMovingShape].moveDown();
            }
        }else{
            this.heldShapes[this.currentMovingShape].isMoving = false;
            this.pasteShapeOnBoard(this.heldShapes[this.currentMovingShape], this.currentMovingShape);
            //end game if held shape is stopped at the top
            if(this.heldShapes[this.currentMovingShape].position.y <= 0){
                console.log("end");
                return true;
            }
            const fullRowCount = this.checkFullRow();
            if(fullRowCount){
                this.scoreHandler.addScore(fullRowCount);
            }
            this.addShape();
        }
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
        this.removeMovingShapeFromBoard();
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
        let linesCount = 0;
        for(let i=0;i<this.board.length;i++){
            let isFullRow = true;
            for(let j=0;j<this.board[i].length;j++){
                if(this.board[i][j].parentIndex === -1){
                    isFullRow = false;
                    break;
                }
            }
            if(isFullRow){
                linesCount++;
                this.moveRowsDown(i);
            }
        }
        return linesCount;
    }

    private moveRowsDown(startRow: number){
        for(let i=startRow;i>0;i--){
            for(let j=0;j<this.board[startRow].length;j++){
                this.board[i][j].parentIndex = this.board[i-1][j].parentIndex;
                this.board[i][j].color = this.board[i-1][j].color;
            }   
        }
    }

}

export default Board;