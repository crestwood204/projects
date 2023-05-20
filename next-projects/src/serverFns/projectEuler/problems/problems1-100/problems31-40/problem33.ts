import getPrimeFactors from "@/serverFns/projectEuler/helpers/getPrimeFactors";

const problem33 = () => {
  const allCuriousFractions = new Set<string>();

  // find curious fractions
  for (let i = 11; i < 99; i++) {
    for (let j = i + 1; j < 100; j++) {
      const possibleCuriousFractions = getPossibleCuriousFractions(i, j);
      const curiousFractions = checkCuriousFractions(
        i / j,
        possibleCuriousFractions
      );

      curiousFractions.forEach(() => {
        allCuriousFractions.add(`${i}/${j}`);
      });
    }
  }

  // multiply these curious fractions, simplify, and obtain the denominator.
  const arr = Array.from(allCuriousFractions);

  // turn in to the form [[numerator, denominator]]
  const num2DArr = arr.map((str) => str.split("/").map((x) => parseInt(x)));

  // turn in to the form [numeratorsMultiplied, denominatorsMultiplied]
  const numArr = num2DArr.reduce(
    (acc, curr) => [acc[0] * curr[0], acc[1] * curr[1]],
    [1, 1]
  );

  // simplify
  const numeratorPrimeFactors = getPrimeFactors(numArr[0]);
  const denominatorPrimeFactors = getPrimeFactors(numArr[1]);

  const sharedPrimeFactors: number[] = [];

  numeratorPrimeFactors.forEach((primeFactor) => {
    if (denominatorPrimeFactors.includes(primeFactor)) {
      sharedPrimeFactors.push(primeFactor);
      // remove prime factor from denominator prime factors
      const indexOf = denominatorPrimeFactors.indexOf(primeFactor);
      denominatorPrimeFactors.splice(indexOf, 1);
    }
  });

  let denominator = numArr[1];
  sharedPrimeFactors.forEach((pf) => {
    denominator /= pf;
  });

  // return denominator
  return denominator;
};

export default problem33;

const getPossibleCuriousFractions = (
  numerator: number,
  denominator: number
): string[] => {
  const numeratorOpts = `${numerator}`.split("").map((x) => parseInt(x));
  const denominatorOpts = `${denominator}`.split("").map((x) => parseInt(x));

  if (numeratorOpts.length !== 2 || denominatorOpts.length !== 2) {
    throw new Error(
      `numbers passed in which are not two digit, ${numerator} ${denominator}`
    );
  }

  // two numbers on top of each other like 11/22 will easily reduce to 1/2 => trivial
  if (
    numeratorOpts[0] === numeratorOpts[1] &&
    denominatorOpts[0] === denominatorOpts[1]
  ) {
    return [];
  }

  // two multiples of ten are trivial
  if (numeratorOpts[1] === 0 && denominatorOpts[1] === 0) {
    return [];
  }

  const possibleCombos: string[] = [];

  if (numeratorOpts[0] === denominatorOpts[0]) {
    possibleCombos.push(`${numeratorOpts[1]}/${denominatorOpts[1]}`);
  }

  if (numeratorOpts[0] === denominatorOpts[1]) {
    possibleCombos.push(`${numeratorOpts[1]}/${denominatorOpts[0]}`);
  }

  if (numeratorOpts[1] === denominatorOpts[0]) {
    possibleCombos.push(`${numeratorOpts[0]}/${denominatorOpts[1]}`);
  }

  if (numeratorOpts[1] === denominatorOpts[1]) {
    possibleCombos.push(`${numeratorOpts[0]}/${denominatorOpts[0]}`);
  }

  return possibleCombos;
};

const checkCuriousFractions = (fraction: number, combos: string[]) => {
  const curiousFractions: string[] = [];
  combos.forEach((combo) => {
    const numArr = combo.split("/").map((x) => parseInt(x));
    const comboAsFraction = numArr[0] / numArr[1];
    if (fraction === comboAsFraction) {
      curiousFractions.push(combo);
    }
  });

  return curiousFractions;
};
