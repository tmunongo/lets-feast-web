import { Recipe } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import RecipeMain from "../components/Recipe/RecipeMain";
import client from "../lib/prismadb";
import { authOptions } from "./api/auth/[...nextauth]";

type Props = {
  recipes: Recipe[];
};

const Favourites = ({ recipes }: Props) => {
  return (
    <div className="w-full">
      {recipes.length > 0 ? (
        recipes.map((item, index) => {
          return <RecipeMain recipe={item} key={index} />;
        })
      ) : (
        <h2 className="text-center">
          Add a recipe to your favourites and it will show up here 😄
        </h2>
      )}
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session || !session.user) {
    return {
      props: {
        errorMessage: "You must be logged in",
      },
    };
  }
  const user = await client.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });
  const recipes = await client.recipe.findMany({
    where: {
      authorId: user?.id,
      isFavorite: true,
    },
  });

  return {
    props: {
      recipes,
    },
  };
};

export default Favourites;
