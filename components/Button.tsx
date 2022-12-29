type Props = {
  children: string;
};

const Button = ({ children }: Props) => {
  return (
    <div className="p-2 rounded-md h-max w-max bg-button-light dark:bg-button-dark button-text-light dark:button-dark-text">
      <span>{children}</span>
    </div>
  );
};

export default Button;
