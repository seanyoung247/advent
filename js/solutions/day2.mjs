
export class Solutions {
    one(input) {
        let count = {
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
        let count = {
            position: 0,
            depth: 0,
            aim: 0
        };

        for (let i = 0; i < input.length; i++) {
            let command = input[i].split(' ');
            switch (command[0]) {
                case "down":
                    count.aim += parseInt(command[1]);
                    break;
                case "up":
                    count.aim -= parseInt(command[1]);
                    break;
                case "forward":
                    count.position += parseInt(command[1]);
                    count.depth += count.aim * parseInt(command[1]);
                    break;
            }
        }
        return count.position * count.depth;
    }
}