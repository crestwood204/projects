import Problem from "@/components/EulerProject/modules/Problem";
import { useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import getValidProblems from "@/components/EulerProject/utils/getValidProblems";
import CardGroup from "@/components/EulerProject/modules/CardGroup";
import DisplayProblems from "@/components/EulerProject/modules/DisplayProblems";

type Props = {
  validProblemsGroups: [key: number, problemNumbers: number[]][];
};

const EulerProject = ({ validProblemsGroups }: Props) => {
  const [problemGroup, setProblemGroup] = useState<number>();

  return (
    <>
      <Navbar />
      <PageContainer>
        <Header>Project Euler:</Header>
        {problemGroup !== undefined ? (
          <DisplayProblems
            problemNumbers={validProblemsGroups[problemGroup][1]}
            resetProblemGroup={() => setProblemGroup(undefined)}
          />
        ) : (
          <ProblemContainer>
            {validProblemsGroups.map(([tensPlace], index) => (
              <CardGroup
                key={`card-group-${index}`}
                tensPlace={tensPlace}
                onClick={() => setProblemGroup(index)}
              />
            ))}
          </ProblemContainer>
        )}
      </PageContainer>
    </>
  );
};

export default EulerProject;

export async function getServerSideProps() {
  return {
    props: {
      validProblemsGroups: await getValidProblems(),
    }, // will be passed to the page component as props
  };
}

const Header = styled.div`
  font-size: 48px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  row-gap: 48px;
`;

const ProblemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;
