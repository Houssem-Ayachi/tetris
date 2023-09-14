export default class Score{

    private _linesRemoved = 0;
    private _scorePerLine: Map<string, number> = new Map<string, number>([
        ["1", 40],
        ["2", 100],
        ["3", 300],
        ["4", 1200],
    ]);
    
    public _level = 1;
    public _score = 0;

    addScore(linesRemoved: number){
        this._score += this._scorePerLine.get(linesRemoved.toString())! * (this._level + 1);
        this._linesRemoved += linesRemoved;
        if(this._linesRemoved >= 10){
            this._level += 1;
            this._linesRemoved -= 10;
        }
        document.querySelector("#score")!.innerHTML = `score: ${this._score}`;
        document.querySelector("#level")!.innerHTML = `level: ${this._level}`;
    }
}