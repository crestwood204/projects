import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem37 = () => {
  const KNOWN_TRUNCATABLE_PRIMES = 11;
  const truncatablePrimes: number[] = [];

  const getNthPrime = primeNumberGenerator();
  const seenPrimes: Record<number, boolean> = {
    2: true,
    3: true,
    5: true,
    7: true,
  };

  let index = 5; // 2, 3, 5, and 7 are considered non-truncatable

  while (truncatablePrimes.length < KNOWN_TRUNCATABLE_PRIMES) {
    const currPrime = getNthPrime(index);
    seenPrimes[currPrime] = true;

    if (isTruncatable(currPrime, seenPrimes)) {
      truncatablePrimes.push(currPrime);
    }
    index++;
  }

  return truncatablePrimes.reduce((acc, curr) => acc + curr, 0);
};

export default problem37;

const isTruncatable = (
  currPrime: number,
  seenPrimes: Record<number, boolean>
): boolean => {
  const allCases = new Set<number>();

  // get all cases
  const currPrimeAsStr = `${currPrime}`;
  for (let i = 0; i < currPrimeAsStr.length; i++) {
    allCases.add(parseInt(currPrimeAsStr.slice(i)));
  }

  // don't let i go to 0 because then you get empty string which is NaN
  for (let i = currPrimeAsStr.length - 1; i > 0; i--) {
    allCases.add(parseInt(currPrimeAsStr.slice(0, i)));
  }

  // test all cases
  const checks = Array.from(allCases).map((v) => Boolean(seenPrimes[v]));

  if (checks.includes(false)) {
    return false;
  }

  return true;
};
