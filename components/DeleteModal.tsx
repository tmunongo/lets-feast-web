import Router from "next/router";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

const DeleteModal = ({ id, setIsOpen, isOpen }: Props) => {
  const handleSubmit = async (event: Event) => {
    const data = {
      id: id,
    };
    event.preventDefault();
    setIsOpen(!isOpen);
    const deleted = await fetch(`/api/delete/recipe`, {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "manual",
    });
    if (deleted.status === 200) {
      Router.push("/");
    }
  };

  return (
    <div className="absolute w-full md:w-1/2 lg:w-1/3 top-[40%] dark:bg-bg-light-primary bg-bg-dark-primary rounded-md p-8">
      <p>
        Are you sure you want to delete this recipe? This action cannot be
        reversed.
      </p>
      <div className="flex items-center">
        <button
          className="border border-black w-1/2 bg-green-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          Return
        </button>
        <form
          className="flex flex-col w-1/2 border border-black"
          onSubmit={() => handleSubmit(event!)}
        >
          <input hidden value={id} />
          <button className="bg-red-400" type="submit">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
