import { Dispatch, SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const RecipeListModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <>
      {isOpen ? (
        <div className="absolute h-3/5 w-4/5 top-[20%] left-[10%] md:left-[20%] md:w-3/5 rounded-md border border-black shadow-lg bg-bg-light-tertiary dark:bg-bg-dark-tertiary p-2">
          <p>You&apos;ll be able to select a bunch of recipes</p>

          <div className="flex items-center justify-center text-black">
            <button
              className="bg-green-200 p-2"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button className="bg-red-300 p-2">Confirm</button>
          </div>
        </div>
      ) : (
        <div className="hidden h-4/5 w-4/5 top-[30%] md:left-1/5">
          <p>You&apos;ll be able to select a bunch of recipes</p>

          <div className="flex items-center justify-center">
            <button className="bg-green-200" onClick={() => setIsOpen(false)}>
              Close
            </button>
            <button className="bg-red-300">Confirm</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeListModal;
