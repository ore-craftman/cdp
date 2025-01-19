import { ButtonProps } from "../lib/declarations";

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-primary justify-center gap-2 flex items-center disabled:cursor-progress text-white font-semibold rounded-md py-2 px-4 lg:px-5 w-full"
      {...props}
    >
      {children}
    </button>
  );
}
