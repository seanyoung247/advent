
let intersections = 0;

function formatData(input) {
    let plotList = [];
    let temp = '';
    let coord = [];
    //x,y -> x,y
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== "") {
            let plot = {start: {x:0,y:0}, end:{x:0,y:0}};
            // Split out beginning and end coords
            temp = input[i].split(' -> ');
            // Split out start x,y
            coord = temp[0].split(',');
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
    var err = dx - dy;
 
    while(true) {
        map[sY][sX]++; // Do what you need to for this
 
       if ((sX === eX) && (sY === eY)) break;
       var e2 = 2*err;
       if (e2 > -dy) { err -= dy; sX  += sx; }
       if (e2 < dx) { err += dx; sY  += sy; }
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
    for (let i = 0; i < plotList.length; i++) {
        plotLine(map, d, plotList[i].start.x, plotList[i].start.y, plotList[i].end.x, plotList[i].end.y);
    }
}

function countIntersections(map) {
    let ret = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] > 1) ret++;
        }
    }
    return ret;
}

function drawMap(map) {
    let line = '';
    for (let y = 0; y < map.length; y++) {
        line = `${y}:`;
        for (let x = 0; x < map[y].length; x++) {
            line += map[y][x];
        }
    } 
}

function solution1(input) {
    let result = 0;
    let plotList = formatData(input);
    let map = createMap(1000);

    plotMap(map, plotList, false);

    result = countIntersections(map);

    return result;
}

function solution2(input) {
    let result = 0;
    let plotList = formatData(input);
    let map = createMap(1000);

    plotMap(map, plotList, true);

    result = countIntersections(map);

    return result;
}