import primeNumberGenerator from "@/serverFns/projectEuler/helpers/primeNumberGenerator";

const problem49 = () => {
  const primeNumberMap: Record<string, number[]> = {};

  const getNthPrimeNumber = primeNumberGenerator();

  for (let i = 1; i <= 10000; i++) {
    const pN = getNthPrimeNumber(i);
    const orderedPN = `${pN}`.split("").sort().join("");

    if (orderedPN.length !== 4) {
      continue;
    }

    if (orderedPN.length > 4) {
      return pN;
    }

    if (primeNumberMap.hasOwnProperty(orderedPN)) {
      primeNumberMap[orderedPN].push(pN);
    } else {
      primeNumberMap[orderedPN] = [pN];
    }

    const arr = primeNumberMap[orderedPN];

    if (arr.length >= 3 && orderedPN !== "1478") {
      const ans = areNumbersDifferenceApart(arr);
      if (ans.length) {
        return ans.map((x) => `${x}`).join("");
      }
    }
  }

  return "Not Found";
};

export default problem49;

const areNumbersDifferenceApart = (arr: number[]) => {
  const combosOfLength3 = k_combinations(arr, 3);
  for (let i = 0; i < combosOfLength3.length; i++) {
    const localArr = combosOfLength3[i];
    if (
      localArr[2] - localArr[1] === 3330 &&
      localArr[1] - localArr[0] === 3330
    ) {
      return localArr;
    }
  }

  return [];
};

// took from stack overflow: https://stackoverflow.com/questions/37075180/combinations-of-size-n-from-an-array
function k_combinations(set: number[], k: number): number[][] {
  var i, j, combs, head, tailcombs;
  if (k > set.length || k <= 0) {
    return [];
  }
  if (k == set.length) {
    return [set];
  }
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i + 1);
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}
