import primeNumberGenerator from "./primeNumberGenerator";

const getPrimeFactors = (n: number, getNthPrime?: () => number) => {
  let getNthPrimeFunc = getNthPrime || primeNumberGenerator();

  const primeFactors: number[] = [];

  let nthPrime = 1;

  while (n > 1) {
    const currPrime = getNthPrimeFunc(nthPrime);

    if (currPrime > n) {
      throw new Error(
        `Prime Factors are greater than number: ${currPrime}, ${n}`
      );
    }

    if (n % currPrime === 0) {
      primeFactors.push(currPrime);
      n = n / currPrime;
      nthPrime = 1;
    } else {
      nthPrime++;
    }
  }

  return primeFactors;
};

export default getPrimeFactors;
