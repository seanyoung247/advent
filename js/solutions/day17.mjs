
function formatData(input) {
    const [x1,x2,y1,y2] = input[0].replace(/[^\d.,-]/g,'').split(/[ ,.]+/).map(Number);
    return {
        xMin: Math.min(x1,x2),
        xMax: Math.max(x1,x2),
        yMin: Math.min(y1,y2),
        yMax: Math.max(y1,y2)
    }
}

function inTarget(target, x, y) {
    return (x >= target.xMin && x <= target.xMax && y >= target.yMin && y <= target.yMax);
}

function sim(target, vX, vY) {
    let pos = {x:0, y:0};

    while (pos.x <= target.xMax && pos.y >= target.yMin) {

        pos.x += vX;
        pos.y += vY;

        vX -= (vX>0)|0;
        vY--;
        
        if (inTarget(target, pos.x, pos.y)) return true;
    }
    return false;
}

export class Solutions {
    one(input) {
        const target = formatData(input);
        return (Math.abs(target.yMin) * (Math.abs(target.yMin) - 1)) / 2;
    }

    two(input) {
        const target = formatData(input);

        const yMin = target.yMin;
        const yMax = -(target.yMin) + 1;
        const xMin = Math.ceil( (Math.sqrt(8 * target.xMin + 1) - 1) / 2);
        const xMax = target.xMax + 1;
        let count = 0;
          
        for (let vX = xMin; vX < xMax; vX++) {
            for (let vY = yMin; vY < yMax; vY++) {
                if (sim(target, vX, vY)) count++;
            }
        }
        return count;
    }
}
