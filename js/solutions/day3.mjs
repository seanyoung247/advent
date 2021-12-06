
function strip(list, b, cmp) {
  let ret = [];
  let count = [0,0];

  if (b >= list[0].length) return list;

  for (let i = 0; i < list.length; i++) {
      count[parseInt(list[i].charAt(b))]++;
  }
  let bit = (cmp(count[0], count[1])) ? '0' : '1';
  for (let i = 0; i < list.length; i++) {
      if (list[i].charAt(b) == bit) {
          ret.push(list[i]);
      }
  } 
  if (!ret[0]) ret = list;
  return strip(ret, b+1, cmp);
}

export class Solutions {
  one(input) {
      let gamma = '';
      let epsilon = '';
      for (let b = 0; b < input[0].length; b++) {
        let count = [0,0];
        for (let i = 0; i < input.length; i++) {
          count[parseInt(input[i].charAt(b))]++;
        }
        if (count[0] > count[1]) {
          gamma += '0';
          epsilon += '1';
        }
        else {
          gamma += '1';
          epsilon += '0';
        }
      }
      gamma = toDecimal(gamma);
      epsilon = toDecimal(epsilon);
      return gamma * epsilon;
  }

  two(input) {
      let a = toDecimal(strip(input,0, (x,y) => (x > y) )[0]);
      let b = toDecimal(strip(input,0, (x,y) => (x <= y) )[0]);
      return a * b;
  }
}
