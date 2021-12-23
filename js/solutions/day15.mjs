import { Graph, Node } from './graph.mjs';

function formatData(input) {
    const map = [];
    for (let x = 0; x < input.length; x++) {
        if (input[x]) {
            map.push( input[x].split('').map( (e,y)=>new Node(x,y,parseInt(e)) ) );
        }
    }
    return map;
}

function mapToGraph(map) {
    const graph = new Graph();
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            graph.addVertex(map[x][y]);

            if (y < map[x].length-1) {
                graph.addVertex(map[x][y+1]);
                graph.addEdge(map[x][y], map[x][y+1]);
            }

            if (x < map.length-1) {
                graph.addVertex(map[x+1][y]);
                graph.addEdge(map[x][y], map[x+1][y]);
            }
        }
    }
    return graph;
}

function growCave(map, factor) {
    const oldH = map.length;
    const newH = oldH * factor;
    const newMap = new Array(newH);
    const calcVal = (x, y, oldH, oldW) => (
        Math.floor( (((map[x % oldH][y % oldW].cost +   // Old Value
            ((x / oldH) + (y / oldW))) - 1) % 9 )+1)    // Scale to new position
    );

    for (let x = 0; x < newH; x++) {
        const oldW = map[x % oldH].length;
        const newW = oldW * factor;
        newMap[x] = new Array(newW);
        for (let y = 0; y < newW; y++) {
            newMap[x][y] = new Node(x, y, calcVal(x,y,oldH,oldW));
        }
    }
    return newMap;
} 

function costPath(start, end) {
    let cost = 0;
    let node = end;
    let pLen = 0; 
    while (node != start) {
        cost += node.cost;
        node = node.parent;
        pLen++;
    }
    return cost;
}

export class Solutions {
    one(input) {
        const map = formatData([...input]);
        const graph = mapToGraph(map);

        const t1 = performance.now();
        let node = graph.D(map[0][0], map.at(-1).at(-1));
        console.log("part 1 completed in: ", (performance.now() - t1)/1000, "s");

        console.log(node.totalCost);

        return costPath(map[0][0], node);
    }

    two(input) {
        const map = growCave(formatData([...input]), 5);
        const graph = mapToGraph(map);

        const t1 = performance.now();
        let node = graph.D(map[0][0], map.at(-1).at(-1));
        console.log("part 2 completed in: ", (performance.now() - t1)/1000, "s");

        console.log(node.totalCost);

        return costPath(map[0][0], node);
    }
}
