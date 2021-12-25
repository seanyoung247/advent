
function formatData(input) {
    
}

const x = 0, y = 1, z = 2;

                 //x,y,z 
const registers = [0,0,0];
const constants = [[15,15,1],[12,1,1]];

function stage(w, reg, con) {
    reg[x] = reg[z];
    reg[z] = Math.floor(reg[z]/con[z]);
    reg[x] += con[x];

    if (reg[x] != w) {
        // Y not necessary, can simplify it away
        reg[y] = 25;
        reg[x] *= reg[y];
        reg[z] *= reg[y] + 1;
        reg[y] = w + con[y];
        reg[y] += x;
        reg[z] += reg[y];
    }
}

export class Solutions {
    one(input) {
        const out = new Array(10);
        for (let i = 1; i < 10; i++) {
            stage(i, registers, constants[0]);
            
            for (let j = 1; j < 10; j++) {
                stage(j, registers, constants[1]);
                console.log(i,j, registers[z]);
            }
            registers[z] = 0;
        }
        return 0;
    }

    two(input) {
        return 0;
    }
}
// Zbudget = [26**len([x for x in range(len(DZ)) if DZ[x]==26 and x >= i]) for i in range(len(DZ))]
// print("Threshold for giving up due to Z being too high, at each stage has been calculated as", Zbudget)