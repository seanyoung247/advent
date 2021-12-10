
function formatData(input) {
    const ret = [];
    for (const line of input) {
        const end = ret.length;
        const tmp = line.split(' | ');
        ret.push([]);
        ret[end].push(tmp[0].split(' ').filter(i => i));
        ret[end].push(tmp[1].split(' ').filter(i => i));
    }
    return ret;
}

function checkFrequencies(base, input) {
    const seg = new Array(base.length).fill().map(()=>new Array());
    const alpha = new Array(base.length).fill(0);

    // Build frequency table
    for (const code of input) {
        for (let i = 0; i < code.length; i++) {
            alpha[code.charCodeAt(i)-97]++;
        }
    }
    
    // Check frequencies against base to get possible values
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < base.length; j++) {
            if (alpha[i] === base[j]) {
                seg[i].push(String.fromCharCode(j + 97));
            }
        }
    }

    return seg;
}

function applyKey(key, cypherText, plainText) {
    const decode = new Array(cypherText.length).fill('');
    const remain = new Array(cypherText.length).fill('');
    //const plain = new Array(cypherText.length).fill('');

    for (let i = 0; i < cypherText.length; i++) {
        for (let j = 0; j < cypherText[i].length; j++) {
            const idx = cypherText[i].charCodeAt(j) - 97;
            if (key[idx].length === 1) {
                decode[i] += key[idx];
            } else {
                remain[i] += cypherText[i][j];
                //plain[i] += plainText[i][j];
                decode[i] += '?';
            }
        }
    }
    return {decode: decode, remain: remain, plain: plain};
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

        //Input LOOP
        const plainText = patterns.sort((a,b)=>a.length>b.length);
        const cypherText = [...input[0][0]].sort((a,b)=>a.length>b.length);
        const key = checkFrequencies([8,6,8,7,4,9,7], cypherText);
        let stage = {};

            // Apply discovered symbols
            stage = applyKey(key, cypherText, plainText);
            console.log([...key]);
            console.log(stage.remain);
            console.log(stage.plain);
            console.log(cypherText);
            console.log(stage.decode);
            console.log(plainText);

            // Cull any discovered symbols
            for (let i = 0; i < stage.remain.length; i++) {
                if (stage.remain[i].length === 1 && stage.remain[i]) {
                    // Only a single symbol left in a string means there's 
                    // only a single possiblity for it's substitute
                    updateKey(key, stage.plain[i], stage.remain[i]);
                }
            }
            stage = applyKey(key, cypherText, plainText);

            console.log(key);
            console.log(stage.remain);
            console.log(stage.plain);
            console.log(cypherText);
            console.log(stage.decode);
            console.log(plainText);


        // For each line of input
        for (const line of input) {
            // Build initial segment map with frequency attack
            // Guess codes based on length and try to remove segment options
            // Bueller?
        }
        return 0;
    }
}

function checkDone(remaining) {
    for (const remain of remaining) {
        if (remain) return false;
    }
    return true;
}

function updateKey(key, plain, code) {
    // Remove any possible mappings
    for (const crypt of key) {
        for (let i = 0; i < crypt.length; i++) {
            if (crypt[i] === plain) crypt.splice(i,1);
        }
    }
    // Update the key mapping
    key[code.charCodeAt(0)-97] = [plain];

    return key;
}
