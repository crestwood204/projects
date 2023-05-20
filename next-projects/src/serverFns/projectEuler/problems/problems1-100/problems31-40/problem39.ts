const problem39 = () => {
  // p-value => combinations as set to avoid duplicates
  const rightTriangleMap: Record<number, Set<number[]>> = {};

  for (let i = 1; i <= 998; i++) {
    for (let j = 1; j <= 998; j++) {
      if (i + j > 1000) {
        break;
      }
      for (let k = 1; k <= 998; k++) {
        const pValue = i + j + k;
        if (pValue <= 1000) {
          if (isRightTriangle(i, j, k)) {
            const sortedValues = [i, j, k].sort((a, b) => a - b);
            if (rightTriangleMap.hasOwnProperty(pValue)) {
              rightTriangleMap[pValue].add(sortedValues);
            } else {
              rightTriangleMap[pValue] = new Set<number[]>();
              rightTriangleMap[pValue].add(sortedValues);
            }
          }
        } else {
          break;
        }
      }
    }
  }

  const entries = Object.entries(rightTriangleMap);

  let maxes = {
    pValue: "0",
    numOccurences: 0,
  };

  for (let i = 0; i < entries.length; i++) {
    const [key, val] = entries[i];
    if (val.size > maxes.numOccurences) {
      maxes.pValue = key;
      maxes.numOccurences = val.size;
    }
  }

  return maxes.pValue;
};

export default problem39;

const isRightTriangle = (x: number, y: number, z: number) => {
  if (
    x * x + y * y === z * z ||
    y * y + z * z === x * x ||
    x * x + z * z === y * y
  ) {
    return true;
  }

  return false;
};
