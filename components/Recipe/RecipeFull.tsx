import { Recipe } from "@prisma/client";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import RecipeActions from "./RecipeActions";

type Props = {
  recipe: Recipe;
};

const RecipeFull = ({ recipe }: Props) => {
  return (
    <div className="flex flex-col items-start justify-start">
      <h2 className="text-2xl md:text-3xl mb-2">{recipe.name}</h2>
      <span className="p-1 bg-button-light dark:bg-button-dark rounded-md">
        #{recipe.category}
      </span>
      <div className="relative w-full lg:w-3/4 h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover overflow-hidden rounded-md my-2">
        <span className="absolute top-3 md:top-8 right-3 md:right-8 z-10">
          {recipe.isFavorite ? (
            <AiFillHeart size={30} />
          ) : (
            <AiOutlineHeart size={30} />
          )}
        </span>
        <Image src={recipe.image} alt={recipe.name} fill />
        <span className="absolute bottom-3 left-3 z-10 rounded-lg bg-black text-white opacity-60 px-1">
          {recipe.prepTime}mins <strong>&middot;</strong>{" "}
          {recipe.ingredients.length > 1
            ? `${recipe.ingredients.length} Ingredients`
            : `${recipe.ingredients.length} Ingredient`}
        </span>
      </div>
      <ul>
        <h3 className="text-lg font-bold underline">Ingredients</h3>
        {recipe.ingredients.map((item, index) => {
          return <li key={index}>- {item}</li>;
        })}
      </ul>
      <h3 className="text-lg font-bold underline">Directions</h3>
      <ReactMarkdown className="w-full lg:w-3/4">
        {recipe.directions}
      </ReactMarkdown>
      <div className="w-full flex items-center my-1">
        <RecipeActions id={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeFull;
