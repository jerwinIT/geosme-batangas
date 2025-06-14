import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidBusiness } from "react-icons/bi";

export default function SearchBar() {
  return (
    <div className="bg-white rounded-[50px] p-8 grid grid-cols-1 md:grid-cols-2 item-center justify-center gap-8 mt-10 sm:mt-12 w-full relative">
      {/* first search input - What - Search Business*/}
      <div className="flex space-x-6">
        <BiSolidBusiness className="text-primary-500 text-4xl"></BiSolidBusiness>
        <div className="w-full">
          <p className="text-base font-bold text-text text-left">What</p>
          <input
            type="text"
            placeholder="Search Business"
            className="w-full outline-none border-none text-text-secondary mt-1"
          />
        </div>
      </div>

      {/* second search input - Where - Search Location */}
      <div className="flex space-x-6">
        <FaMapMarkerAlt className="text-primary-500 text-4xl"></FaMapMarkerAlt>
        <div className="w-full">
          <p className="text-base font-bold text-text text-left">Where</p>
          <input
            type="text"
            placeholder="Search Location"
            className="w-full outline-none border-none text-gray-500 mt-1"
          />
        </div>
      </div>
    </div>
  );
}
