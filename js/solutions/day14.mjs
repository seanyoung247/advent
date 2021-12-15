
function formatData(input) {
    const seed = input.shift();
    const rules = new Map();

    for (const line of input) {
        if (line) {
            const tmp = line.split(' -> ');
            rules.set(tmp[0], tmp[1]);
        }
    }

    return [seed, rules];
}

const idx = (chr) => chr.charCodeAt(0)-65;

function initialiseCounts(seed) {
    const chars = new Array(26).fill(0);
    const pairs = new Map();

    for (let i = 0; i < seed.length-1; i++) {
        const pair = seed.substring(i,i+2)
        chars[idx(seed[i])]++;
        pairs.set(pair, (pairs.get(pair)||0)+1);
    }
    chars[idx(seed[seed.length-1])]++;

    return [chars, pairs];
}


function incCounts(pairs, chars, pair, rules, amt) {
    const add = rules.get(pair);
    const left = pair[0] + add;
    const right = add + pair[1];

    pairs.set(pair, (pairs.get(pair)||0) - amt);
    pairs.set(left, (pairs.get(left)||0) + amt);
    pairs.set(right, (pairs.get(right)||0) + amt);
    chars[idx(add)] += amt;    
}

function solve(input, steps) {
    const [seed, rules] = formatData(input);
    let [chars, pairs] = initialiseCounts(seed);

    for (let step = 0; step < steps; step++) {
        const keys = [...pairs.keys()];
        let stepPairs = new Map(pairs);

        for (const key of keys) {
            incCounts(stepPairs, chars, key, rules, pairs.get(key));
        }
        pairs = stepPairs;
    }

    chars = chars.filter(e=>e!=0);
    chars.sort((a,b)=>a-b);
    return (chars.at(-1)-chars[0]);
}

export class Solutions {
    one(input) {
        return solve([...input], 10);
    }

    two(input) {
        return solve([...input], 40);
    }
}
