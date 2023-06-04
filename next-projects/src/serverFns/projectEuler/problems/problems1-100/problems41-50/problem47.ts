import getPrimeFactors from "@/serverFns/projectEuler/helpers/getPrimeFactors";
import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem47 = () => {
  let numFourDistinctPrimes = 0;

  const getNthPrime = primeNumberGenerator();

  let index = 1;
  while (numFourDistinctPrimes < 4) {
    const primeFactors = getPrimeFactors(index, getNthPrime);
    const uniquePrimeFactors = new Set(primeFactors);

    if (uniquePrimeFactors.size === 4) {
      numFourDistinctPrimes++;
    } else {
      numFourDistinctPrimes = 0;
    }

    index++;
  }

  return index - 4;
};

export default problem47;
