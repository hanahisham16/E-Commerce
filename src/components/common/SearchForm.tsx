import { Search } from "lucide-react";


export default function SearchForm() {
  return (
    <div className="flex items-center w-full max-w-md bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-base"
      />

      <button className="bg-[#16A34A] hover:bg-emerald-600 text-white  w-8 h-8 rounded-lg bg-primary-600  flex items-center justify-center">
        <Search size={16} />
      </button>
    </div>
  );
}
