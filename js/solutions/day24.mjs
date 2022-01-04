
function formatData(input) {
    // Pull the constants out of the code, discard the rest
    input = input.map(line => line.split(" ")).map(v => parseInt(v[2]))
        .filter((v, i) => [4, 5, 15].some(e => e === i % 18))       // constants are on lines 5,6,16 of each 18 line block
        .reduce((g, v, i) => (g[Math.floor(i / 3)].push(v), g), 
            new Array(14).fill().map(()=>[])
        );
    
    return input;
}

function solve(input, calcDigit) {
    const digits = new Array(14).fill(0);
    const stack = [];

    for (let i = 0; i < input.length; i++) {
        const [z, x, y] = input[i];

        if (z === 1) {
            stack.push([y,i]);
        } else {
            const [pY, pI] = stack.pop();
            const d = pY + x;
            digits[pI] = calcDigit(d);
            digits[i] = digits[pI] + d;
        }
    }
    return digits.reduce((p,c) => p * 10 + c);
}

export class Solutions {
    one(input) {
        return solve(formatData([...input]), v => Math.min(9, 9 - v));
    }

    two(input) {
        return solve(formatData([...input]), v => Math.max(1, 1 - v));
    }
}
