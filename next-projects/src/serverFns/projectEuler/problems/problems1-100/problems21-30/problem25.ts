import addTwoLargeNumbers from "@/serverFns/projectEuler/helpers/addTwoLargeNumbers";

const problem25 = () => {
  const getNextFibonacciNumber = startFibonacciSequence();

  let [currFibonacciNumber, index] = getNextFibonacciNumber();
  while (currFibonacciNumber.length < 1000) {
    const [newFibonacciiNumber, newIndex] = getNextFibonacciNumber();
    currFibonacciNumber = newFibonacciiNumber;
    index = newIndex;
  }

  return index;
};

export default problem25;

const startFibonacciSequence = () => {
  let nMinus1 = "1";
  let nMinus2 = "1";
  let index = 2;

  return (): [string, number] => {
    const nextFibonacciNumber = addTwoLargeNumbers(nMinus1, nMinus2);
    nMinus2 = nMinus1;
    nMinus1 = nextFibonacciNumber;
    index++;
    return [nextFibonacciNumber, index];
  };
};
