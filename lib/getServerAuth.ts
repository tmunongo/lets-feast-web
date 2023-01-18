import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import client from "./prismadb";

export const getServerAuth = async (context: GetServerSidePropsContext) => {
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

  return {
    user,
  };
};
