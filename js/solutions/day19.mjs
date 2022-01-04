
function formatData(input) {
    return input.join('\n').split('\n\n')           // Split into individual scanners
        .map(e=>e.split('\n').filter((e,i)=>i!=0))  // Split into individual beacons
        .map(e=>e.map(e=>e.split(',').map(e=>parseInt(e))));  // Split the coordinates
}

const sqr = (n) => n*n;
const vector = (a,b) => [Math.abs(a[0]-b[0]), Math.abs(a[1]-b[1]), Math.abs(a[2]-b[2])];
const distance = (a,b) => Math.sqrt( sqr(a[0]-b[0]) + sqr(a[1] - b[1]) + sqr(a[2] - b[2]) );
const manhattan = (a,b) => (Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]) + Math.abs(a[2]-b[2]));

function getDistances(scanner) {
    const distances = [];

    for (let i = 0; i < scanner.length-1; i++) {
        for (let j = i+1; j < scanner.length; j++) {
            // distances.push({
            //     a: scanner[i], b: scanner[j],
            //     v: vector(scanner[i], scanner[j]),
            //     d: distance(scanner[i], scanner[j]).toFixed(5)
            // });
            distances.push(distance(scanner[i],scanner[j]).toFixed(10));
        }
    }

    return distances;
}

export class Solutions {
    one(input) {
        const scanners = formatData([...input]);
        const distances = [];
        let count = 0;
        for (const scanner of scanners) {
            distances.push(getDistances(scanner));
            count += distances.at(-1).length;
        }
        

        return 0;
    }

    two(input) {
        
        return 0;
    }
}
