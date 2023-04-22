import { ReactNode, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  problemNumber: number;
  runProblem: () => ReactNode;
  autoRun: boolean;
};

const Problem = ({ problemNumber, runProblem, autoRun }: Props) => {
  const [runtime, setRuntime] = useState(0);
  const [answer, setAnswer] = useState<ReactNode>();

  const handleButtonClick = useCallback(() => {
    const startTime = Date.now();
    const ans = runProblem();
    const endTime = Date.now();
    setRuntime((endTime - startTime) / 1000);
    setAnswer(ans);
  }, [runProblem]);

  useEffect(() => {
    if (autoRun) {
      handleButtonClick();
    }
  }, [autoRun, handleButtonClick]);

  return (
    <Container>
      <div>Problem #{problemNumber}:</div>
      <button onClick={handleButtonClick}>Run</button>
      <div>Ans: {answer}</div>
      <div>Runtime: {runtime}ms</div>
    </Container>
  );
};

export default Problem;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 24px;
`;
