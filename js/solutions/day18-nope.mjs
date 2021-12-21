
function formatData(input) {
    return input.map(e=>JSON.parse(e)).filter(e=>e);
}

const isPair = (val)=>Array.isArray(val);

function add(n1, n2) {
    // Only n1 should ever be null or empty
   if (!n1 || !n1.length) return n2;
   return [n1,n2];
}

function explode(number) {
    const depth = []; // Depth of number and index this depth occupies in parent pair
    const values = []; // Reference to the last encountered left-side numbers

    function traverse(number, depth, values) {
        if (depth.length > 4) {
            // Ensure there's no deeper pairs to explode first
            for (let i = 0; i < 2; i++) {
                if (isPair(number[i])) {
                    depth.push({n: number, i: i});
                    traverse(number[i], depth, values);
                    depth.pop();
                }
            }
            // Explode this pair
            // Have we seen a left hand value yet?
            if (values.length) {
                const last = values.at(-1);
                last.n[last.i] += number[0];
            }
            // Right hand value
            // Fallback through the levels until we find one with an unexplored right hand side
            let node = null;
            for (let i = depth.length-1; i >= 0; i--) {
                if (depth[i].i === 0) {
                    node = depth[i].n;
                    break;
                }
            }
            if (node) {
                // Have you found the righthand value, or do we need to search the right hand?
                if (!isPair(node[1])) {
                    // Value found
                    node[1] += number[1];
                } else {
                    node = node[1];
                    // Search forward until we find a left hand value
                    while (isPair(node[0])) {
                        node = node[0];
                    }
                    // Node should now have the right hand value on the left
                    node[0] += number[1];
                }
            }

            // Replace with 0
            const parent = depth.at(-1);
            parent.n[parent.i] = 0;

            // This level should no longer exist
            return;
        }
        for (let i = 0; i < 2; i++) {
            if (isPair(number[i])) {
                depth.push({n: number, i: i});
                traverse(number[i], depth, values);
                depth.pop();
            } else {
                // Log this as the last lefthand value seen 
                values.push({n: number, i:i});
            }
        }
    }

    depth.push({n: number, i: -1});
    traverse(number, depth, values);
    depth.pop();

    return number;
}

function split(number) {

    function traverse(number) {
        for (let i = 0; i < 2; i++) {
            if (isPair(number[i])) {
                if (traverse(number[i])) return true;
            } else {
                if (number[i] > 9) {
                    number[i] = [ Math.floor(number[i] / 2) , Math.ceil(number[i] / 2) ];
                    return true;
                }
            }
        }
        return false;
    }

    return traverse(number);
}

function reduce(number) {
    let actions = true;
    while (actions) {
        explode(number);
        actions = split(number);

    }
    return number;
}

function debugStr(number) {
    function traverse(number) {
        let str = '[';
        
        for (let i = 0; i < 2; i++) {
            if (isPair(number[i])) {
                str += traverse(number[i]);
            } else {
                str += number[i].toString();
            }
            if (i === 0) str += ',';
        }

        str += ']';
        return str;
    }

    return traverse(number);
}

export class Solutions {
    one(input) {
        const numbers = formatData([...input]);
        let total = [];

        for (const number of numbers) {
            total = add(total, number);
            total = reduce(total);
        }

        return debugStr(total);
    }

    two(input) {
        let result = 0;
        // SOLUTION TWO CODE HERE
        return result;
    }
}
