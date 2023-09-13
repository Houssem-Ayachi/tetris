class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    moveHorizontally(x) {
        this.x += x;
    }
    moveVertically(y) {
        this.y += y;
    }
}
export default Position;
