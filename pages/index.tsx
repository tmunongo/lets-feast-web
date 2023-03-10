// import { GetServerSidePropsContext } from "next";
// import { unstable_getServerSession } from "next-auth";
import { Recipe } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import NoRecipes from "../components/Recipe/NoRecipes";
import RecipeMain from "../components/Recipe/RecipeMain";
import SampleRecipeMain from "../components/Recipe/SampleRecipeMain";
import client from "../lib/prismadb";
import Sample from "../lib/sample";
import { authOptions } from "./api/auth/[...nextauth]";

// import { authOptions } from "./api/auth/[...nextauth]"

export default function Home(recipes: any) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Home | Let&#39;s Feast</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        {recipes.recipes.length > 0 ? (
          <div className="flex flex-col items-center justify-start w-full min-h-full">
            {recipes.recipes.map((item: Recipe, index: number) => {
              return (
                <>
                  <RecipeMain recipe={item} key={index} />
                </>
              );
            })}
          </div>
        ) : (
          <>
            <NoRecipes />
            <Link href="/intro">
              <SampleRecipeMain recipe={Sample} />
            </Link>
          </>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
    where: { email: session.user.email! },
  });
  const recipes = await client.recipe.findMany({
    where: {
      authorId: user!.id,
    },
  });
  return {
    props: {
      recipes,
    },
  };
}
