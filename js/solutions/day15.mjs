
function formatData(input) {
    const map = [];
    for (let x = 0; x < input.length; x++) {
        if (input[x]) {
            map.push( input[x].split('').map( (e,y)=>new Node(x,y,parseInt(e)) ) );
        }
    }
    return map;
}

const sqr = (n) => n*n; 
class Node {
    constructor(x,y,c) {
        this.x = x;
        this.y = y;
        this.cost = c;

        this.totalCost = Number.MAX_VALUE;
        this.visited = false;
        this.parent = null;
    }
    manhattan(pos) {
        return Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y);
    }
    distance(pos) {
        return Math.sqrt(sqr(this.x-pos.x) + sqr(this.y-pos.y));
    }
}

export class Graph {
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

    DA(start, goal) {
        const front = [];
        front.push({n: start, w: 0});
        start.totalCost = 0;

        while (front.length) {
            const node = front.pop().n;

            if (node === goal) {
                return node;
            }

            for (const next of this.nodes.get(node).values()) {
                const cost = node.totalCost + next.cost;

                if (!next.visited || cost < next.totalCost) {
                    next.visited = true;
                    next.totalCost = cost;
                    const weight = cost + next.distance(goal);
                    front.push({n: next, w: weight});
                    next.parent = node;
                }
            }
            front.sort((a,b)=>a.w-b.w);
        }
        return null;
    }

    D(start, goal) {
        const front = [];
        const origin = new Map;
        const totalCost = new Map;

        front.push({n:start,w:0});
        origin.set(start, null);
        totalCost.set(start, 0);

        while (front.length) {
            const node = front.pop().n;

            if (node == goal) return node;

            for (const next of this.nodes.get(node)) {
                const cost = totalCost.get(node) + next.cost;
                // console.log(node, cost);

                if (!totalCost.has(next) || cost < totalCost.get(next)) {
                    next.parent = node;
                    totalCost.set(next, cost);
                    front.push({n:next, w:cost});
                    origin.set(next, node);
                }
            }

            front.sort((a,b)=>a.w-b.w);
        }
    }
    
    DFS(start, end) {
        const stack = [];
        const path = [];
        const visited = new Map();

        stack.push(start);

        while(stack.length) {
            const vert = stack.pop();
            
            if (!visited.has(vert)) {
                visited.set(vert, true);
                path.push(vert);

                if (vert === end) return path;

                const edges = this.nodes.get(vert);
                for (const edge of edges.values()) {
                    if (!visited.has(edge)) {
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

export class Solutions {
    one(input) {
        const map = formatData([...input]);
        const graph = mapToGraph(map);

        //const node = graph.DA(map[0][0], map.at(-1).at(-1));
        let node = graph.D(map[0][0], map.at(-1).at(-1));

        let cost = 0// totalCost[node];
        // for (const node of path) {
        //     cost += node.cost;
        // }
        let last = null;
        while (node != map[0][0]) {
            if (node != last) {
                console.log(node);
                cost += node.cost;
                last = node;
                node = node.parent;
            }
        }

        return cost;
    }

    two(input) {
        return 0;
    }
}
