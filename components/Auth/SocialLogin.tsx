import { signIn } from "next-auth/react";

type Props = {};

const SocialLogin = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-around gap-4">
      <button className="w-full" onClick={() => signIn()}>
        <div className="p-2 bg-blue-500 rounded-md text-center">
          <p>Sign In With Google</p>
        </div>
      </button>
      {/* <button className="w-full">
        <div className="p-2 bg-gray-500 rounded-md text-center">
          <p>Sign In with Apple</p>
        </div>
      </button> */}
    </div>
  );
};

export default SocialLogin;
