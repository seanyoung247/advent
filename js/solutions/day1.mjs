
export class Solutions {
    one(input) {
        let result = 0;
        input = input.map((item)=>parseInt(item));
        for (let i = 1; i < input.length; i++) {
            if (input[i] > input[i - 1]) result++;
        }
        return result;
    }

    two(input) {
        let result = 0;
        input = input.map((item)=>parseInt(item));
        for (let i = 3; i < input.length; i++) {
            let a = input[i - 3] + input[i - 2] + input[i - 1];
            let b = input[i - 2] + input[i - 1] + input[i];
            if (a < b) result++;
        }
        return result;
    }
}