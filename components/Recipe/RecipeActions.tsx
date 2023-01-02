import Link from "next/link";
import { useState } from "react";
import DeleteModal from "../DeleteModal";

type Props = {
  id: string;
};

const RecipeActions = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full flex items-center justify-center md:justify-around text-black">
      <div className="w-1/3 bg-green-400 p-1">
        <Link href="/recipe/edit/[id]">Edit</Link>
      </div>
      <div className="w-1/3 bg-red-400 p-1">
        <button className="w-full h-full" onClick={() => toggleOpen()}>
          Delete
        </button>
      </div>
      <div className="w-1/3 bg-yellow-400 p-1">
        <p>Share</p>
      </div>
      {isOpen && <DeleteModal id={id} setIsOpen={setIsOpen} isOpen={isOpen} />}
    </div>
  );
};

export default RecipeActions;
