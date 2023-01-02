import { Recipe } from "@prisma/client";
import RecipeFull from "../../components/Recipe/RecipeFull";
import client from "../../lib/prismadb";

type Props = {
  recipe: Recipe;
};

const RecipePage = ({ recipe }: Props) => {
  return (
    <div className="w-full h-full">
      <RecipeFull recipe={recipe} />
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

export default RecipePage;
