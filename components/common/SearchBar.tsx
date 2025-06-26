"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search..." }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("search") || "";
  const [query, setQuery] = useState(currentQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(query);
    router.push(`?search=${encoded}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative w-full">
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-300 bg-white shadow-sm"
        />
      </div>
    </form>
  );
};

export default SearchBar;
