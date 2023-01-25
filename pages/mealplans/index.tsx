import { MealPlan, Recipe } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import MealPlanListItem from "../../components/MealPlan/MealPlanListItem";
import RecipeListModal from "../../components/Recipe/Modals/RecipeListModal";
import { getServerAuth } from "../../lib/getServerAuth";
import client from "../../lib/prismadb";

type Props = {
  mealplans: MealPlan[];
  recipes: Recipe[];
};

const Index = ({ recipes, mealplans }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>();

  return (
    <>
      <Head>
        <title>Meal Plans</title>
      </Head>
      <div className="min-h-screen">
        {mealplans.length === 0 ? (
          <div className="flex flex-col items-center justify-around h-[30vh] md:h-[20vh]">
            <p className="md:text-lg capitalize">
              You don&apos;t have any meal plans
            </p>
            <p className="text-sm md:text-base">
              Click &apos;+&apos; below to create a new meal plan
            </p>
            <form
              action=""
              className="bg-bg-light-tertiary dark:bg-bg-dark-tertiary rounded-2xl w-1/2 md:w-1/6 p-1 flex items-center justify-center mt-2"
            >
              <button type="submit">
                <Link href="/mealplans/new">
                  <BiPlus size={30} />
                </Link>
              </button>
            </form>
          </div>
        ) : (
          <div>
            {mealplans.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-start w-[90%] md:grid md:grid-cols-5 md:w-full"
                  onClick={() => setSelectedPlan(item.id)}
                >
                  <MealPlanListItem mealplan={item} setIsOpen={setIsOpen} />
                </div>
              );
            })}
          </div>
        )}
        <RecipeListModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          recipes={recipes}
          planId={selectedPlan!}
        />
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { user } = await getServerAuth(context);

  if (!user) {
    return {
      props: {
        mealplans: [],
      },
    };
  }

  const mealplans = await client.mealPlan.findMany({
    where: {
      chefId: user.id,
    },
    include: {
      days: {
        include: {
          recipes: true,
        },
      },
    },
  });

  const recipes = await client.recipe.findMany({
    where: {
      authorId: user.id,
    },
  });

  return {
    props: {
      mealplans,
      recipes,
    },
  };
};

export default Index;
