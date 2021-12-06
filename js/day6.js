
function formatData(input) {
    return input[0].split(',');
}

function solve(input, days) {
    let fishes = formatData(input);
    const fishCount = Array(10).fill(0);

    fishes.forEach(fish => fishCount[fish]++);
    
    for (let day = 0; day < days; day++) {
        const scalar = fishCount[0];
        for (let i = 0; i <= 8; i++) {
            fishCount[i] = fishCount[i + 1];
        }
        fishCount[8] = scalar;
        fishCount[6] += scalar;
    }

    return fishCount.reduce((tot, curr) => tot + curr);
}

function solution1(input) {
    return solve(input, 80);
}

function solution2(input) {
    return solve(input, 256);
}