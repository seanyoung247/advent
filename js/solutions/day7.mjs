
function formatData(input) {
    return input[0].split(',').map(Number);
}

export class Solutions {
    one(input) {
        let range = 0;
        let cost = {fuel: 0, value: -1};
        const crabs = formatData(input);
        
        // Find range
        for (const crab of crabs) {
            range = (crab > range) ? crab : range;
        }

        cost.fuel = range * crabs.length;
        // Brute force for lowest cost
        for (let i = 0; i < range + 1; i++) {
            let fuel = 0;
            for (const crab of crabs) {
                fuel += Math.abs(crab - i);
            }
            if (fuel < cost.fuel) {
                cost.fuel = fuel;
                cost.value = i;
            }
        }

        return cost.fuel;
    }

    two(input) {
        let position = 0;
        let fuel = 0;
        const crabs = formatData(input);
        
        for (const crab of crabs) {
            position += crab;
        }
        position = Math.round((position / crabs.length) - 0.1);

        // Calculate Fuel Cost
        for (const crab of crabs) {
            let distance = Math.abs(crab - position);
            let run = 1;
            while (distance) {
                fuel += run;
                run++;
                distance--;
            }
        }

        return fuel;
    }
}
