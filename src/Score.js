export default class Score {
    constructor() {
        this._linesRemoved = 0;
        this._scorePerLine = new Map([
            ["1", 40],
            ["2", 100],
            ["3", 300],
            ["4", 1200],
        ]);
        this._level = 1;
        this._score = 0;
    }
    addScore(linesRemoved) {
        this._score += this._scorePerLine.get(linesRemoved.toString()) * (this._level + 1);
        this._linesRemoved += linesRemoved;
        console.log(this._linesRemoved);
        if (this._linesRemoved > 10) {
            this._level += 1;
            this._linesRemoved -= 10;
        }
        ``;
        document.querySelector("#score").innerHTML = `score: ${this._score}`;
        document.querySelector("#level").innerHTML = `level: ${this._level}`;
    }
}
