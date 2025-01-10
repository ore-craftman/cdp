import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

export default function Pagination() {
  const pages = [1, 2, 3, 4, 5];
  return (
    <div className="flex justify-center items-center mt-2 mb-8 py-1">
      <PiCaretLeft className="text-sm" />
      {pages.map((page) => (
        <button key={page} className="bg-none border-none p-1 mx-2">
          {page}
        </button>
      ))}
      <PiCaretRight className="text-sm" />
    </div>
  );
}
