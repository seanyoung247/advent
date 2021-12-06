
export class Solutions {
    one(input) {
        let result = 0;
        for (let i = 1; i < input.length; i++) {
            if (parseInt(input[i]) > parseInt(input[i - 1])) result++;
        }
        return result;
    }

    two(input) {
        let result = 0;
        for (let i = 3; i < input.length; i++) {
            let a = parseInt(input[i - 3]) + parseInt(input[i - 2]) + parseInt(input[i - 1]);
            let b = parseInt(input[i - 2]) + parseInt(input[i - 1]) + parseInt(input[i]);
            if (a < b) result++;
        }
        return result;
    }
}