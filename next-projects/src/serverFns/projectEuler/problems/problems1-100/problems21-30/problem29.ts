const problem29 = () => {
  const uniqueNums = new Set();

  for (let a = 2; a <= 100; a++) {
    for (let b = 2; b <= 100; b++) {
      uniqueNums.add(Math.pow(a, b));
    }
  }

  return uniqueNums.size;
};

export default problem29;
