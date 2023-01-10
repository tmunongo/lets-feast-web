import { Recipe } from "@prisma/client";
import RecipeMain from "../components/Recipe/RecipeMain";
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

export const getServerSideProps = async () => {
  const recipes = await client.recipe.findMany({
    where: {
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
