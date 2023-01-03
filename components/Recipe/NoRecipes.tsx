import Link from "next/link";

type Props = {};

const NoRecipes = (props: Props) => {
  return (
    <div className="h-32 shadow-md rounded-md w-full flex items-center justify-center bg-bg-light-tertiary dark:bg-bg-dark-tertiary">
      <Link href="/recipe/new">
        <p>Add your first recipe...</p>
      </Link>
    </div>
  );
};

export default NoRecipes;
