import React from "react";

interface SearchFieldProps {
  onChange: (value: string) => void;
  value: string;
}

const SearchField: React.FC<SearchFieldProps> = ({ onChange, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);
  return (
    <input
      className="searchField"
      placeholder="Search"
      onChange={handleChange}
      value={value}
    />
  );
};

export default SearchField;
