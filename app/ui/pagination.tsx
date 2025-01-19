import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { IPagination } from "../lib/declarations";
import { Dispatch, SetStateAction } from "react";

export default function Pagination({
  pagination,
  currentPage,
  setCurrentPage,
  isPlaceholderData,
  setQueryConfig,
}: {
  pagination: IPagination;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isPlaceholderData: boolean;

  setQueryConfig: Dispatch<
    SetStateAction<{ cursor: string; direction: string }>
  >;
}) {
  const { pageCount } = pagination;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const nextHandler = () => {
    if (isPlaceholderData) return;
    if (currentPage < pageCount) setCurrentPage((state) => state + 1);

    setQueryConfig({ direction: "forward", cursor: pagination.lastVisible });
  };

  const prevHandler = () => {
    if (currentPage > 1) setCurrentPage((state) => state - 1);

    setQueryConfig({ direction: "backward", cursor: pagination.firstVisible });
  };

  return (
    <div className="flex justify-center items-center mb-8 py-1 space-x-2 absolute w-full bottom-0 mt-6">
      <button
        disabled={currentPage === 1}
        className={`disabled:text-gray-400`}
        onClick={prevHandler}
        aria-label="Previous Page"
      >
        <PiCaretLeft className="text-sm" />
      </button>
      {pages.map((num) => (
        <button
          key={num}
          className={`px-2 py-1  rounded ${
            num === currentPage ? "bg-primary text-white" : "bg-gray-200"
          }`}
          disabled={true}
        >
          {num}
        </button>
      ))}
      <button
        disabled={currentPage === pageCount || isPlaceholderData}
        className={`disabled:text-gray-400`}
        onClick={nextHandler}
        aria-label="Next Page"
      >
        <PiCaretRight className="text-sm" />
      </button>
    </div>
  );
}
