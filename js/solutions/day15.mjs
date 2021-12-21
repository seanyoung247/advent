
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

        this.dist = Number.MAX_VALUE;
        this.visited = false;
        this.f = 0;
        this.parent = null;
    }
    distance(pos) {
        //return Math.sqrt(sqr(this.x-pos.x) + sqr(this.y-pos.y));
        return Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y);
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

function dSetup(map) {
    const d = new Map();
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            d.set(map[x][y], Number.MAX_VALUE);
        }
    }
    return d;
}

function dijkstra(map, start) {
    const dist = dSetup(map);
    dist.set(start, 0);
    const pq = [];
    start.f = 0;
    pq.push(start);

    while (pq.length) {
        const current = pq.pop();
        current.visited = true;

        const adjacent = getAdjacent(map, current);
        for (const next of adjacent) {
            if (next) {
                const d = next.cost;
                if (!next.visited) {
                    const oldCost = dist.get(next);
                    const newCost = dist.get(current) + d;
                    if (newCost < oldCost) {
                        next.f = newCost;
                        pq.push(next);
                        dist.set(next, newCost);
                    }
                }
            }
            pq.sort((a,b)=>b.f-a.f);
        }
    }
    return dist;
}

export class Solutions {
    one(input) {
        const map = formatData([...input]);

        const distances = dijkstra(map, map[0][0]);
        console.log(distances);
        return distances.get(map.at(-1).at(-1));
    }

    two(input) {
        return 0;
    }
}