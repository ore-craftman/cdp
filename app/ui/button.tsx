import { ButtonProps } from "../lib/declarations";

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-primary text-white font-semibold rounded-md py-2 px-4 lg:px-5 w-full"
      {...props}
    >
      {children}
    </button>
  );
}
