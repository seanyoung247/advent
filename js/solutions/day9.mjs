
function formatData(input) {
    const ret = [];
    for (const line of input) {
        ret.push(line.split(''));
    }
    return ret;
}

function getCell(data, row, col) {
    if (row < 0 || row >= data.length) return 9;
    if (col < 0 || col >= data[row].length) return 9;
    return parseInt(data[row][col]);
}

function cellIsLowest(data, row, col) {
    const current = getCell(data, row, col);
    return (
        current < getCell(data, row, col-1) && // Up
        current < getCell(data, row, col+1) && // Down
        current < getCell(data, row-1, col) && // Left
        current < getCell(data, row+1, col)    // Right
    );
}

function mapBasin(data, visited, row, col, w) {
    if (getCell(data, row, col) != 9 && !visited[(col + row * w)]) {
        let total = 1;
        visited[(col + row * w)] = true;

        total += mapBasin(data, visited, row - 1, col, w); // Up
        total += mapBasin(data, visited, row + 1, col, w); // Down
        total += mapBasin(data, visited, row, col - 1, w); // Left
        total += mapBasin(data, visited, row, col + 1, w); // Right
        return total;
    }
    return 0;
}

export class Solutions {
    one(input) {
        let result = 0;
        input = formatData(input);

        for (let row = 0; row < input.length; row++) {
            for (let col = 0; col < input[row].length; col++) {
                if (cellIsLowest(data, row, col)) {
                    result += getCell(data, row, col) + 1;
                }
            }
        }

        return result;
    }

    two(input) {
        let result = 0;
        const lowPoints = [];
        const basins = [];
        input = formatData(input);
        
        // Discover low points
        for (let row = 0; row < input.length; row++) {
            for (let col = 0; col < input[row].length; col++) {
                if (cellIsLowest(input, row, col)) {
                    lowPoints.push({
                        height: getCell(input, row, col) + 1,
                        row: row,
                        col, col
                    });
                }
            }
        }
        // col + (row * width)
        const w = input[0].length;
        for (const point of lowPoints) {
            const visited = new Array(input.length * w).fill(false);
            basins.push(mapBasin(input, visited, point.row, point.col, w));
        }
        basins.sort((a,b)=>b-a);
        console.log(basins);
        return (basins[0] * basins[1] * basins[2]);
    }
}
