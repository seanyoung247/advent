
function formatData(input) {
    const graph = new Map();

    for (const line of input) {
        const edge = line.split('-');

        if (edge[0] != "end" && edge[1] != "start") {
            if (!graph.has(edge[0])) graph.set(edge[0], new Set());
            graph.get(edge[0]).add(edge[1]);
        }
        if (edge[0] != "start" && edge[1] != "end") {
            if(!graph.has(edge[1])) graph.set(edge[1], new Set());
            graph.get(edge[1]).add(edge[0]);
        }

    }
    return graph;
}

function traverse(graph, visited, loc, end, small = true) {
    if (loc === end) return 1;
    
    let visits = Object.assign({}, visited);
    visits[loc] = (visits[loc]||0) + 1;

    let count = 0;
    const edges = graph.get(loc).values();
    for (const edge of edges) {
        if (!visits[edge]) {
            count += traverse(graph, visits, edge, end, small);
        } else if (edge === edge.toUpperCase) {
            count += traverse(graph, visits, edge, end, small);
        } else if (visits[edge] < 2 && !small) {
            count += traverse(graph, visits, edge, end, true);
        }
    }

    return count;
}

export class Solutions {
    one(input) {
        const graph = formatData([...input]);
        return traverse(graph, {}, "start", "end", true);
    }

    two(input) {
        const graph = formatData([...input]);
        return traverse(graph, {}, "start", "end", false);
    }
}
