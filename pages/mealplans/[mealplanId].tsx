import { MealPlan } from "@prisma/client";
import client from "../../lib/prismadb";

type Props = {
  mealplan: MealPlan;
};

const MealPlanPage = ({ mealplan }: Props) => {
  return (
    <div>
      <p>Your Meal Plan has been created</p>
    </div>
  );
};

export const getServerSideProps = async ({ params }: any) => {
  // const { user } = getServerAuth(context);
  const mealplan = await client.mealPlan.findUnique({
    where: {
      id: params.mealplanId,
    },
    include: {
      days: true,
    },
  });

  return {
    props: {
      mealplan,
    },
  };
};

export default MealPlanPage;
