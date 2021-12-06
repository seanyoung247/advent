
function formatData(input) {
    return input[0].split(',');
}

function solve(input, days) {
    let fishes = formatData(input);
    const fishCount = [0,0,0,0,0,0,0,0,0];
    for (fish of fishes) fishCount[fish]++;

    for (let day = 0; day < days; day++) {
        // How many fish are spawning today?
        const newSpawn = fishCount[0];
        // Move each fish into new state
        for (let i = 0; i <= 8; i++) fishCount[i] = fishCount[i + 1];
        // Create the newly spawned fish
        fishCount[8] = newSpawn;
        // Move the new parents to their new state
        fishCount[6] += newSpawn;
    }

    // Calculate final total of fish from the state totals
    return fishCount.reduce((t, c) => t + c);
}

function solution1(input) {
    return solve(input, 80);
}

function solution2(input) {
    return solve(input, 256);
}