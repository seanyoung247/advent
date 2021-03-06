
const bits = ['0000','0001','0010','0011','0100','0101','0110','0111','1000','1001','1010','1011','1100','1101','1110','1111'];

function formatData(input) {
    const str = input[0];
    let binary = '';
    for (let i = 0; i < str.length; i++) {
        binary += bits[parseInt(str[i], 16)];
    }
    return binary;//.split('');
}

function binaryToDecimal(str) {
    let ret = 0;
    let unit = 1;
    for (let i = str.length-1; i >= 0; i--) {
        ret += parseInt(str[i]) * unit;
        unit *= 2;
    }
    return ret;
}

function parseBin(binary, start, end) {
    return binaryToDecimal(binary.substring(start, end));
}

class PacketFactory {
    static products = new Map;
    static register(id, builder) {
        this.products.set(id, builder);
    }
    static create(binary, start) {
        const version = parseBin(binary, start, start += 3);
        const type = parseBin(binary, start, start += 3);

        const product = this.products.get(type);

        if (product) return new product([version, type], binary, start);
        return null;
    }
}

class Packet {
    constructor(header) {
        [this.version, this.type] = header;
        this.bitSize = 6;
    }
} // Base class not registered with factory.

class LiteralPacket extends Packet {
    constructor(header, binary, start) {
        super(header);
        const firstBit = start;
        let dataStr = '';
        // Literal Packet Payload
        while (true) {
          const nibble = binary.substring(start, start += 5);
          dataStr += nibble.substr(1);
          if (nibble[0] === '0') break;
        }
        this.data = parseBin(dataStr, 0);
        this.bitSize += start - firstBit;
    }
    sumVersions() { return this.version; }
    evaluate() {return this.data;}
} PacketFactory.register(4, LiteralPacket);

class OperatorPacket extends Packet {
    constructor(header, binary, start) {
        super(header);
        const firstBit = start

        // Operator Packet payload
        this.lengthTypeId = parseBin(binary, start, ++start);
        this.payloadSize = parseBin(binary, start, start += 15 - (4 * this.lengthTypeId));
        this.packets = [];
        // Are we counting in packets or bits?
        if (this.lengthTypeId) {
            // Sub-packet count
            for (let i = 0; i < this.payloadSize; i++) {
                this.packets.push(PacketFactory.create(binary, start));
                start += this.packets.at(-1).bitSize;
            }
        } else {
            // Bit count
            let bits = this.payloadSize;
            while (bits) {
                this.packets.push(PacketFactory.create(binary, start));
                start += this.packets.at(-1).bitSize;
                bits -= this.packets.at(-1).bitSize;
            }
        }
        this.bitSize += start - firstBit;
    }
    sumVersions() {
        let sum = this.version;
        for (const packet of this.packets) {
            sum += packet.sumVersions();
        }
        return sum;
    }
} // Operator Packet Base not registered with factory

class OpSumPacket extends OperatorPacket {
    evaluate() { return this.packets.reduce((sum, packet) => sum += packet.evaluate(), 0); }
} PacketFactory.register(0, OpSumPacket);

class OpProductPacket extends OperatorPacket {
    evaluate() { return this.packets.reduce((sum, packet) => sum *= packet.evaluate(), 1); }
} PacketFactory.register(1, OpProductPacket);

class OpMinPacket extends OperatorPacket {
    evaluate() { return this.packets.reduce((min, packet) => Math.min(packet.evaluate(), min), Infinity); }
} PacketFactory.register(2, OpMinPacket);

class OpMaxPacket extends OperatorPacket {
    evaluate() { return this.packets.reduce((max, packet) => Math.max(packet.evaluate(), max), -Infinity); }
} PacketFactory.register(3, OpMaxPacket);

class OpGreaterPacket extends OperatorPacket {
    evaluate() { return (this.packets[0].evaluate() > this.packets[1].evaluate())|0; }
} PacketFactory.register(5, OpGreaterPacket);

class OpLessPacket extends OperatorPacket {
    evaluate() { return (this.packets[0].evaluate() < this.packets[1].evaluate())|0; }
} PacketFactory.register(6, OpLessPacket);

class OpEqualPacket extends OperatorPacket {
    evaluate() { return (this.packets[0].evaluate() === this.packets[1].evaluate())|0; }
} PacketFactory.register(7, OpEqualPacket);

export class Solutions {
    one(input) {
        const binary = formatData(input);
        const packets = PacketFactory.create(binary, 0);

        return packets.sumVersions();
    }

    two(input) {
        const binary = formatData(input);
        const packets = PacketFactory.create(binary, 0);

        return packets.evaluate();
    }
}
