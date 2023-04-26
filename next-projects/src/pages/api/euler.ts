// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
  runTime: number;
};

export default async function euler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let problemNumber = req.query.problemNumber || "";
  if (Array.isArray(problemNumber)) {
    problemNumber = problemNumber.join("");
  }

  try {
    const { default: problem } = await import(
      `@/serverFns/projectEuler/problems/problem${problemNumber}`
    );

    const startTime = Date.now();
    const answer = problem();
    const endTime = Date.now();

    res.status(200).json({ answer, runTime: endTime - startTime });
  } catch (e) {
    res
      .status(500)
      .json({ answer: "Solution not yet implemented", runTime: 0 });
  }
}
