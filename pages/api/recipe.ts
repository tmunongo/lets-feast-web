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
  const user = JSON.parse(body.author);
  if (!user) {
    return res.status(401).json({ message: "You must be logged in!" });
  }
  switch (method) {
    case "POST": {
      console.log("create");
      let image = await Cloudinary.uploader.upload(body.image, {
        folder: "recipe-book/images",
        upload_preset: "recipe_book",
        public_id: `${body.name.toLowerCase()}-recipe`,
      });

      const author = await client.user.findUnique({
        where: {
          email: user.user.email,
        },
      });

      const newRecipe = await client.recipe.create({
        data: {
          name: body.name,
          category: body.category,
          image: image.secure_url,
          authorId: author!.id,
          directions: body.directions,
          prepTime: Number(body.prepTime),
          ingredients: JSON.parse(body.ingredients),
        },
      });
      res.status(200).json({ message: "Recipe has been successfully created" });
      break;
    }

    case "PUT": {
      let image;
      if (body.image) {
        image = await Cloudinary.uploader.upload(body.image, {
          folder: "recipe-book/images",
          upload_preset: "recipe_book",
          public_id: `${body.name.toLowerCase()}-recipe`,
        });
      }
      const author = await client.user.findUnique({
        where: {
          email: user.user.email,
        },
      });
      if (body.fav === "yes") {
        const modifiedRecipe = await client.recipe.update({
          where: { id: body.id },
          data: {
            isFavorite: body.value,
          },
        });
        return res
          .status(200)
          .json({ message: "Recipe has been updated created" });
      }
      const modifiedRecipe = await client.recipe.update({
        where: { id: body.id },
        data: {
          name: body.name,
          category: body.category,
          image: image ? image.secure_url : body.image,
          authorId: author!.id,
          directions: body.directions,
          prepTime: Number(body.prepTime),
          ingredients: JSON.parse(body.ingredients),
        },
      });
      return res
        .status(200)
        .json({ message: "Recipe has been updated created" });
    }
  }
}
