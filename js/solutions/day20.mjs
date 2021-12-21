
const key = (x,y) => `${x},${y}`;

function formatData(input) {
    const algorithm = input.shift().split('').map(e=>e==='#'?true:false);
    const image = input.filter(e=>e).map(e=>e.split('').map(e=>e==='#'?true:false));
    const bounds = {x1: 0, y1: 0, x2: image.length-1, y2: image[0].length-1};
    const imageMap = new Map();
    // Convert image into a map of lit points
    for (let x = 0; x < image.length; x++) {
        for (let y = 0; y < image[x].length; y++) {
            if (image[x][y]) imageMap.set(key(x,y), true);
        }
    }

    return [algorithm, bounds, imageMap];
}

class ImageEnhancer {
    constructor(alg, bounds) {
        this.alg = alg;
        this.bounds = bounds;
        this.image = null;
        this.void = false;
    }

    inBounds(x, y) {
        // Bounds is the size of the new image, but the read from image is smaller
        if (x <= this.bounds.x1 || x >= this.bounds.x2) return false;
        if (y <= this.bounds.y1 || y >= this.bounds.y2) return false;
        return true;
    }

    getPixel(x, y) {
        // If in bounds return whether the pixel is lit.
        if (this.inBounds(x,y)) return this.image.has(key(x,y));
        // If out of bounds return the infinte void
        return this.void;
    }

    enhancePixel(x, y) {
        let index = 0;
        // Get the data for all the pixel's neighbours
        for (let iX = x-1; iX <= x+1; iX++) {
            for (let iY = y-1; iY <= y+1; iY++) {
                // Add the pixel state to the most significant bit of index.
                index = (index << 1) | (this.getPixel(iX, iY)|0);
            }
        }
        // Get the enhancement algorithm's value for this block
        return this.alg[index];
    }
    
    enhance(image, steps) {
        let intermediate;
        this.image = image;

        // Enhance for given number of steps
        for (let i = 0; i < steps; i++) {
            // Push out the boundary to account for infinite margins
            this.bounds.x1 -= 1; this.bounds.x2 += 1;
            this.bounds.y1 -= 1; this.bounds.y2 += 1;
            intermediate = new Map();
            // Run through all the image's pixels
            for (let x = this.bounds.x1; x <= this.bounds.x2; x++) {
                for (let y = this.bounds.y1; y <= this.bounds.y2; y++) {
                    if (this.enhancePixel(x,y)) intermediate.set(key(x,y), true);
                }
            }
            this.image = intermediate;
            // Finally update the void
            this.void = this.alg[(this.void|0)*(this.alg.length-1)];
        }
        return this.image;
    }
}

function solve(input, steps) {
    input = formatData([...input]);
    const enhancer = new ImageEnhancer(input[0], input[1]);
    let [,,imageMap] = input;

    imageMap = enhancer.enhance(imageMap, steps);

    return imageMap.size;
}

export class Solutions {
    one(input) {
        return solve(input, 2);
    }

    two(input) {
        return solve(input, 50);
    }
}
