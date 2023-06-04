import addTwoLargeNumbers from "@/serverFns/projectEuler/helpers/addTwoLargeNumbers";
import multiplyTwoLargeNumbers from "@/serverFns/projectEuler/helpers/multiplyTwoLargeNumbers";

// Right now, I'm only slicing 10 in the power function.
// If I wanted to speed it up, I could slice 10 in the addition or multiplication function and it would go faster.
const problem48 = () => {
  let sum = "0";

  for (let i = 1; i <= 1000; i++) {
    const currNum = powerLargeNumbersTo10Places(i, i);

    if (i % 10 === 0) {
      console.log(i);
    }

    sum = addTwoLargeNumbers(sum, currNum);
  }

  return sum.slice(-10);
};

export default problem48;

const powerLargeNumbersTo10Places = (n: number, p: number) => {
  let product = "1";
  for (let i = 0; i < p; i++) {
    product = multiplyTwoLargeNumbers(`${product}`, `${n}`).slice(-10);
  }

  return product.slice(-10);
};
