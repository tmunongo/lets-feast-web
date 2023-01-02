import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/prismadb";
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
      const deleted = await client.recipe.delete({
        where: { id: body.id },
      });

      res.status(200).json({ message: "Recipe has been successfully deleted" });
  }
}
