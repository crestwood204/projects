import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem51 = () => {
  const getNthPrimeNumber = primeNumberGenerator();
  let index = 0;
  let currPrime = 0;

  const primeMap = getNPrimes(1000000);
  const sortedPrimeArr = Object.keys(primeMap)
    .map((p) => parseInt(p))
    .sort((a, b) => a - b);

  for (let i = 0; i < sortedPrimeArr.length; i++) {
    const currPrime = sortedPrimeArr[i];
    const currPrimeAsStr = `${currPrime}`;

    if (currPrimeAsStr.length < 2) {
      continue;
    }

    // shouldn't try to replace the last digit
  }
};

export default problem51;

const getCombinations = (n: number) => {
  const nAsStr = `${n}`.slice(0, -1); // remove the last digit since replacing it would be meaningless as even digits are not prime
  const combinations: number[][] = [];

  // generate combinations of length i (don't change all the digits)
  for (let i = 1; i < nAsStr.length; i++) {
    const combos = getCombinationsOfLength(nAsStr, i);
    combinations.concat(...combos);
  }

  return getCombinations;
};

const getCombinationsOfLength = (s: string, i: number) => {
  let combos = s.split("").map((_, index) => [index]);
  if (i === 1) {
    return combos;
  }

  let numIterationsLeft = i - 1;
  while (numIterationsLeft > 0) {
    const currCombos: number[][] = [];
    for (let i = 0; i < combos.length; i++) {
      const currCombo = combos[i];
      const lastDigitOfCurrCombo = currCombo[currCombo.length - 1];
      for (let j = lastDigitOfCurrCombo; j < s.length; j++) {
        currCombos.push([...currCombo, j]);
      }
    }
    combos = currCombos;
    numIterationsLeft--;
  }

  return [];
};

const getNPrimes = (n: number) => {
  const getNthPrimeNumber = primeNumberGenerator();
  const primeMap: Record<number, boolean> = {};

  let index = 0;
  let currPrime = 0;

  do {
    index++;
    currPrime = getNthPrimeNumber(index);
    primeMap[currPrime] = true;
  } while (currPrime < n);

  return primeMap;
};
