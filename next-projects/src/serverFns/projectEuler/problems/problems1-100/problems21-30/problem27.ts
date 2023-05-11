import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem27 = () => {
  const getNthPrimeNumber = primeNumberGenerator();

  const primeNumbers: Record<number, boolean> = {};
  let currPrimeIndex = 0;
  let largestPrimeNumber = -1;

  let greatestEval = {
    a: 0,
    b: 0,
    n: 0,
  };

  const isPrime = (n: number): boolean => {
    while (n > largestPrimeNumber) {
      currPrimeIndex++;
      const currPrimeNumber = getNthPrimeNumber(currPrimeIndex);
      largestPrimeNumber = currPrimeNumber;
      primeNumbers[currPrimeNumber] = true;
    }

    return Boolean(primeNumbers[n]);
  };

  for (let a = -999; a < 1000; a++) {
    console.log(a);
    for (let b = -999; b < 1000; b++) {
      let n = 0;
      let currEval = quadraticFormula(a, b, n);
      while (isPrime(currEval)) {
        n++;
        currEval = quadraticFormula(a, b, n);
      }

      n--;

      if (n > greatestEval.n) {
        greatestEval = {
          a,
          b,
          n,
        };
      }
    }
  }

  return `${greatestEval.a * greatestEval.b}`;
};

export default problem27;

const quadraticFormula = (a: number, b: number, n: number) => {
  return n * n + a * n + b;
};
