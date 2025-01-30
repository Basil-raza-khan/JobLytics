import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const filterOptions = [
  { type: "Location", options: ["Karachi", "Punjab", "Lahore", "Islamabad"] },
  { type: "Industry", options: ["Frontend Developer", "Backend Developer", "ML Engineer"] },
  { type: "Salary", options: ["0-40k", "42-1lakh", "1lakh to 5lakh"] },
];

const FilterDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const dispatch = useDispatch();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option) => {
    const updatedFilters = selectedFilters.includes(option)
      ? selectedFilters.filter((item) => item !== option)
      : [...selectedFilters, option];

    setSelectedFilters(updatedFilters);
    dispatch(setSearchedQuery(updatedFilters.join(", ")));
  };

  return (
    <div className="w-full bg-white p-2 rounded-md shadow-md">
      <motion.div onClick={toggleDropdown} className="flex items-center justify-between cursor-pointer">
        <span className="font-bold">Filters</span>
        <ChevronDown size={18} />
      </motion.div>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {filterOptions.map((filter) => (
            <div key={filter.type}>
              <h3 className="text-sm font-bold">{filter.type}</h3>
              {filter.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={option}
                    checked={selectedFilters.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
