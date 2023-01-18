import { MealPlan } from "@prisma/client";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { FormEvent, useState } from "react";

type Props = {
  mealplan?: MealPlan;
};

type MealPlanData = {
  name: string;
  description: string;
  tag: string;
};

const MealPlanForm = ({ mealplan }: Props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState(mealplan ? "edit" : "create");
  const [mealPlanValues, setMealPlanValues] = useState<MealPlanData>({
    name: mealplan?.name || "",
    description: mealplan?.description || "",
    tag: mealplan?.tag || "",
  });
  // get user session information
  const { data: session } = useSession();

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    setMealPlanValues((prevMealPlanValues) => ({
      ...prevMealPlanValues,
      [event.target.name]: event.target.value || "",
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", mealPlanValues.name);
    formData.append("description", mealPlanValues.description);
    formData.append("tag", mealPlanValues.tag);
    formData.append("chef", JSON.stringify(session));

    const mealPlanContent = {
      name: formData.get("name"),
      description: formData.get("description"),
      tag: formData.get("tag"),
      chef: formData.get("chef"),
    };

    const response = await fetch(`/api/mealplan`, {
      method: formType === "create" ? "POST" : "PUT",
      body: JSON.stringify(mealPlanContent),
      redirect: "manual",
    });
    setLoading(false);
    console.log(response);
    // redirect the user to the meal plan page
    if (response.status === 200) {
      Router.push(`/mealplans`);
    }
  };
  return (
    <div>
      <h1>{mealplan ? "Update" : "New"} Meal Plan</h1>
      <form
        onSubmit={(event) => handleSubmit(event)}
        method="POST"
        className="flex flex-col items-center md:items-start md:p-4"
      >
        <div className="md:flex md:items-center mb-4 w-[100%]">
          <div className="md:w-1/3">
            <label
              htmlFor="name"
              className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="name"
              placeholder="Keto"
              value={mealPlanValues.name}
              className="border-gray-400 border rounded-xl ml-2 p-1"
              onChange={(event) => handleTextInput(event)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-4 w-[100%]">
          <div className="md:w-1/3">
            <label
              htmlFor="description"
              className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Description
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="description"
              placeholder="Tell us a bit about this meal plan."
              value={mealPlanValues.description}
              className="border-gray-400 border rounded-xl ml-2 p-1"
              onChange={(event) => handleTextInput(event)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-4 w-[100%]">
          <div className="md:w-1/3">
            <label
              htmlFor="tag"
              className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Tag
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="tag"
              placeholder="Vegan"
              value={mealPlanValues.tag}
              className="border-gray-400 border rounded-xl ml-2 p-1"
              onChange={(event) => handleTextInput(event)}
            />
          </div>
        </div>
        <input hidden type="text" name="type" defaultValue={formType} />
        <button
          className="bg-button-light dark:bg-button-dark p-1 md:p-2 rounded-md"
          type="submit"
        >
          Save Meal Plan
        </button>
      </form>
    </div>
  );
};

export default MealPlanForm;
