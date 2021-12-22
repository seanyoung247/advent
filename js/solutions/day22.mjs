
function formatData(input) {
    const list = [];

    for (const line of input) {
        if (line) {
            const [state, data] = line.split(' ')
                .map( (e,i) => (i > 0) ? e.split(/=|[..]{2}|,/g) : e);
            const pos = {on: (state==='on')};

            for (let i = 0; i < 3; i++) {
                pos[data[i*3]] = data.slice((i*3)+1,(i*3)+3).map(e=>parseInt(e));
            }
            list.push(pos);
        }
    }
    return list;
}

const min = 0, max = 1;
class Region {
    constructor(x, y, z, state=false) {
        [this.x, this.y, this.z] = [x, y, z];
        this.state = state;

        const w = (this.x[max]-this.x[min]+1);
        const l = (this.y[max]-this.y[min]+1);
        const h = (this.z[max]-this.z[min]+1);

        this.volume = (w*l*h);
    }

    get value () {
        // Are we turning on or turning off?
        if (this.state) return this.volume;
        return -this.volume;
    }

    intersects(region) {
        return (
            ( this.x[min] <= region.x[max] && this.x[max] >= region.x[min] ) && 
            ( this.y[min] <= region.y[max] && this.y[max] >= region.y[min] ) &&
            ( this.z[min] <= region.z[max] && this.z[max] >= region.z[min] )
        );
    }

    contains(region) {
        return (
            ( region.x[min] >= this.x[min] && region.x[max] <= this.x[max] ) && 
            ( region.y[min] >= this.y[min] && region.y[max] <= this.y[max] ) &&
            ( region.z[min] >= this.z[min] && region.z[max] <= this.z[max] )
        );
    }

    intersection(region, state) {
        // Returns a new region that represents the intersection of two others.
        const x = [Math.max(this.x[min], region.x[min]), Math.min(this.x[max], region.x[max]),];
        const y = [Math.max(this.y[min], region.y[min]), Math.min(this.y[max], region.y[max]),];
        const z = [Math.max(this.z[min], region.z[min]), Math.min(this.z[max], region.z[max]),];
        return new Region(x,y,z,state);
    }
}

function solve(initial, constraint) {
    const volumes = [];
    for (const region of initial) {
        if (constraint(region)) {
            // Only add a region if it's turning on
            const newRegion = new Region(region.x,region.y,region.z, region.on);
            if (region.on) volumes.push(newRegion);
            // Check if there are any intersections.
            const newVols = [];
            for (const volume of volumes) {
                if (newRegion != volume && volume.intersects(region)) {
                    // Add a negative volume for the intersection region
                    newVols.push(volume.intersection(newRegion, !volume.state));
                }
            }
            for (const volume of newVols) volumes.push(volume);
        }
    }
    return volumes.reduce((p,c) => p += c.value, 0);
}

export class Solutions {
    one(input) {
        const bounds = new Region([-50,50],[-50,50],[-50,50]);
        return solve(formatData([...input]), (region)=>bounds.contains(region));
    }

    two(input) {
        return solve(formatData([...input]), ()=>true);
    }
}
