
function formatData(input) {
    for (let i = 0; i < input.length; i++) {
        const tmp = input[i].split('-');
        input[i] = {start: tmp[0], end: tmp[1]};
    }
    return input;
}

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    buildGraph(connections) {
        for (const con of connections) {
            this.addVertex(con.start);
            this.addVertex(con.end);
            this.addEdge(con.start, con.end);
        }
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
    
    findPathDFS(start, end) {
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
                        stack.push(edge);
                    }
                }
            }
        }
        return [];
    }

    findAllPaths(start, end) {
        const stack = [];
        const visited = {};
        const allPaths = [];
        const nodes = this.nodes;

        traverse(start, end);

        function traverse(start, end) {
            stack.push(start);
            visited[start] = true;

            if (start === end) allPaths.push(stack);
            else {
                const edges = nodes.get(start);
                for (const edge of edges.values()) {
                    if (!visited[edge]) traverse(edge, end);
                }
            }

            stack.pop();
            delete visited[start];
        }
        return allPaths;
    }

    listConnections() {
        this.nodes.forEach((node, index) => console.log(`${index} -> ${[...node]}`) );
    }
}

function findAllPaths(nodes, start, end) {
    function traverse(nodes, visited, loc, end) {
        let count = 0;

        if (loc === end) return 1;

        if (loc === loc.toLowerCase()) visited[loc] = true;

        const edges = nodes.get(loc);
        for (const edge of edges.values()) {
            if (!visited[edge]) count += traverse(nodes, visited, edge, end);
        }

        delete visited[loc];
        return count;
    }

    return traverse(nodes, {}, start, end);
}

export class Solutions {
    one(input) {
        input = formatData([...input]);
        
        const graph = new Graph();
        graph.buildGraph(input);

        return findAllPaths(graph.nodeMap, "start", "end");
    }

    two(input) {
        input = formatData([...input]);
        
        const graph = new Graph();
        graph.buildGraph(input);

        graph.listConnections();
        
        return 0;
    }
}
