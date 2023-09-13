class Position{
    x: number;
    y: number;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    moveHorizontally(x: number){
        this.x += x;
    }

    moveVertically(y: number){
        this.y += y;
    }
}

export default Position;