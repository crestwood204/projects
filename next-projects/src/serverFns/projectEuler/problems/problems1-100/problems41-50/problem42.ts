import { readFile } from "fs/promises";
import path from "path";

const problem42 = async () => {
  const words = await getWords();
  let numTriangleNumbers = 0;

  const isTriangleNumber = triangleNumberChecker();

  for (let i = 0; i < words.length; i++) {
    const wordValue = getWordValue(words[i]);
    if (isTriangleNumber(wordValue)) {
      numTriangleNumbers++;
    }
  }

  return numTriangleNumbers;
};

export default problem42;

const triangleNumberChecker = () => {
  const triangleNumberDict: Record<number, true> = {
    1: true,
  };

  let lastTriangleNumberComputedIndex = 1;

  const computeTriangleNumber = (n: number) => {
    return (1 / 2) * n * (n + 1);
  };

  return function isTriangleNumber(n: number): boolean {
    let currTriangleNumber = computeTriangleNumber(
      lastTriangleNumberComputedIndex
    );

    while (n > currTriangleNumber) {
      lastTriangleNumberComputedIndex++;
      currTriangleNumber = computeTriangleNumber(
        lastTriangleNumberComputedIndex
      );
      triangleNumberDict[currTriangleNumber] = true;
    }
    if (triangleNumberDict.hasOwnProperty(n)) {
      return true;
    }

    return false;
  };
};

const getWordValue = (word: string) => {
  const charCodeDifference = 64; // "A".charCodeAt(0) returns 65 and I want "A" to be 1
  let total = 0;
  for (let i = 0; i < word.length; i++) {
    total += word.charCodeAt(i) - charCodeDifference;
  }

  return total;
};

const getWords = async (): Promise<string[]> => {
  try {
    const directory = path.join(
      process.cwd(),
      "src/serverFns/projectEuler/extraFiles/problem42_words.txt"
    );
    const file = await readFile(directory, "utf8");
    const words = file.split(",").map((word) => word.split('"').join(""));
    return words;
  } catch (e: any) {
    console.error(e);
    return [];
  }
};
