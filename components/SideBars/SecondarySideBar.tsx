import Link from "next/link";
import { useContext } from "react";
import { AiFillBook, AiFillHeart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import NavContext from "../../lib/context";

type Props = {};

const SecondarySideBar = (props: Props) => {
  const nav = useContext(NavContext);
  console.log(nav);
  return (
    <>
      {nav ? (
        <div className="absolute left-[18%] md:left-[21%] bg-bg-light-primary dark:bg-bg-dark-primary top-16 h-screen w-2/3 md:w-1/3 p-2 border-l border-l-button-light dark:border-l-button-dark transition-all duration-500">
          <ul>
            <Link href="/">
              <li className="flex items-center justify-around w-full py-2">
                <span>
                  <AiFillHeart
                    className="text-button-light dark:text-button-dark"
                    size={25}
                  />
                </span>
                <span className="block">Meal Plans</span>
              </li>
            </Link>
            <Link href="/">
              <li className="flex items-center justify-around w-full py-2">
                <span>
                  <BiCategory
                    className="text-button-light dark:text-button-dark"
                    size={25}
                  />
                </span>
                <span className="block">Categories</span>
              </li>
            </Link>
            <Link href="/">
              <li className="flex items-center justify-around w-full py-2">
                <span>
                  <AiFillBook
                    className="text-button-light dark:text-button-dark"
                    size={25}
                  />
                </span>
                <span className="block">Meal Plans</span>
              </li>
            </Link>
          </ul>
        </div>
      ) : (
        <div className="absolute -left-full transition-all duration-500"></div>
      )}
    </>
  );
};

export default SecondarySideBar;
