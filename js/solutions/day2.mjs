
export class Solutions {
    one(input) {
        const count = {
            forward: 0,
            down: 0,
            up: 0
        };

        for (let i = 0; i < input.length; i++) {
            let command = input[i].split(' ');
            count[command[0]] += parseInt(command[1]);
        }

        return count.forward * (count.down - count.up);
    }

    two(input) {
        const count = {
            position: 0,
            depth: 0,
            aim: 0,
            down: (val) => count.aim += val,
            up: (val) => count.aim -= val,
            forward: (val) => {
                count.position += val;
                count.depth += count.aim * val;
            }
        };

        for (const line of input) {
            let command = line.split(' ').filter((e)=>e);
            if (command[0]) count[command[0]](parseInt(command[1]));
        }
        return count.position * count.depth;
    }
}