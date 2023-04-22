import problem1 from "@/components/EulerProject/problem1";
import problem2 from "@/components/EulerProject/problem2";
import problem3 from "@/components/EulerProject/problem3";
import problem4 from "@/components/EulerProject/problem4";
import { useEffect, useState } from "react";
import styled from "styled-components";

const problems: Record<number, any> = {
  1: problem1,
  2: problem2,
  3: problem3,
  4: problem4,
};

const EulerProject = () => {
  const [problemNumber, setProblemNumber] = useState<number>(0);
  const [problemAnswers, setProblemsAnswer] = useState<Record<number, any>>({});

  useEffect(() => {
    if (problemNumber <= 0) {
      return;
    }

    if (!problemAnswers.hasOwnProperty(problemNumber)) {
      setProblemsAnswer((answers) => ({
        ...answers,
        [problemNumber]: problems[problemNumber](),
      }));
    } else {
      return problemAnswers[problemNumber];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemNumber]);

  return (
    <Container>
      <ButtonContainer>
        <button onClick={() => setProblemNumber(1)}>Problem 1</button>
        <button onClick={() => setProblemNumber(2)}>Problem 2</button>
        <button onClick={() => setProblemNumber(3)}>Problem 3</button>
        <button onClick={() => setProblemNumber(4)}>Problem 4</button>
      </ButtonContainer>
      {problemNumber > 0 ? (
        <div>
          Problem #{problemNumber} answer: {problemAnswers[problemNumber]}
        </div>
      ) : (
        <div>Click on a problem to compute the answer</div>
      )}
    </Container>
  );
};

export default EulerProject;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  row-gap: 48px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
`;
