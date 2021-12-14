function formatData(input) {
    return input.map((e)=>e.split(''));
}

// Hasmap matching opening braces to expected closing braces
const symbolMap = {
    '(' : ')',
    '[' : ']',
    '{' : '}',
    '<' : '>'
}

function parseLine(line, symbolStack, action) {
    let corrupt = false;
    for (const symbol of line) {
        // Opening or closing bracket?
        if (symbolMap[symbol]) {
            // Opening - push the expected closing bracket to the stack
            symbolStack.push(symbolMap[symbol]);
        } else {
            // Closing, does the current closing bracket match what we're expecting?
            const expected = symbolStack.pop();
            if (expected != symbol) {
                // Wrong symbol encountered, this line is corrupted!
                corrupt = true;
                action(symbol);
            }
        }
    }
    return corrupt;
}

export class Solutions {
    one(input) {
        let result = 0;

        const symbolScore = { ')' : 3, ']' : 57, '}' : 1197, '>' : 25137 };
        const symbolCount = { ')' : 0, ']' : 0, '}' : 0, '>' : 0 };
        const symbolStack = [];

        input = formatData(input);

        // Read counts
        for (const line of input) {
            parseLine(line, symbolStack, (s)=>symbolCount[s]++);
        }

        // Generate score
        for (const symbol in symbolScore) {
            result += symbolScore[symbol] * symbolCount[symbol];
        }

        return result;
    }

    two(input) {
        let result = 0;
        
        const symbolScore = { ')' : 1, ']' : 2, '}' : 3, '>' : 4 };
        const symbolStack = [];
        const lineScores = [];

        input = formatData(input);

        // Read lines
        for (const line of input) {
            if (!parseLine(line, symbolStack, ()=>{})) {
                // Score Line
                result = 0;
                symbolStack.reverse();
                for (const symbol of symbolStack) {
                    result = (result * 5) + symbolScore[symbol];
                }
                if (result > 0) lineScores.push(result);
            }
            symbolStack.length = 0;
        }

        // Find the middle score
        lineScores.sort((a,b)=>b-a);
        result = lineScores[Math.floor(lineScores.length / 2)];

        return result;
    }
}