import { Recipe } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import { FormEvent, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ButtonAsLink from "../ButtonAsLink";
import Horizontal from "../Dividers/Horizontal";

type Props = {
  recipe: Recipe;
};

const RecipeMain = ({ recipe }: Props) => {
  const [fav, setFav] = useState(recipe.isFavorite);
  // get user session information
  const { data: session } = useSession();

  const handleFav = async (event: FormEvent) => {
    event.preventDefault();
    const favCont = {
      fav: "yes",
      author: JSON.stringify(session),
      value: fav,
      id: recipe ? recipe.id : null,
    };

    const response = await fetch("/api/recipe", {
      method: "PUT",
      body: JSON.stringify(favCont),
      redirect: "manual",
    });

    if (response.status === 200) {
      Router.push(Router.route);
    }
  };
  return (
    <>
      <div className="flex items-center justify-around w-[90%] my-4 h-52 shadow-md p-2">
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
            <ButtonAsLink location={`/recipe/${recipe.id}`}>
              Full Recipe
            </ButtonAsLink>
            <div className="w-full flex items-center justify-end">
              {recipe.isFavorite ? (
                <form onSubmit={(event) => handleFav(event)}>
                  <button type="submit">
                    <BsHeartFill
                      size={25}
                      type="submit"
                      onClick={() => setFav(!fav)}
                    />
                  </button>
                </form>
              ) : (
                <form onSubmit={(event) => handleFav(event)}>
                  <button type="submit">
                    <BsHeart size={25} onClick={() => setFav(!fav)} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Horizontal />
    </>
  );
};

export default RecipeMain;
