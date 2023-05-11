// javascript only keeps precision for 17 decimal places

// found an interesting pattern, where the cycle length is equal to the prime number - 1, if there is a cycle.
// my getCycleLength function was able to find a 96 length cycle in 977, and there only 3 more prime numbers before 1000, 983, 991, and 997, so I just guessed those 3 and 983 was correct.

import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem26 = () => {
  let maxCycleLength = -1;
  let maxCycleIndex = -1;

  const getNthPrimeNumber = primeNumberGenerator();
  let index = 1;
  let currPrimeNumber = 0;

  while (currPrimeNumber < 1000) {
    currPrimeNumber = getNthPrimeNumber(index);
    console.log(currPrimeNumber);

    const cycleLength = getCycleLength(currPrimeNumber);

    if (cycleLength > maxCycleLength) {
      maxCycleLength = cycleLength;
      maxCycleIndex = currPrimeNumber;
    }

    index++;
  }

  return `${maxCycleIndex}: ${maxCycleLength}`;
};

export default problem26;

const getCycleLength = (n: number) => {
  const precision = 2000;
  const fraction = removeBeginningZeroes(
    longDivision(1, n, precision).slice(2)
  );

  let cycleLength = 0;

  // number => indices
  const countMap: Record<string, number[]> = {};
  for (let i = 0; i < fraction.length; i++) {
    if (countMap.hasOwnProperty(fraction[i])) {
      countMap[fraction[i]].push(i);
    } else {
      countMap[fraction[i]] = [i];
    }
  }

  // check to make sure there are at least two of the starting number
  if (!countMap[fraction[0]] || countMap[fraction[0]].length < 2) {
    return 0;
  }

  const possibleStartingNumbers = countMap[fraction[0]];

  for (let i = 1; i < possibleStartingNumbers.length; i++) {
    const firstStr = fraction.slice(0, possibleStartingNumbers[i]);

    if (fraction.length < firstStr.length + possibleStartingNumbers[i]) {
      return 0;
    }

    const secondStr = fraction.slice(
      possibleStartingNumbers[i],
      firstStr.length * 2
    );

    if (firstStr.length !== secondStr.length) {
      continue;
    }

    if (firstStr === secondStr) {
      return firstStr.length;
    }
  }

  return cycleLength;
};

const longDivision = (a: number, b: number, n = 10, ds = "."): string =>
  n ? Math.floor(a / b) + ds + longDivision((a % b) * 10, b, --n, "") : "";

const removeBeginningZeroes = (s: string) => {
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "0") {
      if (i === 0) {
        return s;
      } else {
        return s.slice(i - 1);
      }
    }
  }

  return "";
};
