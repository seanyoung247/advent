
function formatData(input) {
    return input[0].split(',').map(Number);
}

function median(arr) {
    const middle = Math.floor(arr.length / 2);
    arr = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
}
export class Solutions {
    one(input) {
        const crabs = formatData(input);
        // Calculate median average of all positions
        const position = median(crabs);
        // Calculate fuel cost for position
        return crabs.reduce((t,c) => t += Math.abs(c - position), 0);
    }

    two(input) {
        const crabs = formatData(input);
        // Calculate the mean average of all positions
        const position = Math.round(crabs.reduce((t,c) => t += c) / crabs.length - 0.1);
        // Calculate fuel cost for position
        return crabs.reduce((t,c) => t += Math.abs(c - position) * ((Math.abs(c - position) + 1) / 2), 0);
    }
}
