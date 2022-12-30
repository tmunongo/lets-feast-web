import HeaderSummary from "./User/HeaderSummary";

type Props = {};

const HeaderBar = (props: Props) => {
  return (
    <div className="h-16 flex items-center justify-between md:justify-around text-center w-full p-2">
      <div className="w-1/2 md:w-1/3">
        <h2 className="font-mono text-base md:text-2xl">Let&#39;s Feast</h2>
      </div>
      <div className="w-1/2 md:w-1/3">
        <HeaderSummary />
      </div>
    </div>
  );
};

export default HeaderBar;
