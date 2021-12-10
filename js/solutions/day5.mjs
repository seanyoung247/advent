
function formatData(input) {
    let plotList = [];
    for (const line of input) {
        if (line !== "") {
            let plot = {start: {x:0,y:0}, end:{x:0,y:0}};
            // Split out beginning and end coords
            const temp = line.split(' -> ');
            // Split out start x,y
            let coord = temp[0].split(',');
            plot.start.x = parseInt(coord[0]);
            plot.start.y = parseInt(coord[1]);
            // Split out end x,y  
            coord = temp[1].split(',');
            plot.end.x = parseInt(coord[0]);
            plot.end.y = parseInt(coord[1]); 
            // Add to list
            plotList.push(plot);
        }
    }
    return plotList;
}

function createMap(count) {
    let map = new Array(count);
    for (let i=0; i<count; i++) {
        map[i] = new Array(count);
        for (let j=0; j<count; j++) {
            map[i][j] = 0;
        }
    }
    return map;
}

// Bresenhams Line algorithm
function plotBLine(map, sX, sY, eX, eY) {
    var dx = Math.abs(eX - sX);
    var dy = Math.abs(eY - sY);
    var sx = (sX < eX) ? 1 : -1;
    var sy = (sY < eY) ? 1 : -1;
    var error = dx - dy;
 
    while(true) {
        map[sY][sX]++;
        if ((sX === eX) && (sY === eY)) break;
        const e2 = 2 * error;
        if (e2 > -dy) { error -= dy; sX += sx; }
        if (e2 < dx) { error += dx; sY += sy; }
    }
}

function plotLine(map, d, sX, sY, eX, eY) {
    // Vertical Line
    if (sX === eX) plotBLine(map, sX, sY, eX, eY);
    // Horizontal Line
    else if (sY === eY) plotBLine(map, sX, sY, eX, eY);
    // Diagonal line
    else if (d) plotBLine(map, sX, sY, eX, eY);
}


function plotMap(map, plotList, d) {
    // Go through each line and plot it.
    for (const plot of plotList) {
        plotLine(map, d, plot.start.x, plot.start.y, plot.end.x, plot.end.y);
    }
}

function countIntersections(map) {
    let ret = 0;
    for (const column of map) {
        for (const row of column) {
            if (row > 1) ret++;
        }
    }
    return ret;
}

function solve(input, d) {
    let plotList = formatData(input);
    let map = createMap(1000);

    plotMap(map, plotList, d);
    return countIntersections(map);
}

export class Solutions {
    one(input) {
        return solve(input, false);
    }

    two(input) {
        return solve(input, true);
    }
}