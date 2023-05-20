import addTwoLargeNumbers from "@/serverFns/projectEuler/helpers/addTwoLargeNumbers";
import factorialGenerator from "@/serverFns/projectEuler/helpers/factorialGenerator";

const problem34 = () => {
  const getNthFactorial = factorialGenerator();

  let upperBound = 0;

  // even if every number was a 9, it would not be able to add up to the upper bound.
  let i = 1;
  while (true) {
    let sum = "0";
    for (let j = 0; j < i; j++) {
      sum = addTwoLargeNumbers(`${getNthFactorial(9)}`, sum);
    }

    if (sum.length < i) {
      upperBound = parseInt(sum);
      break;
    }

    i++;
  }

  const curiousNumbers: number[] = [];

  for (let i = 11; i < upperBound; i++) {
    const numInArr = `${i}`.split("").map((x) => parseInt(x));
    const factorialArr = numInArr.map((x) => getNthFactorial(x));
    const sumOfFactorials = factorialArr.reduce((acc, curr) => acc + curr, 0);
    if (sumOfFactorials === i) {
      curiousNumbers.push(i);
    }
  }

  return curiousNumbers.reduce((acc, curr) => acc + curr, 0);
};

export default problem34;
