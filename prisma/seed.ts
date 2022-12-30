import client from "../lib/prismadb";

async function main() {
  await client.recipe.createMany({
    data: getRecipes(),
  });
}

function getRecipes() {
  return [
    {
      name: "Brownies",
      directions: "Preheat the oven to 180 degrees celcius",
      ingredients: ["milk", "2 eggs", "1/2 cup flour", "1/2 teaspoon sugar"],
      category: "desserts",
      image:
        "https://res.cloudinary.com/ta1da-cloud/image/upload/v1671694681/recipe-book/images/brownies_fwwend.jpg",
      prepTime: 45,
      isFavorite: false,
      authorId: "clc9modxi0000i0onu61zrwlr",
    },
    {
      name: "Chicken",
      directions: "Preheat the oven to 180 degrees celcius",
      ingredients: [
        "milk",
        "2 chicken breasts",
        "1/2 cup oil",
        "1/2 teaspoon salt",
      ],
      category: "desserts",
      image:
        "https://res.cloudinary.com/ta1da-cloud/image/upload/v1663168137/recipe-book/images/chicken%20tikka-recipe.jpg",
      prepTime: 45,
      isFavorite: false,
      authorId: "clc9modxi0000i0onu61zrwlr",
    },
  ];
}
main()
  .then(async () => {
    await client.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await client.$disconnect();

    process.exit(1);
  });
