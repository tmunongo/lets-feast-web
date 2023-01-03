import { Recipe } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const updatedValues = [...ingredients!];
    // updatedValues[event.target.name] = event.target.value;
    // setIngredients(updatedValues);
  };

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      [event.target.name]: event.target.value || "",
    }));
  };
  const Input = () => {
    return (
      <input
        name="ingredients"
        className="rounded-md my-1 p-1"
        placeholder="Ingredient"
        value=""
        onChange={(event) => handleChange(event)}
      />
    );
  };

  const handleMDInput = (content: string) => {
    // event.preventDefault();
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      directions: content || "",
    }));
  };

  //handle file input
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files ? event.target.files[0] : null;
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      image: "",
    }));
  };

  const onAddBtnClick = () => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };

  const onRemoveBtnClick = () => {
    if (inputList.length > 0) {
      //   inputList.slice(0, inputList.length - 1);
      inputList.pop();
    }
    console.log(inputList.length);
    // ingredients.pop;
  };

  // submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", recipeValues.name);
    // recipeValues.ingredients.forEach((element) => {
    formData.append("ingredients", JSON.stringify(recipeValues.ingredients));
    // });
    formData.append("category", recipeValues.category);
    formData.append("directions", recipeValues.directions);
    formData.append("prepTime", recipeValues.prepTime.toString());
    recipeValues.image && formData.append("image", recipeValues.image);
    const response = await axios.post(`/api/recipe`, formData);
    return response.data;
  };
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col items-center justify-center h-2/3">
        <h2 className="text-xl md:text-2xl mb-4">New Recipe</h2>
        <form
          onSubmit={(event) => handleSubmit(event)}
          encType="multipart/form-data"
          className="flex flex-col items-center md:items-start md:p-4"
        >
          <div className="md:flex md:items-center mb-6 w-[100%]">
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
            className="md:flex md:items-center mb-6 w-[100%]"
          >
            <div className="md:w-1/3">
              <label
                htmlFor="ingredients"
                className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Ingredients
              </label>
            </div>
            <div className="md:w-2/3">
              {recipeValues.ingredients.map((value, index) => (
                <p key={index} className="border rounded px-2 py-1 mb-2">
                  {value}
                </p>
              ))}
              {inputList.map((index: number) => {
                <Input />;
              })}
              <button
                type="button"
                onClick={onAddBtnClick}
                className="bg-gray-300 px-2 py-1 rounded"
              >
                Add Input
              </button>
              <button
                type="button"
                onClick={onRemoveBtnClick}
                className="bg-gray-300 px-2 py-1 rounded"
              >
                Remove Input
              </button>
              {/* <MultipleValueTextInput
                name="ingredients"
                placeholder="Separate multiple values with a COMMA or ENTER"
                className="border-black border-2 rounded-xl ml-2 p-1"
                onItemAdded={(item, allItems) =>
                  handleMultiInput(item, allItems)
                }
                onItemDeleted={(item, allItems) => console.log(`${item}`)}
              /> */}
              {/* <input
                type="text"
                name="ingredients"
                placeholder="Ingredients"
                value={recipeValues.ingredients}
                className="border-black border-2 rounded-xl ml-2 p-1"
                onChange={(event) => handleTextInput(event)}
              /> */}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6 w-[100%]">
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
                // height={300}
              />
              {/* <MDEditor.Markdown
                source={recipeValues.directions}
                style={{ whiteSpace: "pre-wrap" }}
              /> */}
              {/* <input
                // type="text"
                id="directions"
                name="directions"
                value={recipeValues.directions}
                className="border-black border-2 rounded-md ml-2 h-24 w-[600px]"
                onChange={(event) => handleTextInput(event)}
              /> */}
            </div>
          </div>
          <input
            className="p-2"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
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
