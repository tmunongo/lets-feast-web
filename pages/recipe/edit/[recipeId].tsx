import { Recipe } from "@prisma/client";
import RecipeForm from "../../../components/Recipe/RecipeForm";
import client from "../../../lib/prismadb";

type Props = {
  recipe: Recipe;
};

const EditRecipe = ({ recipe }: Props) => {
  return (
    <div>
      <RecipeForm recipe={recipe} />
    </div>
  );
};

export const getServerSideProps = async ({ params }: any) => {
  const recipe = await client.recipe.findUnique({
    where: {
      id: params.recipeId,
    },
  });

  return {
    props: {
      recipe,
    },
  };
};

export default EditRecipe;
