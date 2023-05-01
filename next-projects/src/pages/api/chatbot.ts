// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getNewMessage from "@/serverFns/chatbot/getNewMessage";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response: string;
};

export default async function euler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let input = req.query.input || "";
  if (Array.isArray(input)) {
    input = input.join("");
  }

  try {
    console.log("hit");
    const response = await getNewMessage(input);

    return res.status(200).json({ response });
  } catch (e: any) {
    return res.status(500).json({ response: `Error: ${e}` });
  }
}