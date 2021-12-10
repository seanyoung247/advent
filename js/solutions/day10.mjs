function formatData(input) {
    return input.map((e)=>e.split(''));
}

const symbolMap = {
    '(' : ')',
    '[' : ']',
    '{' : '}',
    '<' : '>'
}

export class Solutions {
    one(input) {
        let result = 0;

        const symbolScore = {
            ')' : 3,
            ']' : 57,
            '}' : 1197,
            '>' : 25137
        }
        const symbolStack = [];
        const symbolCount = { ')' : 0, ']' : 0, '}' : 0, '>' : 0 };

        input = formatData(input);

        // Read counts
        for (const line of input) {
            for (const symbol of line) {
                // Opening or closing bracket?
                if (symbolMap[symbol]) {
                    // Opening
                    symbolStack.push(symbolMap[symbol]);
                } else {
                    // Closing
                    const expected = symbolStack.pop();
                    if (expected != symbol) {
                        // Corrupted!
                        symbolCount[symbol]++;
                    }
                }
            }
        }

        // Generate score
        for (const symbol in symbolScore) {
            result += symbolScore[symbol] * symbolCount[symbol];
        }

        return result;
    }

    two(input) {
        let result = 0;
        
        const symbolScore = {
            ')' : 1,
            ']' : 2,
            '}' : 3,
            '>' : 4
        }
        const symbolStack = [];
        const lineScores = [];

        input = formatData(input);

        // Read counts
        for (const line of input) {
            for (const symbol of line) {
                // Opening or closing bracket?
                if (symbolMap[symbol]) {
                    // Opening
                    symbolStack.push(symbolMap[symbol]);
                } else {
                    // Closing
                    const expected = symbolStack.pop();
                    if (expected != symbol) {
                        // Corrupted!
                        symbolStack.length = 0;
                        break;
                    }
                }
            }

            // Score Line
            symbolStack.reverse();
            result = 0;
            for (const symbol of symbolStack) {
                result = (result * 5) + symbolScore[symbol];
            }
            if (result > 0) lineScores.push(result);
            symbolStack.length = 0;
        }

        // Find the middle score
        lineScores.sort((a,b)=>b-a);
        result = lineScores[Math.floor(lineScores.length/2)];

        return result;
    }
}
