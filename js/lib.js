function toDecimal(binary) {
    let result = 0;
    let unit = 1;
    for (let i = binary.length-1; i >= 0; i--) {
        result += unit * parseInt(binary.charAt(i));
        unit *= 2;
    }
    return result;
}