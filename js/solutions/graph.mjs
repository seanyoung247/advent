
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
                    const weight = cost + next.manhattan(goal);
                    front.push({n: next, w: weight});
                    next.parent = node;
                }
            }
            front.sort((a,b)=>b.w-a.w);
        }
        return null;
    }

    // Dijikstra's
    D(start, goal) {
        const front = [];
        const origin = new Map;
        const totalCost = new Map;

        front.push({n:start,w:0});
        origin.set(start, null);
        totalCost.set(start, 0);

        while (front.length) {
            const node = front.pop().n;

            if (node == goal) {
                return node;
            }

            for (const next of this.nodes.get(node)) {
                const cost = totalCost.get(node) + next.cost;

                if (!totalCost.has(next) || cost < totalCost.get(next)) {
                    next.parent = node;
                    totalCost.set(next, cost);
                    front.push({n:next, w:cost});
                    origin.set(next, node);
                }
            }

            front.sort((a,b)=>b.w-a.w);
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
