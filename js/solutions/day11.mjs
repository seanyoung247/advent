
function formatData(input) {
    return (input.map((i)=>i.split('').map((i)=>parseInt(i))));
}

function inBounds(map, row, col) {
    if (row < 0 || row >= map.length) return false;
    if (col < 0 || col >= map[row].length) return false;
    return true;
}

function powerUp(map) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            map[row][col]++;
        }
    }
}

function flash(map, row, col) {
    for (let r = row-1; r <= row+1; r++) {
        for (let c = col-1; c <= col+1; c++) {
            if (inBounds(map, r, c)) {
                if (map[r][c] > 0) {
                    map[r][c]++;
                }
            }
        }
    }
    return 0;
}

function checkFlashed(map, flashers=null) {
    let ret = 0;
    let flashed = 0

    do {
        flashed = 0;
        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[row].length; col++) {
                if (map[row][col] > 9) {
                    flashed++;
                    map[row][col] = 0;
                    flash(map, row, col);
                    if (flashers) flashers[row][col] = true;
                }
            }
        }
        ret += flashed;
    } while (flashed > 0);
    return ret;
}

function allHaveFlashed(flashers) {
    let ret = true;
    for (let row = 0; row < flashers.length; row++) {
        for (let col = 0; col < flashers[row].length; col++) {
            if (!flashers[row][col]) ret = false;
            flashers[row][col] = false;
        }
    }
    return ret;
}

export class Solutions {
    one(input) {
        let result = 0;
        const cycles = 100;
        input = formatData(input);
        
        for (let i = 0; i < cycles; i++) {
            // Go through all octopuses and increase them by one.
            powerUp(input);
            // Flash cycle
            result += checkFlashed(input, );
        }

        return result;
    }

    two(input) {
        let result = 0;
        const cycles = 100;
        input = formatData(input);
        const flashers = new Array(input.length).fill()
            .map((e,i)=>new Array(input[i].length).fill(false));
        // Assume it's less than 1000 to avoid infinte loops, ok?
        while (result < 1000) {
            result++;
            // Go through all octopuses and increase them by one.
            powerUp(input);
            // Flash cycle
            checkFlashed(input, flashers);
            // Check if every octopus has flashed
            if (allHaveFlashed(flashers)) break;
        }
        return result;
    }
}
