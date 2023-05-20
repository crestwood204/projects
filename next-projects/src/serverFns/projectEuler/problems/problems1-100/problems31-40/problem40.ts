const problem40 = () => {
  const MAX_D = 1000000;
  let currD = 1;
  const nums: number[] = [];

  let currNum = 1;
  let currStr = "1";

  for (let i = 1; i <= MAX_D; i++) {
    if (i === currD) {
      nums.push(parseInt(currStr[0]));
      currD *= 10;
    }
    currStr = currStr.slice(1);

    if (currStr.length === 0) {
      currNum++;
      currStr = `${currNum}`;
    }
  }

  return nums.reduce((acc, curr) => acc * curr, 1);
};

export default problem40;
