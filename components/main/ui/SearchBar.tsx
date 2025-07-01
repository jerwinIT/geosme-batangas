import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="w-[95%] sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px] bg-white shadow-[0_0_10px_hsl(0_0%_78%)] h-[60px] sm:h-[65px] md:h-[70px] lg:h-[75px] xl:h-[80px] rounded-[100vw] flex">
      <div className="w-[50%] rounded-[100vw] px-4 sm:px-6 md:px-8 lg:px-9 xl:px-10 py-3 sm:py-4 md:py-4 lg:py-5 xl:py-5 transition-colors duration-250 ease-in-out hover:bg-light-gray relative flex flex-col justify-center">
        <p className="text-[0.7rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[0.9rem] font-medium text-text-secondary mb-1 text-left">
          Location
        </p>
        <input
          type="text"
          placeholder="Where are you going?"
          className="bg-transparent border-none focus:outline-none placeholder:text-[0.8rem] sm:placeholder:text-[0.85rem] md:placeholder:text-[0.9rem] lg:placeholder:text-[0.95rem] xl:placeholder:text-[1rem] text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.95rem] xl:text-[1rem] font-medium text-left text-text"
        />
      </div>
      <div className="w-[50%] rounded-[100vw] px-4 sm:px-6 md:px-8 lg:px-9 xl:px-10 py-3 sm:py-4 md:py-4 lg:py-5 xl:py-5 transition-colors duration-250 ease-in-out hover:bg-light-gray relative flex flex-col justify-center before:absolute before:content-[''] before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-[55%] before:bg-[hsl(0_0%_90%)] hover:before:bg-transparent">
        <p className="text-[0.7rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[0.9rem] font-medium text-text-secondary mb-1 text-left">
          Business
        </p>
        <input
          type="text"
          placeholder="What business are you looking for?"
          className="bg-transparent border-none focus:outline-none placeholder:text-[0.8rem] sm:placeholder:text-[0.85rem] md:placeholder:text-[0.9rem] lg:placeholder:text-[0.95rem] xl:placeholder:text-[1rem] text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.95rem] xl:text-[1rem] font-medium text-left text-text"
        />
        <span className="absolute top-1/2 right-[8px] sm:right-[10px] md:right-[12px] lg:right-[13px] xl:right-[15px] -translate-y-1/2 bg-primary-500 text-white p-[0.6rem] sm:p-[0.7rem] md:p-[0.8rem] lg:p-[0.85rem] xl:p-[0.9rem] rounded-full hover:bg-primary-600 transition-colors duration-250 ease-in-out">
          <Search className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
        </span>
      </div>
    </div>
  );
}
