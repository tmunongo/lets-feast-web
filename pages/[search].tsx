import { Recipe } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import RecipeMain from "../components/Recipe/RecipeMain";
import client from "../lib/prismadb";
import { authOptions } from "./api/auth/[...nextauth]";

type Props = {
  recipes: Recipe[];
};

const Search = ({ recipes }: Props) => {
  return (
    <>
      <main>
        <Head>
          <title>Search</title>
        </Head>
        <div>
          {recipes.length > 0 ? (
            recipes.map((item, index) => {
              return <RecipeMain recipe={item} key={index} />;
            })
          ) : (
            <>
              <p>No results found</p>
            </>
          )}
        </div>
      </main>
    </>
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
      name: {
        contains: String(context.query.q),
      },
      //   OR: [
      //     {
      //       category: {
      //         contains: String(context.query.q),
      //       },
      //       name: {
      //         contains: String(context.query.q),
      //       },
      //       directions: {
      //         contains: String(context.query.q),
      //       },
      //       ingredients: {
      //         has: String(context.query.q),
      //       },
      //     },
      //   ],
    },
  });
  return {
    props: {
      recipes,
    },
  };
};

export default Search;
