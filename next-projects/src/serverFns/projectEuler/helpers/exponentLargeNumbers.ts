import multiplyTwoLargeNumbers from "./multiplyTwoLargeNumbers";

const exponentLargeNumbers = (a: number, b: number) => {
  let ans = `${a}`;

  for (let i = 0; i < b; i++) {
    ans = multiplyTwoLargeNumbers(ans, `${a}`);
  }

  return ans;
};

export default exponentLargeNumbers;
