import { signOut, useSession } from "next-auth/react";
import ButtonAsLink from "../ButtonAsLink";

type Props = {};

const HeaderSummary = (props: Props) => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-around">
      <div className="w-1/4`">
        <p>Dark Mode Switch</p>
      </div>
      <div className="w-3/4">
        {session ? (
          <div className="flex items-center justify-around">
            <p>Hello, {session.user!.name}</p>
            <button
              onClick={() => signOut()}
              className="bg-button-light dark:bg-button-dark text-button-light-text dark:text-button-dark-text p-2 rounded-md"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <ButtonAsLink location="/login">Login</ButtonAsLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSummary;
