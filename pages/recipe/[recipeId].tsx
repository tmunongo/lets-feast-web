import { Recipe } from "@prisma/client";
import client from "../../lib/prismadb";

type Props = {
  recipe: Recipe;
};

const RecipePage = ({ recipe }: Props) => {
  return (
    <div>
      <p>Recipe details will be here</p>
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
