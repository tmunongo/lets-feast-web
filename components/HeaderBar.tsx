import HeaderSummary from "./User/HeaderSummary";

type Props = {};

const HeaderBar = (props: Props) => {
  return (
    <div className="h-16 flex items-center justify-around text-center w-full p-2">
      <div>
        <h2 className="font-mono text-2xl">Let&#39;s Feast</h2>
      </div>
      <div>
        <HeaderSummary />
      </div>
    </div>
  );
};

export default HeaderBar;
