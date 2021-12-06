
function formatData(input) {
    return input[0].split(',');
}

function solve(input, days) {
    let fishes = formatData(input);
    const fishState = [0,0,0,0,0,0,0,0,0];
    for (const fish of fishes) fishState[fish]++;

    for (let day = 0; day < days; day++) {
        // How many fish are spawning today?
        const newSpawn = fishState[0];
        // Move each fish into their new state
        for (let i = 0; i <= 8; i++) fishState[i] = fishState[i + 1];
        // Create the newly spawned fish
        fishState[8] = newSpawn;
        // Move the new parents to their new state
        fishState[6] += newSpawn;
    }

    // Calculate final total of fish from the state totals
    return fishState.reduce((t, c) => t + c);
}

export const test = true;

export class Solutions {
    one(input) {
        return solve(input, 80);
    }

    two(input) {
        return solve(input, 256);
    }
}