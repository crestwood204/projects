const problem52 = () => {
  let index = 1;
  while (true) {
    const multipliers = [1, 2, 3, 4, 5, 6];
    const sortedDigits = multipliers.map((x) => intToSortedString(x * index));
    const allAreEqual = sortedDigits.reduce((acc, curr) => {
      if (acc === curr) {
        return curr;
      } else {
        return "";
      }
    }, sortedDigits[0]);

    if (allAreEqual) {
      return index;
    }

    index++;
  }
};

export default problem52;

const intToSortedString = (n: number) => `${n}`.split("").sort().join("");
