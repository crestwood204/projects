const problem28 = () => {
  let sum = 1;

  let skip = 2;

  let lastNumber = 1;

  // if skip is greater than 1001, stop
  while (skip <= 1001) {
    // every time count is 4, reset to 1 and increment the skip by 2
    const nums = [
      lastNumber + skip,
      lastNumber + 2 * skip,
      lastNumber + 3 * skip,
      lastNumber + 4 * skip,
    ];

    lastNumber = lastNumber + 4 * skip;
    sum += nums.reduce((acc, curr) => acc + curr, 0);

    skip += 2;
  }

  return sum;
};

export default problem28;
