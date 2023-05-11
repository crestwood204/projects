const problem23 = () => {
  const maxNum = 28123;

  const ans: number[] = [];

  const abundantNumbers: number[] = [12];

  // loop to check and see if num can be written as sum of two abundant numbers
  for (let i = 1; i < maxNum; i++) {
    let lastAbundantNumber = abundantNumbers[abundantNumbers.length - 1];
    while (lastAbundantNumber < i) {
      abundantNumbers.push(getNextAbundantNumber(lastAbundantNumber));
      lastAbundantNumber = abundantNumbers[abundantNumbers.length - 1];
    }

    if (!isPossibleSumOfTwoNumbers(i, abundantNumbers)) {
      ans.push(i);
    }
  }

  return ans.reduce((acc, curr) => acc + curr, 0);
};

export default problem23;

const getNextAbundantNumber = (lastAbundantNumber: number) => {
  let nextAbundantNumber = 0;
  let currNumber = lastAbundantNumber + 1;

  while (!nextAbundantNumber) {
    const compositeFactors: number[] = [1];

    // largest factor can't be greater than current number / 2, since 2 is smallest factor besides 1
    for (let i = 2; i <= Math.ceil(currNumber / 2); i++) {
      if (currNumber % i === 0) {
        compositeFactors.push(i);
      }
    }

    const sumOfFactors = compositeFactors.reduce((acc, curr) => acc + curr, 0);
    if (sumOfFactors > currNumber) {
      nextAbundantNumber = currNumber;
    }

    currNumber++;
  }

  return nextAbundantNumber;
};

const isPossibleSumOfTwoNumbers = (
  n: number,
  possibleNumbers: number[]
): boolean => {
  // if there's a number greater than the middle that sums up to n, then there must be a number smaller.
  for (let i = 0; i <= Math.ceil(possibleNumbers.length / 2); i++) {
    if (possibleNumbers.includes(n - possibleNumbers[i])) {
      return true;
    }
  }

  return false;
};
