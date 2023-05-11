// wasnt sure of the upper bound so just kept increasing it until no new numbers showed up.
// biggest one was in the 100,000-200,000 range, so safe to say there are none over 1 million.

const problem30 = () => {
  const fifthPowerNums: number[] = [];

  for (let i = 10; i < 1000000; i++) {
    const numAsStr = `${i}`;
    const numsTo5thPower = numAsStr
      .split("")
      .map((x) => Math.pow(parseInt(x), 5));
    const sum = numsTo5thPower.reduce((acc, curr) => acc + curr, 0);

    if (sum === i) {
      fifthPowerNums.push(i);
    }
  }
  return fifthPowerNums.reduce((acc, curr) => acc + curr, 0);
};

export default problem30;
