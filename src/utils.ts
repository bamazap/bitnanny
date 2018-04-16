// Does an in-place filter
export function filterInPlace<T>(arr: T[], f: (elm: T) => boolean): void {
  let out = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (f(arr[i])) {
      arr[out] = arr[i];
      out += 1;
    }
  }
  arr.length = out;
}

// like range function in python
// range(n) => [0, 1, ..., n-1]
// range(a, b) => [a, a+1, ..., b-1] ([] if a >= b)
// range(a, b, s) => [a, a+s, a+2*s, ..., a+n*s] (max n s.t. a+n*s < b)
export function range(start: number, stop?: number, step = 1): number[] {
  const begin = stop === undefined ? 0 : start;
  const end = stop === undefined ? start : stop;
  const length = Math.max(Math.ceil((end - begin) / step), 0);
  const output = new Array<number>(length);
  for (let i = 0; i < length; i += 1) {
    output[i] = begin + (step * i);
  }
  return output;
}
