import Link from "next/link";
import Router from "next/router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AiFillBook, AiFillHeart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import NavContext from "../../lib/context";

type Props = {
  setNav: Dispatch<SetStateAction<boolean>>;
};

const SecondarySideBar = ({ setNav }: Props) => {
  const nav = useContext(NavContext);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>();

  const handleSearch = () => {
    setNav(false);
    Router.push({ pathname: "/search", query: { q: search } });
    // }
  };

  return (
    <>
      {nav ? (
        <div className="absolute left-[18%] z-10 md:left-[21%] bg-bg-light-tertiary dark:bg-bg-dark-tertiary top-16 h-screen w-2/3 md:w-1/3 p-2 border-l-button-light dark:border-l-button-dark transition-all duration-500">
          <ul>
            <div className="w-full flex items-center justify-center">
              <input
                type="text"
                className="border-y border-l border-black p-1 rounded-l-md"
                placeholder={search}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <div className="border border-black p-2 rounded-r-md">
                <BsSearch size={16} onClick={() => handleSearch()} />
              </div>
            </div>
            <Link href="/favourites" onClick={() => setNav(!nav)}>
              <li className="flex items-center justify-around w-full py-2">
                <span>
                  <AiFillHeart
                    className="text-button-light dark:text-button-dark"
                    size={25}
                  />
                </span>
                <span className="block">Favorites</span>
              </li>
            </Link>
            <Link href="/categories" onClick={() => setNav(!nav)}>
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
            <Link href="/mealplans" onClick={() => setNav(!nav)}>
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
