import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { BiPowerOff } from "react-icons/bi";
import ButtonAsLink from "../ButtonAsLink";
import ThemeToggle from "../ThemeToggle";

type Props = {};

const HeaderSummary = (props: Props) => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const modifyTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-around">
      <div className="w-1/4`">
        <span>
          <ThemeToggle
            theme={theme}
            modifyTheme={modifyTheme}
            colour="bg-green-700"
            tabIndex={0}
          />
        </span>
      </div>
      <div className="w-3/4">
        {session ? (
          <div className="flex items-center justify-around">
            <button
              onClick={() => signOut()}
              className="bg-button-light dark:bg-button-dark text-button-light-text dark:text-button-dark-text p-1 rounded-md"
            >
              <BiPowerOff size={25} />
            </button>
            <span className="rounded-full overflow-hidden">
              <Image
                src={session.user!.image!}
                alt="user"
                width={40}
                height={40}
              />
            </span>
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
