import { useState } from "react";
import Problem from "./Problem";

type Props = {
  problemNumbers: number[];
  resetProblemGroup: () => void;
};

const DisplayProblems = ({ problemNumbers, resetProblemGroup }: Props) => {
  const [autoRun, setAutoRun] = useState(false);

  return (
    <>
      <button onClick={resetProblemGroup}>Back to problems</button>
      {problemNumbers.map((problemNumber, index) => (
        <Problem
          key={`problem-${index}`}
          problemNumber={problemNumber}
          autoRun={autoRun}
        />
      ))}
      <button onClick={() => setAutoRun(true)}>Run All</button>
    </>
  );
};
export default DisplayProblems;
