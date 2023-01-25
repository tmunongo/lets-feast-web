import { v2 as Cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import client from "../../lib/prismadb";
import { authOptions } from "./auth/[...nextauth]";
// import { unstable_getServerSession } from "next-auth";
// import { authOptions } from "./auth/[...nextauth]";

Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  //   const body = JSON.parse(req.body);
  //   const user = JSON.parse(body.author);
  //   if (!user) {
  //     return res.status(401).json({ message: "You must be logged in!" });
  //   }
  switch (method) {
    case "POST": {
      break;
    }

    case "PUT": {
      break;
    }

    case "GET": {
      const session = await unstable_getServerSession(req, res, authOptions);

      const user = await client.user.findUnique({
        where: {
          email: session!.user!.email!,
        },
      });

      console.log(user);

      return res.json({ user: user });
    }
  }
}
