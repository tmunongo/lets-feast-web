import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { getServerAuth } from "../../lib/getServerAuth";
import client from "../../lib/prismadb";

type Props = {
  recipes: {
    id: string;
    category: string;
  }[];
};

const Categories = ({ recipes }: Props) => {
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
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
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { user } = await getServerAuth(context);

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
