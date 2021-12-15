
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
            if (x < map.length-1) {
                graph.addVertex(map[x+1][y]);
                graph.addEdge(map[x][y], map[x+1][y]);
            }
            if (y < map[x].length-1) {
                graph.addVertex(map[x][y+1]);
                graph.addEdge(map[x][y], map[x][y+1]);
            }
        }
    }
    return graph;
}