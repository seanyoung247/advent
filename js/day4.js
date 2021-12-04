
class Data {
    constructor(input) {
        this.list = input[0].split(',');
        this.boards = [];
        this.matrix = [];
        this.hasWon = [];
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
        for (let y = 0; y < this.matrix[b].length; y++) {
            if (this.checkRow(b, y)) return true;
            for (let x = 0; x < this.matrix[b][y].length; x++) {
                if (this.checkColumn(b,x)) return true;
            }
        }
        return false;
    }

    checkAllBoards() {
        for (let b = 0; b < this.boards.length; b++) {
            if (this.checkBoard(b)) return b;
        }
        return -1;
    }

    scoreUnmarked(b) {
        let total = 0;
        for (let y = 0; y < this.boards[b].length; y++) {
            for (let x = 0; x < this.boards[b][y].length; x++) {
                if (!this.matrix[b][y][x]) {
                    total += parseInt(this.boards[b][y][x]);
                }
            }
        }
        return total;
    }

    checkAllWon() {
        for (const board of this.hasWon) {
            if (!board) return false;
        }
        return true;
    }
}

function solution1(input) {
    let result = 0;
    let data = new Data(input);
    let winner = -1;

    for (const value of data.list) {
        data.markAllBoards(value);
        winner = data.checkAllBoards();
        if (winner != -1) {
            result = data.scoreUnmarked(winner) * parseInt(value);
            break;
        }
    }
    return result;
}

function inList(value, list) {
    for (val of list) {
        if (val.winner === value) return true; 
    }
    return false;
}

function solution2(input) {
    let result = 0;


    return result;
}