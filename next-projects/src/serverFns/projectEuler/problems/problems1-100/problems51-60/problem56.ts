import exponentLargeNumbers from "@/serverFns/projectEuler/helpers/exponentLargeNumbers";

const problem56 = () => {
  let maxDigitalSum = 0;

  for (let a = 1; a < 100; a++) {
    for (let b = 1; b < 100; b++) {
      const exponent = exponentLargeNumbers(a, b);
      const digitalSum = exponent
        .split("")
        .map((x) => Number(x))
        .reduce((acc, curr) => curr + acc, 0);
      if (digitalSum > maxDigitalSum) {
        maxDigitalSum = digitalSum;
      }
    }
  }

  return maxDigitalSum;
};

export default problem56;
