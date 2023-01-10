import Link from "next/link";

type Props = {
  children: string;
  location: string;
};

const ButtonAsLink = ({ children, location }: Props) => {
  return (
    <>
      <Link href={location}>
        <div className="rounded-md bg-button-light dark:bg-button-dark text-button-light-text dark:button-dark-text font-semibold p-1 md:p-2">
          {children}
        </div>
      </Link>
    </>
  );
};

export default ButtonAsLink;
