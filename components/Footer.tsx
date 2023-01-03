import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="h-10 flex items-center justify-center">
      <p className="">
        <Link className="underline" href="https://tawandamunongo.tech">
          Tawanda Munongo
        </Link>{" "}
        (C) 2023
      </p>
    </div>
  );
};

export default Footer;
