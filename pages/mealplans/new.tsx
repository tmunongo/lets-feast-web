import Head from "next/head";
import MealPlanForm from "../../components/MealPlan/MealPlanForm";

type Props = {};

const New = (props: Props) => {
  return (
    <>
      <Head>
        <title>New Meal Plan</title>
      </Head>
      <div>
        <MealPlanForm />
      </div>
    </>
  );
};

export default New;
