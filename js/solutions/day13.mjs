
function formatData(input) {
    const dots = [];
    const folds = [];
    for (const line of input) {
        if (line.includes(',')) {
            // This is a coordinate line
            const tmp = line.split(',');
            dots.push({x: parseInt(tmp[0]), y: parseInt(tmp[1])});
        } else if (line) {
            // Fold line
            const tmp = (line.split(" "))[2].split("=");
            folds.push({axis: tmp[0], pos: parseInt(tmp[1])});
        }
    }
    return {dots: dots, folds: folds};
}

function fold(dots, fold) {
    const [dir, pos] = [fold.axis, fold.pos];
    
    // For each dot check if it's before or after the fold.
    dots.forEach((elem, i, a) => elem[dir] = (elem[dir] > fold.pos) 
        // If it's after the fold get how far from the fold it is,
        // then move it that distance before the fold
        ? (pos - (elem[dir] - pos)) : 
        // If it's before the fold do nothing
        (elem[dir]));

    const folded = // Sort dots
        dots.sort((a, b)=>(a.x - b.x||a.y - b.y))
            .filter((elem, i, a) => (
                // Keep element if it's index is zero or it's not equal to the preceeding element
                !i || !(elem.x === a[i-1].x && elem.y === a[i-1].y))
            );
    return folded;
}

export class Solutions {
    one(input) {
        const data = formatData(input);    
        return fold(data.dots, data.folds[0]).length;
    }

    two(input) {
        const data = formatData(input);
        for (const f of data.folds) {
            data.dots = fold(data.dots, f);
        }
        const paper = new Array(6).fill().map(i=>new Array(39).fill(' '));
        for (const dot of data.dots) {
            if (dot) paper[dot.y][dot.x] = '#';
        }
        let out = '';
        for (const line of paper) {
            out += line.join('') + '\n';
        }
        // I'm not going to write an OCR routine...
        console.log(out);
        return 0;
    }
}
