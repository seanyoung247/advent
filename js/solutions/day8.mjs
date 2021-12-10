
function formatData(input) {
    const ret = [];
    for (const line of input) {
        if (line) {
            const end = ret.length;
            const tmp = line.split(' | ');
            ret.push([]);
            ret[end].push(tmp[0].split(' ').filter(i => i));
            ret[end].push(tmp[1].split(' ').filter(i => i));
        }
    }
    return ret;
}

const patterns = [
    'abcefg',   // 0
    'cf',       // 1
    'acdeg',    // 2
    'acdfg',    // 3
    'bcdf',     // 4
    'abdfg',    // 5
    'abdefg',   // 6
    'acf',      // 7
    'abcdefg',  // 8
    'abcdfg'    // 9
];

function checkFrequencies(base, input) {
    const key = new Array(base.length).fill().map(()=>new Array());
    const alpha = new Array(base.length).fill(0);

    // Build frequency table
    for (const code of input) {
        for (let i = 0; i < code.length; i++) {
            alpha[code[i].charCodeAt(0)-97]++;
        }
    }
    
    // Check frequencies against base to get possible values
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < base.length; j++) {
            if (alpha[i] === base[j]) {
                key[i].push(String.fromCharCode(j + 97));
            }
        }
    }

    return key;
}

function testKey(key, cypherText) {
    const decode = new Array(cypherText.length).fill().map(()=>new Array());

    for (let i = 0; i < cypherText.length; i++) {
        for (let j = 0; j < cypherText[i].length; j++) {
            const idx = cypherText[i][j].charCodeAt(0) - 97;
            // If we're certain what the substitute is
            if (key[idx].length === 1) {
                decode[i].push({
                    code: String.fromCharCode(idx + 97),
                    decode: key[idx][0]
                });
            } else {
                decode[i].push({
                    code: String.fromCharCode(idx + 97),
                    decode: '?'
                });
            }
        }
    }

    return decode;
}

function decodeText(key, cypherText) {
    const decode = new Array(cypherText.length).fill().map(()=>new Array());

    for (let i = 0; i < cypherText.length; i++) {
        for (const chr of cypherText[i]) {
            decode[i].push(key[chr.charCodeAt(0)-97][0]);
        }
        decode[i] = decode[i].sort().join('');
    }
    return decode;
}

function updateKey(key, plain, code) {
    // Remove any incorrect possibilities
    for (const crypt of key) {
        for (let i = 0; i < crypt.length; i++) {
            if (crypt[i] === plain) crypt.splice(i,1);
        }
    }
    // Update the key mapping
    key[code.charCodeAt(0)-97] = [plain];

    return key;
}

export class Solutions {
    one(input) {
        // 1 = 2, 4 = 4, 7 = 3, 8 = 7
        const count = [0,0,0,0,0,0,0];
        input = formatData(input);

        for (const line of input) {
            for (const value of line[1]) {
                count[value.length-1]++;
            }
        }
        return (count[1]+count[2]+count[3]+count[6]);
    }

    two(input) {
        input = formatData(input);
        const seed = ['c', 'd'];
        let result = 0;

        for (const line of input) {
            // Discover key
            const dictionary = [...line[0]].sort((a,b)=>a.length>b.length).map((e)=>e.split(''));
            const key = checkFrequencies([8,6,8,7,4,9,7], dictionary);
            let decode = testKey(key, dictionary);
            // Guesses c (which also gives a) and then d (which also gives g)
            for (let i = 0; i < 2; i++) {
                for (const code of decode[i*2]) {
                    if (code.decode === '?') {
                        updateKey(key, seed[i], code.code);
                    }
                }
                decode = testKey(key, dictionary);
            }

            // Decode data
            const cypherText = [...line[1]].map((e)=>e.split(''));
            const plainText = decodeText(key, cypherText);

            // Match symbols for values
            let lineSum = 0;
            for (const text of plainText) {
                lineSum = (lineSum * 10) + patterns.indexOf(text);
            }
            result += lineSum;
        }

        return result;
    }
}
