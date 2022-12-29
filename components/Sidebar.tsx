type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="w-1/12 md:w-1/5 h-full p-2">
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;
