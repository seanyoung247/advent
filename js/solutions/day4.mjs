
class Data {
    constructor(input) {
        this.list = input[0].split(',');
        this.boards = [];
        this.matrix = [];
        this.hasWon = [];
        this.winners = [];
        let b = -1;
    
        for (let i = 1; i < input.length; i++) {
            if (input[i] == "") {
                // Starting a new board
                this.boards.push([]); b++;
                this.matrix.push([]);
                this.hasWon.push(false);
            } else {
                // Adding a row to an existing board
                this.boards[b].push(input[i].split(' ').filter(i => i));
                this.matrix[b].push([false,false,false,false,false]);
            }
        }
    }

    markAllBoards(value) {
        for (let b = 0; b < this.boards.length; b++) {
            for (let y = 0; y < this.boards[b].length; y++) {
                for (let x = 0; x < this.boards[b][y].length; x++) {
                    if (this.boards[b][y][x] === value) {
                        this.matrix[b][y][x] = true;
                    }
                }
            }
        }
    }

    checkRow(b, y) {
        for (let val of this.matrix[b][y]) {
            if (!val) return false;
        }
        return true;
    }
    checkColumn(b, x) {
        for (let val of this.matrix[b]) {
            if (!val[x]) return false;
        }
        return true;
    }

    checkBoard(b) {
        if (!this.hasWon[b]) {
            for (let y = 0; y < this.matrix[b].length; y++) {
                if (this.checkRow(b, y)) return true;
                for (let x = 0; x < this.matrix[b][y].length; x++) {
                    if (this.checkColumn(b,x)) return true;
                }
            }
        }
        return false;
    }

    checkAllBoards() {
        for (let b = 0; b < this.boards.length; b++) {
            if (this.checkBoard(b)) {
                this.hasWon[b] = true;
                this.winners.push(b);
                return b;
            }

        }
        return -1;
    }

    scoreUnmarked(b) {
        let total = 0;
        console.log(b);
        for (let y = 0; y < this.boards[b].length; y++) {
            for (let x = 0; x < this.boards[b][y].length; x++) {
                if (!this.matrix[b][y][x]) {
                    total += parseInt(this.boards[b][y][x]);
                }
            }
        }
        console.log(this.matrix[b]);
        console.log(total);
        return total;
    }

    checkAllWon() {
        for (const board of this.hasWon) {
            if (!board) return false;
        }
        return true;
    }
}

function inList(value, list) {
    for (val of list) {
        if (val.winner === value) return true; 
    }
    return false;
}


export class Solutions {
    one(input) {
        let result = 0;
        let data = new Data(input);
        let winner = -1;

        for (const value of data.list) {
            data.markAllBoards(value);
            winner = data.checkAllBoards();
        }
        result = data.scoreUnmarked(62) * parseInt(data.winners[62]);
        return result;
    }

    two(input) {
        let result = 0;
        let data = new Data(input);
        let winner = -1;

        for (const value of data.list) {
            data.markAllBoards(value);
            winner = data.checkAllBoards();
        }
        console.log(data.winners);
        result = data.scoreUnmarked(60) * parseInt(60);
        
        return result;
    }
}