import path from "path";
import fs from "fs";

const getValidProblems = async (): Promise<number[]> => {
  const problemsDirectory = path.join(__dirname, "../../server");

  try {
    const files = await fs.promises.readdir(problemsDirectory);
    const problems = files.filter((fileName) =>
      fileName.startsWith("src_serverFns_projectEuler_problems")
    );

    const problemNumbers = problems.map((problemName) => {
      const arr = problemName.split("_");
      // str = "problem#"
      const str = arr[arr.length - 2];
      return parseInt(str.split("problem")[1]);
    });

    return problemNumbers.sort((a, b) => a - b);
  } catch (err) {
    console.error("Error occurred while reading directory!", err);
    return [];
  }
};

export default getValidProblems;
