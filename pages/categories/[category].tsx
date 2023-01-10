import { Recipe } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import RecipeMain from "../../components/Recipe/RecipeMain";
import client from "../../lib/prismadb";
import { authOptions } from "../api/auth/[...nextauth]";

type Props = {
  recipes: Recipe[];
};

const RecipesByCategory = ({ recipes }: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {recipes.map((item, index) => {
        return (
          <>
            <RecipeMain key={index} recipe={item} />
          </>
        );
      })}
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
      authorId: user!.id,
      category: String(context.params!.category),
    },
  });
  return {
    props: {
      recipes,
    },
  };
};

export default RecipesByCategory;
