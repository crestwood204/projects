import problem1 from "@/components/EulerProject/problem1";
import problem2 from "@/components/EulerProject/problem2";
import styled from "styled-components";

const EulerProject = () => {
  return (
    <Container>
      <div>Problem 1: {problem1()}</div>
    </Container>
  );
};

export default EulerProject;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
