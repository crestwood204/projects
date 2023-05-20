import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem35 = () => {
  const getNthPrime = primeNumberGenerator();

  // generate all prime numbers under 1 million
  const primeMap: Record<string, boolean> = {};

  let index = 2;
  let currPrime = getNthPrime(1);
  while (currPrime < 1000000) {
    primeMap[`${currPrime}`] = true;
    currPrime = getNthPrime(index);
    index++;
  }

  let numCircularPrimes = 0;

  const allPrimes = new Set(Object.keys(primeMap)); // in no particular order

  while (allPrimes.size) {
    const [currPrime] = allPrimes;
    if (!currPrime) {
      continue;
    }

    // get all rotations of allPrimes[0]
    const rotations: string[] = getRotations(currPrime);

    // check if all are prime. If so, add them all to circular primes
    const checks = rotations.map((p) => Boolean(primeMap[p]));

    if (!checks.includes(false)) {
      numCircularPrimes += checks.length;
    }

    rotations.forEach((p) => {
      allPrimes.delete(p);
    });
  }

  return numCircularPrimes;
};

export default problem35;

const getRotations = (s: string) => {
  const rotations = new Set<string>();

  rotations.add(s);

  let currRotation = s.split("");
  for (let i = 1; i < s.length; i++) {
    // rotate all digits by i
    const firstEl = currRotation.shift();

    if (firstEl) {
      currRotation.push(firstEl);
    }

    rotations.add(currRotation.join(""));
  }

  return Array.from(rotations);
};
