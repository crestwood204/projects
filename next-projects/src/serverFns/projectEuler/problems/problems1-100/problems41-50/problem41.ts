import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem41 = () => {
  const getNthPrimeNumber = primeNumberGenerator();
  let maxPandigital = 1;

  let index = 1;
  let currPrimeNumber = getNthPrimeNumber(index);

  // 987654321 and 87654321 pandigitals will always be multiples of 3 because adding the digits gives multiple of 3
  while (currPrimeNumber <= 7654321) {
    if (isPandigital(currPrimeNumber) && currPrimeNumber > maxPandigital) {
      maxPandigital = currPrimeNumber;
    }

    index++;
    currPrimeNumber = getNthPrimeNumber(index);
  }

  return maxPandigital;
};

export default problem41;

const isPandigital = (n: number) => {
  const pandigitalNumber = "123456789";

  const nAsString = `${n}`;
  const length = nAsString.length;

  const sameSizePandigital = pandigitalNumber.slice(0, length);
  const sortedString = nAsString.split("").sort().join("");

  return sortedString === sameSizePandigital;
};
