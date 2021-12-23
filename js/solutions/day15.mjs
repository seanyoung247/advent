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

function buildGraph(map) {
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
    const oldW = map[0].length;
    const newW = oldW * factor;
    const newMap = new Array(newH)
        .fill().map(()=>new Array(newW));

    for (let x = 0; x < oldH; x++) {
        for (let y = 0; y < oldW; y++) {
            newMap[x][y] = map[x][y];
            for (let r = 0; r < factor; r++) {
                for (let c = 0; c < factor; c++) {
                    if (r === 0 && c === 0) continue;
                    const cost = ((map[x][y].cost + (r + c) - 1) % 9) + 1;
                    newMap[x+(oldH*r)][y+(oldW*c)] = new Node(x+(oldH*r),y+(oldW*c),cost);
                }
            }
        }
    }
    return newMap;
}

export class Solutions {
    one(input) {
        const map = formatData([...input]);
        const graph = buildGraph(map);

        const t1 = performance.now();
        let node = graph.D(map[0][0], map.at(-1).at(-1));
        console.log("part 1 completed in: ", (performance.now() - t1)/1000, "s");

        return node.totalCost;
    }

    two(input) {
        const map = growCave(formatData([...input]), 5);
        const graph = buildGraph(map);

        const t1 = performance.now();
        let node = graph.D(map[0][0], map.at(-1).at(-1));
        console.log("part 2 completed in: ", (performance.now() - t1)/1000, "s");

        return node.totalCost;
    }
}
