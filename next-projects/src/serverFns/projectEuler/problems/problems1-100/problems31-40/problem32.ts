const problem32 = () => {
  const combos = new Set<number>();

  // length to maximum digit
  const maximumDigitNumber: Record<number, number> = {
    1: 9,
    2: 99,
    3: 999,
    4: 9999,
    5: 99999,
    6: 999999,
    7: 9999999,
    8: 99999999,
    9: 999999999,
  };
  // 900 * 10 = 9000

  for (let i = 1; i < 9999; i++) {
    for (let j = 1; j < 9999; j++) {
      const product = i * j;

      const lengthOfIAndJ = `${i}${j}`.length;
      const restLength = 9 - lengthOfIAndJ;

      if (
        maximumDigitNumber[restLength] &&
        product > maximumDigitNumber[restLength]
      ) {
        break;
      }

      const wholeTerm = `${i}${j}${product}`;
      if (wholeTerm.length === 9) {
        if (wholeTerm.split("").sort().join("") === "123456789") {
          // console.log(
          //   `${[i, j].sort((a, b) => a - b).join(" * ")} = ${product}`
          // );
          combos.add(product);
        }
      }
    }
  }
  return Array.from(combos).reduce((curr, acc) => acc + curr, 0);
};

export default problem32;
