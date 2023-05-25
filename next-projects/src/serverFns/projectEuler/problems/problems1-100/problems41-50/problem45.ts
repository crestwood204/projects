const problem45 = () => {
  const triangleNG = triangleNumberGenerator(286);
  const pentagonalNG = pentagonalNumberGenerator(165);
  const hexagonalNG = hexagonalNumberGenerator(143);

  const pentagonalNumbersMap: Record<number, boolean> = {};
  const hexagonalNumbersMap: Record<number, boolean> = {};
  let lastComputedPentagonalNumber = pentagonalNG.next().value.value;
  let lastComputedHexagonalNumber = hexagonalNG.next().value.value;

  const isPentagonal = (n: number) => {
    return pentagonalNumbersMap.hasOwnProperty(n);
  };

  const isHexagonal = (n: number) => {
    return hexagonalNumbersMap.hasOwnProperty(n);
  };

  let currTriangleNumber = triangleNG.next().value;

  while (
    !isPentagonal(currTriangleNumber.value) ||
    !isHexagonal(currTriangleNumber.value)
  ) {
    currTriangleNumber = triangleNG.next().value;
    while (lastComputedPentagonalNumber < currTriangleNumber.value) {
      lastComputedPentagonalNumber = pentagonalNG.next().value.value;
      pentagonalNumbersMap[lastComputedPentagonalNumber] = true;
    }

    while (lastComputedHexagonalNumber < currTriangleNumber.value) {
      lastComputedHexagonalNumber = hexagonalNG.next().value.value;
      hexagonalNumbersMap[lastComputedHexagonalNumber] = true;
    }
  }

  return currTriangleNumber.value;
};

export default problem45;

type YieldType = {
  index: number;
  value: number;
};

function* triangleNumberGenerator(
  n: number
): Generator<YieldType, YieldType, undefined> {
  let index = n;

  while (true) {
    yield { index, value: (index * (index + 1)) / 2 };
    index++;
  }
}

function* pentagonalNumberGenerator(
  n: number
): Generator<YieldType, YieldType, undefined> {
  let index = n;

  while (true) {
    yield { index, value: (index * (3 * index - 1)) / 2 };
    index++;
  }
}

function* hexagonalNumberGenerator(
  n: number
): Generator<YieldType, YieldType, undefined> {
  let index = n;

  while (true) {
    yield { index, value: index * (2 * index - 1) };
    index++;
  }
}
