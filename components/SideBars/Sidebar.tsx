import Link from "next/link";
import { useState } from "react";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import NavContext from "../../lib/context";
import SecondarySideBar from "./SecondarySideBar";

type Props = {};

const Sidebar = (props: Props) => {
  const [nav, setNav] = useState<boolean>(false);

  const handleNav = () => {
    console.log(nav);
    setNav(nav ? false : true);
  };
  return (
    <NavContext.Provider value={nav}>
      <SecondarySideBar />
      <div className="w-1/5 md:w-1/4 h-full p-2">
        <ul>
          <li className="flex items-center justify-center md:justify-around w-full pb-4">
            <span>
              <AiOutlineMenu
                className="text-button-light dark:text-button-dark"
                size={25}
                onClick={() => handleNav()}
              />
            </span>
          </li>
          <Link href="/">
            <li className="flex items-center justify-center md:justify-around w-full py-2">
              <span>
                <AiFillHome size={25} />
              </span>
              <span className="hidden md:block">Home</span>
            </li>
          </Link>
          <Link href="/recipes/new">
            <li className="flex items-center justify-center md:justify-around w-full py-2">
              <span>
                <TfiWrite size={25} />
              </span>
              <span className="hidden md:block">New</span>
            </li>
          </Link>
          <Link href="/profile">
            <li className="flex items-center justify-center md:justify-around w-full py-2">
              <span>
                <BsFillPersonFill size={25} />
              </span>
              <span className="hidden md:block">Me</span>
            </li>
          </Link>
        </ul>
      </div>
    </NavContext.Provider>
  );
};

export default Sidebar;
