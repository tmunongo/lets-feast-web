import { NextApiRequest, NextApiResponse } from "next";
// import { unstable_getServerSession } from "next-auth";
// import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const body = JSON.parse(req.body);
  switch (method) {
    case "POST":
      res
        .status(200)
        .json({ message: "Your account has been successfully deleted" });
  }
}
