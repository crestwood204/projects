import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem46 = () => {
  let oddCompositeNumber = 9;

  const getNthPrimeNumber = primeNumberGenerator();

  const primeNumberMap: Record<number, boolean> = {};
  let currPrimeIndex = 1;
  let largestPrimeNumber = 0;

  while (true) {
    // loop through 2 * squares
    let innerIndex = 1;
    while (true) {
      const currSquareNumber = 2 * innerIndex * innerIndex;

      const possiblePrimeNumber = oddCompositeNumber - currSquareNumber;
      // generate more primeNumbers
      while (largestPrimeNumber < possiblePrimeNumber) {
        const currPrimeNumber = getNthPrimeNumber(currPrimeIndex);
        largestPrimeNumber = currPrimeNumber;
        primeNumberMap[currPrimeNumber] = true;
        currPrimeIndex++;
      }

      if (
        primeNumberMap[oddCompositeNumber] ||
        primeNumberMap[possiblePrimeNumber]
      ) {
        break;
      } else if (currSquareNumber < oddCompositeNumber) {
        innerIndex++;
      } else {
        return oddCompositeNumber;
      }
    }

    oddCompositeNumber += 2;
  }
};

export default problem46;
