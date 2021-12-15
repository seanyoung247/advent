
function formatData(input) {
    const map = [];
    let x = 0;
    for (const line of input) {
        map.push(line.split('').map(
            (e,y) => new Position( x, y, parseInt(e) )
        ));
        x++;
    }
    return map;
}

const sqr = (n) => n*n; 
class Position {
    constructor(x,y,v) {
        this.x = x;
        this.y = y;
        this.value = v;
    }
    distance(pos) {
        return Math.sqrt(sqr(x-pos.x) + sqr(y-pos.y));
    }
}

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addVertex(vertex) {
        if (!this.nodes.has(vertex)) {
            this.nodes.set(vertex, new Set());
        }
    }

    addEdge(v1, v2) {
        if (this.nodes.has(v1) && this.nodes.has(v2)) {
            this.nodes.get(v1).add(v2);
            this.nodes.get(v2).add(v1);
        }
    }

    get nodeMap() {return this.nodes;}

    aStar(start, end) {
        const distances = new Map();
        const priorities = new Map();

        priorities.add()
    }
    
    DFS(start, end) {
        const stack = [];
        const path = [];
        const visited = {};

        stack.push(start);

        while(stack.length) {
            const vert = stack.pop();
            
            if (!visited[vert]) {
                visited[vert] = true;
                path.push(vert);

                if (vert === end) return path;

                const edges = this.nodes.get(vert);
                for (const edge of edges.values()) {
                    if (!visited[edge]) {
                        console.log(edge);
                        stack.push(edge);
                    }
                }
            }
        }
        return [];
    }

    listConnections() {
        this.nodes.forEach((node, index) => console.log(`${index} -> ${[...node]}`) );
    }
}

function mapToGraph(map) {
    const graph = new Graph();
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            const pos = map[x][y];
            const right = map[x][y-1];
            const down = map[x][y-1];
            
            graph.addVertex(pos);
            if (y < map[x].length-1) graph.addVertex(right);
            if (x < map.length-1) graph.addVertex(down);

            graph.addEdge(pos, right);
            graph.addEdge(pos, down);
        }
    }
    return graph;
}

export class Solutions {
    one(input) {
        const map = formatData([...input]);
        const graph = mapToGraph(map);
        console.log(map[0][0]===map[0][0]);
        console.log(map[0][0]===map.at(-1).at(-1));
        const path = graph.DFS(map[0][0],map.at(-1).at(-1));
       // graph.listConnections();

        let cost = 0;
        for (const step of path) {
            cost += map[step.x][step.y].value;
        }

        return cost;
    }

    two(input) {
        return 0;
    }
}
