import { Recipe } from "@prisma/client";
import Image from "next/image";
import ButtonAsLink from "../ButtonAsLink";
import Horizontal from "../Dividers/Horizontal";

type Props = {
  recipe: Recipe;
};

const SampleRecipeMain = ({ recipe }: Props) => {
  return (
    <>
      <div className="flex items-center justify-around w-full my-4 h-52 shadow-md p-2">
        <div className="w-1/4 h-full">
          <div className="w-full h-full overflow-hidden flex items-center rounded-md">
            <Image
              className="rounded-md"
              src={recipe.image}
              alt={recipe.name}
              width={300}
              height={200}
            />
          </div>
        </div>
        <div className="w-3/4 p-2">
          <div className="flex flex-col items-center justify-start">
            <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
              {recipe.name}
            </h1>
            <div className="flex items-center justify-center my-1">
              <span>{recipe.category}</span>
              <span> | </span>
              <span>{recipe.prepTime} mins</span>
            </div>
            <ButtonAsLink location={"/intro"}>Full Recipe</ButtonAsLink>
          </div>
        </div>
      </div>
      <Horizontal />
    </>
  );
};

export default SampleRecipeMain;
