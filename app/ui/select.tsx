import { SelectProps } from "../lib/declarations";

export default function Select({ label, children, ...props }: SelectProps) {
  const id = label.split(" ").join("-");
  return (
    <div className="flex flex-col gap-1.5 my-2">
      <div>
        <label htmlFor={id}>{label}</label>
      </div>

      <select
        id={id}
        className="border border-gray-600 rounded-md py-2.5 px-4 bg-transparent w-full"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
