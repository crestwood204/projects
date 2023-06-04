import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem50 = () => {
  const max_n = 1000000;
  // Calculate all primes below n
  const primeMap = getNPrimes(max_n);
  // find longest sum of primes below 1 million. has to be greater than 21
  // which means that the largest number in the sequence must be less than 1,000,000 / 21 = 47620
  const sortedPrimeArr = Object.keys(primeMap)
    .map((p) => parseInt(p))
    .sort((a, b) => a - b);

  let greatestPrimeSum = 0;
  let greatestNumTerms = 0;

  for (let i = 0; i < Math.ceil(max_n / 21); i++) {
    let localPrimeSum = 0;
    let numTerms = 0;
    let sum = 0;
    for (let j = i; j < sortedPrimeArr.length; j++) {
      sum += sortedPrimeArr[j];

      if (primeMap.hasOwnProperty(sum)) {
        localPrimeSum = sum;
        numTerms = j - i;
      }

      if (sum > max_n) {
        break;
      }
    }

    if (numTerms > greatestNumTerms) {
      greatestPrimeSum = localPrimeSum;
      greatestNumTerms = numTerms;
    }
  }

  return greatestPrimeSum;
};

export default problem50;

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
