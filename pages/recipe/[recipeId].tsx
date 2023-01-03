import { Recipe } from "@prisma/client";
import Head from "next/head";
import RecipeFull from "../../components/Recipe/RecipeFull";
import client from "../../lib/prismadb";

type Props = {
  recipe: Recipe;
};

const RecipePage = ({ recipe }: Props) => {
  return (
    <>
      <Head>
        <title>{recipe.name} | Let&apos;s Feast</title>
      </Head>
      <main>
        <div className="w-full h-full">
          <RecipeFull recipe={recipe} />
        </div>
      </main>
    </>
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
