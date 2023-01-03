import Head from "next/head";
import Horizontal from "../components/Dividers/Horizontal";
import SampleRecipeFull from "../components/Recipe/SampleRecipeFull";
import Sample from "../lib/sample";

type Props = {};

const Intro = (props: Props) => {
  return (
    <>
      <Head>
        <title>Welcome to Let&apos;s Feast | Let&apos;s Feast</title>
      </Head>
      <main>
        <div className="mb-2">
          <SampleRecipeFull recipe={Sample} />
        </div>
        <Horizontal />
        <Horizontal />
        <Horizontal />
        <Horizontal />
        <Horizontal />
      </main>
    </>
  );
};

export default Intro;
