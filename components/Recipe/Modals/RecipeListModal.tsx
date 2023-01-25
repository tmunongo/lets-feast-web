import { Recipe } from "@prisma/client";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  recipes: Recipe[];
  planId: string;
};

const RecipeListModal = ({ planId, recipes, isOpen, setIsOpen }: Props) => {
  const { data: session } = useSession();
  const [selected, setIsSelected] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  const [selectedDay, setSelectedDay] = useState<string>();
  // const [recipes, setRecipes] = useState<Recipe[] | null>();

  const handleSelectRecipe = (id: string) => {
    setIsSelected(selected ? false : true);
    setId(id);
  };

  const handleConfirm = async () => {
    // day, planId, and recipeId
    const values = {
      day: selectedDay,
      planId: planId,
      recipesId: id,
      chef: JSON.stringify(session),
    };

    const response = await fetch("/api/mealplans", {
      method: "PUT",
      body: JSON.stringify(values),
      redirect: "manual",
    });

    if (response.status === 200) {
      Router.push("/mealplans");
    }
  };
  return (
    <>
      {isOpen ? (
        <div className="absolute h-3/5 w-4/5 top-[20%] left-[10%] md:left-[20%] md:w-3/5 rounded-md border border-black shadow-lg bg-bg-light-tertiary dark:bg-bg-dark-tertiary p-2">
          <div className="h-4/5 flex flex-col items-center justify-start w-full overflow-scroll">
            {!selected ? (
              recipes.map((item: Recipe, index: number) => {
                return (
                  <>
                    {!selected && (
                      <div
                        className="m-1 rounded-md w-[90%] shadow-md p-2"
                        key={index}
                      >
                        <p>{item.name}</p>
                        <p>
                          {item.category} | {item.prepTime}mins
                        </p>
                        <button onClick={() => handleSelectRecipe(item.id)}>
                          Open
                        </button>
                      </div>
                    )}
                  </>
                );
              })
            ) : (
              <>
                {/* after selection */}
                <div className="h-4/5 flex flex-col items-center justify-start w-full">
                  <>
                    {recipes
                      .filter((recipe) => recipe.id === id)
                      .map((item: Recipe, index: number) => {
                        return (
                          <div
                            className="m-1 rounded-md w-[90%] shadow-md p-2"
                            onClick={() => setIsSelected(false)}
                            key={index}
                          >
                            <p>{item.name}</p>
                            <p>
                              {item.category} | {item.prepTime}mins
                            </p>
                            <button onClick={() => setIsSelected(true)}>
                              Close
                            </button>
                          </div>
                        );
                      })}
                  </>
                  <div>
                    <form>
                      <div className="m-2 w-full flex items-center justify-around">
                        <div>
                          <label htmlFor="day" className="p-2">
                            D<span className="text-sm">AY</span>:
                          </label>
                        </div>
                        <div>
                          <select
                            name="day"
                            id=""
                            value={selectedDay}
                            onChange={(event) =>
                              setSelectedDay(event?.target.value)
                            }
                            className="p-3 rounded-sm"
                          >
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-center text-black">
            <button className="bg-red-200 p-2" onClick={() => setIsOpen(false)}>
              Close
            </button>
            <button className="bg-green-300 p-2">Confirm</button>
          </div>
        </div>
      ) : (
        <div className="hidden h-4/5 w-4/5 top-[30%] md:left-1/5">
          <p>You&apos;ll be able to select a bunch of recipes</p>

          <div className="flex items-center justify-center">
            <button className="bg-green-200" onClick={() => setIsOpen(false)}>
              Close
            </button>
            <button className="bg-red-300">Confirm</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeListModal;
