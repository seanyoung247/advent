
const sqr = (n) => n*n; 
export class Node {
    constructor(x,y,c) {
        this.x = x;
        this.y = y;
        this.cost = c;

        this.totalCost = Number.MAX_VALUE;
        this.h = Number.MAX_VALUE;
        this.parent = null;
    }
    // Manhattan distance
    manhattan(pos) {
        return Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y);
    }
    // Euclidean distance
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

    // Modified aStar
    DA(start, goal) {
        const front = [];
        front.push(start);
        start.totalCost = start.h = 0;

        while (front.length) {
            const node = front.pop();

            if (node === goal) {
                return node;
            }

            for (const next of this.nodes.get(node).values()) {
                const cost = node.totalCost + next.cost;

                if (!next.visited || cost < next.totalCost) {
                    next.visited = true;
                    next.totalCost = cost;
                    next.h = cost + next.manhattan(goal);
                    front.push(next);
                    next.parent = node;
                }
            }
            front.sort((a,b)=>b.h-a.h);
        }
        return null;
    }

    // Dijikstra's
    D(start, goal) {
        const front = [];
        const origin = new Map;
        const totalCost = new Map;

        start.totalCost = 0;
        front.push(start);

        while (front.length) {
            const node = front.pop();

            if (node == goal) {
                return node;
            }

            for (const next of this.nodes.get(node)) {
                const cost = node.totalCost + next.cost;
                
                if (cost < next.totalCost) {
                    next.parent = node;
                    next.totalCost = cost;
                    front.push(next);
                }
            }

            front.sort((a,b)=>b.totalCost-a.totalCost);
        }
    }
    
    // Depth first search
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
