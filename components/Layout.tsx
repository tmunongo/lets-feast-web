import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import Login from "./Auth/Login";
import Wrapper from "./Wrapper";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();
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

export default Layout;
