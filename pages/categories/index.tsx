import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import client from "../../lib/prismadb";
import { authOptions } from "../api/auth/[...nextauth]";

type Props = {
  recipes: {
    id: string;
    category: string;
  }[];
};

const Categories = ({ recipes }: Props) => {
  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((item, index) => {
          return (
            <>
              <Link href={`/categories/${item.category}`}>
                <div
                  key={index}
                  className="flex items-center justify-center h-16 border-y border-black my-1 p-2 rounded-md shadow-md text-xl md:text-base hover:scale-95 transition-all duration-500"
                >
                  <p>{item.category}</p>
                </div>
              </Link>
            </>
          );
        })
      ) : (
        <div>
          <p>Create a recipe first.</p>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session || !session.user) {
    return {
      props: {
        errorMessage: "You must be logged in",
      },
    };
  }
  const user = await client.user.findUnique({
    where: { email: session.user.email! },
  });
  const recipes = await client.recipe.findMany({
    where: {
      authorId: user!.id,
    },
    select: {
      id: true,
      category: true,
    },
  });
  return {
    props: {
      recipes,
    },
  };
}

export default Categories;
