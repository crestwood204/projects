import factorialGenerator from "@/serverFns/projectEuler/helpers/factorialGenerator";

const problem53 = () => {
  const getNthFactorial = factorialGenerator();

  let count = 0;

  for (let n = 1; n <= 100; n++) {
    for (let r = 2; r < n; r++) {
      const calculation =
        getNthFactorial(n) / (getNthFactorial(r) * getNthFactorial(n - r));

      if (calculation > 1000000) {
        count++;
      }
    }
  }

  return count;
};

export default problem53;
