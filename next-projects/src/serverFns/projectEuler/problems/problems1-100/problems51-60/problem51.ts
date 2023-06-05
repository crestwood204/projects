import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem51 = () => {
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

    // check for 8 primes among a combination
    const combinations = getCombinations(currPrime);
    for (let j = 0; j < combinations.length; j++) {
      const indicesToChange = combinations[j];
      let numPrimes = 0;
      let firstNewNum = 0;

      for (let k = 0; k <= 9; k++) {
        const newNum = parseInt(
          currPrimeAsStr
            .split("")
            .map((digit, index) => {
              if (indicesToChange.includes(index)) {
                return `${k}`;
              } else {
                return digit;
              }
            })
            .join("")
        );

        if (
          `${newNum}`.length === currPrimeAsStr.length &&
          primeMap.hasOwnProperty(newNum)
        ) {
          if (numPrimes === 0) {
            firstNewNum = newNum;
          }
          numPrimes++;
        }
      }

      if (numPrimes === 8) {
        return firstNewNum;
      }
    }
  }
};

export default problem51;

const getCombinations = (n: number) => {
  const nAsStr = `${n}`.slice(0, -1); // remove the last digit since replacing it would be meaningless as even digits are not prime
  let combinations: number[][] = [];

  // generate combinations of length i (don't change all the digits)
  for (let i = 1; i <= nAsStr.length; i++) {
    const combos = getCombinationsOfLength(nAsStr, i);
    combinations = combinations.concat(combos);
  }

  return combinations;
};

// get the indices to replace
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
      for (let j = lastDigitOfCurrCombo + 1; j < s.length; j++) {
        currCombos.push([...currCombo, j]);
      }
    }
    combos = currCombos;
    numIterationsLeft--;
  }

  return combos;
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
