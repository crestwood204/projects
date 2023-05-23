/*
 * A pentagonal number is of the form Pn = n * (3n - 1) / 2
 * the difference between pentagonal numbers starts at 4 and increases by 3 each time:
 *   4, 7, 10, 13, 16, 19, etc.
 *
 *
 *   if we take two pentagonal numbers and want both their sum and difference to be pentagonal, we have that
 *   j is pentagonal, k is pentagonal
 *   k - j is pentagonal where k - j is of the sequence 4 + 3n.
 *   k + j is pentagonal where (k + j) - j = k is pentagonal.
 *   So, we need to find a j st. j is both pentagonal and of the sequence 4 + 3n
 *
 */

const problem44 = () => {
  const limit = 10000;
  const pentagonalNumbersMap: Record<number, boolean> = {
    1: true,
  };

  const pentagonalNumbers: number[] = [];

  const candidates: number[] = [];

  for (let i = 1; i < limit; i++) {
    const p = getPentagonalNumber(i);
    pentagonalNumbersMap[p] = true;
    pentagonalNumbers.push(p);
  }

  for (let i = 1; i < pentagonalNumbers.length; i++) {
    const n1 = pentagonalNumbers[i];
    for (let j = 0; j < i; j++) {
      const n2 = pentagonalNumbers[j];

      if (
        pentagonalNumbersMap[n1 + n2] &&
        pentagonalNumbersMap[Math.abs(n1 - n2)]
      ) {
        candidates.push(Math.abs(n1 - n2));
      }
    }
  }

  if (candidates.length) {
    return Math.min(...candidates);
  }

  return -1;
};

export default problem44;

const getPentagonalNumber = (n: number) => {
  return (n * (3 * n - 1)) / 2;
};
