const problem36 = () => {
  let sum = 0;
  for (let i = 1; i < 1000000; i++) {
    if (isPalindrome(`${i}`)) {
      const numInBase2 = i.toString(2);

      if (isPalindrome(`${numInBase2}`)) {
        sum += i;
      }
    }
  }

  return sum;
};

export default problem36;

const isPalindrome = (str: string) => {
  return str === str.split("").reverse().join("");
};
