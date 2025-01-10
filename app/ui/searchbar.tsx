import { FiSearch } from "react-icons/fi";

export default function Searchbar() {
  return (
    <div className="flex items-center justify-between px-4 border border-gray-600 rounded-lg">
      <input
        type="text"
        placeholder="Search..."
        className="focus:outline-none py-2 w-full bg-transparent"
      />
      <FiSearch />
    </div>
  );
}
