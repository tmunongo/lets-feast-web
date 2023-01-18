import { Recipe } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import RecipeMain from "../components/Recipe/RecipeMain";
import { getServerAuth } from "../lib/getServerAuth";
import client from "../lib/prismadb";

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
  const { user } = await getServerAuth(context);

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
