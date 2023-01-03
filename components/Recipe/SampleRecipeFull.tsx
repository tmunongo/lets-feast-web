import { Recipe } from "@prisma/client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

type Props = {
  recipe: Recipe;
};

const SampleRecipeFull = ({ recipe }: Props) => {
  console.log(recipe);
  return (
    <div className="flex flex-col items-start justify-start">
      <h2 className="text-2xl md:text-3xl mb-2">{recipe.name}</h2>
      <span className="p-1 bg-button-light dark:bg-button-dark rounded-md">
        #{recipe.category}
      </span>
      <div className="relative w-full lg:w-3/4 h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover overflow-hidden rounded-md my-2">
        <Image src={recipe.image} alt={recipe.name} fill />
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
    </div>
  );
};

export default SampleRecipeFull;
