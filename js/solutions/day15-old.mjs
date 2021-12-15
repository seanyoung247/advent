
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

        this.totalCost = -1;
        this.h = -1;
        this.f = -1;
        this.parent = null;
    }
    distance(pos) {
        return Math.sqrt(sqr(this.x-pos.x) + sqr(this.y-pos.y));
    }
}

function getAdjacent(map, center) {
    const {x,y} = center;
    //const up = (x > 0) ? map[x-1][y] : null;
    const down = (x < map.length-1) ? map[x+1][y] : null;
    //const left = (y > 0) ? map[x][y-1] : null;
    const right = (y < map[x].length-1) ? map[x][y+1] : null;

    //return [up, down, left, right];
    return [down, right];
}

function aStar(map, start, goal) {
    const open = [];
    
}

// function aStar(map, start, goal) {
//     // 1
//     const open = [];
//     const path = [];
//     // 2
//     const closed = new Map();

//     open.push(start);

//     // 3
//     while (open.length) {
//         // a + b
//         const q = open.pop();
//         // c
//         const adj = getAdjacent(map, q);

//         for (const node of adj) {
//             if (!node) continue;
//             // d
//             // i
//             if (node === goal) {
//                 node.parent = q;
//                 path.push(node);
//                 closed.set(node,node);
//                 return [...closed.values()];
//             }
//             const ng = q.g + node.cost;
//             const nh = node.distance(goal);
//             const nf = ng + nh;
            
//             // ii
//             const oI = open.indexOf(node);
//             if ((oI === -1 || node.f > nf) && !closed.has(node)) {
//                 if (oI === -1) path.splice(oI,1);
//                 node.g = ng;
//                 node.h = nh;
//                 node.f = nf;
//                 open.push(node);
                
//                 path.push(node);
//                 node.parent = q;
//             }
//         }
//         closed.set(q,q);
//         // ensure lowest cost is at the front
//         open.sort((a,b)=>a.f-b.f);
//     }

//     return [];
// }

export class Solutions {
    one(input) {
        const map = formatData([...input]);
        // const graph = mapToGraph(map);

        // const pos = map[0][0];

        // const path = graph.DFS(map[0][0],map.at(-1).at(-1));
        // console.log(path);

        // graph.listConnections();       

        const path = aStar(map, map[0][0], map.at(-1).at(-1));

        console.log(path);

        let cost = 0;
        for (const step of path) {
            cost += map[step.x][step.y].cost;
        }

        return cost;
    }

    two(input) {
        return 0;
    }
}
