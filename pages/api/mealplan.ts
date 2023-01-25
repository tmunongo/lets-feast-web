import { v2 as Cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/prismadb";
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
  const body = JSON.parse(req.body);
  const user = JSON.parse(body.chef);
  if (!user) {
    return res.status(401).json({ message: "You must be logged in!" });
  }
  switch (method) {
    case "POST": {
      // find the user in the database
      const dbUser = await client.user.findUnique({
        where: { email: user.user.email },
      });

      // create a new meal plan with days
      const newPlan = await client.mealPlan.create({
        data: {
          name: body.name,
          description: body.description,
          tag: body.tag,
          chefId: dbUser!.id,
          days: {
            create: [
              { name: "Monday" },
              { name: "Tuesday" },
              { name: "Wednesday" },
              { name: "Thursday" },
              { name: "Friday" },
              { name: "Saturday" },
              { name: "Sunday" },
            ],
          },
        },
        include: {
          days: true,
        },
      });
      // return
      return res.status(200).json({ id: newPlan.id });
    }

    case "PUT": {
      // // find the user in the database
      // const dbUser = await client.user.findUnique({
      //   where: { email: user.user.email },
      // });
      // // find the meal plan and update
      // const mealPlan = await client.mealPlan.findUnique({
      //   where: {
      //     id: body.planId,
      //   },
      //   include: {
      //     days: true,
      //   },
      // });
      // // find the day
      // const day = await client.day.findUnique({
      //   where: {
      //     name: body.day,
      //   },
      // });
      // // update recipe
      // const recipe = await client.recipe.update({
      //   where: {
      //     id: body.recipeId,
      //   },
      //   data: {
      //     dayId: day!.id,
      //   },
      // });
      // // return
      // return res.status(200).json({ recipe });
    }
  }
}
