
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

function plotHLine(map, sX, eX, y) {
    let current = {x: sX, y: y};
    let dX = Math.sign(eX - sX);
    console.log("plotting horizontal");
    while (true) {
        map[current.y][current.x]++;
        current.x += dX;
        if (current.x == eX) break;
    }
}

function plotVLine(map, sY, eY, x) {
    let current = {x: x, y: sY};
    let dY = Math.sign(eY - sY);
    console.log("plotting vertical");
    while (true) {
        map[current.y][current.x]++;
        current.y += dY;
        if (current.y == eY) break;
    }
}


function plotBLine(map, sX, sY, eX, eY) {
    return map;
}

function plotLine(map, sX, sY, eX, eY) {
    // Vertical Line
    if (sX === eX) plotVLine(map, sY, eY, sX);
    // Horizontal Line
    else if (sY === eY) plotHLine(map, sX, eX, sY);
    // Diagonal Line
    else plotBLine(map, sX, sY, eX, eY);
}

function plotMap(map, plotList) {
    // Go through each line and plot it.
    for (let i = 0; i < plotList.length; i++) {
        plotLine(map, plotList[i].start.x, plotList[i].start.y, plotList[i].end.x, plotList[i].end.y);
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

function solution1(input) {
    let result = 0;
    let plotList = formatData(input);
    let map = createMap(10);

    console.log(plotList);

    plotMap(map, plotList);

    result = countIntersections(map);

    return result;
}

function solution2(input) {
    let result = 0;

    return result;
}