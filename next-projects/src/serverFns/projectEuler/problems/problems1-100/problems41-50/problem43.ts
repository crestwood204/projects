import addTwoLargeNumbers from "@/serverFns/projectEuler/helpers/addTwoLargeNumbers";

const problem43 = () => {
  const nums: string[] = [];
  for (const permutation of permute([...Array(10).keys()])) {
    const stringifiedPermutation = permutation.join("");
    if (hasInterestingSubstringDivisibility(stringifiedPermutation)) {
      nums.push(stringifiedPermutation);
    }
  }

  return nums.reduce((curr, acc) => addTwoLargeNumbers(curr, acc), "0");
};

export default problem43;

const hasInterestingSubstringDivisibility = (p: string) => {
  if (parseInt(p.slice(7)) % 17 === 0) {
    if (parseInt(p.slice(6, 9)) % 13 === 0) {
      if (parseInt(p.slice(5, 8)) % 11 === 0) {
        if (parseInt(p.slice(4, 7)) % 7 === 0) {
          if (parseInt(p.slice(3, 6)) % 5 === 0) {
            if (parseInt(p.slice(2, 5)) % 3 === 0) {
              if (parseInt(p.slice(1, 4)) % 2 === 0) {
                return true;
              }
            }
          }
        }
      }
    }
  }

  return false;
};

// permutation code copied from stack overflow: https://stackoverflow.com/questions/9960908/permutations-in-javascript

const permute = function* (permutation: number[]) {
  var length = permutation.length,
    c = Array(length).fill(0),
    i = 1,
    k,
    p;

  yield permutation.slice();
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      yield permutation.slice();
    } else {
      c[i] = 0;
      ++i;
    }
  }
};
