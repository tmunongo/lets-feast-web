import { Dispatch, SetStateAction } from "react";
import { BiPlus } from "react-icons/bi";

type Props = {
  mealplan: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MealPlanListItem = ({ mealplan, setIsOpen }: Props) => {
  console.log(mealplan);
  return (
    <div className="h-72 shadow-lg rounded-md p-2 flex flex-col items-center justify-around w-full hover:scale-105 transition-all duration-500">
      <p>{mealplan.name}</p>
      <p>{mealplan.days[0].recipes.length}</p>
      <button onClick={() => setIsOpen(true)}>
        <BiPlus size={25} /> Add
      </button>
    </div>
  );
};

export default MealPlanListItem;
