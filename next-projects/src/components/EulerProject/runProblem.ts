import axios from "axios";

const runProblem = async (problemNumber: number) => {
  const answer = await axios.get(`/api/euler?problemNumber=${problemNumber}`);
  return answer.data.answer;
};

export default runProblem;
