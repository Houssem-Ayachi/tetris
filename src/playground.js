class Playground {
    constructor(ctx, squareSize, board) {
        this.ctx = ctx;
        this.squareSize = squareSize;
        this.board = board;
        this.width = this.squareSize * this.board.numberOfHorizontalSquares;
        this.height = this.squareSize * this.board.numberOfVerticalSquares;
    }
    displayBoard(hasFullRow) {
        for (let i = 0; i < this.board.board.length; i++) {
            for (let j = 0; j < this.board.board[i].length; j++) {
                let square = this.board.board[i][j];
                this.ctx.fillStyle = square.color;
                this.ctx.fillRect(square.position.x * this.squareSize, square.position.y * this.squareSize, this.squareSize - 1, this.squareSize - 1);
            }
        }
    }
    emptyBoard() {
        for (let i = 0; i < this.board.board.length; i++) {
            for (let j = 0; j < this.board.board[i].length; j++) {
                let square = this.board.board[i][j];
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(square.position.x * this.squareSize, square.position.y * this.squareSize, this.squareSize - 1, this.squareSize - 1);
            }
        }
    }
    //for debugging
    printRow(row) {
        for (let square of row) {
            console.log(square);
        }
    }
    init() {
        this.board.emptyBoard();
        this.displayBoard(false);
        document.addEventListener("keydown", e => {
            switch (e.key) {
                case "ArrowLeft":
                case "a":
                    this.board.horizontalMovement = -1;
                    break;
                case "ArrowRight":
                case "d":
                    this.board.horizontalMovement = 1;
                    break;
                case "ArrowDown":
                case "s":
                    this.board.moveDownVelocity = 2;
                    break;
                case " ":
                    this.board.rotateCurrentMovingShape();
            }
        });
        document.addEventListener("keyup", e => {
            switch (e.key) {
                case "ArrowLeft":
                case "a":
                    this.board.horizontalMovement = 0;
                    break;
                case "ArrowRight":
                case "d":
                    this.board.horizontalMovement = 0;
                    break;
                case "ArrowDown":
                case "s":
                    this.board.moveDownVelocity = 10;
                    break;
            }
        });
    }
    play() {
        let time = 0;
        const interval = setInterval(() => {
            time++;
            let { gameIsFinished, hasFullRow } = this.board.update(time);
            if (gameIsFinished)
                clearInterval(interval);
            this.displayBoard(hasFullRow);
        }, 50);
    }
}
export default Playground;
