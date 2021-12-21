
function formatData(input) {
    return input.filter(e=>e).map( e=>parseInt(e.split(':')[1]) );
}

function* dice(sides) {
    let die = -1;
    while (true) {
        yield (die = (die + 1) % sides) + 1;
    }
} const d = dice(100), roll = ()=>d.next().value;

const move = (pos, roll) => ((pos + roll - 1) % 10) + 1;
const probabilities = [1,3,6,7,6,3,1];

function playGames(players, scores, turn, max) {
    // If a player has hit the maxmimum score, bail
    for (let i = 0; i < 2; i++) if (scores[i] >= max) return 1 - i;

    let ret = 0;
    const roundStart = [players[turn], scores[turn]];
    // For each possible score this round (3 (1+1+1) to 9 (3+3+3))
    for (let score = 3; score <= 9; score++) {
        // Reset to beginning of this round
        [players[turn], scores[turn]] = roundStart;
        // Move and score player
        players[turn] = move(players[turn], score);
        scores[turn] += players[turn];
        // Check branches for this possibility
        ret += probabilities[score-3] * playGames(players, scores, !turn|0, max);        
    }
    return ret;
}

export class Solutions {
    one(input) {
        const players = formatData([...input]);
        const scores = [0,0];
        let rolls = 0;
        let player = 0;

        while (scores[0] < 1000 && scores[1] < 1000) {
            // Roll the dice
            const r = roll() + roll() + roll();
            // Move and score player
            players[player] = move(players[player], r);
            scores[player] += players[player];
            // Select the next player
            player = !player|0;
            rolls += 3;
        }

        return ( Math.min(...scores) * rolls );
    }

    two(input) {
        const players = formatData([...input]);
        const scores = [0,0];

        return playGames(players, scores, 0, 21);
    }
}
