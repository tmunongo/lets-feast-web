import { ReactElement } from "react";
import Footer from "./Footer";
import HeaderBar from "./HeaderBar";
import Sidebar from "./SideBars/Sidebar";

type Props = {
  children: ReactElement;
};

const Wrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-start justify-start w-screen bg-bg-light-primary dark:bg-bg-dark-primary text-text-light-secondary dark:text-text-dark-secondary">
      <div className="w-full">
        <HeaderBar />
      </div>
      <div className="flex items-center justify-center w-screen h-screen">
        <Sidebar />
        <div className="w-11/12 md:4/5 h-full flex flex-col justify-start items-center">
          <div className="w-full">{children}</div>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
