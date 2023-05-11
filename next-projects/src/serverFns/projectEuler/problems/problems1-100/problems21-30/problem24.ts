/*

A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

012   021   102   120   201   210

What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

*/

const problem24 = () => {
  // there should be an equal number of permutations starting with each number
  // number of perms is 10!, so each has 10! / 10 = 362880 permutations.
  // we are looking for the 1 millionth one, so we know the first character is 1
  // 1,000,000 - (362880 * 2) = 274,240
  // now that the first character is 2, there are 9 digits left, so there are 362880 / 9 = 40320 permutations per spot
  // we want the 6th number left, which will be 6 because we don't count 2. So now the string is "27".
  // we keep going with 274,240 - (40320 * 6) = 32320
  // now there are 40320 / 8 = 5040 permutations per spot
  // we want the 6th number left, so that will be 8, now the string is "278"

  // going to continue along this line of thinking for all the digits:
  const numDigitsLeft = 10;
  let index = 1000000;
  let str = "";
  let numberOfPermutationsPerNumber = factorial(10) / numDigitsLeft;

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = numDigitsLeft; i > 0; i--) {
    console.log(str, index, numberOfPermutationsPerNumber);
    for (let j = 0; j < digits.length; j++) {
      if (index - (j + 1) * numberOfPermutationsPerNumber <= 0) {
        str += digits[j];
        // remove digits[j]
        digits.splice(j, 1);
        index -= j * numberOfPermutationsPerNumber;
        break;
      }
    }

    // recalculate index
    numberOfPermutationsPerNumber = numberOfPermutationsPerNumber / (i - 1);
  }

  return str;
};

export default problem24;

const factorial = (n: number): number => {
  if (n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
};
