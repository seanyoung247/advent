
class Board {
    constructor() {
        this.board = [];
        this.marked = [];
        this.hasWon = false;
    }
    
    addRow(row) {
        this.board.push(row);
        this.marked.push([false,false,false,false,false]);
    }

    _checkRow(row) {
        for (const cell of this.marked[row]) {
            if (!cell) return false;
        }
        return true;
    }

    _checkCol(col) {
        for (const row of this.marked) {
            if(!row[col]) return false;
        }
        return true;
    }

    check() {
        if (!this.hasWon) {
            for (let row = 0; row < this.marked.length; row++) {
                if (this._checkRow(row)) {
                    this.hasWon = true;
                    return true;
                }
            }
            for (let col = 0; col < this.marked.length; col++) {
                if (this._checkCol(col)) {
                    this.hasWon = true;
                    return true;
                }
            }
        }
        return false;
    }

    mark(num) {
        if (!this.hasWon) {
            for (let row = 0; row < this.board.length; row++) {
                for (let col = 0; col < this.board[row].length; col++) {
                    if (this.board[row][col] === num) {
                        this.marked[row][col] = true;
                        return;
                    }
                }
            }
        }
    }

    scoreUnmarked() {
        let total = 0;
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (!this.marked[row][col]) {
                    total += this.board[row][col];
                }
            }
        }
        return total;
    }
}

function formatData(input) {
    // Get number list
    input = [...input];
    const game = {
        numbers: input.shift().split(',').map(Number),
        boards: [],
        winners: [],
    }
    // Build boards
    for (const line of input) {
        if (!line) {
            // Start a new board on an empty line
            game.boards.push(new Board());
        } else {
            game.boards[game.boards.length - 1]
                .addRow(line.split(' ').filter(i => i).map(Number));
        }
    }

    return game;
}

function play(game) {
    for (const num of game.numbers) {
        for (const board of game.boards) {
            // Mark the boards
            board.mark(num);
            // Check for winner
            if (board.check()) {
                game.winners.push({
                    board: game.boards.indexOf(board),
                    number: num
                });
            }
        }
    }
}

export class Solutions {
    one(input) {
        const game = formatData(input);
        play(game);

        const winner = game.winners[0].board;
        const number = game.winners[0].number;

        return (game.boards[winner].scoreUnmarked() * number);
    }

    two(input) {
        const game = formatData(input);
        play(game);

        const winner = game.winners[game.winners.length-1].board;
        const number = game.winners[game.winners.length-1].number;

        return (game.boards[winner].scoreUnmarked() * number);
    }
}
