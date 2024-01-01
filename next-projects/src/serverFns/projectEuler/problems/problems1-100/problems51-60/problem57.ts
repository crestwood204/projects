import addTwoLargeNumbers from "@/serverFns/projectEuler/helpers/addTwoLargeNumbers";

/*

2/2 + 1/2 = 3/2
1 + 1 / (2 + 1/2) = 1 + 1 / (4/2 + 1/2) = 1 + 1 / (5 / 2) = 1 + 2/ 5 = 7 / 5
2 + 2/5 = 12 / 5 = 5 / 12 + 1 = 17 / 12

*/
const problem57 = () => {
  const NUM_ITERATIONS = 1000;

  let interimN = "2";
  let interimD = "5";

  let numDigtsInNumeratorIsGreator = 0;

  for (let i = 2; i < NUM_ITERATIONS; i++) {
    // add 2 to interim
    const doubleInterimD = addTwoLargeNumbers(interimD, interimD);
    interimN = addTwoLargeNumbers(interimN, doubleInterimD);

    // flip the fraction over
    let temp = interimN;
    interimN = interimD;
    interimD = temp;

    // add 1 for final
    const actualN = `${addTwoLargeNumbers(interimN, interimD)}`;
    const actualD = `${interimD}`;

    if (actualN.length > actualD.length) {
      numDigtsInNumeratorIsGreator++;
    }
  }

  return `${numDigtsInNumeratorIsGreator}`;
};

export default problem57;
