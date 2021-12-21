
function formatData(input) {
    return input.map(tokenise);
}

function tokenise(input) {
    // Where are the empty strings and nulls coming from? I hate regex.
    return input.split(/(\[)|(\d+)|(\])|,/g).filter(e=>e);
}

function add(n1, n2) {
    if (!n1) return n2;
    return ['['].concat(n1,n2,[']']);
}

function getPair() {}

function explode(number) {
    const depth = [];   // Current depth
    let lastIdx = [];   // Last index of an actual number
    // Scan through the current number, checking depth. 
    // If we reach depth 5, explode the current pair.
    // Check for all explosions as they always take precedence over splits
    for (let i = 0; i < number.length; i++) {
        if (number[i] === '[') depth.push(i);
        else if (number[i] === ']') depth.pop();
        else lastIdx.push(i);

        if (depth.length > 4) {
            // Explode
            // Scan forward to the last level of pairs by getting the first closing bracket
            const pE = number.indexOf(']', i);
            // Now find the start of this pair
            const pS = number.lastIndexOf('[', pE);

            // 

            // Find the number for the right hand side
            for (let j = pE; j < number.length; j++) {
                if (number[j] != '[' || number[j] != ']') {
                    // Number encountered

                }
            }


            // Find the left value to add to
            lastIdx.at(-1)
        }
    }

    return number;
}

function split(number) {
    return [false, number];
}

function reduce(number) {
    let tasks = true;

    while(tasks) {
        [tasks, number] = split(explode(number));
    }
    return number;
}

export class Solutions {
    one(input) {
        const numbers = formatData([...input]);
        let total = '';
        
        for (const number of numbers) {
            total = add(total, number);
            total = reduce(total);
        }

        console.log(total);

        return total;
    }

    two(input) {
        let result = 0;
        // SOLUTION TWO CODE HERE
        return result;
    }
}
