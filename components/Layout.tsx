// import { GetServerSidePropsContext } from "next";
// import { Session, unstable_getServerSession as getServerSession } from "next-auth";
import { ReactElement } from "react";
// import { authOptions } from "../pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import Login from "./Auth/Login";
import Wrapper from "./Wrapper";

type Props = {
  children: ReactElement;
  // session: Session;
};

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();

  console.log(session);
  if (!session) {
    return <Login />;
  }

  return (
    <>
      <Wrapper>
        <main className="min-h-screen bg-bg-light-secondary dark:bg-bg-dark-secondary text-text-light-secondary dark:text-text-dark-secondary p-4">
          {children}
        </main>
      </Wrapper>
    </>
  );
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   // console.log(req, res, context);
//   // const session = await getSession({ req: req.req });
//   if (!session) {
//     console.log("You are not logged in");
//   }

//   return {
//     props: {
//       session
//     },
//   };
// };

export default Layout;
