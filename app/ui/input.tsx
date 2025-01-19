import { InputProps } from "../lib/declarations";

export default function Input({ label, ...props }: InputProps) {
  const id = label.split(" ").join("-").toLowerCase();
  return (
    <div className="flex flex-col gap-1.5 my-2">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="border border-gray-600 rounded-md py-2.5 px-4 bg-transparent"
        name={id}
        {...props}
      />
    </div>
  );
}
