const factorialGenerator = () => {
  const prevFactorials: Record<number, number> = { 0: 1, 1: 1 };

  let lastComputedFactorial = 1;

  return function factorial(n: number) {
    if (prevFactorials.hasOwnProperty(n)) {
      return prevFactorials[n];
    }

    if (n <= lastComputedFactorial) {
      throw new Error("Error processing factorial");
    }

    for (let i = lastComputedFactorial + 1; i <= n; i++) {
      const prevFactorial = prevFactorials[i - 1];
      const currFactorial = i * prevFactorial;
      prevFactorials[i] = currFactorial;
    }

    return prevFactorials[n];
  };
};

export default factorialGenerator;
