import { NextApiRequest, NextApiResponse } from "next";
// import { unstable_getServerSession } from "next-auth";
import client from "../../lib/prismadb";
// import { authOptions } from "./auth/[...nextauth]";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const session = await unstable_getServerSession(req, res, authOptions);
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return res.status(401).json({ message: "You are not logged in" });
  }
  console.log(session.user!.id);
  const recipes = await client.recipe.findMany({
    where: {
      authorId: session.user!.id,
    },
  });

  res.status(200).json({ recipes: recipes });
}
