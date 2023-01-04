import { Recipe } from "@prisma/client";
import "easymde/dist/easymde.min.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Router from "next/router";
import React, { FormEvent, useState } from "react";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type Props = {
  recipe?: Recipe;
};

interface RecipeData {
  name: string;
  ingredients: string[];
  directions: string;
  category: string;
  prepTime: number;
  image: string | null;
}

const RecipeForm = ({ recipe }: Props) => {
  const [inputList, setInputList] = useState<any>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipeValues, setRecipeValues] = useState<RecipeData>({
    name: recipe?.name || "",
    category: recipe?.name || "",
    ingredients: recipe?.ingredients || [],
    prepTime: recipe?.prepTime || 0,
    directions: recipe?.directions || "",
    image: recipe?.image || null,
  });

  // handle change for the ingredient fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValues = [...ingredients!];
    updatedValues.push(event.target.value);
    setIngredients(updatedValues);
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      ingredients: [...ingredients, event.target.value],
    }));
  };

  // handle text input for various text only fields
  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      [event.target.name]: event.target.value || "",
    }));
  };

  // input component
  const Input = () => {
    return (
      <input
        name="ingredients"
        type="text"
        className="rounded-md my-1 p-1"
        placeholder="Ingredients"
        value={recipeValues.ingredients[ingredients.length]}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(event)
        }
      />
    );
  };

  // handle inputting markdown text
  const handleMDInput = (content: string) => {
    // event.preventDefault();
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      directions: content || "",
    }));
  };

  // get base 64 version of input file
  const getBase64 = (file: File) => {
    return new Promise<String>((resolve) => {
      let fileInfo;
      let baseURL = "";
      // initialize file reader
      let reader = new FileReader();
      // convert the file to base64
      reader.readAsDataURL(file);
      // on reader load something
      reader.onload = () => {
        baseURL = String(reader.result);
        resolve(baseURL);
      };
    });
  };
  //handle file input
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const file = event.target.files ? event.target.files[0] : null;
    let file64: any;
    if (file !== null) {
      file64 = await getBase64(file);
    }
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      image: file64,
    }));
  };
  // button to add a text input field
  const onAddBtnClick = () => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };
  // button to remove a text input field
  const onRemoveBtnClick = () => {
    if (inputList.length > 0) {
      setInputList(inputList.slice(0, inputList.length - 1));
      setIngredients(ingredients.slice(0, ingredients.length - 1));
      setRecipeValues((prevRecipeValues) => ({
        ...prevRecipeValues,
        ingredients: prevRecipeValues.ingredients.slice(
          0,
          prevRecipeValues.ingredients.length - 1
        ),
      }));
    }
  };

  // get user session information
  const { data: session } = useSession();

  // submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", recipeValues.name);
    formData.append("ingredients", JSON.stringify(recipeValues.ingredients));
    // });
    formData.append("category", recipeValues.category);
    formData.append("directions", recipeValues.directions);
    formData.append("prepTime", recipeValues.prepTime.toString());
    formData.append("author", JSON.stringify(session));
    recipeValues.image && formData.append("image", recipeValues.image);
    const recipe = {
      name: formData.get("name"),
      category: formData.get("category"),
      directions: formData.get("directions"),
      prepTime: formData.get("prepTime"),
      ingredients: formData.get("ingredients"),
      image: formData.get("image"),
      author: formData.get("author"),
    };
    // let data = JSON.stringify(formData);
    const response = await fetch(`/api/recipe`, {
      method: "POST",
      body: JSON.stringify(recipe),
      redirect: "manual",
    });

    if (response.status === 200) {
      Router.push("/");
    }
  };
  return (
    <div className="min-h-screen flex justify-center w-full">
      <div className="flex flex-col items-center justify-center h-2/3 w-full lg:w-3/4">
        <h2 className="text-xl md:text-2xl mb-4">New Recipe</h2>
        <form
          onSubmit={(event) => handleSubmit(event)}
          encType="multipart/form-data"
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
                placeholder="Chicken Tika"
                value={recipeValues.name}
                className="rounded-md ml-2 p-1"
                onChange={(event) => handleTextInput(event)}
              />
            </div>
          </div>
          <div
            id="ingredient-section"
            className="md:flex md:items-center mb-4 w-[100%]"
          >
            <div className="md:w-1/3">
              <label
                htmlFor="ingredients"
                className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Ingredients
              </label>
            </div>
            <div className="md:w-2/3 flex flex-col items-start justify-start p-2">
              {recipeValues.ingredients.map((value, index) => (
                <p key={index} className="border rounded px-2 py-1 mb-2">
                  - {value}
                </p>
              ))}
              {inputList}
              <div className="flex items-center justify-around w-3/4 mt-1 ">
                <button
                  type="button"
                  onClick={onAddBtnClick}
                  className="bg-button-light dark:bg-button-dark px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={onRemoveBtnClick}
                  className="bg-button-light dark:bg-button-dark px-2 py-1 rounded"
                >
                  -
                </button>
              </div>
              {inputList.length === 0 && (
                <p className="mt-2">Click &apos;+&apos; to add a new textbox</p>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-4 w-[100%]">
            <div className="md:w-1/3">
              <label
                htmlFor="prepTime"
                className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Prep Time
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                name="prepTime"
                placeholder="30 mins"
                value={recipeValues.prepTime}
                className="border-black border-2 rounded-xl ml-2 p-1"
                onChange={(event) => handleTextInput(event)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6 w-[100%]">
            <div className="md:w-1/3">
              <label
                htmlFor="category"
                className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Category
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={recipeValues.category}
                className="border-black border-2 rounded-xl p-1 ml-2"
                onChange={(event) => handleTextInput(event)}
              />
            </div>
          </div>
          <div className="w-[100%]">
            <div>
              <label
                htmlFor="directions"
                className="mb-2 tracking-wide block font-bold md:mb-0 pr-4 "
              >
                Directions
              </label>
            </div>
            <div>
              <SimpleMDE
                value={recipeValues.directions}
                onChange={(value = "") => handleMDInput(value)}
                className="md:p-2"
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-start overflow-hidden">
            <input
              className="p-1 w-full"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button
            className="bg-button-light dark:bg-button-dark p-1 md:p-2 rounded-md"
            type="submit"
          >
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
