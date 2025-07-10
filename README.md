# Let's Feast Chef's Companion Web App Documentation

## Table of Contents
- Introduction
- Stack
- Features
- Authentication
- Getting Started
- Usage
- Contributing
- License

1. Introduction <a name="introduction"></a>
Welcome to the Let's Feast Web App documentation! This web application is designed to help users create, discover, and organize their favourite recipes. Whether you're a seasoned chef or just getting started in the kitchen, this app provides a user-friendly interface for managing your culinary creations.

2. Stack <a name="stack"></a>
The Recipe Cataloguing Web App is built using the following technologies:

- Next.js: A React framework for building fast and dynamic web applications.

- Prisma: An open-source database toolkit for Node.js and TypeScript, used for database management.

- PostgreSQL: A powerful, open-source relational database management system.

- Cloudinary: A cloud-based image and video management service for storing and serving media assets.

3. Features <a name="features"></a>
### Key Features
- Recipe Management
- Create, edit, and delete recipes.
- Add ingredients, instructions, and images to recipes.
- Categorize recipes by type (e.g., appetizers, main courses, desserts).
- Search for recipes by name, ingredients, or tags.
- Meal Planning
- Plan meals by selecting recipes for breakfast, lunch, dinner, and snacks.
- Generate shopping lists based on selected recipes.
- User Profiles
- User registration and authentication.
- User profiles with personalized recipe collections.

4. Authentication <a name="authentication"></a>
The Recipe Cataloguing Web App offers secure authentication using the following methods:

NextAuth.js: Provides authentication using multiple strategies, including Google authentication and magic-link email authentication. Users can choose their preferred authentication method during registration or login.
5. Getting Started <a name="getting-started"></a>
To run the Recipe Cataloguing Web App locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/your/repo.git
cd recipe-catalog-web-app
```

Install dependencies:

```bash
npm install
```
Set up your environment variables. Make a copy of the .env.example file as .env in the root directory and configure the following variables:

```env
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/your_database
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
Run database migrations:
```

```bash
npx prisma migrate dev
```

Start the development server:
```bash
npm run dev
```

Access the app in your web browser at http://localhost:3000.

6. Usage <a name="usage"></a>
Creating a Recipe
Log in or register for an account.
Click on "Add Recipe" in the navigation menu.
Fill in the recipe details, including name, ingredients, instructions, and images.
Save the recipe.
Meal Planning
Navigate to the "Meal Planner" section.
Select recipes for breakfast, lunch, dinner, and snacks.
The app will generate a meal plan and a shopping list based on your selections.
User Profile
Access your user profile by clicking on your username in the navigation menu.
View and edit your profile information.
Browse and manage your saved recipes.

9. License <a name="license"></a>
This project is licensed under the MIT License.
